---
title: 'Adding "Open in Atom" In Secondary Menu On A Mac'
date: '2015-07-10T01:54:10.000Z'
categories:
  - 'macbook-pro'
  - 'nerdiness'
tags:
  - 'apple'
slug: 'adding-open-in-atom-in-secondary-menu-on-a-mac'
---

So recently I purchased my first Mac. After 30+ years of using Microsoft OS's for the majority of my work I have gone to the other side and purchased a MacBook Pro.  It is a great computer, something I may go into with another post.  There are UI elements I miss from Windows, some I have found ways to do in iOS and other I have been not so lucky.

One feature I use constantly on my Windows machines which is missing on the MacBook is to right click on a file and choose Notepad++ (or Atom, etc.) to open that file.  This is regardless of the file type, I am not referring to file associations to applications here.

<a href="/images/blog/pc-right-click1.png"><img alt="menu right click" width="200" src="/images/blog/pc-right-click1.png"></a>
<!--
<a href="/images/blog/"><img alt="" width="200" src="/images/blog/"></a>
-->

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

<a href="/images/blog/finder-openinatom.png"><img alt="Mac - Open in Atom"  width="300" src="/images/blog/finder-openinatom.png"></a>

Setup in Automator:

<a href="/images/blog/automator-setup.png"><img alt="automator-setup" width="300" src="/images/blog/automator-setup.png"></a>
