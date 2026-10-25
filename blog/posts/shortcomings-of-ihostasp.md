---
title: 'Shortcomings of iHostASP'
date: '2007-04-16T21:52:11.000Z'
categories:
  - 'computer-hell'
  - 'internet'
slug: 'shortcomings-of-ihostasp'
---

I think I have been using [iHostASP.net](http://ihostasp.net) for a month now, and I still think there service is good (3/5). I have come across a couple of settings on there servers which really kind of suck.

I asked about sub-domains, as one of my utility [sites](http://eve.brettski.com) uses a sub-domain. I came across two issues, one, I didn't see or figure out any way to user virtual directories with sub domains, and two, I wasn't seeing any statistics for my sub-domain. So I emailed support to find out what's up. After waiting a week for a response, I replied to the email to bump it back up in there queue and indicated that is what I was doing, and I finally received a reply. The replay I received is:

<clip>

Hi Brett, I'll try to address your questions:

1. Sub-domain is a third level domain rooted in a separate folder
   below the /wwwroot, a sub-domain does not have any other features such
   as virtual folders or statistics that are available for the hosted
   domain.

2. Internally sub-domain has it's own IIS site and a different subset
   of log files. The SmarterStats only reads log files associated with
   the hosted domain.

IHost, LLC
Customer Support

</clip>

To me this really sucks, as I like to segregate stuff with sub-domains, and I get no virtual directory support or statistics. The statistic thing really bugs me.

But as I keep having to tell myself, "You get what you pay for."

They give you 3 separate directory spaces for three domains and 3 sql server 2005 database, which I can't find anywhere for $15 a month. So I guess here I stay until I feel like putting a server in my basement and prey I get enough upload bandwidth for the site.
