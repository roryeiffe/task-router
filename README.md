## Task Router

# Overview
What began as a task manager application quickly became a simple social media site where users can login, make posts, become friends, and even share their Pokemon collection!

# Technologies
* Java
* JDBC
* MySQL
* HTML
* CSS
* JavaScript
* ReactJS
* Bootstrap
* Maven
* Tomcat Server 9.0
* Hibernate
* Spring Boot

# Features
* Login Page - users can log in to their account
* Register Page - users can input some basic information, as well as choose a starter Pokemon that grows as tasks are completed
* Friend Page - users can accept incoming friend requests and view their current friends
* Tasks Page - users can add tasks to their schedule and mark them as complete, granting them a new Pokemon
* Posts Page - users can add posts and view posts from other users
* Profile Page - users can view/edit their profile information
* Pokedex Page - users can view the pokemon they've "caught"

# Getting started
To get started follow these steps:
```sh
git clone https://github.com/roryeiffe/revature-project2
```

Then open the folder "spring-boot-server" in a code editor of your choice (we recommend Intellij or Eclipse). 

Update src/main/resources/application.properties. 
Specifically these fields:
* spring.datasource.url - make sure you have a database with the correct name
* spring.datasource.username - make sure this username matches what you have on your system
* spring.datasource.password - make sure this password matches what you have on your system
* server.port - feel free to change this if the given port is already in use (although, make sure to also update the axios calls in the react-app). 

## Running the back-end
When these properties are set, run the file "PokemonTaskManagerApplication.java" to start the server. 

## Running the front-end
For the react-app, open up the folder "react-app" in your favorite code editor (we recommend Visual Studio Code). Open up the command prompt and type 
```
npm start
```
The website should open in your browser but if not, go to "http://localhost:3000" to view the page. (Remember to update the port number used in the axios calls if you changed it in the properties file. 

# Collaborators
This was completed by Cathy Nguyen, Asberto Alvero, and Rory Eiffe during our time training at Revature.
