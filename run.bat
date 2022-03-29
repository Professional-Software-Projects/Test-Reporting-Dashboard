@echo off

echo Deleting any dangling images...
docker image prune -a -f

echo Deleting any dangling networks...
docker network prune -f

echo Deleting any dangling volumes...
docker volume prune -f

echo Starting container...
docker compose up -d --build --remove-orphans --force-recreate

echo Finished! Website homepage can be accessed from localhost:3000.