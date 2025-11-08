FROM mysql:8.0.23
# Copy schema.sql into MySQL init directory
COPY mysql.resources/schema.sql /docker-entrypoint-initdb.d/001-schema.sql
COPY mysql.resources/smartsmeNew.sql /docker-entrypoint-initdb.d/002-smartsmeNew.sql
COPY mysql.resources/roles-permissions-actions.sql /docker-entrypoint-initdb.d/003-roles-permissions-actions.sql
# COPY mysql.resources/SME.sql /docker-entrypoint-initdb.d/004-SME.sql
