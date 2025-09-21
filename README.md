# smartsme-be
Diecast API Backend

```sh
# Build custom mysql image
docker build -f mysql.Dockerfile -t smartsme-mysql:8.0.23 .

# Launch instance
docker run -d --name smartsme-mysql \
  -e MYSQL_DATABASE=smartsme \
  -e MYSQL_USER=smartsmeusr \
  -e MYSQL_PASSWORD='$m@rt$mepwd' \
  -e MYSQL_ROOT_PASSWORD=root \
  smartsme-mysql:8.0.23

# Shorthand script to generate private/public key for JWT
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

```
