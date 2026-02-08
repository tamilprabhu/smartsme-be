FROM mysql:8.0.23

# Copy 000-create-db.sql into MySQL init directory
COPY db/init/000-create-db.sql /docker-entrypoint-initdb.d/001-000-create-db.sql
COPY db/init/smartsmeNew.sql /docker-entrypoint-initdb.d/002-smartsmeNew.sql
COPY db/init/roles-permissions-actions.sql /docker-entrypoint-initdb.d/003-roles-permissions-actions.sql
# COPY db/init/SME.sql /docker-entrypoint-initdb.d/004-SME.sql
