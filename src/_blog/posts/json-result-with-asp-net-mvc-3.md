---
title: 'json result with asp.net mvc 3'
date: '2011-11-13T09:51:10.000Z'
categories:
  - 'computer-hell'
  - 'programming'
tags:
  - 'asp-net-mvc'
  - 'blog-by-email'
slug: 'json-result-with-asp-net-mvc-3'
---

I just took the long silly way around to return a json result to  a page.  I kept trying to send a json string back as just that, a string and it just wouldn't work.  Whenever JavaScript received the string it didn't know what to do with it, except treat it as a string of course.  I banged my head against this one for too many hours.  Though my persistence payed off.

As the night got later (I think it's 03:00 about now) I decided to figure out how others are returning json object from ASP.NET MVC.  It isn't as simple as it should be, but not too difficult.  The biggest issue, as with much in MVC land is the huge lack of documentation.  So looking up something like [JsonResult](http://msdn.microsoft.com/en-us/library/system.web.mvc.jsonresult.aspx), yields a pretty useless help page.  So more time had to go into discovering on how to actually use this cool new result type.

It turns out you can set up and action with a return type of JsonResult (it's usually ActionResult) and have that action return a json object.  I am not even going to pretend I can do this from other objects like [json.net](http://james.newtonking.com/pages/json-net.aspx 'json.net') (from James Newton-King).  I am using this to return a model as json which populates my form with on-demand instructions.  This library rocks, but I digress.

The basic structure I used is a dictionary object

```csharp
public JsonResult MyAction() { Dictionary<string, string> dict = new Dictionary<string, string>(); dict.Add("keya", "valuea"); dict.Add("keyb", "valueb"); return Json(dict); }
```

That's pretty much it in a nutshell.  Json() is a new web helper in MVC3.  You can find it at System.Web.Helpers.

I saw one example where you can build an object on the fly, but I couldn't get it to work.  It basically looks like this:

```csharp
//.... return Json(new {keya = valuea, keyb = valueb};
```

The dictionary generic works for now.  If you know of a better way, please let me know.
