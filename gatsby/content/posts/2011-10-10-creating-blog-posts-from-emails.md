---
author: brettski111
comments: true
date: 2011-10-10 04:35:24+00:00
layout: post
link: http://blog.brettski.com/2011/10/09/creating-blog-posts-from-emails/
slug: creating-blog-posts-from-emails
title: Creating blog posts from emails
wordpress_id: 542
categories:
- Internet
- programming
tags:
- ASP.NET MVC
- Blog by Email
---

For some time now I have wanted to post to a blog from an email account.  Some blog engines these days have this functionality, like Wordpress and TypePad.  Some through plug-ins and some built in.  I have used the Wordpress plug-in on a test installation, and it works pretty well.  Though Wordpress is probably my most preferred blogging engine, most of the time when I am installing blogs, it's on a Microsoft stack and I am not big on running PHP on Windows.  On the Windows stack I really like using [Blogengine.NET](http://www.dotnetblogengine.net/).  I find it to be a very capable blogging engine.  The only problem is, at least to date, I have not found a plug-in for it to post by email.  What it does support though is XML-RPC.

With the Help of the [XML-RPC.NET](http://www.xml-rpc.net/) library and a few hours away from the family, I through together a rough blog posting application.

I added in [OpenPop.NET](http://sourceforge.net/projects/hpop/), a popmail client library I have used in the past, and now have a way to collect emails.  Now all I needed to do is tie them all together.

The outcome is Blog by Email ([http://blogbyemail.com](http://blogbyemail.com)).  An online service for setting up email accounts to post to blogging engines.  Besides looking like crap (I am using the generic MVC layout), it is functioning well. I am hoping my [buddy](http://davekoppe.com) will give me a hand coming up with a real design for the site.

The biggest challenge to setup posting to a blog is finguring out what XML-RPC entry point is, and what the blogging engine uses for the Blog Id.  The blog id is often the name of the blog, but I found in MovableType it uses the actual integer value assigned to that blog.  Bit of a pain to get that value.  A cool aspect of MovableType is that it generates a password to use for posting via XML-RPC.  A nice security feature.

Speaking of security, to protect the users entered credentials I am encrypting both usernames and passwords in the database.  Also, each user is given a unique key pair when the sign up with the service.  Little steps to make it harder to get this information in case someone does hack the application.



If you need to post to your blog from a POPMAIL email address, give Blog by Email a try.  The service is free (at least until it grows to the point where it needs a bigger web server).

While the site is getting off the ground and I get the code stable, [registration ](http://blogbyemail.com/account/register)is closed.  There is a form request an account.  I am looking for people to help test the system, so if you are interested please let me know.

Brett

[http://blogbyemail.com](http://blogbyemail.com)
