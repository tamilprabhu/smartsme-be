FROM mysql:8.0.23

COPY db/init/000-create-db.sql /docker-entrypoint-initdb.d/000-create-db.sql
COPY db/init/010-schema.sql /docker-entrypoint-initdb.d/010-schema.sql
COPY db/reference/020-rbac.sql /docker-entrypoint-initdb.d/020-rbac.sql
COPY db/reference/030-reference-data.sql /docker-entrypoint-initdb.d/030-reference-data.sql
COPY db/seed/dev/030-dev-seed.sql /docker-entrypoint-initdb.d/040-dev-seed.sql
COPY db/migrations/040-auto-increment-setup.sql /docker-entrypoint-initdb.d/050-auto-increment-setup.sql
