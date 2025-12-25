# Start Backend and Frontend servers

Write-Host "Starting Backend Server..." -ForegroundColor Green
Start-Process -FilePath "python" -ArgumentList "-m backend.app" -WorkingDirectory "c:\FINAL YEAR PROJECTS\personalized recommend engine for e commerce" -WindowStyle Minimized

Write-Host "Starting Frontend Server..." -ForegroundColor Green
Start-Process -FilePath "npm" -ArgumentList "run dev" -WorkingDirectory "c:\FINAL YEAR PROJECTS\personalized recommend engine for e commerce\frontend"

Write-Host "Servers started! Backend: http://localhost:5000, Frontend: http://localhost:5173" -ForegroundColor Cyan
