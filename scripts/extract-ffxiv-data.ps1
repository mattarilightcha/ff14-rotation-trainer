# FF14 クライアントからデータとアイコンを抜き出し、点検まで行う。
#   pwsh scripts/extract-ffxiv-data.ps1                 # 既定のインストール先
#   pwsh scripts/extract-ffxiv-data.ps1 -Game "D:\SquareEnix\FINAL FANTASY XIV - A Realm Reborn"
param(
    [string]$Game = $env:FFXIV_GAME_PATH,
    [int]$Level = 0,
    [switch]$NoIcons
)
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$argsList = @('--out', $root)
if ($Game) { $argsList += @('--game', $Game) }
if ($Level -gt 0) { $argsList += @('--level', $Level) }
if ($NoIcons) { $argsList += '--no-icons' }
dotnet run --project (Join-Path $root 'tools/ffxiv-extract') -c Release -- @argsList
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
node (Join-Path $root 'tools/ffxiv-extract/verify.mjs')
exit $LASTEXITCODE
