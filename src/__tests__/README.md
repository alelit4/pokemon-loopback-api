
## โ๏ธTests

In this application all tests are over the path `src/__tests__`.
All the tools related needed to launch them are in `src/__tests__/helpers`.
If you want to run all tests run:

```sh
npm run tests
```

#### ๐งจ Unit tests
There are some unit tests in `src/__tests__/unit` to test specific
functionalities of the app.
To launch them run:

```sh
npm run test:unit
```

#### ๐ฃ Acceptance tests
Acceptance tests are in `src/__tests__/acceptance` to test the application end-to-end.
To launch them run:

```sh
npm run test:acceptance
```

#### ๐ Coverage
The project has ๐[nyc](https://github.com/istanbuljs/nyc) integrated
lib to see the test coverage of the application.
To see the coverage run:

```sh
npm run coverage
```

The report is generated in `/coverage/index.html`, open it in your browser.

#### ๐ฉบ Test suit
There is a command to execute all the test suit with the linter and code tests.
To run them execute:

```sh
npm test
```

๐ก Note: _If you have some errors related to linter run
`npm run lint:fix --fix` to automatically fix code style and formatting issues_
