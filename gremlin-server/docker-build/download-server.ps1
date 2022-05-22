$src="src"
Push-Location .
if (Test-Path $src) {
    Remove-Item -Force -Recurse $src
}
if (Test-Path $src.zip) {
    Remove-Item -Force "$src.zip"
}
curl https://dlcdn.apache.org/tinkerpop/3.6.0/apache-tinkerpop-gremlin-server-3.6.0-bin.zip --output "$src.zip"
Expand-Archive "$src.zip"
Set-Location "$src/apache-tinkerpop-gremlin-server*/bin"
Pop-Location
Write-Host "You can now run ./start.ps1 then use gdotv to load the air-routes-latest.graphml.xml"
