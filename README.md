Firstly, add BOT_TOKEN in .env, same DATABASE_URL

npx prisma generation

npx prisma migrate dev - you need to migrate your data

docker compose up

docker exec -it ID_CONTAINER /bin/bash

psql -U postgres name-db

SELECT * FROM public."User"; - check your data

to be continued..
