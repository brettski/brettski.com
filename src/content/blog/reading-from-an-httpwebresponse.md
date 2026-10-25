---
title: Reading from an HttpWebResponse
date: '2008-02-02T03:38:23.000Z'
tags:
  - programming
draft: false
---
//Get response
HttpWebResponse response = (HttpWebResponse)request.GetResponse();

StreamReader sr = new StreamReader(response.GetResponseStream());
result = sr.ReadToEnd();
sr.Close();
Console.WriteLine(result);
