---
title: "A run-in with custom helper extensions"
date: "2011-10-14T23:07:34.000Z"
categories: 
  - "nerdiness"
  - "programming"
tags: 
  - "asp-net-mvc"
slug: "a-run-in-with-custom-helper-extensions"
---

While working on Blog by Email ([http://blogbyemail.com](http://blogbyemail.com "Blog by Email")) I came across the necessity to create my own HTML helper class.  For those who don't know helper classes "...reduce the amount of tedious typing of HTML tags that you must perform to create a standard HTML page."

The registration request form on the site was getting hit pretty hard by spam bots and I was getting tired of cleaning up the mess, so I decided to add a captcha.

ReCaptcha is what I decided on and started down the rabbit hole.  First of all there was only ASP.NET examples.  Since I was writing this in ASP.NET MVC, I wanted to use a more, "MVC" approach to it.  I came across an post on [Devlicio.us](http://devlicio.us/) named [Using ReCaptcha with Asp.Net MVC](http://devlicio.us/blogs/derik_whittaker/archive/2008/12/02/using-recaptcha-with-asp-net-mvc.aspx).  The post covered exactly everything I need, what it was missing is details around its steps, specifically _Step 5 - Create a Html Helper to build and render the Captcha control_. It shows the current code and nothing else:

```csharp
public static string GenerateCaptcha( this HtmlHelper helper ) { var captchaControl = new Recaptcha.RecaptchaControl { ID = "recaptcha", Theme = "blackglass", PublicKey = -- Put Public Key Here --, PrivateKey = -- Put Private Key Here -- }; var htmlWriter = new HtmlTextWriter( new StringWriter() ); captchaControl.RenderControl(htmlWriter); return htmlWriter.InnerWriter.ToString(); } 
```

My first thought, is cool, I can just add an HTML helper to the view to generate the captcha, this is a good approach.

First stumble, that is a method, that needs to go into a class--what class should it go in to?

No problem, I'll just look up creating helper methods.  That was an easy search which rendered an ASP.Net site page, [Creating Custom HTML Helpers](http://www.asp.net/mvc/tutorials/creating-custom-html-helpers-cs).  Great, now I have my examples.  I matched it to an extension method; okay, I get that, I have used those before.  I learned the syntax and added it to my site.

It doesn't come up in Inteli-sense.  What can it be.  I changed all kinds of things around, from renaming the class, to changing the method name.  I was wondering if it followed some naming scheme like controllers and models do.  I don't recall it needing to.

I decided to browse though the comments, see if anyone else ran into this.  And there is was, someone named, [ianchadwick](http://forums.asp.net/members/ianchadwick.aspx) mentioned a way to make the namespace global in the web.config.  Well, damn, that is it, the view doesn't know about my namespace BlogByEmail.Helpers.  I added @using BlogByEmail.Helpers; to the top of the page, and everything fell into place.

To use the helper in the view simply use @Html.Raw(Html.GenerateCaptcha())

Html.Raw is needed to keep MVC from HTML Encoding the output.

Damn I feel dumb sometimes.  ...back to my code!
