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


docker build -t smartsme-be:0.0.1 .
docker run -d \
  -e NODE_ENV=production \
  -e PORT=8080 \
  -e DB_HOST=172.17.0.3 \
  -e DB_PORT=3306 \
  -e DB_NAME=smartsme \
  -e DB_USER=smartsmeusr \
  -e DB_PASS='$m@rt$mepwd' \
  -p 80:8080 \
  smartsme-be:0.0.1


```

### All User Logins Added:
1. Tamil - OWNER (Role ID: 1)
2. Nandha - ADMIN (Role ID: 2)
3. Alice - PLANT_HEAD (Role ID: 3)
4. Bob - SHIFT_INCHARGE (Role ID: 4)
5. Charlie - SHIFT_INCHARGE (Role ID: 4)
6. Diana - STORES_INCHARGE (Role ID: 5)
7. Ethan - PRODUCTION_EMPLOYEE (Role ID: 6)
8. Fiona - PRODUCTION_EMPLOYEE (Role ID: 6)
9. George - SECONDARY_PROCESS_EMPLOYEE (Role ID: 7)
10. Hannah - SECONDARY_PROCESS_EMPLOYEE (Role ID: 7)
11. Ian - ACCOUNTANT (Role ID: 8)
12. Jasmine - PRODUCTION_EMPLOYEE (Role ID: 6)
13. Kevin - STORES_INCHARGE (Role ID: 5)

