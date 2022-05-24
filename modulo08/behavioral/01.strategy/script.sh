
#postgres
docker run \
    --name postgres \
    -e POSTGRES_USER=pauloromanenghi \
    -e POSTGRES_PASSWORD="pq123" \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

docker logs postgres
docker exec -it postgres psql --username pauloromanenghi --dbname heroes

CREATE TABLE warriors(id serial PRIMARY KEY, name VARCHAR(255) NOT NULL);
SELECT * FROM warriors;

#mongodb
docker run \
    --name mongodb \
    -e MONGO_INITDB_ROOT_USERNAME=pauloromanenghi \
    -e MONGO_INITDB_ROOT_PASSWORD=pq123 \
    -p 27017:27017  \
    -d \
    mongo:4

docker logs postgres