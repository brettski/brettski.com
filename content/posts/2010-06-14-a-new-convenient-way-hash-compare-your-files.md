---
author: brettski111
comments: true
date: 2010-06-14 03:52:42+00:00
layout: post
link: http://blog.brettski.com/2010/06/13/a-new-convenient-way-hash-compare-your-files/
slug: a-new-convenient-way-hash-compare-your-files
title: A new convenient way hash compare your files
wordpress_id: 479
categories:
- nerdiness
- programming
tags:
- BDFileHash
---

I just finished a new file hashing tool, [BD File Hash](http://bdfilehash.codeplex.com/), which is hosted on [CodePlex](http://www.codeplex.com) under the Microsoft Public License (Ms-PL).

The goal behind this Windows tool is an easier way to verify files you download from the internet.  Many applications, ISO's, and other files usually list a hash with them.  This hash is used to verify the file you downloaded is the same file the author meant you to download.  It prevents you from using corrupt or exploited downloads by allowing you to verify the file before you use it.

The problem I had with most file hashing tools, is that they needed to be run from a command line, or you had to open the hash value into a text editor and copy/paste it into the hashing application to be compared. So I wanted [BD File Hash](http://bdfilehash.codeplex.com/) to be a convenient way to verify files using hashes.

BD File Hash has the following capabilities:



	
  * Right click any file and select BD File Hash from your Send To menu

	
  * Use a file picker to select the file with the authors hash value, it will automatically be parsed from the file and entered into the BD File has application

	
  * Easily hash to files to see if they are the same

	
  * Supports MD5, SHA-1, and SHA-256

	
    * Please recommend any other hashing algorithms you may need.




	
  * Save your default hash type to the one you use most often


BD File Hash requirements:

	
  * .NET 3.5 SP1

	
  * Windows Installer 3.1


**Give [BD File Hash](http://bdfilehash.codeplex.com/) a try today!**
