# Vehicles Registration App

## Introduction
- In this project i developed the `vehicle` reistration process in which user can register his vehicle by making an account
- User can add `category` for vehicleif it does not exist in database
- A new user can login to this app by signup

## Frontend: 
- Using `React-js` for frontend functionality
- `Material UI` using for frontend UI development
- `Formik` used for all form controll
- Applied Validation through `Yup` with formik to validate all fields
- Rendering the all data in table by useing `Material-table`

## Backend:
- Using `node-js` as backend language 
- configured `mongoDB` for saving data to perform CRUD
- In this app, i have used `nodemailer` to send email on every signup
- `generate-password` library of node-js using for generating random password
- Implemented `JWT` for login process

## How to start Project
- frontend: `npm start`
- backend: `npm run dev`

## Signup Process
- you will have require to give email and passowrd for auth in nodemailer to send emails
- Go to your given host email `Account Setting` 
- Search `App Password` and create here password by selecting `custom` option
### Now continue to Signup as given below:
- Enter Signup details as `username` and `email` address
- check your `Mailbox`, you will receive auto generated password to continue for login
- If user already registered in system it will fail request and give error

## Login Process
- Enter your registered email and auto generated password in given fields
- Continue to Login and it route you to Dashboard where you can perform CRUD for vehicles

## Dashboard 
- It will show two cards having total number of vehicles and categories

## Testing
https://www.loom.com/share/29232251a2d94e46939f5eedc806e172

https://www.loom.com/share/cae00a7c2f5f49c69d9b717134e4ccc4