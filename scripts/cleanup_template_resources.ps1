# Template Resources Cleanup Script
# This script performs SAFE cleanup of unnecessary files

$templatesPath = "c:\Users\ASUS\Desktop\aiLegalEcosystem\shared\templates\templates"

Write-Host "Starting safe cleanup of template resources..." -ForegroundColor Green

# Track what we're removing
$removedFiles = @()
$totalSize = 0

# 1. Remove 'https_/ folder (cached external CDN resources)
$httpsFolder = Join-Path $templatesPath "'https_"
if (Test-Path $httpsFolder) {
    $size = (Get-ChildItem $httpsFolder -Recurse | Measure-Object -Property Length -Sum).Sum
    Write-Host "Removing 'https_/ folder..." -ForegroundColor Yellow
    Remove-Item $httpsFolder -Recurse -Force
    $removedFiles += "'https_/ folder"
    $totalSize += $size
}

# 2. Remove OneTrust files (already disabled in HTML)
$resourcesPath = Join-Path $templatesPath "resources"
$onetrustFiles = @("onetrust.js", "otSDKStub.js")
foreach ($file in $onetrustFiles) {
    $filePath = Join-Path $resourcesPath $file
    if (Test-Path $filePath) {
        $size = (Get-Item $filePath).Length
        Write-Host "Removing $file..." -ForegroundColor Yellow
        Remove-Item $filePath -Force
        $removedFiles += $file
        $totalSize += $size
    }
}

# 3. Remove duplicate _website_.* files (keeping (website).* versions)
$duplicates = Get-ChildItem $resourcesPath -Filter "_website_.*"
foreach ($file in $duplicates) {
    $size = $file.Length
    Write-Host "Removing duplicate file: $($file.Name)..." -ForegroundColor Yellow
    Remove-Item $file.FullName -Force
    $removedFiles += $file.Name
    $totalSize += $size
}

# 4. Remove marketing images for services not offered
$marketingImages = @(
    "llc-overview-hero-lg.webp",
    "dba-overview-questions-lg.webp",
    "dba-overview-questions-sm.webp",
    "dba-overview-questions-xl.webp",
    "lap-questions-lg.webp",
    "lap-questions-md.webp",
    "lap-questions-sm.webp",
    "lap-questions-xl.webp",
    "trademark-questions-lg.webp",
    "trademark-questions-md.webp",
    "trademark-questions-sm.webp",
    "trademark-questions-xl.webp",
    "wix-partner-hero-md.webp",
    "wix-partner-hero.webp",
    "biz-marketplace-banner2-1024.webp",
    "biz-marketplace-banner2-1600.webp"
)

foreach ($image in $marketingImages) {
    $imagePath = Join-Path $resourcesPath $image
    if (Test-Path $imagePath) {
        $size = (Get-Item $imagePath).Length
        Write-Host "Removing marketing image: $image..." -ForegroundColor Yellow
        Remove-Item $imagePath -Force
        $removedFiles += $image
        $totalSize += $size
    }
}

# Summary
Write-Host "`n=== Cleanup Complete ===" -ForegroundColor Green
Write-Host "Files removed: $($removedFiles.Count)" -ForegroundColor Cyan
Write-Host "Space saved: $([math]::Round($totalSize / 1MB, 2)) MB" -ForegroundColor Cyan
Write-Host "`nRemoved items:" -ForegroundColor Yellow
$removedFiles | ForEach-Object { Write-Host "  - $_" }

Write-Host "`nNote: All essential JavaScript, CSS, fonts, and template previews were preserved." -ForegroundColor Green
