---
author: brettski111
comments: true
date: 2012-01-30 02:02:52+00:00
layout: post
link: http://blog.brettski.com/2012/01/29/enterprise-class-mobile-phones/
slug: enterprise-class-mobile-phones
title: Enterprise Class Mobile Phones
wordpress_id: 601
categories:
- interesting view
- Internet
- security
tags:
- mobile phone
---

## You Just Can't Secure Them


As I dig deeper into IT security and am exposed to more and more about security I can't help to think about things from a security point of view.  It is getting to the point where the security point of view to something is my first point of view.

As usual this time of year, I am involved in a lot of different audits and reviews.  While going through a clients requirements for their vendors I started to think about mobile phone.  Not any in particular, but all of them in general and how much the space has changed over the last five years.

What I am really curious about is why nobody seems to be leading the enterprise space for mobile phone and devices.  Sure it seems iPhone is taking over and are a huge presence in corporate environments; though from a security point of view its all a scary proposition.

What is missing is the ability force policy and lock-down mobile phones and devices.  I can't set policies to say, all phones must have a password, and that password must be at least six digits long.  Sure these parameters can be set from the phone, but not being able to centrally control this stuff is a big fail.

Now Windows phone 6.5 was a big piece of crap, I know this, but what it had that most others do not is the ability to set policy on the phone from active directory.  Exactly what you need to do in an enterprise.  If you are running a Blackberry server you have some good controls around the phone, though I know fortune 500 companies who are dumping their BES servers for Blackberry Express Servers because it's just too much money to maintain the BES server for an ever-dying space.

I guess I understand why Microsoft jumped after the consumer phone space, wanting to jump on iPhone bandwagon, but they left a huge space untapped.  I saw a tweet today that only 6% of Chinese have cell phone, and what a space to get into.  I guess there is a lot of potential there, but personally I find it easier to make money closer to home, and here in the States we need enterprise class phone.  Top functioning iPhone, Windows Phone 7 class phones with a solid ability to set policies on them and restricting users from overwriting those policies.

I am not sure who will be first but I can't wait.  Whomever it is, they will produce billions in revenue, billions.

Perhaps what needs to be done is not rely on the phone development companies but third parties to develop controls for mobile phones, so a whole gamut of phones can be locked down by central policy.  The company would need to build apps for the different phone types and be able to lock those apps down so they cannot be uninstalled by users, or if they are the needs to auto-wiped at the same time.

It's not horrible that phone development companies are concentrating on the user experience, there are a lot of really great phones being produced.  Someone needs to move on the security space around these phones as the continue to infiltrate deeper and deeper into corporate America.


## A Software Application Idea


I work in a Windows world, so this idea is from a Windows Server view. Build an application which installs in active directory which allows you to register users phones with their user accounts.  On the phones an application is installed which is used to force the policy on the phone.  I wonder if there would be issues controller password, and other security aspects of a phone.  Meaning, will the manufactures allow you access to those parts of the phone with their SDKs.

Load the application on the phone, register the phone with AD and allow the system to lock down the phones based on the policies you have set.  As long as the application is found on the phone (plus verification through certificates) the phone may be used and send/receive email, etc.

If the application is removed from the phone, the phone is auto-whipped.  This application can also provide encryption services for the phone.  PGP verify emails on your phone anyone?

This can't be an original idea, but I do like it.  It is a great way to allow the phone development companies to concentrate on UX and someone else enterprise security.  Hardware support for this would be useful too.

Tell me what you think of this idea, or if it already exists, point it out to me, I would love to check it out.

3/11/2012 Update:

So my new employer is using a company for this exact purpose, http://www.good.com.  Good technology which interacts with the companies Exchange server instead of the phone.  It allows the removal of service without having to wipe everything on the phone when an employees leaves.  To me not a great solution, but a solution nonetheless.


