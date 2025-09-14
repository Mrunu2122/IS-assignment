# Start the backend server in a new PowerShell window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm install; npx prisma generate; npx prisma migrate dev --name init; npm run dev"

# Start the frontend server in a new PowerShell window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm install; npm run dev"

Write-Host "Starting development servers..." -ForegroundColor Green
Write-Host "Backend: http://localhost:5000"
Write-Host "Frontend: http://localhost:3000"
Write-Host ""
Write-Host "Press any key to stop all servers..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Kill all Node.js processes
Stop-Process -Name node -Force -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "Servers stopped." -ForegroundColor Red
