---
title: 'MBP Now Always Booting to External Partition'
date: '2015-12-05T18:20:29.000Z'
categories:
  - 'computer-hell'
  - 'macbook-pro'
  - 'nerdiness'
tags:
  - 'howto'
slug: 'mbp-now-always-booting-to-external-partition'
---

Another issue has arisen with my Windows 10 external boot on my Mac Book Pro.  There was an large update for Windows 10 which was failing. The reason, you can't install windows on a usb flash drive using setup.  Sigh.

After a quick google search the fix was simple enough.  You simply go to registry key **HKLM:\\SYSTEM\\CurrentControlSet\\Control** and change the value for **PortableOperatingSystem** from **1** to **0**.

The part I didn't expect is that now my MBP wants to boot the the external drive by default.  I am sure setup changed this in the boot partition.  My fear is bricking the MBP partition as I am not as familiar with its configuration.  I can still easily hold down the option key to cho0se the partition to boot to, though I don't want to do this each time going into OSX as I use it 90% of the time now.

Under system preferences I opened Startup Disk, unlocked it and selected the Macintosh HD drive (the only one in the list by the way as my external drive is disconnected).  I then clicked the restart button.

Hey, that worked, cool.  The MBP now boots to OSX on restart or power-up, nice.

I have always known Microsoft OS's to be a bitch with boot partitions (thinking back to old Linux multi-boot systems I had).  It has just been a while since I have been bit by it and I guess in a way I would have hoped they would have improved on things a bit.
