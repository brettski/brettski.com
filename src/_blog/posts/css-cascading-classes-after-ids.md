---
title: "CSS Cascading classes after Id's"
date: "2011-11-15T03:34:46.000Z"
categories: 
  - "programming"
  - "that-poop-is-cold"
tags: 
  - "css"
slug: "css-cascading-classes-after-ids"
---

I ran into a styling issue last night and it is driving me nuts.  I have found a work-around, but I want to see if I can figure out how to do this way.

I have a span tag which I am using for a button.  This button calls a JavaScript function to test blog posting settings.  I am using a span because it was easy enough to style.

CSS:

```css
#VerifyBlogClick { /\*#696969\*/ color:#575757; border:1px solid gray; background-color:#eee; padding:2px 5px 2px 5px; margin:0 0 0 13px; border-radius: 2px; } #VerifyBlogClick:hover { color:Black; background-color:#bbb; cursor:pointer; } .verifierRunning { padding-right:30px; background-image:url(ajaxloaderBlue.gif); background-repeat:no-repeat; background-position:right; }
```

HTML:

```html
<span id="VerifyBlogClick" onclick="javascript:verifyBlog\_click()" title="Tries to send an unpublished test post to your blog">Verify Blog</span>
```

JavaScript:

```js
$('#VerifyBlogClick').addClass('verifierRunning');

// ... stuff

$('#VerifyBlogClick').removeClass('verifierRunning');
```

Basically what I have here is a span styled like a button.  When the button is clicked I add the class .verifierRunning to the span tag using jquery. This class changes border-right to 20px and defines a background image (a loading image).

The problem that I am running into is that any properties defined in the id selector are not overridden by the class.  It seems that id's always have a higher precedence than a class.  I can't believe that there isn't a way around this, though I have not been able to find anything on the web which will work.

My work-around this is to change VerifyBlogClick to a class.  I don't mind doing this, I would just like to find out a way to do this the other way.
