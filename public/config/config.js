module.exports = {
    "privateKey": "backendDemo",
    "connection": {
        "host": process.env.host,
        "user": process.env.user,
        "password": process.env.password,
        "database": process.env.database
    },
    "development": {
        "host": process.env.host,
        "username": process.env.username,
        "password": process.env.password,
        "database": process.env.database,
        "dialect": "mysql",
        "operatorsAliases": false
      },
      "uat": {
        "host": process.env.host,
        "username": process.env.username,
        "password": process.env.password,
        "database": process.env.database,
        "dialect": "mysql",
        "operatorsAliases": false
      },
      "production": {
        "host": process.env.host,
        "username": process.env.username,
        "password": process.env.password,
        "database": process.env.database,
        "dialect": "mysql",
        "operatorsAliases": false
      }
}