FROM mysql:8.0.23

# Copy schema.sql into MySQL init directory
COPY db/init/schema.sql /docker-entrypoint-initdb.d/001-schema.sql
COPY db/init/smartsmeNew.sql /docker-entrypoint-initdb.d/002-smartsmeNew.sql
COPY db/init/roles-permissions-actions.sql /docker-entrypoint-initdb.d/003-roles-permissions-actions.sql
# COPY db/init/SME.sql /docker-entrypoint-initdb.d/004-SME.sql
