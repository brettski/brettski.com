---
author: brettski111
comments: true
date: 2010-12-25 06:06:07+00:00
layout: post
link: http://blog.brettski.com/2010/12/25/ef-code-first-datetime2-to-datetime-out-of-range/
slug: ef-code-first-datetime2-to-datetime-out-of-range
title: EF Code First datetime2 to datetime out-of-range
wordpress_id: 514
categories:
- programming
- that poop is cold
---

It has been /_interesting_/ working with Entity Framework (EF).  With my first couple of sites I used Linq to SQL, and I really liked it.  It's pretty simple once you get the gist of it.  Though now Microsoft recommends the use of Entity Framework (EF) and Linq to Entities.  Well using Linq against EF is really no different then Linq to SQL so the transition was pretty simple.  Here is a good [beginner walk-through](http://naspinski.net/post/Getting-started-with-Linq-To-Entities.aspx) I ran into.

The part I like most about EF is Code First.  I can define my classes, relationships and inheritance and EF creates the database for me.  Need to add some properties, no problem, add them and remap (or recreate) the database.

Sure there are a few short comings like no foreign key constraints on none primary keys.  This is a pretty big deal, but nothing that can't be handled in code (at least for my small sites).  I wonder how it's handled with database first models, I'll have to experiment with that some day.

The other shortcoming I found is with date fields.  It seems EF automatically works with database [datetime2](http://technet.microsoft.com/en-us/library/bb677335.aspx) field types but only creates [datetime](http://msdn.microsoft.com/en-us/library/ms187819.aspx) field types in its database create scrips.  This perplexed me for some time until I discovered what was really going on, and the temporary fix is pretty darn simple.

Each time you create a new script by running "Generate database from model..."--the script which is created is opened in Visual Studio (eg. myModel.edmx.sql).  Before you run it or close it, do a find and replace on the file.  Yes you guessed it, **find datatime and replace it with datetime2**.  Simple straight forward and works like a charm, as long as you remember to do it.

Happy coding!
