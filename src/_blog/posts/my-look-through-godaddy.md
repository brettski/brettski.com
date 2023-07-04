---
title: 'My Look Through GoDaddy'
date: '2009-01-10T03:53:19.000Z'
categories:
  - 'experiment'
  - 'internet'
slug: 'my-look-through-godaddy'
---

Instead of creating a bunch of short articles, I am going to consolidate my experiences here. _Please note that this experiment is being conducted on GoDaddy's economy plan which came free with a domain purchase.  I assume its functional, just with the annoyance of ads.  Thinking about this now this experiment may not have much weight, since I don't know if these 'free' trials are throttled, etc._

- Making a connection to FTP took some time to complete File upload speeds where decent, but switching from file to file was very slow.  Updating a dozen files all of 80KB in size takes no less than 30 seconds, I would hate to see how long Mediawiki would take to upload.   I am using [FileZilla](http://filezilla-project.org/) as an FTP client. Sorry to keep adding to this bullet, but the more I use the FTP, the more the delays annoy me.  Just grabbing a file to edit it, is so much slower than my current host.
- Wow, this is annoying: There are ads on Yellow Error screens! Those sly bastards, the free one month hosting which comes with a domain uses ads.  That is just lame.  I understand it, but it's lame.
- The file manager is nice.  It allows you to upload files and zip and unzip files on the server, and edit files.  Of course other basic file manager stuff too. Screen loads of the file manager have a tendency to be slow.
- Woot, PHP now on a Windows host.  It's about time!
- While in their web manager, clicked on the help/blog link and the generic GoDaddy welcome page showed.  Nice.
- Having issues with file-level security.  A new app I am writing works with .NET's System.IO classes, and most of the calls fail under this hosting plan.  If the app is running at a virtual web of http://mydomain.com/myapp, I cannot change directories in the app to the root, it's not allowed.  I am unable to any System.IO.FileInfo methods on the files at all.  The ones I have tried are throwing a SecurityException.  :(

In a nutshell things aren't going great.  It' s just cumbersome to use their hosting.  Perhaps I prefer more control over my settings, I don't know.  The slow FTP is a huge factor.  30 seconds to upload 12 files with a total size of 80k, is just silly.  Sure it's only 30 seconds, but there is no room for scaling.

**Final word:** I'll stick with [iHostasp.net](http://www.ihostasp.net).  They may not offer as many items, but their service is much more solid.  Overall they ihostasp.net wins.  Just started hosting for my programming stuff with [Dreamhost.com](http://www.dreamhost.com/r.cgi?490900), for linux hosting, I haven't found [anything better](http://blog.brettski.com/2009/01/13/im-dreaming-about-dreamhost/).

For those of you pointing to [CrystalTech](http://crystaltech.com/), yes, I think they are a really good host, a bit expensive for me, for my use.  I have used them in business and they have rock solid hosting and excellent support.  Only one database and having to use code to map to other domains, isn't great for multiple projects.

In all fairness to GoDaddy's upload issue, I didn't realize the website I was using to check out their capabilities was a free website with my domain, not a one month subscription for a website.  So it makes sence that they would throttle the hell out of it.  It would be useful if the would indicate something along those lines.
