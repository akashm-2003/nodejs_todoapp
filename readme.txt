You can use like this in package.json
"scripts": {
    "start": "set NODE_ENV=production&&node server.js",
    "dev": "set NODE_ENV=development&&nodemon server.js"
  },

TO solve npm version lesser
"engine": {
    "node": ">=18.16.0"
  },

  
npm i express mongoose dotenv

cors it is a middleware that allows us to connect to our backend from a different domain name or port number
npm i cors

bcryptjs is a library that allows us to hash passwords

vercel is used to deploy our backend to the cloud

render.com is used to deploy our frontend to the cloud