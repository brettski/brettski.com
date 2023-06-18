---
title: "Bin Deployable Running VS2010 ASP.NET MVC 3 project in VS2012"
date: "2012-11-20T05:30:08.000Z"
categories: 
  - "computer-hell"
  - "programming"
tags: 
  - "asp-net-mvc"
  - "blog-by-email"
  - "howto"
slug: "bin-deployable-running-vs2010-asp-net-mvc-3-project-in-vs2012"
---

All my main development machines are now running Visual Studio 2012.  I have a few new projects in VS2012 and have begun updating my old projects to it as well.  I ran into an annoying issue today that I need to post.

My [Blog by Email](http://www.blogbyemail.com "Blog by Email") site was built using VS2010 and ASP.NET MVC 3.  My new machine, which I am working on right now, is running Windows 8 and VS2012.  Recently a new user started using the site and discovered a few bugs I needed to get fixed.  I cloned the repo from [Bitbucket](http://bitbucket.org) and opened the solution in VS2012.

My first tip-off that there was an issue is when the Migration Report displayed 7 errors all on the \_bin\_deployableAssemblies\\ folder.

BlogByEmail\\\_bin\_deployableAssemblies\\Microsoft.Web.Infrastructure.dll: Failed to backup file as C:\\vsp2k12\\BlogByEmail\\Backup\\BlogByEmail\\\_bin\_deployableAssemblies\\Microsoft.Web.Infrastructure.dll 
BlogByEmail\\\_bin\_deployableAssemblies\\System.Web.WebPages.Razor.dll: Failed to backup file as C:\\vsp2k12\\BlogByEmail\\Backup\\BlogByEmail\\\_bin\_deployableAssemblies\\System.Web.WebPages.Razor.dll  (... Plus 5 more files)

My second is when I went to run the project and the build failed for the same 7 files.

If you recall the \_bin\_deployeableAssemblies folder is used to aid in bin deploying MVC 3 applications to \[shared\] hosts which don't have ASP.NET MVC 3 loaded.  You can read more about it [here](http://haacked.com/archive/2011/05/25/bin-deploying-asp-net-mvc-3.aspx "Bin deploying ASP.NET MVC 3") \[@[haacked.com](http://haacked.com)\].

It turns out this isn't required in VS2012 as I found [here](http://stackoverflow.com/a/9593577/5836 "(Stackoverflow) ") :

> Starting with MVC 3 Tools Update we are now using Nuget package references, which means that your project is automatically bin-deployable. Since the tooling gesture is no longer necessary it was removed from VS 11.

[![](http://brettski111.files.wordpress.com/2012/11/2012-11-19_22h56_05.png?w=247 "2012-11-19_22h56_05")](http://brettski111.files.wordpress.com/2012/11/2012-11-19_22h56_05.png)The fix here is really simple.  Remove the files and \_bin\_deployableAssemblies folder from your project.  Everything should compile just fine.

Now the one part I have not figured out is where or how we get the files that used to be in \_bin\_deployableAssemblies.  I don't see them in the bin folder as I assumed they would be.  I will need to do some test deployments at my host, [Arvixe](http://www.arvixe.com) (I think they didn't have MVC 3 loaded).  Add a comment below if you h ave some knowledge around this.
