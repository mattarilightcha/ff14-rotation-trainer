namespace FfxivExtract;

public record Loc(string Ja, string En);
public record CostOut(byte Type, uint Value);
public record LimitBreakOut(string Job, int Tier);

public class ActionOut
{
    public uint Id { get; init; }
    public required Loc Name { get; init; }
    /// <summary>説明文。条件式（ジョブ・レベル）を meta.descriptionLevel で評価した結果。</summary>
    public required Loc Description { get; init; }
    public ushort Icon { get; init; }
    public string? IconPath { get; init; }
    /// <summary>Action.ClassJob。ロールアクションなど指定なしは null。</summary>
    public uint? ClassJobId { get; init; }
    public string? ClassJob { get; init; }
    /// <summary>ClassJobCategory から求めた、使える戦闘クラス・ジョブの略称。</summary>
    public required List<string> Jobs { get; init; }
    public byte Level { get; init; }
    /// <summary>ActionCategory: 2 魔法 / 3 ウェポンスキル / 4 アビリティ / 9 リミットブレイク など。</summary>
    public uint Category { get; init; }
    public required Loc CategoryName { get; init; }
    /// <summary>CooldownGroup か AdditionalCooldownGroup が 58（GCD 共通リキャスト）。</summary>
    public bool IsGcd { get; init; }
    public bool IsRoleAction { get; init; }
    public bool IsPlayerAction { get; init; }
    /// <summary>ゲーム内のジョブのアクション一覧（ClassJobActionUI）に載っている。</summary>
    public bool InActionList { get; init; }
    public LimitBreakOut? LimitBreak { get; init; }
    /// <summary>詠唱時間（秒）。</summary>
    public double Cast { get; init; }
    public double ExtraCastTime { get; init; }
    /// <summary>リキャスト（秒）。GCD はスキル・スペルスピード補正前の基本値。</summary>
    public double Recast { get; init; }
    public byte CooldownGroup { get; init; }
    public byte AdditionalCooldownGroup { get; init; }
    public byte MaxCharges { get; init; }
    /// <summary>このアクションのコンボ元（Action.ActionCombo）。</summary>
    public uint? ComboFrom { get; init; }
    /// <summary>このアクションをコンボ元に持つアクション（逆引き）。</summary>
    public List<uint>? ComboNext { get; init; }
    public bool PreservesCombo { get; init; }
    public int? ComboTreeLayout { get; init; }
    /// <summary>ジョブのアクション一覧で、レベルが上がると置き換わる元のアクション。</summary>
    public uint? UpgradesFrom { get; init; }
    /// <summary>条件を満たすとボタンがこのアクションに変わる元のアクション（ActionIndirection）。</summary>
    public List<uint>? ReplacesAction { get; init; }
    public CostOut? PrimaryCost { get; init; }
    public CostOut? SecondaryCost { get; init; }
    public uint? StatusGainSelf { get; init; }
    public uint? ActionProcStatus { get; init; }
    public sbyte Range { get; init; }
    public byte EffectRange { get; init; }
    public byte CastType { get; init; }
    public byte XAxisModifier { get; init; }
    public bool TargetArea { get; init; }
    public bool CanTargetSelf { get; init; }
    public bool CanTargetParty { get; init; }
    public bool CanTargetHostile { get; init; }
    public uint AttackType { get; init; }
    public byte Aspect { get; init; }
    public bool AffectsPosition { get; init; }
}

public class StatusOut
{
    public uint Id { get; init; }
    public required Loc Name { get; init; }
    public required Loc Description { get; init; }
    public uint Icon { get; init; }
    public string? IconPath { get; init; }
    public byte MaxStacks { get; init; }
    /// <summary>1 強化 / 2 弱体。</summary>
    public byte Category { get; init; }
    public bool IsPermanent { get; init; }
}

public class JobOut
{
    public uint Id { get; init; }
    public required Loc Abbreviation { get; init; }
    public required Loc Name { get; init; }
    public bool IsJob { get; init; }
    public uint? ParentId { get; init; }
    public byte JobIndex { get; init; }
    public byte Role { get; init; }
    public required string RoleName { get; init; }
    public byte PrimaryStat { get; init; }
    public bool IsLimitedJob { get; init; }
    public byte UIPriority { get; init; }
    public uint Icon { get; init; }
    public required string IconPath { get; init; }
    public required List<uint> LimitBreaks { get; init; }
    /// <summary>このクラス・ジョブで使えるアクション（actions.json の id）。</summary>
    public required List<uint> ActionIds { get; init; }
}
