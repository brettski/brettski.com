---
author: brettski111
comments: true
date: 2014-07-19 20:03:20+00:00
layout: post
link: http://blog.brettski.com/2014/07/19/manual-smtp-test/
slug: manual-smtp-test
title: Manual SMTP Test
wordpress_id: 790
categories:
- Internet
- nerdiness
---

Because I tire of looking up each time when I need to send a test message, I am adding this here for a quick reference.

Commands are **bold
**data is _italics_


<blockquote>**telnet** _servername_ 25

**helo** _somename_

**mail from:**_mailname@example.com_

**rcpt to:**_mailname@example.com_
**rcpt to:**mailname2@example.com

**data**

**subject:**_your subject information here_

_Body stuff goes here and here and here, etcetera, etcetera..._

**.**</blockquote>


In case you aren't aware, you terminate an SMTP email with a period by itself on it's own line.  That is not a typo.

Of course now that I think about it, I will have to look this up as well, Google is probably faster.  :)


