FROM mysql:8.0.23
# Copy schema.sql into MySQL init directory
COPY mysql.resources/schema.sql /docker-entrypoint-initdb.d/schema.sql

