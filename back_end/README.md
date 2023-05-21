docker build -t imagespacecraftapi .

docker run -d --env-file .env --name containerspacecraftapi -p 80:80 imagespacecraftapi