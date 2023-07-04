---
title: 'Manual SMTP Test'
date: '2014-07-19T20:03:20.000Z'
categories:
  - 'internet'
  - 'nerdiness'
slug: 'manual-smtp-test'
---

Because I tire of looking up each time when I need to send a test message, I am adding this here for a quick reference.

Commands are **bold** data is _italics_

> **telnet** *servername* 25
>
> **helo** *somename*
>
> **mail from:**_mailname@example.com_
>
> **rcpt to:**_mailname@example.com_ **rcpt to:**mailname2@example.com
>
> **data**
>
> **subject:**_your subject information here_
>
> _Body stuff goes here and here and here, etcetera, etcetera..._
>
> **.**

In case you aren't aware, you terminate an SMTP email with a period by itself on it's own line.  That is not a typo.

Of course now that I think about it, I will have to look this up as well, Google is probably faster.  :)
