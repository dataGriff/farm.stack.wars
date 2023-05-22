docker build -t imagespacecraftapi .

docker run -d --env-file .env --name containerspacecraftapi -p 80:80 imagespacecraftapi


docker tag imagespacecraftapi lrndatagriffacreundgrf.azurecr.io/spacecraftapi

docker push lrndatagriffacreundgrf.azurecr.io/spacecraftapi