---
author: brettski111
comments: true
date: 2008-02-02 03:38:23+00:00
layout: post
link: http://blog.brettski.com/2008/02/01/reading-from-an-httpwebresponse/
slug: reading-from-an-httpwebresponse
title: Reading from an HttpWebResponse
wordpress_id: 78
categories:
- programming
---

<tt><tt>//Get response
    HttpWebResponse response = (HttpWebResponse)request.GetResponse();
    
    StreamReader sr = new StreamReader(response.GetResponseStream());
    result = sr.ReadToEnd();
    sr.Close();
    Console.WriteLine(result);</tt></tt>
