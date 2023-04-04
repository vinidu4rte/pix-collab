<div align="center">
  <h1>Pix Collab </h1>
    <img src="https://user-images.githubusercontent.com/80220673/229859140-26146356-eada-4084-8f90-db5e371da2e1.png" alt="Pix collab app screenshot" height="40%" width="40%">
  <p align="center">
    Pix Collab implements split payment concept using Woovi environment
    <br />
    <a href="https://pix-collab.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/vinidu4rte/woovi-challenge/issues">Report a Bug</a>
  </p>
</div>

# Table of contents

- [What problem Pix Collab solves?](#what-problem-pix-collab-solves)
- [Architecture](#architecture)
  - [Data Modeling](#data-modeling)
  - [Usecases explained](#usecases-explained)
    - [Create charge](#create-charge)
    - [Charge payment](#charge-payment)
- [Figma](#figma)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Developer environment](#developer-environment)
  - [Copy environment files](#copy-environment-files)
  - [Fill environment files](#fill-environment-files)
  - [Install the dependencies](#install-the-dependencies)
  - [Run both web and server packages](#run-both--web--and--server--packages)
- [Contributing](#contributing)
- [References](#references)
- [Contact](#contact)

<br>

## What problem Pix Collab solves?

Are you tired of splitting the bill at restaurants, cafes, and other places with your friends? Do you struggle to keep track of who owes what and end up with awkward conversations about money? If so, you're not alone.

Pix is a fast, secure, and convenient payment method in Brazil, but it's not always easy to use, especially when you want to split a charge among multiple people. With Pix Collab, you can easily split the bill with your friends and pay using Pix. Our app generates multiple Pix charges for a single bill, each with the exact amount that each person owes, making it easier for everyone to pay their share.

<br>

## Architecture

### Data modeling

<img src="https://user-images.githubusercontent.com/80220673/229806862-75b087d1-010c-4cf5-999a-a276df006664.png" alt="Pix Collab data modeling">

<br>

### Usecases explained

#### Create charge

<img src="https://user-images.githubusercontent.com/80220673/229813773-f2090b9f-ed84-42c7-b80e-011eaf9495c1.png" alt="Create charge usecase explained in Excalidraw">

<br>

#### Charge payment

<img src="https://user-images.githubusercontent.com/80220673/229819212-b212ef27-b417-4fd4-8fac-02bc0b2b657d.png" alt="Charge payment usecase explained in Excalidraw">

<br>

## Figma

All app design are available in <a href="https://www.figma.com/file/2u131ZDIGr8TckvBHgMUEV/pix-collab?node-id=0%3A1&t=zzmW0bSJ1umwBcU8-1">Pix Collab figma project</a>.
<img src="https://user-images.githubusercontent.com/80220673/229820241-309b714d-0718-47af-90c9-b62df4bdd682.png" alt="Figma project big picture">

## Getting Started

### Installation

Clone the repo

```
git clone git@github.com:vinidu4rte/woovi-challenge.git
```

### Developer environment

#### Setup Docker + MongoDB

```sh
npm run db:up
```

### Copy environment files

```sh
npm run copy-envs
```

### Fill environment files

```sh
### apps/server/.env

# it will be necessary create a Woovi seller account and create a webhook to point server url. To create a tunneling for your localhost, use ngrok.
WOOVI_API_KEY=
WOOVI_WEBHOOK_SECRET=
```

```sh
### apps/web/.env

# web envs already has the deployed server URL, but could be easily changed for localhost
NEXT_PUBLIC_SERVER_HTTP_URL=https://woovi-challenge-server.onrender.com
NEXT_PUBLIC_SERVER_WS_URL=wss://woovi-challenge-server.onrender.com
```

### Install the dependencies

```sh
npm install
```

### Run app in development

If you have completed the necessary setup for the required packages, you can run them concurrently with a single command:

```bash
npm run dev
```

## Contributing

Contributions are welcome from everyone! Here's how you can get started:

### Issues

If you encounter any bugs or have any feature requests, please create an issue with a description of the problem

### Pull Requests

Pull requests from anyone are appreciated and can help make this project better! To get started, follow these steps:

1. Fork the repository
2. Clone the repository to your local machine
3. Create a new branch for your changes and switch to it (`git checkout -b feat/featureName`)
4. Make your changes and commit them (`git commit -m 'feat: add commit context'`)
5. Push your changes to your fork (`git push origin feat/featureName`)
6. Create a pull request in the original repository

## References

- [Apollo GraphQL](https://www.apollographql.com/docs/)
- [Nextjs](https://nextjs.org/docs/getting-started)
- [ChakraUI](https://chakra-ui.com/getting-started)
- [Awesome Woovi Challenge](https://github.com/entria/awesome-woovi-challenge)
- [NotDiscord](https://github.com/Eckzzo/notdiscord)
- [TicoTeco](https://github.com/aripiprazole/ticoteco)
- [Fakeddit](https://github.com/noghartt/fakeddit)
- [Violetit](https://github.com/nogw/violetit)

## Contact

- Twitter - [@etraudv](https://twitter.com/etraudv)
- Discord - vduarte#6230
