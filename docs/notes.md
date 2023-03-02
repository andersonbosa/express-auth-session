
# notes

* Initialize Mongo Database using docker:

```bash
docker run --rm \
  --name mongo \
  -p 27017:27017 \
  -v $(pwd)/database/data/db:/data/db \
  -v $(pwd)/database/mongod.yml:/etc/mongod.conf.orig \
  mongo 
```

* Get mongosh shell session

```bash
CONTAINER_IP=172.17.0.2

docker run --rm \
  --name mongosh \
  -p 27016:27016 \
  -it mongo mongosh "mongodb://root:root@$CONTAINER_IP:27017"
  # -it mongo mongosh "mongodb://$CONTAINER_IP:27017/test"
```

### Mongosh cheat-sheet

* db.serverStatus().connections - https://stackoverflow.com/questions/8975531/check-the-current-number-of-connections-to-mongodb
* 