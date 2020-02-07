---
author: brettski111
comments: true
date: 2009-07-03 05:18:40+00:00
layout: post
link: http://blog.brettski.com/2009/07/03/boot-from-a-vhd-in-window-7/
slug: boot-from-a-vhd-in-window-7
title: Boot From a VHD in Window 7
wordpress_id: 355
categories:
- nerdiness
tags:
- Windows7
---

I couldn't believe my ears when I heard this today on [DNR](http://dotnetrocks.com) show number [458](http://www.dotnetrocks.com/default.aspx?showNum=458) (great show by the way).  [Scott Hanselman](//www.hanselman.com/) was explaining how he mutli-boots his machine not using partitions but VHD (Virtual Hard Disk) files.  There is a way in Window 7 to point your boot loader to, and run from a VHD file.  The OS DOES NOT run in a VM, it is running on bare metal!  The only down side is a slight reduction in disk I/O, but hell, what a traid-off!

My first question is that VHD transferable to a VM?  Sure all the hardware would change but would it work?  I'd really not like to go the other way, that seems even messier to me.

Ah hell what does it matter, I can boot OS's from a file!, save them easily and move them around.  What a great/easy way to checkout new software.  Seeing that I am just getting into vs2008 and vs2010 beta 1 is out and I want to check it out.  This way I can with out plowing my machine or messing up my current build.

I know I am going to try this one out on my new Windows 7 RC1 installation.  I will write it up here while I am doing it.

Here is an artical from [Keith Combs ](http://blogs.technet.com/keithcombs/archive/2009/05/22/dual-boot-from-vhd-using-windows-7-and-windows-server-2008-r2.aspx)and another from[ TechNet ](http://edge.technet.com/Media/Windows-7-Boot-from-VHD/)Edge
