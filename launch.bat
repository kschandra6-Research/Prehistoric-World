@echo off
title LITHOS - Prehistoric Stone Atlas (Concept & Design by K.S.Chandra 2026)
cls
color 0B

echo ===============================================================================
echo     L I T H O S  :  P R E H I S T O R I C   S T O N E   A T L A S
echo        Atlas of Stone Tools, Implements, Artefacts & Art of Prehistory
echo                 Concept & Design by K.S.Chandra 2026
echo ===============================================================================
echo.
echo  Starting LITHOS Prehistoric Stone Atlas in your default web browser...
echo.

:: Check if Python is installed
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo  [OK] Python runtime detected.
    echo  Launching high-performance local web server on port 8080...
    python launcher.py
    goto end
)

:: If Python not found, check Node.js
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo  [OK] Node.js runtime detected.
    echo  Launching local browser preview...
    start "" index.html
    goto end
)

:: Fallback: Direct Browser Launch via default HTML handler
echo  [INFO] Opening standalone LITHOS Atlas directly in default web browser...
start "" "%~dp0index.html"

:end
exit /b
