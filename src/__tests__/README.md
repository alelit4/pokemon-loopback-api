# ✔️Tests

In this application all tests are over the path 'src/__tests__'.
All the tools related needed to launch them are in 'src/__tests__/helpers'.
If you want to run all tests run:

```sh
npm run tests
```

#### 🧨 Unit tests
There are some unit tests in 'src/__tests__/unit' to test specific
functionalities of the app.
To launch them run:

```sh
npm run test:unit
```

#### 💣 Acceptance tests
Acceptance tests are in 'src/__tests__/acceptance' to test the application end-to-end.
To launch them run:

```sh
npm run test:acceptance
```

#### 📊 Coverage
The project has integrated 🛕[nyc](https://github.com/istanbuljs/nyc)
lib to see the test coverage of the application.
To see the coverage run:

```sh
npm run coverage
```

The report is generated in '/coverage/index.html', open it in your browser.

#### 🩺 Test all the suit
There is a command to execute all the suit test with the linter and tests.
To run them execute:

```sh
npm test
```

💡 Note: _If you have some errors related to linter run
`npm run lint:fix --fix` to automatically fix code style and formatting issues_
