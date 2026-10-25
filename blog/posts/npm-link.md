---
title: 'NPM Link'
date: '2020-06-08T15:34:45.000Z'
categories:
  - 'programming'
tags:
  - 'hack'
  - 'javascript'
  - 'nodejs'
slug: 'npm-link'
---

Npm [link](https://docs.npmjs.com/cli/link), wait, what!? Yeah npm link, a way to test [npm](https://docs.npmjs.com) packages as you develop them. This is a little something I learned last week and need to write it down so I remember how to do it.

I was working on the [THAT Conference](https://www.THATconference.com) [api](https://github.com/thatconference) and needed to add a custom GraphQL scalar for a 'Slug'. In this particular case I am working with member slugs, though the Slug scalar will be utilized for any of our slug needs.

The package project, [that-api](https://github.com/ThatConference/that-api), will contain the new Slug scalar located locally at `~/tc/that-api`.

The api project, [that-api-members](https://github.com/ThatConference/that-api-members), will be using the new scalar located locally at `~/tc/that-api-members`.

After a bunch of hacking, etc. its was time to test the npm package in the api project. Here are the steps. This assumes that both packages pass tests, build and run. Both these projects use Babel and output to a folder named `__build__`. Package name is @thatconference/api

Starting with that-api

```sh
$ cd ~/tc/that-api
$ npm run validate
$ npm run build
$ cd __build__
$ npm link
$ cd ..
$ npm run dev
```

Now at the api project that-api-members

```sh
$ cd ~/tc/that-api-members
$ npm run validate
$ npm link @thatconference/api
$ npm run validate
$ npm run start:watch
```

At this point the that-api-members project is running using the linked that-api package, not the one downloaded into its node_modules folder.

So to undo this. I am not 100% sure this is correct, but it seems to work.

Unlink the the package from that-api-members.

```sh
$ ^c
$ cd ~/tc/that-api-members
$ npm unlink @thatconference/api
$ npm i @thatconference/api
```

Stop the running code and unlink to remove the link from npm which removes it from global location `{prefix}/lib/node\_modules/<package>`

```sh
$ ^c
$ cd ~/tc/that-api/
$ npm unlink
$ cd ..
```

When you unlink a package it removes it from packages.json, so we need to then add it back. This is why we removed the global link first so we could install and get the package, not the link.

### A Few Notes

- If you use a node version manager like nodenv, both the application and package need to run the same version or the application will not be able to locate the link.
- Using the command `npm --link=true` may show linked location in your node_modules.

---

oct 2020: instruction fixes
