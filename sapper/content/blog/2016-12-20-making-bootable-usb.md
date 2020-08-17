---
author: brettski111
comments: true
date: 2016-12-20 19:31:34+00:00
layout: post
link: http://blog.brettski.com/2016/12/20/making-bootable-usb/
slug: making-bootable-usb
title: Making Bootable USB
wordpress_id: 931
categories:
- general
---

Creating a bootable USB

I am always needing this info and so many articles are too long or in video form, so I created this abridged version.

Mount ISO image using OS or third party app like [Virtual Clone Drive](https://www.elby.ch/en/products/vcd.html) by Elaborate Bytes

For this run-through we assume the **USB** is mounted as **E:** and the **ISO** is mounted as **F:**

## Diskpart:

_Assume the USB drive shows as Disk 2_

* Select disk 2
* clean
* create partition primary
* select partition
* active
* format fs=exfat quick label="mylabel"
* exit

## Make bootable:

_I used /net60 as I was doing Server 2016 at the time_

* cd f:\boot
* f:> bootsect /nt60 e:

## Copy Files From ISO to USB:

* robocopy f:\ e:\ /e /mt:24

Should be all good to go
