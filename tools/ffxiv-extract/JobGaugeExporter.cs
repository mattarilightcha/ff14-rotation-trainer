using System.Text.RegularExpressions;
using Lumina;
using Lumina.Data.Files;
using Lumina.Data.Parsing.Uld;

namespace FfxivExtract;

/// <summary>
/// ジョブゲージの UI（ui/uld/JobHud&lt;コード&gt;&lt;番号&gt;.uld と、そこから参照される .tex）を書き出す。
/// ULD のファイル名はジョブ略称と違うものがある（賢者 GFF・リーパー RRP・ヴァイパー RDB・ピクトマンサー RPM・獣使い XBM）。
/// 対応表は JobCodes。表に無い JobHud*.uld は総当たりで見つけて Unassigned に入れる（新ジョブが来たら表に足す）。
/// </summary>
public partial class JobGaugeExporter(GameData gd)
{
    /// <summary>ジョブ略称 → ULD のコード。青魔道士はゲーム内にジョブゲージが無い。</summary>
    public static readonly Dictionary<string, string> JobCodes = new()
    {
        ["PLD"] = "PLD", ["WAR"] = "WAR", ["DRK"] = "DRK", ["GNB"] = "GNB",
        ["WHM"] = "WHM", ["SCH"] = "SCH", ["AST"] = "AST", ["SGE"] = "GFF",
        ["MNK"] = "MNK", ["DRG"] = "DRG", ["NIN"] = "NIN", ["SAM"] = "SAM", ["RPR"] = "RRP", ["VPR"] = "RDB",
        ["BRD"] = "BRD", ["MCH"] = "MCH", ["DNC"] = "DNC",
        ["BLM"] = "BLM", ["SMN"] = "SMN", ["RDM"] = "RDM", ["PCT"] = "RPM",
        ["BST"] = "XBM",
        ["ACN"] = "ACN",
    };

    public record TextureOut(string Path, string Source, int Width, int Height, int Scale);
    public record AssetOut(uint Id, string? Texture, uint IconId);
    public record PartOut(uint Asset, string? Texture, int U, int V, int W, int H);
    public record PartListOut(uint Id, List<PartOut> Parts);
    public record NodeOut(
        uint Id, int Parent, int Type, int X, int Y, int W, int H, bool Visible, byte Alpha,
        float ScaleX, float ScaleY, float Rotation, int OriginX, int OriginY,
        int[]? Multiply, int[]? Add, uint? PartListId, uint? PartId, bool? FlipH, bool? FlipV, int[]? NineGrid);
    public record ComponentOut(uint Id, int Type, List<NodeOut> Nodes);
    public record LayoutOut(string Uld, string Version, List<AssetOut> Assets, List<PartListOut> PartLists,
        List<ComponentOut> Components, List<NodeOut> Nodes, string? ParseError);

    public class Result
    {
        public SortedDictionary<string, TextureOut> Textures { get; } = new();
        public SortedDictionary<string, LayoutOut> Layouts { get; } = new();
        public SortedDictionary<string, List<string>> Jobs { get; } = new();
        public List<string> NoGauge { get; } = new();
        public List<string> Unassigned { get; } = new();
        public List<string> MissingTextures { get; } = new();
    }

    [GeneratedRegex(@"^JobHud([A-Z]{3})(\d)$")]
    private static partial Regex LayoutName();

    public Result ExportAll(string dir, IEnumerable<string> jobAbbrs)
    {
        var r = new Result();
        if (Directory.Exists(dir)) Directory.Delete(dir, true);
        var texDir = Path.Combine(dir, "textures");
        Directory.CreateDirectory(texDir);

        var found = Discover();
        var assigned = new HashSet<string>();
        foreach (var abbr in jobAbbrs.Concat(["ACN"]).Distinct())
        {
            if (!JobCodes.TryGetValue(abbr, out var code)) { if (abbr != "ACN") r.NoGauge.Add(abbr); continue; }
            var names = found.Where(n => LayoutName().Match(n) is { Success: true } m && m.Groups[1].Value == code).ToList();
            if (names.Count == 0) { r.NoGauge.Add(abbr); continue; }
            r.Jobs[abbr] = names;
            assigned.UnionWith(names);
        }
        r.Unassigned.AddRange(found.Where(n => !assigned.Contains(n)));

        foreach (var name in found) r.Layouts[name] = ReadLayout(name, texDir, r);

        // 参照先の画像がゲームから消えている ULD（古い版の残骸。例: JobHudDRG1 → JobHudDRG.tex）はジョブから外す
        foreach (var (abbr, names) in r.Jobs)
        {
            var dead = names.Where(n => r.Layouts[n].Assets.Any(a => a.Texture == null)).ToList();
            names.RemoveAll(dead.Contains);
            r.Unassigned.AddRange(dead);
        }
        r.Unassigned.Sort(StringComparer.Ordinal);
        return r;
    }

    /// <summary>ui/uld/JobHud&lt;英大文字3&gt;&lt;0-3&gt;.uld を総当たりで探す（sqpack はファイル一覧を持たないため）。</summary>
    List<string> Discover()
    {
        var list = new List<string>();
        const string L = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        foreach (var a in L) foreach (var b in L) foreach (var c in L)
            for (var i = 0; i < 4; i++)
            {
                var name = $"JobHud{a}{b}{c}{i}";
                if (gd.FileExists($"ui/uld/{name}.uld")) list.Add(name);
            }
        return list;
    }

    LayoutOut ReadLayout(string name, string texDir, Result r)
    {
        var path = $"ui/uld/{name}.uld";
        var assets = new List<AssetOut>();
        var partLists = new List<PartListOut>();
        var components = new List<ComponentOut>();
        var nodes = new List<NodeOut>();
        string version = "", error = null!;
        var texByAsset = new Dictionary<uint, string?>();
        try
        {
            var uld = gd.GetFile<UldFile>(path)!;
            version = new string(uld.AssetList.Version).TrimEnd('\0');
            foreach (var a in uld.AssetData)
            {
                var src = new string(a.Path).TrimEnd('\0');
                var key = src.Length > 0 ? ExportTexture(src, texDir, r) : null;
                texByAsset[a.Id] = key;
                assets.Add(new AssetOut(a.Id, key, a.IconId));
            }
            foreach (var pl in uld.Parts)
                partLists.Add(new PartListOut(pl.Id, pl.Parts.Select(p =>
                    new PartOut(p.TextureId, texByAsset.GetValueOrDefault(p.TextureId), p.U, p.V, p.W, p.H)).ToList()));
            foreach (var c in uld.Components)
                components.Add(new ComponentOut(c.Id, (int)c.Type, (c.Nodes ?? []).Select(ToNode).ToList()));
            nodes.AddRange((uld.WidgetData.Nodes ?? []).Select(ToNode));
        }
        catch (Exception e)
        {
            // 古い版（0100）など Lumina が読めない ULD は、中の .tex のパスだけ拾う
            error = e.GetType().Name + ": " + e.Message;
            var raw = gd.GetFile(path)!.Data;
            var s = System.Text.Encoding.ASCII.GetString(raw);
            uint id = 1;
            foreach (var src in TexPath().Matches(s).Select(m => m.Value).Distinct())
                assets.Add(new AssetOut(id++, ExportTexture(src, texDir, r), 0));
        }
        return new LayoutOut(path, version, assets, partLists, components, nodes, error);
    }

    [GeneratedRegex(@"ui/[A-Za-z0-9_/]+\.tex")]
    private static partial Regex TexPath();

    static NodeOut ToNode(UldRoot.NodeData n)
    {
        uint? pl = null, pid = null; bool? fh = null, fv = null; int[]? grid = null;
        switch (n.Node)
        {
            case NodeData.ImageNode img: pl = img.PartListId; pid = img.PartId; fh = img.FlipH; fv = img.FlipV; break;
            case NodeData.NineGridNode ng:
                pl = ng.PartListId; pid = ng.PartId;
                grid = [ng.TopOffset, ng.BottomOffset, ng.LeftOffset, ng.RightOffset];
                break;
        }
        int[]? mul = n.MultiplyRed == 100 && n.MultiplyGreen == 100 && n.MultiplyBlue == 100 ? null : [n.MultiplyRed, n.MultiplyGreen, n.MultiplyBlue];
        int[]? add = n.AddRed == 0 && n.AddGreen == 0 && n.AddBlue == 0 ? null : [n.AddRed, n.AddGreen, n.AddBlue];
        return new NodeOut(n.NodeId, n.ParentId, n.NodeType, n.X, n.Y, n.W, n.H, n.Visible, n.Alpha,
            n.ScaleX, n.ScaleY, n.Rotation, n.OriginX, n.OriginY, mul, add, pl, pid, fh, fv, grid);
    }

    /// <summary>.tex を PNG にして、キー（拡張子なしのファイル名）を返す。HD（_hr1）があればそちらで、Scale=2。</summary>
    string? ExportTexture(string src, string texDir, Result r)
    {
        var key = Path.GetFileNameWithoutExtension(src);
        if (r.Textures.ContainsKey(key)) return key;
        var hdPath = src[..^4] + "_hr1.tex";
        var tex = gd.GetFile<TexFile>(hdPath);
        var scale = 2;
        if (tex == null) { tex = gd.GetFile<TexFile>(src); scale = 1; }
        if (tex == null) { r.MissingTextures.Add(src); return null; }
        File.WriteAllBytes(Path.Combine(texDir, key + ".png"), Png.Encode(tex.Header.Width, tex.Header.Height, tex.ImageData));
        r.Textures[key] = new TextureOut($"/icons/job-gauges/textures/{key}.png", src, tex.Header.Width, tex.Header.Height, scale);
        return key;
    }
}
