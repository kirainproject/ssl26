@echo off
setlocal enabledelayedexpansion
echo ====================================
echo SSL 2026 Overlay - Extract to 1 Folder
echo ====================================
echo.

REM Set destination (source is current directory)
set "DEST_DIR=extracted-files"

REM Create destination folder
if not exist "%DEST_DIR%" mkdir "%DEST_DIR%"

echo Extracting all files to %DEST_DIR%...
echo Files will be renamed with their path (e.g., src-app-page.tsx)
echo.

REM Copy configuration files (root level)
if exist "package.json" copy "package.json" "%DEST_DIR%\package.json" >nul
if exist "tsconfig.json" copy "tsconfig.json" "%DEST_DIR%\tsconfig.json" >nul
if exist "next.config.js" copy "next.config.js" "%DEST_DIR%\next.config.js" >nul
if exist "tailwind.config.ts" copy "tailwind.config.ts" "%DEST_DIR%\tailwind.config.ts" >nul
if exist "postcss.config.js" copy "postcss.config.js" "%DEST_DIR%\postcss.config.js" >nul
if exist ".env.example" copy ".env.example" "%DEST_DIR%\.env.example" >nul
if exist "database.sql" copy "database.sql" "%DEST_DIR%\database.sql" >nul

REM Copy app files with path-based naming
if exist "src\app\layout.tsx" copy "src\app\layout.tsx" "%DEST_DIR%\src-app-layout.tsx" >nul
if exist "src\app\page.tsx" copy "src\app\page.tsx" "%DEST_DIR%\src-app-page.tsx" >nul

REM Live overlay
if exist "src\app\live-overlay\page.tsx" copy "src\app\live-overlay\page.tsx" "%DEST_DIR%\src-app-live-overlay-page.tsx" >nul

REM Winner overlay
if exist "src\app\winner-overlay\page.tsx" copy "src\app\winner-overlay\page.tsx" "%DEST_DIR%\src-app-winner-overlay-page.tsx" >nul

REM Game pause
if exist "src\app\game-pause\page.tsx" copy "src\app\game-pause\page.tsx" "%DEST_DIR%\src-app-game-pause-page.tsx" >nul

REM Game break
if exist "src\app\game-break\page.tsx" copy "src\app\game-break\page.tsx" "%DEST_DIR%\src-app-game-break-page.tsx" >nul

REM Control panel
if exist "src\app\control-panel\layout.tsx" copy "src\app\control-panel\layout.tsx" "%DEST_DIR%\src-app-control-panel-layout.tsx" >nul
if exist "src\app\control-panel\page.tsx" copy "src\app\control-panel\page.tsx" "%DEST_DIR%\src-app-control-panel-page.tsx" >nul

REM Login
if exist "src\app\login\page.tsx" copy "src\app\login\page.tsx" "%DEST_DIR%\src-app-login-page.tsx" >nul

REM API routes
if exist "src\app\api\overlay\route.ts" copy "src\app\api\overlay\route.ts" "%DEST_DIR%\src-app-api-overlay-route.ts" >nul
if exist "src\app\api\update\route.ts" copy "src\app\api\update\route.ts" "%DEST_DIR%\src-app-api-update-route.ts" >nul
if exist "src\app\api\auth\login\route.ts" copy "src\app\api\auth\login\route.ts" "%DEST_DIR%\src-app-api-auth-login-route.ts" >nul
if exist "src\app\api\auth\logout\route.ts" copy "src\app\api\auth\logout\route.ts" "%DEST_DIR%\src-app-api-auth-logout-route.ts" >nul

REM Components
if exist "src\components\LiveOverlay.tsx" copy "src\components\LiveOverlay.tsx" "%DEST_DIR%\src-components-LiveOverlay.tsx" >nul
if exist "src\components\WinnerOverlay.tsx" copy "src\components\WinnerOverlay.tsx" "%DEST_DIR%\src-components-WinnerOverlay.tsx" >nul
if exist "src\components\GamePauseOverlay.tsx" copy "src\components\GamePauseOverlay.tsx" "%DEST_DIR%\src-components-GamePauseOverlay.tsx" >nul
if exist "src\components\GameBreakOverlay.tsx" copy "src\components\GameBreakOverlay.tsx" "%DEST_DIR%\src-components-GameBreakOverlay.tsx" >nul
if exist "src\components\ControlPanel.tsx" copy "src\components\ControlPanel.tsx" "%DEST_DIR%\src-components-ControlPanel.tsx" >nul

REM Lib files
if exist "src\lib\supabase.ts" copy "src\lib\supabase.ts" "%DEST_DIR%\src-lib-supabase.ts" >nul
if exist "src\lib\auth.ts" copy "src\lib\auth.ts" "%DEST_DIR%\src-lib-auth.ts" >nul

REM Types
if exist "src\types\overlay.ts" copy "src\types\overlay.ts" "%DEST_DIR%\src-types-overlay.ts" >nul

REM Styles (if exists)
if exist "src\app\globals.css" copy "src\app\globals.css" "%DEST_DIR%\src-app-globals.css" >nul

echo.
echo ====================================
echo Extraction Complete!
echo ====================================
echo.
echo All files copied to: %DEST_DIR%\
echo Files renamed with path format (e.g., src-app-page.tsx)
echo.
echo Excluded: README files
echo.

REM Show what files were copied
echo Files copied:
dir /B "%DEST_DIR%"
echo.
pause