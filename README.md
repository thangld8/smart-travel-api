## Smart travel throw API

The project is using:
- NodeJS
- ReactJS (deploy into other application)
- MySQL as database
- Module: Express, passport, sequelize

You can see a hosted version of:
-  `smart travel api app` on <a href="https://api-smart-travel.herokuapp.com/" target="_blank">Heroku</a>.
-  `smart travel UI app` on <a href="https://smart-travel-ui.herokuapp.com/" target="_blank">Heroku</a>.

## How to Build in Local

### Requirements

* Node 8
* Git
* Ask me for .Env file(or I can help you to set up the environment)

### Common setup

* Clone the repo and install the dependencies.

```bash
git clone https://github.com/thangld8/smart-travel-api
```
* Go to project folder and run.

```bash
npm install
```
* After install the module, we can start the project:

```bash
npm start
```

- `I only have 1 environment so the default environment is: development`

## Travel around

### API Informations
`Note: I already built 7 Apis(3 non-auth and 4 auth Apis) and you can also ask me for Postman collections`
#### Non-Auth Apis for Register, Login and health check. As a teacher you can login and start your management:

- GET: `{{url}}`/ :  will show the Api ready or not 
    ```Javascript
        return {
            "message": "Hi"
        }
    ```
- POST: `{{url}}`/register: developer can use this endpoint for create an account as a teacher

    * Body:
    ```Javascript
        {
	        "email": "abc@xyz.com",
	        "password": "test@123"
        }
    ```
- POST: `{{url}}`/login: developer can use this endpoint for login and get the token

    * Body:
    ```Javascript
        {
	        "email": "abc@xyz.com",
	        "password": "test@123"
        }
    ```
#### Auth Apis. After logged in, It  will generate a token for authentication:

- Header
    ```Javascript
        {
            "Content-Type":"application/json",
            "Authorization":"{{token}}"
        }
    ```

- POST: `{{url}}`/api/register: For register students who under your class

    * Body:
    ```Javascript
        {
	        "teacher": "abc@xyz.com",
	        "students": [
		        "studentA@gmail.com",
		        "studentD@gmail.com",
		        "studentE@gmail.com"
	        ]
        }
    ```
- GET: `{{url}}`/api/commonstudents?teacher=abc@xyz.com: For get list of student who registered by you or you and other colleagues

    * Params:
    ```Javascript
        {
	        "teacher": "abc@xyz.com"
        }
    ```
- POST: `{{url}}`/api/suspend: For suspend student who under your class

    * Body:
    ```Javascript
        {
	        "student": "studentD@gmail.com"
        }
    ```

- POST: `{{url}}`/api/retrievefornotifications: get a list of student who in your notification message or under your class

    * Body:
    ```Javascript
        {
	        "notification": "Hello students! @studentA@gmail.com @studentD@gmail.com @studentE@gmail.com @123akaka@"
        }
    ```
## Deploy to Heroku

You can also deploy this app to Heroku:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Further help

- Email: `thangldse03529@gmail.com`
- Website: <a href="`http://thangldcv.herokuapp.com`" target="_blank">MyWebsite</a>