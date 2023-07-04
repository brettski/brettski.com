---
title: 'Installing ASP.NET MVC On iHostasp.net server'
date: '2009-04-23T02:56:22.000Z'
categories:
  - 'computer-hell'
tags:
  - 'asp-net-mvc'
  - 'ihostasp-net'
slug: 'installing-aspnet-mvc-on-ihostaspnet-server'
---

> \*\* To save you time of reading through this, you can't cleanly use MVC on iHost\*\*

I have been playing around with [ASP.NET MVC](http://asp.net/mvc) for at least six months now and was estatic when the version 1.0 released during [MIX09](http://live.visitmix.com/).

Some time around preview 3 I wanted to put one of my MVC sites out at [iHostasp.net](http://ihostasp.net) where I host all my Microsoft technology-based stuff.  I first hit a roadblock because the .NET 3.5 Framework wasn't available for my domain.  I looked at iHost's website and found it listed and asked, wtf?

It was a simple enough request, they just moved my domains over to one of their servers with the 3.5 framework installed.  The only issue this caused is that I lost all of my site statistics.  The moved forced me to reconfigure SmarterStats (a decent free offering from them) for the new server.

Figured I was all set now, but no, MVC required IIS7 to work with regular routing.  Well it failed and I went over to godaddy and ran it on a free (came with domain purchase) server instance (which is horrible) for some testing, etc.

Now I am back and documenting my findings for whatever. First to note is that in the ASP.NET 1.0 Release Notes.doc file a reference is made to [Phil Haack's](http://haacked.com) website for [Bin Deploying ASP.NET MVC](http://haacked.com/archive/0001/01/01/bin-deploy-aspnetmvc.aspx).  Searching for this on Phil's site yeilds nothing, so I have linked it above.

It's really simple to do, just set the following references to "Copy Local".

System.Web.Mvc System.Web.Routing System.Web.Abstractions

From VS2008, locate the references section in the Solution Explorer.  Locate each of the three references (dll's) above, right click on them, and choose properties.  From the Properies view, change Copy Local: False to Copy Local: True.

That's it.  When you compile or publish your solution the DLL's for those three references will be added to the bin folder.

After all of that, it still will not work as the routing will not work correctly without hacking iis settings a bit.  Forgot about this and I had actually tried all of this already about 45 days ago.

As stated in [Using ASP.NET MVC with Different Versions of IIS](http://www.asp.net/learn/mvc/tutorial-08-vb.aspx) there are two options available for IIS6 and below:

1. Modify your route table to use filenames (ewe)
2. Create a wildcard script map (requires access to IIS)

So the \[my\] only option is to wait for an unknown amount of time until iHostasp.net decides to start ii7 installations.   Their support told me that they plan to, but have no schedule set. This is a real bummer about ASP.NET MVC, but I'll get over it.  :)
