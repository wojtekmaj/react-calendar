# Contributing to React-Calendar

## Prerequisites

* [Node.js](https://nodejs.org/en/download/)
* [Yarn](https://yarnpkg.com/lang/en/)
* IDE of your choice (we're recommending [Visual Studio Code](https://code.visualstudio.com/))

## Before you start

* Search if the thing you'd like to work on has already been requested/reported in GitHub Issues.
  * If yes, note the issue number for later
  * If no, raise a new issue.
* Create a separate branch you will work on.

## Installation

* Fork the repository and clone it to your device.
* Run `yarn` command in `/` directory to install dependencies and dev dependencies.

## Development

[Test app](#manual-tests) should come in handy during development.

Your code should be covered by unit tests.

If you're fixing a bug, it's a good idea to start from writing a failing unit test (thus proving there is a bug), fix a bug and ensure that the test now passes.

You can run `yarn test-eslint --fix` to automatically format your code.

## Testing

React-Calendar is tested using automated and manual tests.

### Automated tests

Run `yarn test` to run linter and unit tests.

### Manual tests

There is an app in `/test` directory which renders React-Calendar with a few options you can play with. It's a separate project which requires React-Calendar, but there's an easy way to see your changes there live as you code.

* Run `yarn link` in `/` directory.
* Run `yarn` in `/test` directory.
* Run `yarn link react-calendar` in `/test` directory.

Once you're done, running `yarn start` in `/test` directory should give you access to the test app under http://localhost:1234/.

Run the test app in several browsers and play around with different options.

### Committing

Make sure that [tests](#testing) are passing before you commit.

Commit message should preferably have the following format

```
Fix thing

Fixes #1234
```

where `#1234` is the number of the issue your contribution is related to.
