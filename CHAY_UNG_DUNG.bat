@echo off
chcp 65001 >nul
title TRUNG TAM BDVH & LTDH GIAO HUNG - He Thong Luyen Thi

cd /d "%~dp0"

echo ===============================================================================
echo     TRUNG TAM BDVH & LTDH GIAO HUNG - HE THONG BOI DUONG & LUYEN THI
echo     Ban quyen: Thay Hung DT (TOAN - LI - HOA - ANH)
echo ===============================================================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [LOI] Khong tim thay Node.js tren he thong!
    echo Vui long tai va cai dat Node.js tai: https://nodejs.org/
    echo Sau khi cai dat xong, hay nhap dup chuot de mo lai file nay.
    echo.
    pause
    exit /b 1
)

if not exist "node_modules\" (
    echo [THONG BAO] Phat hien lan dau khoi chay. Dang cai dat cac thu vien can thiet...
    call npm install
    if %errorlevel% neq 0 (
        echo [LOI] Cai dat thu vien that bai! Vui long kiem tra ket noi mang va thu lai.
        pause
        exit /b 1
    )
)

echo [OK] Dang khoi dong may chu ung dung va tu dong mo trinh duyet...
echo [LINK] Dia chi truy cap: http://localhost:5173/
echo.
echo * Luu y: Giu cua so nay mo trong suot qua trinh hoc tap.
echo * De dung ung dung: Dong cua so nay hoac nhan Ctrl + C tren ban phim.
echo -------------------------------------------------------------------------------
echo.

call npm start

if %errorlevel% neq 0 (
    echo.
    echo [LOI] Co loi xay ra trong khi chay ung dung!
    pause
)
