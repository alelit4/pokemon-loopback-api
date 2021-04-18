# 💦🐢 Pokemon api loopback

_This application is generated using [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) with the
[initial project layout](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).
The main objective of this is try to solve [Challenges Coding Exercise Backend](https://github.com/IBMQuantum/backend-code-challenge)_

With this api you can control all your Pokemons due to some queries related to them, such as: 
name, type, is one of you favourites, ...

## 📐 Architecture 

The design of this app is based on [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).
Specific I use [Hexagonal Architecture](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)) 
based on the book [Growing Object Oriented Software](https://www.amazon.com/Growing-Object-Oriented-Software-Guided-Tests/dp/0321503627), 
but with some limitations based on some restrictions of LoopBack framework.

This repository contains the main code of the application in the path '/src'. However, there is some data
related to the model of the api in the path '/data/db' (that is the base of this).
The project has the following layers in '/src':

* controllers: This is the entry-point layer where all the controllers are defined based on the use cases.
* datasources: This is an infrastructure layer where all the information related with the data source is in. 
  Note that for this application, it's used MongoDB.
* domain: Here is where the logic of the app goes, such us: models/entities or repository interfaces. 
* repositories: In this layer are the implementations of repositories, this is an infrastructure layer. 
* usecases: This is the layer where is located the communication of infrastructure components and domain elements. 
In this layer the use cases are located related to the services that allow the communication between ports and adapters.

Note: There is a special file called TechnicalDebt.md where is all the information about some technical debt that 
appears in the development of this project. I try to keep this file clean, but depends on time limitations.


## 🚀 Get started

_If you want to use this project be sure you have installed [NodeJs and npm](https://nodejs.org/es/download/) and 
[MongoDB](https://www.mongodb.com/2)_

### 📦 Pre-requirements

By default, dependencies were installed when this application was generated.
Whenever dependencies in `package.json` are changed, run the following command:

```sh
npm install
```

To only install resolved dependencies in `package-lock.json`:

```sh
npm ci
```

### 🔧 Run the application

```sh
npm start
```

You can also run `node .` to skip the build step.

Open http://127.0.0.1:3000 in your browser.

To incrementally build the project:

```sh
npm run build
```

To force a full build by cleaning up cached artifacts:

```sh
npm run rebuild
```

### 🌩 Other useful commands
- `npm run lint`: Fix code style and formatting issues
- `npm run lint:fix`: To automatically fix code style and formatting issues
- `npm run migrate`: Migrate database schemas for models
- `npm run openapi-spec`: Generate OpenAPI spec into a file
- `npm run docker:build`: Build a Docker image for this application
- `npm run docker:run`: Run this application inside a Docker container

## ⚙️ Tests all test suit

```sh
npm test
```

[comment]: <> (##  🔩 end-to-end tests)


## 🛠️ Tools and dependencies

* 🦄 [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) - The main generator 
* 🍃 [MongoDb](https://www.mongodb.com/2) - The database used
* 🐳 [Docker](https://www.docker.com/) - For an easy deploy

##  What's next

Please check out [LoopBack 4 documentation](https://loopback.io/doc/en/lb4/) to
understand how you can continue to add features to this application.

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

[comment]: <> (# Say hello 🎁)
[comment]: <> (* Share this proyect 📢)