FROM mysql:8.0.23

# Copy 000-create-db.sql into MySQL init directory
COPY db/init/000-create-db.sql /docker-entrypoint-initdb.d/000-create-db.sql
COPY db/init/010-schema.sql /docker-entrypoint-initdb.d/010-schema.sql
COPY db/init/smartsmeNew.sql /docker-entrypoint-initdb.d/020-smartsmeNew.sql
COPY db/init/roles-permissions-actions.sql /docker-entrypoint-initdb.d/030-roles-permissions-actions.sql
# COPY db/init/SME.sql /docker-entrypoint-initdb.d/004-SME.sql
