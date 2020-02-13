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

## Important notes

1) Provider search fully functional in the backend. Front end works but poor component state management triggers a page refresh thus staling the filtered providers list. 

2) No credentials needed for login. Just click the login button and viola!

3) Development was tracked with git issues and most commits are tied to an issue.


## Author

* **Brian Landron** - *Initial work* - [juiceboxjoe](https://github.com/juiceboxjoe) 

