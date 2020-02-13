# health-provider-market
A marketplace for Health Providers.  The marketplace will allow users to book an appointment with the desired Health Provider, as well as see Health Provider's profiles(Address, phone, and other relevant information).

### Installing and running the app

Navigate to /api and install server dependencies

```
cd /api
npm install
```

Start your mongoDB server

For Ubuntu:
```
sudo service mongod start 
```
For OSX
```
mongod
```
seed the database
```
node models/seed.js
```

then start the api server

```
npm run start
```

navigate to the /client directory

```
cd ../client
```

and start the client server

```
npm run start
```