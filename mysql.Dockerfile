FROM mysql:8.0.23
# Copy schema.sql into MySQL init directory
COPY mysql.resources/schema.sql /docker-entrypoint-initdb.d/000-schema.sql
COPY mysql.resources/smartsmeNew.sql /docker-entrypoint-initdb.d/001-smartsmeNew.sql
COPY mysql.resources/SME.sql /docker-entrypoint-initdb.d/002-SME.sql

