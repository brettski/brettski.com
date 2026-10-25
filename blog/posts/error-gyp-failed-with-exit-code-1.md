---
title: '"Error: `gyp` failed with exit code: 1"'
date: '2020-02-03T13:46:17.000Z'
categories:
  - 'macbook-pro'
  - 'programming'
slug: 'error-gyp-failed-with-exit-code-1'
---

It seems after every MacOS update these days I get this reoccurring issue about not being able to build GYP in a node project. I got tired of looking up the references to fix it and am consolidating them here for future reference.  
Note: October 2020 update at the bottom (x-code 12).

## The Error

The error that is thrown (or close to it is):

gyp ERR! build error
gyp ERR! stack Error: \`make\` failed with exit code: 1
gyp ERR! stack at ChildProcess.onExit (/usr/local/Cellar/node@10/10.18.1/lib/node_modules/npm/node_modules/node-gyp/lib/build.js:191:23)
gyp ERR! stack at ChildProcess.emit (events.js:198:13)
gyp ERR! stack at Process.ChildProcess.\_handle.onexit (internal/child_process.js:248:12)
gyp ERR! System Darwin 19.3.0
gyp ER

## The Fix

XCode CLTools is require for this to work. I don't know the details, only what has corrected this for me in the past.

Check if installed:  
`/usr/sbin/pkgutil --packages | grep CLTools`

Nothing will be returned if they are not present. If they are, ¯\\\_(ツ)\_/¯, more research I guess.

Install XCode cli only (may need to use `sudo`:  
`xcode-select --install`

If you received the error, **"xcode-select: error: command line tools are already installed, use "Software Update" to install updates"** you will need to remove the xtools first. Per the [documentation](https://developer.apple.com/library/archive/technotes/tn2339/_index.html#//apple_ref/doc/uid/DTS40014588-CH1-HOW_CAN_I_UNINSTALL_THE_COMMAND_LINE_TOOLS_) you do that by:  
`sudo rm -rf /Library/Developer/CommandLineTools`

Run the install again, and all should install as expected (may need to use `sudo`).  
`xcode-select --install`

Once the install is complete recheck if CLTools are present:  
`/usr/sbin/pkgutil --packages | grep CLTools`

You should received a response something like:

com.apple.pkg.CLTools_Executables
com.apple.pkg.CLTools_SDK_macOS1015
com.apple.pkg.CLTools_SDK_macOS1014
com.apple.pkg.CLTools_macOS_SDK

That's it, try your build again.

**October 2020 Update Note:**

I still run into this issue after most updates. It happened again after the macOS 10.15.7 update. Though this time when running the install (`sudo xcode-select --install`) a message popped up that the software could not be found on the server. After some Duck Duck Googling I found the X-Code CLI Tools download. After installing this I was back in action and able to build again.

The URL [https://developer.apple.com/download/more/?=command%20line%20tools](https://developer.apple.com/download/more/?=command%20line%20tools)
