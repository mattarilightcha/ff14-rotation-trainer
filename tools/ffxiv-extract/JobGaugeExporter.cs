using Lumina;
using Lumina.Data.Files;

namespace FfxivExtract;

/// <summary>
/// ui/uld/JobHud&lt;ABBR&gt;*.tex（ジョブゲージの UI 画像）を PNG にする。
/// ページ構成がジョブごとに違う（1枚だけ／0,1,2... と複数枚）ため、両方の命名を試す。
/// 新しめのジョブ（2026-09 時点で SGE・RPR・VPR・PCT・BLU・BST）は、この単純な命名では見つからない
/// （共有パーツを組み立てる別方式になっている可能性がある）。見つからなかった略称は Missing に入れて返す。
/// </summary>
public class JobGaugeExporter(GameData gd)
{
    public record PageOut(int Index, int Width, int Height, string IconPath);

    public class Result
    {
        public Dictionary<string, List<PageOut>> ByJob { get; } = new();
        public List<string> Missing { get; } = new();
    }

    public Result ExportAll(string dir, IEnumerable<string> jobAbbrs)
    {
        var r = new Result();
        if (Directory.Exists(dir)) Directory.Delete(dir, true);
        Directory.CreateDirectory(dir);
        foreach (var abbr in jobAbbrs)
        {
            var pages = new List<PageOut>();
            var single = TryExport(dir, abbr, "", 0);
            if (single != null)
            {
                pages.Add(single);
            }
            else
            {
                for (var i = 0; i < 4; i++)
                {
                    var p = TryExport(dir, abbr, i.ToString(), i);
                    if (p == null) break;
                    pages.Add(p);
                }
            }
            if (pages.Count == 0) r.Missing.Add(abbr);
            else r.ByJob[abbr] = pages;
        }
        return r;
    }

    PageOut? TryExport(string dir, string abbr, string suffix, int index)
    {
        var tex = gd.GetFile<TexFile>($"ui/uld/JobHud{abbr}{suffix}_hr1.tex");
        tex ??= gd.GetFile<TexFile>($"ui/uld/JobHud{abbr}{suffix}.tex");
        if (tex == null) return null;
        var jobDir = Path.Combine(dir, abbr);
        Directory.CreateDirectory(jobDir);
        var name = $"{index}.png";
        File.WriteAllBytes(Path.Combine(jobDir, name), Png.Encode(tex.Header.Width, tex.Header.Height, tex.ImageData));
        return new PageOut(index, tex.Header.Width, tex.Header.Height, $"/icons/job-gauges/{abbr}/{name}");
    }
}
