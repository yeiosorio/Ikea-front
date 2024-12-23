### Stage 1: Build ###
FROM registrysecaas.azurecr.io/secaas/node:v16.13.0 AS builder
# Create a Virtual directory inside the docker image
WORKDIR /app
# Copy files to virtual directory
# COPY package.json package-lock.json ./
# Run command in Virtual directory
RUN npm cache clean --force

# Copy files from local machine to virtual directory in docker image
COPY . .
RUN npm set @ingka:registry https://npm.m2.blue.cdtapps.com
RUN npm install

# SYSTEM ENVIRONMENT VARIABLE
# https://falabella-my.sharepoint.com/:x:/g/personal/ext_lhramirezo_falabella_cl/ETrGz6fPXGRPq3DBnlA5wGgB1KVnaK928NG3mewGCDQHRw?e=EfPsGJ

ENV PROD_AZURE_AD YJ4rK8C3j13JFU2LMIowvTQl2I6g3L2p0RoEY4CIkW1v1v0JcSfb4327Z4n/9Sb/
ENV PROD_FIREBASE 40KkFLZXIvDQO2KMRFySFaqqAkla5RiLsP8CoV9iJjYY+FP5W1dDJj3/Ubon3wxYpfCeY+7qhgcYuIrdtiuxHZcNtgg4QbxVOTBhTICLvpERDXzEWbMJltuDTw4kzp+veECvyZeelQYtdYVPvIeF0ZZX0VvSGihJX0lxH8S8GA+IBDmhWmFv45nI3ex+DPGO+A5dVWlt0Oh7wMPWfzxzLOm8oJfClV4+g0VWbNUaWNKqMl0nja2fVYNjrDDv6XmsRiUotJ40NS/TGLJzN42/TyqlzeI1JZkp9lpY0Dkge/E8i5bZSjiWP4tZhV+JwzPMkBUZOM6Kjvd4lRbYF1foitL6lUBNTjSDz2mn5owHcimrlcH/VOLTzHAyg5j5shUR2iMpQcLKQbrIrmddCKB34q9KrGsIMMLUAK87REQrX4fWlxA5V1qsDvUjpeIkKeNl
ENV PROD_ACCESS_REPORT ikea123456

RUN npm run build:prod

### Stage 2: Run ###
FROM registrysecaas.azurecr.io/secaas/nginx:1.18-latest AS ngi
COPY --from=builder /app/dist/customer-service /usr/share/nginx/html
COPY /nginx.prod.conf  /etc/nginx/conf.d/default.conf

# CMD ["nginx","-g","daemon off;"]
EXPOSE 8000
