---
title: 'Taking Another Look at GoDaddy'
date: '2009-01-09T04:12:33.000Z'
categories:
  - 'computer-hell'
  - 'internet'
slug: 'taking-another-look-at-godaddy'
---

It's been a bunch of months since I have look at other hosting.  For a few years now I have been using [iHostasp.net](http://www.ihostasp.net), and they are not a poor host, but I have had my [issues](http://brettski111.wordpress.com/2008/01/29/ihostaspnet-sucking-wind-again/) [with](http://brettski111.wordpress.com/2007/04/16/shortcomings-of-ihostasp/) [them](http://brettski111.wordpress.com/2007/06/03/big-issue-with-a-great-web-host/).

What I like most about [iHostasp.net](http://www.ihostasp.net) is that their middle plan support 3 separate web spaces, this is a huge plus, something you don't find too often in shared hosting.  They also allow 3 MS SQL databases and 5 MySql database.  All accessible from outside their network.  This was the main reason I went with them originally.  I can setup all typs of domains and sub-domains and virtual folders, that has never been an issue.

iHostasp.net has been slow to update their service and NEVER contact their clients when they make changes.  They changed the way you connect to databases from the outside, never said anything.  They updated to support .NET 3.5, and never said anything.  Plus, when I asked how to utilize it, I was told they would have to move me to a new server, which they did, but I lost all of my site stats.  They use SmarterStats, which has import capabilities, but it wasn't configured in a way that I could import my saved log files, and they didn't help me out in getting the files imported.

So sure they have been an OK host, and I have recommended them to others, but if I find a like deal with more stuff, well I have too investigate it.  I often wondered if they would care whatsoever if I left?

I was checking out my domain renewal dates on [GoDaddy](http://godaddy.com) and noticed that I had to free credits for shared host accounts.  Oh yeah, I said, forgot I have those.  I have used [GoDaddy](http://godaddy.com) often in the past, have had hosted and virtual dedicated services there.  I respect them and they have usually provided adequate support.    The two biggest items that kept me from using [GoDaddy.com](http://godaddy.com) is they don't (or didn't) support external access to databases and are in a timezone which does use daylight savings time.  Now the second part isn't that big of a deal, it only broke the [training](http://eve-igbtools.com/Tools/skilldatecalc.aspx) [calculators](http://eve-igbtools.com/Tools/skillCalc.aspx) on my eve-igbtools.com site, and only during daylight savings.

At the time, not being able to update my database from Enterprise Manager what just not an option.  Many of the planned application for that  site where very database intensive.  Only ever got around to writing one of them, and it's only accessible by me.

**GoDaddy's** hosting plans have really been enhanced since the last time I looked.  For the same $14.99 I pay at iHostasp, I can get unlimited domains, unlimited sql databases(!), unlimited MySql databases, IIS 7 (iHost doesn't have this), SSL cert(!), PHP support under windows and others. Oh and most importantly, remote access to databases!

Performance has been OK in the past, I wonder how that is now?  It says nothing a GoDaddy about multiple primary domains, which means everything will run in the same memory space.  I am not too crazy about that.  Probably the one thing which may keep from using them.  For most of my piddly apps it really isn't an issue, but it has been a useful configuration option.

_Update (1/9/2008) The shared host I am using is the basic, which only allows one domain.  Once this month is up (probably sooner knowing me) I will get a better plan to try out._

Not sure where I am headed right now, but I will check out the GoDaddy service again on my free token, and go from there.  I am paid up through March at iHostasp, I am sure I will know by then, and I will writeup my decision.
