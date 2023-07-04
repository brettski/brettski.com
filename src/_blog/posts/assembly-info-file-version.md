---
title: 'Assembly Info... File Version'
date: '2010-08-21T03:04:29.000Z'
categories:
  - 'nerdiness'
slug: 'assembly-info-file-version'
---

You would think it's simple enough to get the file version information as it is set in Visual Studio's UI setting, but it wasn't for me.  Even after Googling around I only discovered how to the the Assembly version, not the file version.  Well not until I found [this article](http://all-things-pure.blogspot.com/2009/09/assembly-version-file-version-product.html). The information is at the end of it and it basically goes like this:

string fileVersion = FileVersionInfo
.GetVersionInfo(Assembly.GetExecutingAssembly().Location).FileVersion;

I then also wanted to get the date too.  This is how I did it:

string fileDate = System.IO.File
.GetCreationTime(Assembly.GetExecutingAssembly().Location)
.ToString("MMMM dd, yyyy")

FileVersionInfo is at System.Diagnostics Assembly is at System.Reflection

The best thing is I no longer have to remember to set this stuff before packaging up my app for shipment.  Like I am doing right now:  BD File Hash version 1.0.10 going out right now.
