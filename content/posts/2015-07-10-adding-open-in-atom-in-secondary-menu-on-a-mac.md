---
author: brettski111
comments: true
date: 2015-07-10 01:54:10+00:00
layout: post
link: http://blog.brettski.com/2015/07/09/adding-open-in-atom-in-secondary-menu-on-a-mac/
slug: adding-open-in-atom-in-secondary-menu-on-a-mac
title: Adding "Open in Atom" In Secondary Menu On A Mac
wordpress_id: 818
categories:
- MacBook Pro
- nerdiness
tags:
- Apple
---

So recently I purchased my first Mac. After 30+ years of using Microsoft OS's for the majority of my work I have gone to the other side and purchased a MacBook Pro.  It is a great computer, something I may go into with another post.  There are UI elements I miss from Windows, some I have found ways to do in iOS and other I have been not so lucky.

One feature I use constantly on my Windows machines which is missing on the MacBook is to right click on a file and choose Notepad++ (or Atom, etc.) to open that file.  This is regardless of the file type, I am not referring to file associations to applications here.

[![PC right-click](https://brettski111.files.wordpress.com/2015/07/pc-right-click1.png?w=150)](https://brettski111.files.wordpress.com/2015/07/pc-right-click1.png)

Not having this functionality while working on my Mac really slows me down at times.  I needed a solution and found one, and would like to share it with you now.

The solution uses an application called Automator.  Automator was already installed on my machine, I don't know if it standard or not.  Now that I have done it, the process is quite simple (there is a reference image at the end of the post):



	
  1. Open Automator

	
  2. Create a new document of type **System**

	
  3. In Library select **Files & Folders**

	
    1. This will open options in the next pane




	
  4. In the next pain select **Open Finder Items** then drag this into the workflow pane

	
  5. Within the item you just dragged in is a dropdown labeled: **Open With:**

	
    1. Select the application you want to open the folder or file with.  I have selected _Atom_.




	
  6. At the top of the workflow pane are two dropdown selectors.

	
    1. The first selector choose, **files or folders**

	
    2. The second selector choose, **Finder**

	
    3. So it should read, "_Service receives selected files or folders in finder_"




	
  7. Save the document with the name that you want displayed in the right-click (secondary) menu

	
    1. I used "_Open with Atom_"





That is all there is to it. If you open Finder and right-click on a file or folder you will see the option Open with Atom (or whatever you decide to call it).

[![Mac - Open in Atom](https://brettski111.files.wordpress.com/2015/07/finder-openinatom.png?w=150)](https://brettski111.files.wordpress.com/2015/07/finder-openinatom.png)











Setup in Automator:

[![automator-setup](https://brettski111.files.wordpress.com/2015/07/automator-setup.png?w=300)](https://brettski111.files.wordpress.com/2015/07/automator-setup.png)
