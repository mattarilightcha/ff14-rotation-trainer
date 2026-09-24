using System.IO.Compression;
using Lumina;
using Lumina.Data.Files;

namespace FfxivExtract;

/// <summary>ui/icon の .tex を PNG にする。HD 版（_hr1, 通常 80x80）があればそちらを使う。</summary>
public class IconExporter(GameData gd)
{
    public class Result
    {
        public int Written { get; set; }
        public int Hd { get; set; }
        public List<string> Missing { get; } = new();
        public void Add(Result r) { Written += r.Written; Hd += r.Hd; Missing.AddRange(r.Missing); }
    }

    public static string TexPath(uint icon, bool hd) =>
        $"ui/icon/{icon / 1000 * 1000:D6}/{icon:D6}{(hd ? "_hr1" : "")}.tex";

    /// <summary>出力先のフォルダを作り直して書き出す（ゲーム側で消えたアイコンを残さない）。</summary>
    public Result ExportAll(string dir, IEnumerable<(uint icon, string name)> items)
    {
        var r = new Result();
        if (Directory.Exists(dir))
            foreach (var f in Directory.GetFiles(dir, "*.png")) File.Delete(f);
        Directory.CreateDirectory(dir);
        foreach (var (icon, name) in items)
        {
            var tex = gd.GetFile<TexFile>(TexPath(icon, true));
            var hd = tex != null;
            tex ??= gd.GetFile<TexFile>(TexPath(icon, false));
            if (tex == null) { r.Missing.Add($"{name} ({icon})"); continue; }
            File.WriteAllBytes(Path.Combine(dir, name + ".png"), Png.Encode(tex.Header.Width, tex.Header.Height, tex.ImageData));
            r.Written++;
            if (hd) r.Hd++;
        }
        return r;
    }
}

/// <summary>最小限の PNG エンコーダ（RGBA8）。入力は Lumina の TexFile.ImageData（B8G8R8A8）。</summary>
public static class Png
{
    static readonly uint[] CrcTable = Enumerable.Range(0, 256).Select(n =>
    {
        var c = (uint)n;
        for (var k = 0; k < 8; k++) c = (c & 1) != 0 ? 0xEDB88320u ^ (c >> 1) : c >> 1;
        return c;
    }).ToArray();

    public static byte[] Encode(int w, int h, byte[] bgra)
    {
        // 行ごとに filter 1（Sub）をかける。アイコンは平坦な面が多いので無圧縮より小さくなる
        var stride = w * 4;
        var raw = new byte[(stride + 1) * h];
        for (var y = 0; y < h; y++)
        {
            var o = y * (stride + 1);
            raw[o] = 1;
            for (var x = 0; x < w; x++)
            {
                var s = y * stride + x * 4;
                var d = o + 1 + x * 4;
                byte r = bgra[s + 2], g = bgra[s + 1], b = bgra[s], a = bgra[s + 3];
                if (x > 0)
                {
                    var p = s - 4;
                    r -= bgra[p + 2]; g -= bgra[p + 1]; b -= bgra[p]; a -= bgra[p + 3];
                }
                raw[d] = r; raw[d + 1] = g; raw[d + 2] = b; raw[d + 3] = a;
            }
        }
        using var ms = new MemoryStream();
        ms.Write([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
        var ihdr = new byte[13];
        WriteBE(ihdr, 0, (uint)w);
        WriteBE(ihdr, 4, (uint)h);
        ihdr[8] = 8; // bit depth
        ihdr[9] = 6; // RGBA
        Chunk(ms, "IHDR", ihdr);
        using (var z = new MemoryStream())
        {
            using (var zs = new ZLibStream(z, CompressionLevel.SmallestSize, true)) zs.Write(raw);
            Chunk(ms, "IDAT", z.ToArray());
        }
        Chunk(ms, "IEND", []);
        return ms.ToArray();
    }

    static void Chunk(Stream s, string type, byte[] data)
    {
        var len = new byte[4];
        WriteBE(len, 0, (uint)data.Length);
        s.Write(len);
        var t = System.Text.Encoding.ASCII.GetBytes(type);
        s.Write(t);
        s.Write(data);
        var crc = 0xFFFFFFFFu;
        foreach (var b in t.Concat(data)) crc = CrcTable[(crc ^ b) & 0xFF] ^ (crc >> 8);
        var c = new byte[4];
        WriteBE(c, 0, crc ^ 0xFFFFFFFFu);
        s.Write(c);
    }

    static void WriteBE(byte[] b, int o, uint v)
    {
        b[o] = (byte)(v >> 24); b[o + 1] = (byte)(v >> 16); b[o + 2] = (byte)(v >> 8); b[o + 3] = (byte)v;
    }
}
