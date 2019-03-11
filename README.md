# Task Complete Checker

> A GitHub App built with [Probot](https://github.com/probot/probot) that Checks if all tasks are completed in the pull requests.

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Deploy

```bash
$ npm install -g now
$ now secrets add tcc-app-id "<APP_ID>"
$ now secrets add tcc-webhook-secret "<WEBHOOK_SECRET>"
$ now secrets add tcc-private-key "$(cat app.private-key.pem | base64)"
$ now
$ now alias https://task-complete-checker-hogefuga.now.sh task-complete-checker
```

## Contributing

If you have suggestions for how task-complete-checker could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2019 Kentaro Matsushita <kentaro.m811@gmail.com> (https://github.com/kentaro-m/task-complete-checker)
