---
author: brettski111
comments: true
date: 2011-07-28 14:28:19+00:00
layout: post
link: http://blog.brettski.com/2011/07/28/net-4-0-and-iis6-bug/
slug: net-4-0-and-iis6-bug
title: .NET 4.0 and IIS6 bug (eurl.axd)
wordpress_id: 519
categories:
- bug
- computer hell
tags:
- ASP.NET
- IIS
- IIS6
---

I ran in to an interesting issue yesterday.  In an IIS 6 web server we have a website set to run ASP.NET 4.0.  I was configuring a virtual directory to run under ASP.NET 2.0 to run [ScrewTurn Wiki](http://www.screwturn.eu). Our standard config has the DefaultAppPool configured with ASP.NET 2.0 applications which don't require their own pool.  The wiki was running without issue.  I decided to put the wiki in it's own pool for various other reasons.

So I proceeded to configure a new application pool templated from DefaultAppPool.  Once the new application pool was assigned to the virtual web I started noticing some strange behavior.  Anytime I requested a URL which didn't include  a page name my get request would include the file eurl.axd.  For ScrewTurn this means everytime you request the main url, it says it cant find the page named eurl, very annoying.

I wrestled for a while trying to figure out why this was happening.  At first I didn't realize it had to do with the new app pool.  After a some googling time I cam across a Microsoft article of .NET 4 breaking changes which contained the issue I ran into.  (Very strange, http://www.asp.net is down right now with an error screen...). To test this further I changed another running web application to this app pool (which was running under DefaultAppPool) and it did the same thing, looked for eurl.axd on the request.

The article can be found here: [http://www.asp.net/learn/whitepapers/aspnet4/breaking-changes#0.1__Toc256770153](http://www.asp.net/learn/whitepapers/aspnet4/breaking-changes#0.1__Toc256770153) and explains why this is happening.  In a nutshell it has to do with the website running ASP.NET 4.0 and virtual webs running ASP.NET 2.0.

What I find very strange about this bug is that as long as I use the DefaultAppPool I don't have this issue (and yes, the website itself has it's own app pool).  I only experience the bug when a new app pool is created for the virtual web which is running ASP.NET 2.0.

keys: eurl, eurl.axd,
