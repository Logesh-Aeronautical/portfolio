Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "    LOGESH AEROSPACE PORTFOLIO - GITHUB UPLOAD HELPER     " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Target Account : Logesh-Aeronautical" -ForegroundColor White
Write-Host "Target Remote  : https://Logesh-Aeronautical@github.com/Logesh-Aeronautical/portfolio.git" -ForegroundColor Gray
Write-Host ""
Write-Host "Option 1: Log in via GitHub CLI (Fastest)" -ForegroundColor Yellow
Write-Host "   Run: gh auth login --hostname github.com" -ForegroundColor Gray
Write-Host "   Then: gh repo create portfolio --public --source=. --remote=origin --push" -ForegroundColor Gray
Write-Host ""
Write-Host "Option 2: Browser Upload (1 minute)" -ForegroundColor Yellow
Write-Host "   1. Open: https://github.com/new" -ForegroundColor Gray
Write-Host "   2. Name: portfolio | Visibility: Public | Leave README unchecked" -ForegroundColor Gray
Write-Host "   3. Press Enter here to push!" -ForegroundColor Gray
Write-Host ""
$confirm = Read-Host "Ready to push? (Press Enter to push now or Ctrl+C to cancel)"
git push -u origin main
if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host " SUCCESS! Code pushed to Logesh-Aeronautical/portfolio" -ForegroundColor Green
    Write-Host " Live Site Setup: Settings > Pages > Source: GitHub Actions" -ForegroundColor Green
    Write-Host "==========================================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "Authentication required for Logesh-Aeronautical." -ForegroundColor Yellow
    Write-Host "If prompted, enter Logesh's GitHub Personal Access Token (PAT)." -ForegroundColor Yellow
}
Read-Host "Press Enter to exit..."
