---
title: 'Error Opening Microsoft SQL Server management Studio'
date: '2008-06-05T16:47:07.000Z'
categories:
  - 'computer-hell'
slug: 'error-opening-microsoft-sql-server-management-studio'
---

When trying to connect to a new database engine, I would would receive the following error:

> TITLE: Microsoft SQL Server Management Studio ------------------------------

```sh
> Unable to cast COM object of type 'System.\_\_ComObject' to interface type 'Microsoft.VisualStudio.OLE.Interop.IServiceProvider'. This operation failed because the QueryInterface call on the COM component for the interface with IID '{6D5140C1-7436-11CE-8034-00AA006009FA}' failed due to the following error: No such interface supported (Exception from HRESULT: 0x80004002 (E\_NOINTERFACE)). (Microsoft.VisualStudio.OLE.Interop)
```

I found two resources to fix this; the first is a registry hack, the second refers to dll to register. I chose the second and my issue went away.

[http://forums.microsoft.com/MSDN/ShowPost.aspx?PostID=120476&SiteID=1](http://forums.microsoft.com/MSDN/ShowPost.aspx?PostID=120476&SiteID=1)

[http://support.microsoft.com/kb/953492/en-us](http://support.microsoft.com/kb/953492/en-us)

As you can see the second link is from Microsoft support, which I gravitated toward fist. I used the components guid, 6D5140C1-7436-11CE-8034-00AA006009FA, for my search.

Good luck, I hope this helps someone out there
