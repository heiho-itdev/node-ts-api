# node-ts-api

TypeScript&Express API

1 npm install
2 npx tsc
3 npm start


##docker

1 docker build . -t heiho/node-ts-api

2 docker run -p 49160:8080 -d heiho/node-ts-api

3 swaggerが表示されたらOK
http://localhost:49160/spec/

# コンテナ ID を取得する
docker ps

# アプリ出力をプリントする
docker logs <container id>
