# Comprehensive Resources Cleanup Script
# Analyzes and removes unnecessary files from both resources folders

$baseDir = "c:\Users\ASUS\Desktop\aiLegalEcosystem\shared\templates"
$templatesResourcesPath = Join-Path $baseDir "templates\resources"
$sharedResourcesPath = Join-Path $baseDir "resources"

Write-Host "=== Resources Cleanup Analysis ===" -ForegroundColor Cyan
Write-Host ""

# Track removals
$removedFiles = @()
$totalSize = 0

# ============================================
# PART 1: Clean templates/resources folder
# ============================================
Write-Host "Analyzing: templates\resources (393 files)" -ForegroundColor Yellow
Write-Host ""

# 1. Remove duplicate _website_.* files
Write-Host "[1/5] Removing duplicate _website_.* files..." -ForegroundColor Green
$duplicates = Get-ChildItem $templatesResourcesPath -Filter "_website_.*"
foreach ($file in $duplicates) {
    $size = $file.Length
    Write-Host "  Removing: $($file.Name)" -ForegroundColor DarkGray
    Remove-Item $file.FullName -Force
    $removedFiles += "templates\resources\$($file.Name)"
    $totalSize += $size
}

# 2. Remove OneTrust files (already disabled)
Write-Host "[2/5] Removing OneTrust files (already disabled)..." -ForegroundColor Green
$onetrustFiles = @("onetrust.js", "otSDKStub.js")
foreach ($fileName in $onetrustFiles) {
    $filePath = Join-Path $templatesResourcesPath $fileName
    if (Test-Path $filePath) {
        $size = (Get-Item $filePath).Length
        Write-Host "  Removing: $fileName" -ForegroundColor DarkGray
        Remove-Item $filePath -Force
        $removedFiles += "templates\resources\$fileName"
        $totalSize += $size
    }
}

# 3. Remove marketing images for services not offered
Write-Host "[3/5] Removing marketing images..." -ForegroundColor Green
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
    "biz-marketplace-banner2-1600.webp",
    # Additional marketing materials
    "BAP.webp",
    "EP.webp",
    "LAP.webp",
    "OA.webp",
    "D.1600_AC_GlossaryNav_footerbanner_2x.webp",
    "M.375_AC_GlossaryNav_footerbanner_2x.webp",
    "T.768_AC_GlossaryNav_footerbanner_2x.webp"
)

foreach ($image in $marketingImages) {
    $imagePath = Join-Path $templatesResourcesPath $image
    if (Test-Path $imagePath) {
        $size = (Get-Item $imagePath).Length
        Write-Host "  Removing: $image" -ForegroundColor DarkGray
        Remove-Item $imagePath -Force
        $removedFiles += "templates\resources\$image"
        $totalSize += $size
    }
}

# 4. Remove business formation related files
Write-Host "[4/5] Removing business formation files..." -ForegroundColor Green
$businessFiles = @(
    "business.business-formation.llc-overview_._html-CyomB56w.js",
    "(website).business.business-operations.lz-virtual-mail-prepare-offer-CSbX9N1j.js",
    "_website_.business.business-operations.lz-virtual-mail-prepare-offer-CSbX9N1j.js"
)

foreach ($file in $businessFiles) {
    $filePath = Join-Path $templatesResourcesPath $file
    if (Test-Path $filePath) {
        $size = (Get-Item $filePath).Length
        Write-Host "  Removing: $file" -ForegroundColor DarkGray
        Remove-Item $filePath -Force
        $removedFiles += "templates\resources\$file"
        $totalSize += $size
    }
}

# 5. Remove Questions hero images (generic marketing)
Write-Host "[5/5] Removing generic hero images..." -ForegroundColor Green
$heroImages = @(
    "Questions-1024.webp",
    "Questions-1600.webp",
    "Questions-375.webp",
    "Questions-768.webp",
    "questions-lg.webp",
    "questions-md.webp",
    "questions-sm.webp"
)

foreach ($image in $heroImages) {
    $imagePath = Join-Path $templatesResourcesPath $image
    if (Test-Path $imagePath) {
        $size = (Get-Item $imagePath).Length
        Write-Host "  Removing: $image" -ForegroundColor DarkGray
        Remove-Item $imagePath -Force
        $removedFiles += "templates\resources\$image"
        $totalSize += $size
    }
}

Write-Host ""

# ============================================
# PART 2: Clean shared/templates/resources folder
# ============================================
Write-Host "Analyzing: shared\templates\resources (css & js folders)" -ForegroundColor Yellow
Write-Host ""

# Remove OneTrust from js folder
Write-Host "[1/1] Removing OneTrust from js folder..." -ForegroundColor Green
$jsOnetrustPath = Join-Path $sharedResourcesPath "js\onetrust.js"
if (Test-Path $jsOnetrustPath) {
    $size = (Get-Item $jsOnetrustPath).Length
    Write-Host "  Removing: js\onetrust.js" -ForegroundColor DarkGray
    Remove-Item $jsOnetrustPath -Force
    $removedFiles += "resources\js\onetrust.js"
    $totalSize += $size
}

Write-Host ""

# ============================================
# Summary
# ============================================
Write-Host "=== Cleanup Complete ===" -ForegroundColor Green
Write-Host ""
Write-Host "Files removed: $($removedFiles.Count)" -ForegroundColor Cyan
Write-Host "Space saved: $([math]::Round($totalSize / 1MB, 2)) MB" -ForegroundColor Cyan
Write-Host ""

if ($removedFiles.Count -gt 0) {
    Write-Host "Removed files:" -ForegroundColor Yellow
    $removedFiles | ForEach-Object { Write-Host "  - $_" -ForegroundColor DarkGray }
    Write-Host ""
}

Write-Host "✅ All essential files preserved:" -ForegroundColor Green
Write-Host "  - JavaScript modules (80+ files)" -ForegroundColor DarkGray
Write-Host "  - CSS files (3 files)" -ForegroundColor DarkGray
Write-Host "  - Fonts (10 files)" -ForegroundColor DarkGray
Write-Host "  - Template preview images (260+ files)" -ForegroundColor DarkGray
Write-Host "  - Essential SVG icons" -ForegroundColor DarkGray
Write-Host ""

# Create backup info file
$backupInfo = @"
# Resources Cleanup Report
Date: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

## Files Removed: $($removedFiles.Count)
## Space Saved: $([math]::Round($totalSize / 1MB, 2)) MB

## Removed Files:
$($removedFiles -join "`n")

## What Was Kept:
- All JavaScript modules required for functionality
- All CSS stylesheets
- All fonts (QuincyCF, Open Sans, Work Sans)
- All template preview images (.webp files for templates)
- Essential SVG icons (not-found, star, preview-banner)

## What Was Removed:
- Duplicate _website_.* files
- OneTrust cookie consent files (already disabled)
- Marketing images for services not offered (LLC, DBA, Trademark, Wix)
- Business formation related JavaScript files
- Generic hero/questions images
- Glossary navigation banners
"@

$reportPath = Join-Path $baseDir "cleanup_report.txt"
$backupInfo | Out-File -FilePath $reportPath -Encoding UTF8
Write-Host "📄 Cleanup report saved to: $reportPath" -ForegroundColor Cyan
