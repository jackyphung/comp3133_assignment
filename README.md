# COMP3133 Assignment
### 100801047 - Jacky Phung
### 100998164 - Jullian Anthony Sy-Lucero
#### Heroku App Deployment: https://comp3133-fs-assignment.herokuapp.com/
#### Git Repository: https://github.com/jaepun/comp3133_assignment

## Initial Setup
1. Run `npm install` in your command line interface. That's it!

## Running the Server
### Production
1. Run `npm run start:server` in your command line interface, its as simple as that.
_For running the server without building use `npm start` only_

### Development
1. Run `npm run start:dev` in your command line interface 

## API Routes
#### Event Log: 
- `/api/events/` - Retrieves all event logs
#### Room History: 
- `/api/history`
  - GET Retrieves all room history
  - POST Retrieves specific room history when given room name