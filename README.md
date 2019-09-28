## ngWorkshopsServer

## Instructions

To use this server you need to 
1. clone this repository
2. rename `.env_default` to `.env` and provide connection string inside the file
3. go to directory containing this repo
4. run command `npm start`

You may find your mongoDBConnectionString by clicking `connect` to cluster on [MongoDB atlas](https://cloud.mongodb.com) and choosing `Connect your application` option.
**Do not forget to put your password in correct place in this string!**

5. connect your app to this server by pointing to `localhost:3000`


### API documentation

To see API documentations there is Swagger API documentation available [http://localhost:3000/docs](http://localhost:3000/docs)