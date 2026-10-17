# Script khoi chay he thong TRUNG TAM BDVH & LTDH GIAO HUNG
Set-Location -Path $PSScriptRoot

Write-Host "===============================================================================" -ForegroundColor Cyan
Write-Host "    TRUNG TAM BDVH & LTDH GIAO HUNG - HE THONG BOI DUONG & LUYEN THI" -ForegroundColor Yellow
Write-Host "    Ban quyen: Thay Hung DT (TOAN - LI - HOA - ANH)" -ForegroundColor Yellow
Write-Host "===============================================================================" -ForegroundColor Cyan
Write-Host ""

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "[LOI] Khong tim thay Node.js tren may tinh!" -ForegroundColor Red
    Write-Host "Vui long cai dat tai: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Nhan Enter de thoat..."
    exit 1
}

if (-not (Test-Path "node_modules")) {
    Write-Host "[THONG BAO] Dang cai dat cac goi thu vien..." -ForegroundColor Cyan
    npm install
}

Write-Host "[OK] Dang khoi dong may chu va mo trinh duyet..." -ForegroundColor Green
Write-Host "[LINK] http://localhost:5173/" -ForegroundColor Cyan
npm start
