---
author: brettski111
comments: true
date: 2012-10-14 00:05:40+00:00
layout: post
link: http://blog.brettski.com/2012/10/13/changing-workgroup-in-window-home-server-2011/
slug: changing-workgroup-in-window-home-server-2011
title: Changing Workgroup in Window Home Server 2011
wordpress_id: 638
categories:
- computer hell
- nerdiness
---

After spending my Saturday getting my new Windows Home Server 2011 server setup just right (I am plowing and installing over WHS v1) I came to the realization that the workgroup is stuck at WORKGROUP.  Stuck you ask? Yes, stuck.  Since WHS2011 is using certificate services you can't change the workgroup name through computer properties. Plus for some reason the setup wizards never asked.

I did come across a post that said you can press <alt>+<f10> at the computer name screen and set it, but I was way to far into my fourth load to start over again now (Yes I would have if I didn't find this great little [video](http://www.logicalflux.com/2012/01/changing-the-workgroup-on-windows-home-server-2011-video/)).  Using PowerShell type in the following two lines of script.  Your workgroup name will be updated.  Remember no spaces etc.

[sourcecode]
$sysinfo = Get-WmiObject Win32_ComputerSystem
$sysinfo.JoinDomainOrWorkgroup("workgroupname")
[/sourcecode]



Of course now that I am done, this shows up in search from TechNet: [http://social.technet.microsoft.com/wiki/contents/articles/4127.how-to-change-a-workgroup-name-on-windows-home-server-2011-and-windows-storage-server-2011-r2-essentials-en-us.aspx
](http://social.technet.microsoft.com/wiki/contents/articles/4127.how-to-change-a-workgroup-name-on-windows-home-server-2011-and-windows-storage-server-2011-r2-essentials-en-us.aspx)
I am simply listing this that it may assist someone, I have no idea if this may break something on other systems.  It worked for me very well, but I must express, use at your own risk.
