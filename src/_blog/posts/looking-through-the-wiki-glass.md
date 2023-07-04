---
title: 'Looking Through the Wiki Glass'
date: '2008-08-21T18:41:58.000Z'
categories:
  - 'computer-hell'
  - 'nerdiness'
slug: 'looking-through-the-wiki-glass'
---

I am no newcomer to wiki's though it has been a couple years since I have seen the new products.  Since a few of us at work have been throwing around ideas of wiki's as knowledgebases, I thought I was look into them again.

I must say, not a whole lot has changed.  Sure some of the products have newer web features, but I have one desire, I just want to edit a wiki page in the same manor I do a Word document.  I understand the limitations, etc. but I don't care, it's still how I want to handle it.

So I tried out a couple of products, well the ones I could setup on my [ihostasp.net](http://ihostasp.net) web, anyway.

Well TikiWiki installed, but I couldn't get it to run for the first time, the tiki-setup.php file which is ran first time in the application kept dropping off the last directory of my installation (d:/wwwroot/mydomain/ which TikiWiki determined should of been d:/wwwroot/mydomain/tiki).  I found some forum posts, but nothing I could apply  to get it working.  I will have to dig into the code which is grabbing the physical path to figure this out.  OK, that one is on the back burner for now. Tried versions 2.0 and 1.9.? same deal with both.

MediaWiki loaded up real easily, but it's sure cumbersome to get around.  I guess it makes sense, the product is designed for huge installations usually in farms.  Great install though.

Looked at MoinMoin, which comes highly rated requires Python, so that's a show stopper on my web host.  I may still try it out on a CentOS virtual I have at home.

You know I guess something I don't like about wiki's is the wiki syntax, it's just a pain.  Wordpress has sure come a long way with it's latest updates, perhaps this would work for us?  No real search capabilities though.

This certainly has been an interesting trip down wiki lane and it really didn't get me much further then I got before.  I am intersted in where my endevors in the wiki world will bring me tonight...

Well it is night now, and funny thing about the tikiwiki, I found where the issue is and it was moved from version 1.9.

File is /tiki/lib/setup/tikisetup.class.php and it's how the base pathe is retrieved.

```sh
       if (strpos($\_SERVER\['SERVER\_SOFTWARE'\],'IIS')==TRUE){
		if (array\_key\_exists('PATH\_TRANSLATED', $\_SERVER)) {
        	$docroot = dirname($\_SERVER\['PATH\_TRANSLATED'\]);
		} else {
			$docroot = getcwd();
		}
        }
```

Basically the software is using PATH_TRANSLATED for IIS and my host is not sending the full physical path, but the physical path of the web root. So I simply changed it:

```sh
       if (strpos($\_SERVER\['SERVER\_SOFTWARE'\],'IIS')==TRUE){
		if (array\_key\_exists('PATH\_TRANSLATED', $\_SERVER)) {
        	    // $docroot = dirname($\_SERVER\['PATH\_TRANSLATED'\]);
                    $docroot = getcwd();
		} else {
			$docroot = getcwd();
		}
        }
```

And that is simply that.  Took me to long to find the statement, must mean I need to get out of my lazy manager's chair more often.
