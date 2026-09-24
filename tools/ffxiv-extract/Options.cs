namespace FfxivExtract;

public class Options
{
    public const string DefaultInstall = @"C:\Program Files (x86)\SquareEnix\FINAL FANTASY XIV - A Realm Reborn";

    public string? GamePath { get; private set; }
    public string OutRoot { get; private set; } = "";
    public int? Level { get; private set; }
    public bool Icons { get; private set; } = true;

    public static Options Parse(string[] args)
    {
        var o = new Options();
        for (var i = 0; i < args.Length; i++)
        {
            string Next() => i + 1 < args.Length ? args[++i] : throw new ArgumentException($"{args[i]} の値がありません");
            switch (args[i])
            {
                case "--game": o.GamePath = Next(); break;
                case "--out": o.OutRoot = Path.GetFullPath(Next()); break;
                case "--level": o.Level = int.Parse(Next()); break;
                case "--no-icons": o.Icons = false; break;
                case "-h" or "--help":
                    Console.WriteLine("usage: dotnet run --project tools/ffxiv-extract -c Release -- [--game <path>] [--out <repoRoot>] [--level <n>] [--no-icons]");
                    Environment.Exit(0);
                    break;
                default: throw new ArgumentException($"不明な引数: {args[i]}");
            }
        }
        o.GamePath ??= Environment.GetEnvironmentVariable("FFXIV_GAME_PATH");
        if (o.OutRoot == "") o.OutRoot = FindRepoRoot();
        return o;
    }

    /// <summary>インストール先・game・sqpack のどれを渡されても sqpack を返す。</summary>
    public static string ResolveSqpack(string? path)
    {
        path ??= DefaultInstall;
        foreach (var c in new[] { path, Path.Combine(path, "sqpack"), Path.Combine(path, "game", "sqpack") })
            if (Directory.Exists(Path.Combine(c, "ffxiv"))) return Path.GetFullPath(c);
        throw new DirectoryNotFoundException($"sqpack が見つかりません: {path}（--game か環境変数 FFXIV_GAME_PATH で指定）");
    }

    public static Dictionary<string, string> ReadGameVersions(string sqpack)
    {
        var d = new Dictionary<string, string>();
        var game = Path.GetDirectoryName(sqpack)!;
        var main = Path.Combine(game, "ffxivgame.ver");
        if (File.Exists(main)) d["ffxiv"] = File.ReadAllText(main).Trim();
        foreach (var ex in Directory.GetDirectories(sqpack, "ex*").OrderBy(x => x))
        {
            var name = Path.GetFileName(ex);
            var ver = Path.Combine(ex, name + ".ver");
            if (File.Exists(ver)) d[name] = File.ReadAllText(ver).Trim();
        }
        return d;
    }

    static string FindRepoRoot()
    {
        for (var d = new DirectoryInfo(Directory.GetCurrentDirectory()); d != null; d = d.Parent)
            if (Directory.Exists(Path.Combine(d.FullName, ".git")) || File.Exists(Path.Combine(d.FullName, ".git")))
                return d.FullName;
        throw new InvalidOperationException("リポジトリのルートが見つかりません。--out で指定してください");
    }
}
