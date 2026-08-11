param([Parameter(Mandatory=$true)][ValidateSet('start','stop','status')]$Action)

$scriptsDir = $PSScriptRoot
$root = Split-Path -Parent (Split-Path -Parent $scriptsDir)
$port = 8843
$serverScript = Join-Path $scriptsDir "http-server.ps1"

function Test-PreviewRunning {
  try {
    Invoke-WebRequest -Uri "http://localhost:$port/index.html" -UseBasicParsing -TimeoutSec 2 | Out-Null
    return $true
  } catch {
    return $false
  }
}

switch ($Action) {
  'start' {
    if (Test-PreviewRunning) {
      Write-Output "already running at http://localhost:$port/"
    } else {
      Start-Process -FilePath "powershell.exe" -ArgumentList "-NoProfile","-WindowStyle","Hidden","-File","`"$serverScript`"","-root","`"$root`"" -WindowStyle Hidden
      Start-Sleep -Seconds 1
      if (Test-PreviewRunning) {
        Write-Output "started at http://localhost:$port/"
      } else {
        Write-Output "failed to start"
      }
    }
  }
  'stop' {
    Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -like "*http-server.ps1*" } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }
    Start-Sleep -Milliseconds 400
    if (Test-PreviewRunning) {
      Write-Output "still running (stop may have failed)"
    } else {
      Write-Output "stopped"
    }
  }
  'status' {
    if (Test-PreviewRunning) { Write-Output "running at http://localhost:$port/" } else { Write-Output "stopped" }
  }
}
