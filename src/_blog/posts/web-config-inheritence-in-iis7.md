---
title: "web.config inheritence in IIS7"
date: "2011-08-12T04:52:50.000Z"
categories: 
  - "computer-hell"
  - "nerdiness"
tags: 
  - "asp-net"
  - "hosting"
  - "iis7"
slug: "web-config-inheritence-in-iis7"
---

I learned something new over the last week which I not exactly sure of the benefit of.  Probably because I still not entirely sure on how it is implemented.

It seems that in IIS7 that the default functionality is that the web.config in the root website is inherited to the child webs.

Of course I found this the hard way.  I changed to a new [web host](http://www.arvixe.com) and while setting up my base sites I wanted to try out a few new applications.  I setup [Umbraco](http://umbraco.com) under a sub-domain and played around with that for a while and remembered [Orchard](http://orchardproject.net/) from [MVConf](http://www.mvcconf.com/).  I setup a virtual directory, /orchard, and loaded up the site.

I kept receiving 500 errors when going to the site.  There was a whole round of support emails around figuring out where the errors where steaming from.  Once I found out I learned about the IIS7 inheritance.

For starters I want to list the ways I found to disable the inheritance and then move on to how this could be useful.  (Man it's always something)

First was the instructions from the [Arvixe](http://support.arvixe.com) staff (which I think they found on [SO](http://stackoverflow.com))

```
<location path="." inheritInChildApplications="false">     <system.web>      ...     </system.web> </location> 
```

There is also three examples in the IIS.NET bog: [http://blogs.iis.net/steveschofield/archive/2009/09/19/control-web-config-inheritance-with-iis-7-asp-net-options.aspx](http://blogs.iis.net/steveschofield/archive/2009/09/19/control-web-config-inheritance-with-iis-7-asp-net-options.aspx)

1. You can set the **enableConfigurationOverride** attribute to false for an application pool
2. **allowSubDirConfig=false (as above)** [http://msdn.microsoft.com/en-us/library/ms689469.aspx](http://msdn.microsoft.com/en-us/library/ms689469.aspx)
3. [inhertInChildApplications](http://msdn.microsoft.com/en-us/library/system.configuration.sectioninformation.inheritinchildapplications.aspx) [property](http://msdn.microsoft.com/en-us/library/ms689469.aspx)

I haven't tried all of these yet.  If you have leave a comment on how it well worked. It seems this functionality is enabled when the AppPool is set Integrated mode.

I just [read](http://forums.iis.net/t/1170819.aspx) one suggestion to use <clear /> what was inherited in certain sections.

Now for some reasoning on why this functionality was added

For now I just have this link from [ASP.NET MSDN library](http://msdn.microsoft.com/en-us/library/ms178685.aspx).  It starts out with:

> _"You can distribute ASP.NET configuration files throughout your application directories to configure ASP.NET applications in an inheritance hierarchy. This structure allows you to achieve the level of configuration detail that your applications require at the appropriate directory levels without affecting configuration settings at higher directory levels."_

I have some reading to do...

Update (8/14/2011): Reading an informative article on [iis.net](http://www.iis.net), [Understanding Sites, Applications, and Virtual Directories on IIS 7](http://learn.iis.net/page.aspx/150/understanding-sites-applications-and-virtual-directories-on-iis-7/)

The only problem I have with the article is that there absolutely no details on any of the information provided.  Yet it's a good overview of what they have done in the new version.

Now here are the details I have been looking for: [http://learn.iis.net/page.aspx/243/aspnet-integration-with-iis-7/](http://learn.iis.net/page.aspx/243/aspnet-integration-with-iis-7/)

 

[IIS7 Configuration Reference on IIS.NET](http://www.iis.net/ConfigReference)

 

Reading on...
