# Initialize the project
Write-Host "Initializing Notes App..." -ForegroundColor Green

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
Set-Location backend
npm install

# Set up Prisma
Write-Host "Setting up database..." -ForegroundColor Cyan
npx prisma generate

# Create .env file if it doesn't exist
if (-not (Test-Path .env)) {
    Copy-Item .env.example .env
    Write-Host "Created .env file. Please update it with your configuration." -ForegroundColor Yellow
}

# Run database migrations
Write-Host "Running database migrations..." -ForegroundColor Cyan
$env:NODE_ENV = "development"
npx prisma migrate dev --name init

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
Set-Location ..\frontend
npm install

# Create .env.local file if it doesn't exist
if (-not (Test-Path .env.local)) {
    Copy-Item env.example .env.local
    Write-Host "Created .env.local file. Please update it with your configuration." -ForegroundColor Yellow
}

# Return to root directory
Set-Location ..

Write-Host ""
Write-Host "Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "To start the development servers, run:" -ForegroundColor Cyan
Write-Host "1. Backend: cd backend && npm run dev"
Write-Host "2. Frontend: cd frontend && npm run dev"
Write-Host ""
Write-Host "Or run the start-dev.ps1 script to start both servers at once." -ForegroundColor Yellow
