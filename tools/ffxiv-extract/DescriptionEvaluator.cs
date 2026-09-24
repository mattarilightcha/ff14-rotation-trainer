using System.Text;
using Lumina.Text.Payloads;
using Lumina.Text.ReadOnly;
using ExprType = Lumina.Text.Expressions.ExpressionType;

namespace FfxivExtract;

/// <summary>
/// アクション・ステータスの説明文（SeString）をプレーンテキストにする。
/// 説明文には「ジョブが PLD で、レベル 94 以上なら威力 580」のような条件式（&lt;if&gt;）が入っているので、
/// 指定したジョブ・レベルで評価して 1 本の文にする。色指定などの装飾は捨てる。
/// </summary>
public static class DescriptionEvaluator
{
    /// <summary>gnum68 = プレイヤーのクラス・ジョブ、gnum72 = プレイヤーのレベル。</summary>
    public record Context(uint ClassJob, uint Level);

    public class Stats
    {
        public Dictionary<string, int> UnknownMacros { get; } = new();
        public Dictionary<uint, int> UnknownParams { get; } = new();
    }

    public static string Evaluate(ReadOnlySeString s, Context ctx, Stats stats)
    {
        var sb = new StringBuilder();
        Append(s, sb, ctx, stats);
        return sb.ToString().Trim();
    }

    static void Append(ReadOnlySeString s, StringBuilder sb, Context ctx, Stats stats)
    {
        foreach (var p in s)
        {
            if (p.Type == ReadOnlySePayloadType.Text)
            {
                sb.Append(Encoding.UTF8.GetString(p.Body.Span));
                continue;
            }
            switch (p.MacroCode)
            {
                case MacroCode.NewLine: sb.Append('\n'); break;
                case MacroCode.NonBreakingSpace: sb.Append(' '); break;
                case MacroCode.Hyphen: sb.Append('-'); break;
                case MacroCode.SoftHyphen: break;
                case MacroCode.If:
                {
                    var ex = p.ToList();
                    if (ex.Count == 0) break;
                    var branch = Num(ex[0], ctx, stats) != 0 ? 1 : 2;
                    if (branch < ex.Count) AppendExpr(ex[branch], sb, ctx, stats);
                    break;
                }
                case MacroCode.Switch:
                {
                    // Switch(値, 1 のとき, 2 のとき, ...)
                    var ex = p.ToList();
                    if (ex.Count == 0) break;
                    var v = (int)Num(ex[0], ctx, stats);
                    if (v >= 1 && v < ex.Count) AppendExpr(ex[v], sb, ctx, stats);
                    break;
                }
                case MacroCode.Num or MacroCode.Kilo or MacroCode.Digit:
                {
                    var ex = p.ToList();
                    if (ex.Count > 0) sb.Append(Num(ex[0], ctx, stats));
                    break;
                }
                case MacroCode.Color or MacroCode.EdgeColor or MacroCode.ShadowColor or MacroCode.ColorType
                    or MacroCode.EdgeColorType or MacroCode.Bold or MacroCode.Italic or MacroCode.Edge
                    or MacroCode.Shadow or MacroCode.Scale or MacroCode.Icon or MacroCode.Icon2 or MacroCode.Wait:
                    break;
                default:
                {
                    var k = p.MacroCode.ToString();
                    stats.UnknownMacros[k] = stats.UnknownMacros.GetValueOrDefault(k) + 1;
                    break;
                }
            }
        }
    }

    static void AppendExpr(ReadOnlySeExpression e, StringBuilder sb, Context ctx, Stats stats)
    {
        if (e.TryGetString(out var str)) Append(str, sb, ctx, stats);
        else sb.Append(Num(e, ctx, stats));
    }

    static long Num(ReadOnlySeExpression e, Context ctx, Stats stats)
    {
        if (e.TryGetUInt(out var u)) return u;
        if (e.TryGetInt(out var i)) return i;
        if (e.TryGetParameterExpression(out var type, out var operand))
        {
            var idx = (uint)Num(operand, ctx, stats);
            if ((ExprType)type == ExprType.GlobalNumber)
            {
                switch (idx)
                {
                    case 68: return ctx.ClassJob;
                    case 72: return ctx.Level;
                }
            }
            var key = (uint)type << 16 | idx;
            stats.UnknownParams[key] = stats.UnknownParams.GetValueOrDefault(key) + 1;
            return 0;
        }
        if (e.TryGetBinaryExpression(out var op, out var l, out var r))
        {
            var a = Num(l, ctx, stats);
            var b = Num(r, ctx, stats);
            return (ExprType)op switch
            {
                ExprType.GreaterThanOrEqualTo => a >= b ? 1 : 0,
                ExprType.GreaterThan => a > b ? 1 : 0,
                ExprType.LessThanOrEqualTo => a <= b ? 1 : 0,
                ExprType.LessThan => a < b ? 1 : 0,
                ExprType.Equal => a == b ? 1 : 0,
                ExprType.NotEqual => a != b ? 1 : 0,
                _ => 0,
            };
        }
        if (e.TryGetString(out var s))
        {
            var t = Evaluate(s, ctx, stats);
            return long.TryParse(t, out var n) ? n : 0;
        }
        return 0;
    }
}
