// FF14 クライアント（ローカルの sqpack）からロテーション練習用のデータとアイコンを抜き出す。
// 読み取り専用。ゲームのファイルを書き換えたり、サーバーへ通信したりはしない。
//
//   dotnet run --project tools/ffxiv-extract -c Release -- [--game <path>] [--out <repoRoot>] [--level <n>] [--no-icons]
//
// 出力（--out 基準）:
//   src/data/ffxiv/meta.json       ゲームの版・件数・抽出条件
//   src/data/ffxiv/jobs.json       戦闘クラス・ジョブ
//   src/data/ffxiv/actions.json    PvE のプレイヤーアクション（ロールアクション・LB を含む）
//   src/data/ffxiv/statuses.json   アクションが付与・参照するステータス
//   src/data/ffxiv/statuses-all.json Status シートの全ステータス（アイコンはスタック別も含めて全部）
//   src/data/ffxiv/job-gauges.json ジョブゲージの UI 画像（ジョブごとのページ一覧）
//   public/icons/actions/<icon>.png, public/icons/statuses/<icon>.png, public/icons/jobs/<ABBR>.png
//   public/icons/job-gauges/<ABBR>/<page>.png

using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Json.Serialization;
using FfxivExtract;
using Lumina;
using Lumina.Data;
using Lumina.Excel;
using Lumina.Excel.Sheets;
using Action = Lumina.Excel.Sheets.Action;

var opt = Options.Parse(args);
var sqpack = Options.ResolveSqpack(opt.GamePath);
Console.WriteLine($"sqpack : {sqpack}");
Console.WriteLine($"out    : {opt.OutRoot}");

// PanicOnSheetChecksumMismatch: Lumina.Excel の列定義がこのクライアントと合わないときは止める（黙って列がずれた値を出さない）
using var gd = new GameData(sqpack, new LuminaOptions { PanicOnSheetChecksumMismatch = true, DefaultExcelLanguage = Language.English });

ExcelSheet<T> S<T>(Language l) where T : struct, IExcelRow<T> => gd.GetExcelSheet<T>(l)!;

var actEn = S<Action>(Language.English);
var actJa = S<Action>(Language.Japanese);
var trEn = S<ActionTransient>(Language.English);
var trJa = S<ActionTransient>(Language.Japanese);
var cjEn = S<ClassJob>(Language.English);
var cjJa = S<ClassJob>(Language.Japanese);
var catEn = S<ActionCategory>(Language.English);
var catJa = S<ActionCategory>(Language.Japanese);
var cjcSheet = S<ClassJobCategory>(Language.English);
var stEn = S<Status>(Language.English);
var stJa = S<Status>(Language.Japanese);
var indirection = S<ActionIndirection>(Language.English);
var actionUi = gd.GetSubrowExcelSheet<ClassJobActionUI>()!;

// ---- 戦闘クラス・ジョブ ----
// ClassJobCategory 30 = 戦闘職（DoW）, 31 = 魔法職（DoM）
var combatJobs = cjEn.Where(c => c.RowId != 0 && c.ClassJobCategory.RowId is 30 or 31 && !c.Abbreviation.IsEmpty).ToList();
var combatIds = combatJobs.Select(c => c.RowId).ToHashSet();
var abbrById = combatJobs.ToDictionary(c => c.RowId, c => c.Abbreviation.ExtractText());
// クラス → ジョブ（説明文の条件式はジョブ ID で書かれているので、クラスのアクションもジョブとして評価する）
var jobOfClass = combatJobs.Where(c => c.JobIndex > 0 && c.ClassJobParent.RowId != c.RowId)
    .GroupBy(c => c.ClassJobParent.RowId).ToDictionary(g => g.Key, g => g.Min(c => c.RowId)); // ACN は SMN と SCH の2つ。先の方で評価

// ClassJobCategory の真偽値の列は ClassJob の行番号の順（ADV=0, GLA=1, ... PCT=42）。
// Lumina.Excel が名前を付けていない新しいジョブの列（BST=43 → Unknown0 など）もあるので、名前でなく列の順番で引く。
var cjcBoolProps = typeof(ClassJobCategory).GetProperties().Where(p => p.PropertyType == typeof(bool)).ToList();
var cjcProps = new Dictionary<string, System.Reflection.PropertyInfo>();
foreach (var c in combatJobs)
{
    if (c.RowId >= cjcBoolProps.Count) { Console.WriteLine($"warn   : ClassJobCategory に {abbrById[c.RowId]}（{c.RowId}）の列がありません"); continue; }
    var p = cjcBoolProps[(int)c.RowId];
    if (!p.Name.StartsWith("Unknown") && p.Name != abbrById[c.RowId])
        throw new InvalidOperationException($"ClassJobCategory の列の順番が想定と違います: {c.RowId} {abbrById[c.RowId]} ≠ {p.Name}");
    cjcProps[abbrById[c.RowId]] = p;
}
var cjcCache = new Dictionary<uint, List<string>>();
List<string> JobsOfCategory(uint catId)
{
    if (cjcCache.TryGetValue(catId, out var l)) return l;
    l = new();
    if (cjcSheet.TryGetRow(catId, out var row))
    {
        object boxed = row;
        foreach (var c in combatJobs)
        {
            var ab = abbrById[c.RowId];
            if (cjcProps.TryGetValue(ab, out var p) && (bool)p.GetValue(boxed)!) l.Add(ab);
        }
    }
    return cjcCache[catId] = l;
}

// ---- 対象アクションの選定 ----
// 1) IsPlayerAction && !IsPvP && 習得レベル > 0 && 魔法/WS/アビリティ && 戦闘職で使える
// 2) ジョブのアクション一覧（ClassJobActionUI）・置き換え（ActionIndirection）・コンボ元・LB で参照されるもの
var included = new SortedSet<uint>();
foreach (var a in actEn)
{
    if (!a.IsPlayerAction || a.IsPvP || a.ClassJobLevel == 0) continue;
    if (a.ActionCategory.RowId is not (2 or 3 or 4)) continue;
    if (JobsOfCategory(a.ClassJobCategory.RowId).Count == 0) continue;
    included.Add(a.RowId);
}
var inActionList = new HashSet<uint>();
// ClassJobCategory が空のアクション（一覧用の複製など）の、使えるジョブの控え
var sourceJob = new Dictionary<uint, uint>();
var upgradesFrom = new Dictionary<uint, uint>();
var comboTreeLayout = new Dictionary<uint, int>();
foreach (var row in actionUi)
{
    if (!combatIds.Contains(row.RowId)) continue;
    foreach (var s in row)
    {
        var id = s.UpgradeAction.RowId;
        if (id == 0) continue;
        included.Add(id);
        inActionList.Add(id);
        sourceJob.TryAdd(id, row.RowId);
        if (s.BaseAction.RowId != 0 && s.BaseAction.RowId != id) upgradesFrom[id] = s.BaseAction.RowId;
        if (s.ComboTreeLayout != 0) comboTreeLayout[id] = s.ComboTreeLayout;
    }
}
var replacesAction = new Dictionary<uint, List<uint>>();
foreach (var r in indirection)
{
    if (r.Name.RowId == 0 || !combatIds.Contains(r.ClassJob.RowId)) continue;
    included.Add(r.Name.RowId);
    sourceJob.TryAdd(r.Name.RowId, r.ClassJob.RowId);
    if (r.PreviousComboAction.RowId != 0)
    {
        if (!replacesAction.TryGetValue(r.Name.RowId, out var l)) replacesAction[r.Name.RowId] = l = new();
        l.Add(r.PreviousComboAction.RowId);
    }
}
var limitBreakOf = new Dictionary<uint, (string job, int tier)>();
foreach (var c in combatJobs)
{
    var lbs = new[] { c.LimitBreak1.RowId, c.LimitBreak2.RowId, c.LimitBreak3.RowId };
    for (var i = 0; i < 3; i++)
        if (lbs[i] != 0) { included.Add(lbs[i]); limitBreakOf.TryAdd(lbs[i], (abbrById[c.RowId], i + 1)); }
}
// コンボ元が対象外なら追加（1段だけ）
foreach (var id in included.ToList())
{
    var from = actEn.GetRow(id).ActionCombo.RowId;
    if (from != 0 && actEn.HasRow(from)) included.Add(from);
}
included.RemoveWhere(id => !actEn.HasRow(id) || actEn.GetRow(id).Name.IsEmpty);

var maxLevel = opt.Level ?? actEn.Where(a => a.IsPlayerAction && !a.IsPvP).Max(a => (int)a.ClassJobLevel);
Console.WriteLine($"level  : {maxLevel}（説明文の条件式をこのレベルで評価）");

// ---- アクション ----
var comboNext = new Dictionary<uint, List<uint>>();
foreach (var id in included)
{
    var from = actEn.GetRow(id).ActionCombo.RowId;
    if (from == 0) continue;
    if (!comboNext.TryGetValue(from, out var l)) comboNext[from] = l = new();
    l.Add(id);
}

var descStats = new DescriptionEvaluator.Stats();
var statusIds = new SortedSet<uint>();
var actions = new List<ActionOut>();
foreach (var id in included)
{
    var a = actEn.GetRow(id);
    var aj = actJa.GetRow(id);
    var usable = JobsOfCategory(a.ClassJobCategory.RowId);
    if (usable.Count == 0 && sourceJob.TryGetValue(id, out var sj0)) usable = [abbrById[sj0]];
    uint? classJob = combatIds.Contains(a.ClassJob.RowId) ? a.ClassJob.RowId : null; // -1 (0xFFFFFFFF) や 0 = 指定なし
    // 説明文を評価するときのジョブ: クラスならそのジョブ、指定なしなら使えるジョブの先頭
    uint evalJob = classJob is { } cj && cj != 0 ? (jobOfClass.TryGetValue(cj, out var j) ? j : cj)
        : combatJobs.FirstOrDefault(c => usable.Contains(abbrById[c.RowId]) && c.JobIndex > 0).RowId;
    var ctx = new DescriptionEvaluator.Context(evalJob, (uint)maxLevel);
    string Desc(ExcelSheet<ActionTransient> tr) =>
        tr.TryGetRow(id, out var t) ? DescriptionEvaluator.Evaluate(t.Description, ctx, descStats) : "";

    var gcd = a.CooldownGroup == 58 || a.AdditionalCooldownGroup == 58;
    if (a.StatusGainSelf.RowId != 0) statusIds.Add(a.StatusGainSelf.RowId);
    // ActionProcStatus: このステータスが付いている間、アクションが光る（ハイライト）。行が指すステータスも出力する
    uint? procStatusId = a.ActionProcStatus.RowId != 0 && a.ActionProcStatus.ValueNullable is { } aps && aps.StatusId.RowId != 0 ? aps.StatusId.RowId : null;
    if (procStatusId is { } psid) statusIds.Add(psid);
    var lb = limitBreakOf.TryGetValue(id, out var lbv) ? new LimitBreakOut(lbv.job, lbv.tier) : null;

    actions.Add(new ActionOut
    {
        Id = id,
        Name = new(aj.Name.ExtractText(), a.Name.ExtractText()),
        Description = new(Desc(trJa), Desc(trEn)),
        Icon = a.Icon,
        IconPath = a.Icon != 0 ? $"/icons/actions/{a.Icon:D6}.png" : null,
        ClassJobId = classJob,
        ClassJob = classJob is { } c2 && abbrById.TryGetValue(c2, out var ab) ? ab : null,
        Jobs = usable,
        Level = a.ClassJobLevel,
        Category = a.ActionCategory.RowId,
        CategoryName = new(catJa.GetRow(a.ActionCategory.RowId).Name.ExtractText(), catEn.GetRow(a.ActionCategory.RowId).Name.ExtractText()),
        IsGcd = gcd,
        IsRoleAction = a.IsRoleAction,
        IsPlayerAction = a.IsPlayerAction,
        InActionList = inActionList.Contains(id),
        LimitBreak = lb,
        Cast = a.Cast100ms / 10.0,
        ExtraCastTime = a.ExtraCastTime100ms / 10.0,
        Recast = a.Recast100ms / 10.0,
        CooldownGroup = a.CooldownGroup,
        AdditionalCooldownGroup = a.AdditionalCooldownGroup,
        MaxCharges = a.MaxCharges,
        ComboFrom = a.ActionCombo.RowId != 0 ? a.ActionCombo.RowId : null,
        ComboNext = comboNext.TryGetValue(id, out var cn) ? cn : null,
        PreservesCombo = a.PreservesCombo,
        ComboTreeLayout = comboTreeLayout.TryGetValue(id, out var ctl) ? ctl : null,
        UpgradesFrom = upgradesFrom.TryGetValue(id, out var uf) ? uf : null,
        ReplacesAction = replacesAction.TryGetValue(id, out var ra) ? ra : null,
        PrimaryCost = a.PrimaryCostType != 0 ? new CostOut(a.PrimaryCostType, a.PrimaryCostValue) : null,
        SecondaryCost = a.SecondaryCostType != 0 ? new CostOut(a.SecondaryCostType, a.SecondaryCostValue.RowId) : null,
        StatusGainSelf = a.StatusGainSelf.RowId != 0 ? a.StatusGainSelf.RowId : null,
        ActionProcStatus = a.ActionProcStatus.RowId != 0 ? a.ActionProcStatus.RowId : null,
        ActionProcStatusId = procStatusId,
        Range = a.Range,
        EffectRange = a.EffectRange,
        CastType = a.CastType,
        XAxisModifier = a.XAxisModifier,
        TargetArea = a.TargetArea,
        CanTargetSelf = a.CanTargetSelf,
        CanTargetParty = a.CanTargetParty,
        CanTargetHostile = a.CanTargetHostile,
        AttackType = a.AttackType.RowId,
        Aspect = a.Aspect,
        AffectsPosition = a.AffectsPosition,
    });
}

// 二次コストの値がステータスを指す型だけ拾う（32 走竜・猛虎・印 / 35 忍隠 / 46 黒魔紋・天道・活殺自在 / 127 死の供物）。
// ほかの型の値はゲージ量・回数・フラグ（赤魔のマナ 20、1・2・3…）で、ステータス番号と偶然重なるだけ（石化 #1 など）
var statusCostTypes = new HashSet<byte> { 32, 35, 46, 127 };
foreach (var a in actions)
{
    if (a.SecondaryCost is { Type: var t, Value: var v } && statusCostTypes.Contains(t) && v != 0 && stEn.HasRow(v) && !stEn.GetRow(v).Name.IsEmpty) statusIds.Add(v);
    // 一次コストの型 10 も値がステータスを指す（例: 返し五剣 → 燕返し実行可の一種）
    if (a.PrimaryCost is { Type: 10, Value: var pv } && pv != 0 && stEn.HasRow(pv) && !stEn.GetRow(pv).Name.IsEmpty) statusIds.Add(pv);
}

// 説明文で「」に囲まれた名前、およびアクションと同じ名前のステータスも拾う（風月・風花・明鏡止水・彼岸花 など。DATA-01）
// 名前だけで引くため、同名のステータス（PvP 用など）も混ざる。どれを使うかは利用側で決める
var statusIdsByJaName = new Dictionary<string, List<uint>>();
foreach (var st in stJa)
{
    if (st.Icon == 0) continue;
    var n = st.Name.ExtractText();
    if (string.IsNullOrEmpty(n)) continue;
    if (!statusIdsByJaName.TryGetValue(n, out var list)) statusIdsByJaName[n] = list = [];
    list.Add(st.RowId);
}
var quotedName = new System.Text.RegularExpressions.Regex("「([^」]+)」");
foreach (var a in actions)
{
    if (a.Jobs.Count == 0) continue;
    var names = quotedName.Matches(a.Description.Ja).Select(m => m.Groups[1].Value).Append(a.Name.Ja).Distinct();
    var found = names.Where(statusIdsByJaName.ContainsKey).SelectMany(n => statusIdsByJaName[n]).Distinct().ToList();
    if (found.Count == 0) continue;
    a.MentionedStatuses = found;
    foreach (var id in found) statusIds.Add(id);
}

// ---- ステータス ----
// statuses.json: プレイヤーのアクションが付与・参照するもの（アプリで読む軽い版）
// statuses-all.json: Status シートの全行（名前かアイコンがあるもの）。敵へのデバフ・食事・薬・FC バフ・ギミックなども入る
// ステータス → ジョブ。Action の StatusGainSelf はほとんどのアクションで空なので、それだけでは足りない。
//  1) アクションの StatusGainSelf・二次コストが指すもの → そのアクションのジョブ
//  2) Status.ClassJobCategory が一部のジョブだけのもの（全ジョブの行は除く）→ そのジョブ
//  3) ジョブのアクションと日本語名が同じもの（ランパートなど、古い行は全ジョブ扱いになっている）→ そのアクションのジョブ
var statusJobs = new Dictionary<uint, SortedSet<string>>();
void AddStatusJobs(uint sid, IEnumerable<string> js)
{
    if (!statusJobs.TryGetValue(sid, out var set)) statusJobs[sid] = set = new(StringComparer.Ordinal);
    set.UnionWith(js);
}
foreach (var a in actions)
{
    if (a.StatusGainSelf is { } g) AddStatusJobs(g, a.Jobs);
    if (a.SecondaryCost is { Type: var t, Value: var v } && statusCostTypes.Contains(t) && statusIds.Contains(v)) AddStatusJobs(v, a.Jobs);
}
var actionsByJaName = actions.GroupBy(a => a.Name.Ja).ToDictionary(g => g.Key, g => g.SelectMany(a => a.Jobs).Distinct().ToList());
foreach (var s in stEn)
{
    if (s.RowId == 0 || s.Name.IsEmpty) continue;
    var cat = s.ClassJobCategory.RowId != 0 ? JobsOfCategory(s.ClassJobCategory.RowId) : [];
    if (cat.Count > 0 && cat.Count < combatJobs.Count) AddStatusJobs(s.RowId, cat);
    if (actionsByJaName.TryGetValue(stJa.GetRow(s.RowId).Name.ExtractText(), out var aj)) AddStatusJobs(s.RowId, aj);
}

var sctx = new DescriptionEvaluator.Context(0, (uint)maxLevel);
string StatusIconPath(uint icon) => $"/icons/statuses/{icon:D6}.png";
List<uint> StackIcons(Status s) =>
    s.Icon != 0 && s.MaxStacks > 1 ? Enumerable.Range(2, s.MaxStacks - 1).Select(n => s.Icon + (uint)n - 1).ToList() : [];
StatusOut MakeStatus(Status s)
{
    var sj = stJa.GetRow(s.RowId);
    var stacks = StackIcons(s);
    return new StatusOut
    {
        Id = s.RowId,
        Name = new(sj.Name.ExtractText(), s.Name.ExtractText()),
        Description = new(DescriptionEvaluator.Evaluate(sj.Description, sctx, descStats), DescriptionEvaluator.Evaluate(s.Description, sctx, descStats)),
        Icon = s.Icon,
        IconPath = s.Icon != 0 ? StatusIconPath(s.Icon) : null,
        MaxStacks = s.MaxStacks,
        StackIconPaths = stacks.Count > 0 ? stacks.Select(StatusIconPath).ToList() : null,
        Category = s.StatusCategory,
        IsPermanent = s.IsPermanent,
        CanDispel = s.CanDispel,
        CanStatusOff = s.CanStatusOff,
        IsFcBuff = s.IsFcBuff,
        InflictedByActor = s.InflictedByActor,
        PartyListPriority = s.PartyListPriority,
        LockMovement = s.LockMovement,
        LockActions = s.LockActions,
        LockControl = s.LockControl,
        Transfiguration = s.Transfiguration,
        IsGaze = s.IsGaze,
        Invisibility = s.Invisibility,
        Jobs = statusJobs.TryGetValue(s.RowId, out var js) ? js.ToList() : null,
        ClassJobCategory = s.ClassJobCategory.RowId,
        UsedByActions = statusIds.Contains(s.RowId),
    };
}
var statuses = statusJobs.Keys.Order().Select(sid => stEn.GetRow(sid)).Where(s => !s.Name.IsEmpty).Select(MakeStatus).ToList();
var allStatuses = stEn.Where(s => s.RowId != 0 && (!s.Name.IsEmpty || s.Icon != 0)).Select(MakeStatus).ToList();

// ---- ジョブ ----
var actionsByJob = combatJobs.ToDictionary(c => abbrById[c.RowId], _ => new List<uint>());
foreach (var a in actions)
    foreach (var j in a.Jobs) actionsByJob[j].Add(a.Id);
var jobs = new List<JobOut>();
foreach (var c in combatJobs.OrderBy(c => c.UIPriority).ThenBy(c => c.RowId))
{
    var ab = abbrById[c.RowId];
    var cj2 = cjJa.GetRow(c.RowId);
    jobs.Add(new JobOut
    {
        Id = c.RowId,
        Abbreviation = new(cj2.Abbreviation.ExtractText(), ab),
        Name = new(cj2.Name.ExtractText(), c.NameEnglish.ExtractText()),
        IsJob = c.JobIndex > 0,
        ParentId = c.ClassJobParent.RowId != c.RowId ? c.ClassJobParent.RowId : null,
        JobIndex = c.JobIndex,
        Role = c.Role,
        RoleName = RoleName(c),
        PrimaryStat = c.PrimaryStat,
        IsLimitedJob = c.IsLimitedJob,
        UIPriority = c.UIPriority,
        Icon = 62100 + c.RowId,
        IconPath = $"/icons/jobs/{ab}.png",
        LimitBreaks = new[] { c.LimitBreak1.RowId, c.LimitBreak2.RowId, c.LimitBreak3.RowId }.Where(x => x != 0).ToList(),
        ActionIds = actionsByJob[ab],
        StatusIds = statuses.Where(s => s.Jobs?.Contains(ab) == true).Select(s => s.Id).ToList(),
    });
}

static string RoleName(ClassJob c) => c.Role switch
{
    1 => "tank",
    2 => "melee",
    3 => c.PrimaryStat == 4 ? "caster" : "ranged", // PrimaryStat 4 = INT
    4 => "healer",
    _ => "other",
};

// ---- 書き出し ----
var dataDir = Path.Combine(opt.OutRoot, "src", "data", "ffxiv");
Directory.CreateDirectory(dataDir);
var json = new JsonSerializerOptions
{
    WriteIndented = true,
    Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
};
void WriteJson(string name, object o)
{
    var p = Path.Combine(dataDir, name);
    File.WriteAllText(p, JsonSerializer.Serialize(o, json).Replace("\r\n", "\n") + "\n");
    Console.WriteLine($"wrote  : {Path.GetRelativePath(opt.OutRoot, p)}");
}
WriteJson("jobs.json", jobs);
WriteJson("actions.json", actions);
WriteJson("statuses.json", statuses);
WriteJson("statuses-all.json", allStatuses);

var iconStats = new IconExporter.Result();
JobGaugeExporter.Result? gaugeResult = null;
if (opt.Icons)
{
    var icons = new IconExporter(gd);
    var pub = Path.Combine(opt.OutRoot, "public", "icons");
    iconStats.Add(icons.ExportAll(Path.Combine(pub, "actions"), actions.Where(a => a.Icon != 0).Select(a => (uint)a.Icon).Distinct().Select(i => (i, $"{i:D6}"))));
    var statusIcons = stEn.Where(s => s.RowId != 0 && s.Icon != 0).SelectMany(s => StackIcons(s).Prepend(s.Icon)).Distinct().Order();
    iconStats.Add(icons.ExportAll(Path.Combine(pub, "statuses"), statusIcons.Select(i => (i, $"{i:D6}"))));
    iconStats.Add(icons.ExportAll(Path.Combine(pub, "jobs"), jobs.Select(j => (j.Icon, j.Abbreviation.En))));
    Console.WriteLine($"icons  : {iconStats.Written} 枚（HD {iconStats.Hd} / 通常 {iconStats.Written - iconStats.Hd}）、見つからない {iconStats.Missing.Count}");
    foreach (var m in iconStats.Missing) Console.WriteLine($"  missing icon: {m}");

    var gauges = new JobGaugeExporter(gd);
    gaugeResult = gauges.ExportAll(Path.Combine(pub, "job-gauges"), jobs.Where(j => j.IsJob).Select(j => j.Abbreviation.En));
    Console.WriteLine($"gauges : {gaugeResult.Jobs.Count} ジョブ・ULD {gaugeResult.Layouts.Count}・画像 {gaugeResult.Textures.Count} 枚、" +
        $"ゲージ無し {string.Join(",", gaugeResult.NoGauge)}、対応表に無い ULD {string.Join(",", gaugeResult.Unassigned)}");
    foreach (var m in gaugeResult.MissingTextures) Console.WriteLine($"  missing texture: {m}");
    foreach (var (k, l) in gaugeResult.Layouts.Where(l => l.Value.ParseError != null)) Console.WriteLine($"  ULD を読めず .tex だけ拾った: {k}（{l.ParseError}）");
    WriteJson("job-gauges.json", new
    {
        gaugeResult.Jobs,
        gaugeResult.NoGauge,
        gaugeResult.Unassigned,
        gaugeResult.Layouts,
        gaugeResult.Textures,
    });
}

var meta = new
{
    Source = "FINAL FANTASY XIV client (local sqpack, read-only)",
    GameVersion = Options.ReadGameVersions(sqpack),
    ExtractedAt = DateTimeOffset.Now.ToString("yyyy-MM-ddTHH:mm:sszzz"),
    Tool = new
    {
        Lumina = typeof(GameData).Assembly.GetName().Version?.ToString(),
        LuminaExcel = typeof(Action).Assembly.GetName().Version?.ToString(),
    },
    DescriptionLevel = maxLevel,
    Counts = new { Jobs = jobs.Count, Actions = actions.Count, Statuses = statuses.Count, StatusesAll = allStatuses.Count, Icons = iconStats.Written, JobGauges = gaugeResult?.Jobs.Count ?? 0, JobGaugeTextures = gaugeResult?.Textures.Count ?? 0 },
    UnknownDescriptionMacros = descStats.UnknownMacros.OrderBy(k => k.Key).ToDictionary(k => k.Key, k => k.Value),
    UnknownDescriptionParams = descStats.UnknownParams.OrderBy(k => k.Key).ToDictionary(k => k.Key.ToString(), k => k.Value),
};
WriteJson("meta.json", meta);
Console.WriteLine($"done   : jobs {jobs.Count} / actions {actions.Count} / statuses {statuses.Count}");
if (descStats.UnknownMacros.Count > 0) Console.WriteLine("未対応のマクロ（説明文から省いた）: " + string.Join(", ", descStats.UnknownMacros.Select(k => $"{k.Key}×{k.Value}")));
if (descStats.UnknownParams.Count > 0) Console.WriteLine("未対応の gnum（0 として評価）: " + string.Join(", ", descStats.UnknownParams.Select(k => $"{k.Key}×{k.Value}")));
