---
title: "A problem has been encountered while loading the setup components"
date: "2009-01-11T17:17:33.000Z"
categories: 
  - "bug"
  - "computer-hell"
  - "internet"
slug: "a-problem-has-been-encountered-while-loading-the-setup-components"
---

A new installation of VS2008 Team Edition said it was missing a dll.  Other methods I found to add the dll failed as the whole directory under c:\\windows\\WinSxS where the dll should be, was missing.  Perhaps I forgot something during the install; I went to Add/Remove programs and clicked the VS2008 installation.  After the installer, did this and that a dialog box poped up reading:

> A problem has been encountered while loading the setup components

After clicking OK on the dialog the installer just closed.  This isn't good, I thought to myself.

I found [this](http://michaelquerimit.spaces.live.com/blog/cns!2B1DFAAEC9E12F27!153.entry) post through google which fixed my issue

There is a critical hotfix (kb952241) which is creating this issue with Visual Studio 2008.  Removing this hotfix and rebooting my computer allowed me to successfully run the installer again.

For reference I have included the entry in Windows update for this hotfix.

<table border="0" cellspacing="0"><tbody><tr class="sys-table-cell-bgcolor1"><td>Visual Studio 2008</td><td><a class="sys-link-normal">Security Update for Microsoft Visual Studio 2008 (KB952241)</a></td><td><img title="Succeeded " src="images/status_successful.gif" alt="Succeeded "></td><td>Saturday, November 01, 2008</td><td>Microsoft Update</td></tr></tbody></table>

Not sure if I will be prompted again to load the hot fix (I am sure I will) or how sever the security hole is that this is suppose to fix.

As always, I hope this helps one other out there.  If you have any further information about this issue, please put in the comments and I may add it to the post.

**Update:** Now of course Windows Update wants to load the hotfix every day I boot up.  I an not sure if I want to load it again for obvious reasons.

**4/1/2010**: I am loading my new Windows 7 computer and much after loading VS2008 and SP1, I realized I failed to load unit test support (Doh!).  When I went to load the feature in VS2008, I received a similar error as before.  The difference this time, the hot fix isn't on my system, its now incorporated into SP1.

To fix this issue and let me select new features in vs2008:

1. I had to remove VS 2008 SP1
2. Update the features using VS 2008 installer
3. Reload SP1.

A pain in the ass, but it does work.

To remove VS2008 SP1, go to Programs and Feature (or Add/Remove Programs) and click **View installed updates**. You will find it listed in here, and uninstall it from here.
