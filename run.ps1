Write-Output "Deleting any dangling images..."
docker image prune -a -f

Write-Output "Starting container..."
docker compose up -d --build --remove-orphans --force-recreate

Write-Output "Finished! Website homepage can be accessed from localhost:3000."
Start-Process http://localhost:3000