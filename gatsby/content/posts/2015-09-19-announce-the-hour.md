---
author: brettski111
comments: true
date: 2015-09-19 03:30:30+00:00
layout: post
link: http://blog.brettski.com/2015/09/18/announce-the-hour/
slug: announce-the-hour
title: Announce The Hour
wordpress_id: 817
categories:
- MacBook Pro
- nerdiness
tags:
- hack
---

In June I purchased my first MacBook Pro (I should really write about this sometime).  One simple feature I really enjoy is that the machine will announce the time at the top of each hour.  I don't know why, I just really like that feature.

At work I am still on Microsoft Windows-based machines and wanted to have this same feature on them.   So I did some digging around and found a VBScript that will do it.  I added the code below to a sayhour.vbs file and set up as a scheduled task to run at the top of the hour.  I have all my clocks showing 24 hour time so their is no need for AM or PM, which personally drives me batty anyway.

    
    ' Say the following hour
    Dim speaks, speech
    speaks= "It's " & hour(time) & " hours"
    set speech = CreateObject("sapi.spvoice")
    speech.Speak speaks


Spending so much time in PowerShell now I wanted to solve this same issue there.  Again some looking around and digging in to the C# library SpeechSynthesizer I have a solution.  This too will run from a scheduled task.  The only part I have not been able to figure out is how to keep the cmd box to show when it runs.  The below code is saved in a sayhour.ps1 file and set up as a schedule task to to run at the top of the hour.

    
    # Say the following hour
    Add-Type -AssemblyName System.speech
    $speech = New-Object System.Speech.Synthesis.SpeechSynthesizer
    $speech.Speak("It's $((Get-Date).hour) hours")



    
    
    I know have my machine at work saying the hour at the top of the hour.  I quite like it.



