FROM mysql:8.0.23

COPY db/init/000-create-db.sql /docker-entrypoint-initdb.d/000-create-db.sql
COPY db/init/010-schema.sql /docker-entrypoint-initdb.d/010-schema.sql
COPY db/reference/020-rbac.sql /docker-entrypoint-initdb.d/020-rbac.sql

COPY db/init/smartsmeNew.sql /docker-entrypoint-initdb.d/920-smartsmeNew.sql
