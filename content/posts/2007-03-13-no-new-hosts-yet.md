---
author: brettski111
comments: true
date: 2007-03-13 11:51:48+00:00
layout: post
link: http://blog.brettski.com/2007/03/13/no-new-hosts-yet/
slug: no-new-hosts-yet
title: No New Hosts Yet
wordpress_id: 24
categories:
- computer hell
- Internet
---

I am exhausted looking for hosts, so to divert my energy elsewhere I thought I may try something new.  I have some stupid EVE [Tools](http://eve.brettski.com) I built for EVE Online and figured I would try building them in [PHP](http://php.net).  Why PHP?  Simple, everybody is doing it.  I don't know why really, I have seen the language around for quite some time now and there are many, many websites and applications which use it, so what the heck.

I will say it doesn't take long at all to get up to speed, it's a pretty simple language.  Having to write html just sucks, but that's something I haven't enjoyed, ever.   Basically, I hate html and it's different support between browsers (why do table never layout properly?).  The tools have to be on the web, so html it is.

I have to say the one thing I really, really don't like about [PHP](http://php.net) is that you can't declare explicit/strict variables.  That is, variables must be declared before they are used.  This is achieved by using 'option explicit' at the top of asp (vb script) pages.   Perhaps I am just not smart enough to remember all of the variables I have used, or misspelled; I'll just let the parser handle it.  I have just burned myself too many times in the past missing a capital letter in a variable, or something like that.   This made me think, well, why not just use vb script then.  Well, they way PHP works with web elements is a lot nicer then asp.  I have only done some basic stuff with database access in PHP, so I cannot speak to that just yet, and being a long, long time user of ado, I may be a bit skewed.  I have a lot of database work to do on the EVE Tools, so I will get my feel for it's use with databases pretty quick.  I have also noticed that PHP is OOP, it supports classes.  Pretty cool, makes things a bit cleaner. Of course the first thing I noticed about the PHP classes is that they don't have setter's and getter's for the properties.  It seems properties are created by making a variable public.  Well, I don't like that type of access to my variables and using methods to set and get property values just seems wrong, but manageable.

Saturday night I was working on the PHP version of EVE [Tools](http://eve2.brettski.com) and discovered that [godaddy](http://www.godaddy.com) have depreciated their support for PHP on their windows servers.  They run PHP 4.3.11 (I wonder if there are any security holes there?), and have no plans to keep it up or move to version 5, which I am utilizing.  I figured, 'what the heck', lets get a Linux host, it's only $4 bucks a month, then I could also try out some of them Linux only web tools available (e.g. gallery).   That failed as godaddy was having trouble accepting my shopsafe credit card number.

I guess since I am just playing around, the need for a better host isn't required just yet.  If I stay on the Linux side of things, there are hosts that also have svn support, which is very attractive.  It would be cool to find a hosting plan that supported both Windows and Linux, but I am sure it wouldn't be cheap.
