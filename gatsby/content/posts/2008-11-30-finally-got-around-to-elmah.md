---
author: brettski111
comments: true
date: 2008-11-30 23:59:46+00:00
layout: post
link: http://blog.brettski.com/2008/11/30/finally-got-around-to-elmah/
slug: finally-got-around-to-elmah
title: Finally got around to Elmah
wordpress_id: 202
categories:
- nerdiness
---

It's been a few months since I have wanted to try this out and I finally have; I am using [Elmah](http://code.google.com/p/elmah/) on one of my website to track errors.  Thankfully there are very few, but the experience of getting it setup is always worth it.

I am impressed on how many ways it can log, to name a few there are [MSSql](http://www.microsoft.com/sql), [Oracle](http://www.oracle.com), [SQLite](http://www.sqlite.org), MS Access, VistaDB, XML, memory, and others I believe. I opted for the SQLite option, as Elmah builds the database on the fly if it doesn't exist (same with VistaDB).

My main reason I didn't set it up right away was I just couldn't find a flat guide on how to set it up.  Nothing really says, do this, this, then this.  Well it's a slow day today, so I took another quick look at the website http://code.google.com/p/elmah/, downloaded the [source](http://code.google.com/p/elmah/downloads/list), and moved forward.  There is this neat demo you can run from the source by running the demo.cmd file in the root of the zip file.

That demo, it's web.config, and the web.config located under \samples, was all I needed to get started.  Pretty easy to add the parts to the web.config of my website and get everything working.  A real simple package to get up and running.

Next up, work on filtering out items I don't want logged in Elmah.
