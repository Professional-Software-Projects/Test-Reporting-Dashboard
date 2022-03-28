@echo off

echo Deleting any dangling images...
docker image prune -a -f

echo Starting container...
docker compose up -d --build --remove-orphans --force-recreate

echo Finished! Website homepage can be accessed from localhost:3000.

start firefox.exe http://localhost:3000