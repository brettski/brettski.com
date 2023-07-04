---
title: 'Install MoinMoin on Dreamhost. A Walk Through'
date: '2009-11-21T06:12:58.000Z'
categories:
  - 'internet'
  - 'nerdiness'
  - 'tutorial'
tags:
  - 'dreamhost'
  - 'howto'
  - 'moinmoin'
slug: 'install-moinmoin-on-dreamhost-walk-through'
---

The goal of this document is to walk through the installation of a [MoinMoin](http://MoinMoin.in) wiki without getting bogged down in any details.  We'll go through requirements, decisions, and steps to complete, that's all.  (OK, I did end up indicating what directories are added; I can't stand when stuff is added I don't know about.)   I will follow up this post with the details for those who are interested. Once you have completed the steps herein you will have a working MoinMoin wiki on your Dreamhost.com shared hosting account.  By no way is this the only way to set up MoinMoin on an account, or even the best way, but I tested it and it will work.  Lets get to it!

## Requirements

- [Dreamhost](http://www.dreamhost.com/r.cgi?490900) shared hosting account.
- A domain setup as fully hosted
- Shell and FTP access to the domain account

## Assumptions

- Dreamhost running python version 2.4
- MoinMoin version 1.8.5
- Understanding of editing files from Linux shell
- **acctname** is the accout name you used to access your domain account through ssh and FTPS.
- ~/ = $HOME = /home/_acctname_/

## Decisions

- URL to run wiki from (we use sub directory) \[We will use: http://hosteddomain**/wiki**\]
- Private name for the wiki's instance name \[We will use: **dhwiki**\]

## Steps

1. Download MoinMoin wiki tarball from http://moinmo.in/MoinMoinDownload ([moin-1.8.5.tar.gz](http://static.moinmo.in/files/moin-1.8.5.tar.gz)) to your local workstation.
2. From FTP: upload file to Dreamhost into folder ~/files \[/home/acctname/files\] \*\* All commands from now on are from your shell access \*\*
3. `cd ~/files`
4. `tar -xvzf ~/files/moin-1.8.5.tar.gz \[new directory is created: ~/files/moin-1.8.5`
5. `cd ~/files/moin-1.8.5`
6. `python setup.py --quiet install --prefix=$HOME --record=install.log`

   \[two directories created: ~/share/moin; ~/lib/python2.4/site-packages/MoinMoin\]

7. Setup environment variables
   1. export PREFIX=$HOME
   2. export SHARE=$PREFIX/share/moin
   3. export WIKILOC=$SHARE
   4. export INSTANCE=dhwiki
8. `cd $WIKILOC`
9. `mkdir $INSTANCE`
10. `cp -R $SHARE/data $INSTANCE`
11. `cp -R $SHARE/underlay $INSTANCE`
12. `cp $SHARE/config/wikiconfig.py $INSTANCE`
13. `chmod -R o+rwX $INSTANCE`
14. Edit file $INSTANCE/wikiconfig.py Find and change the follwing lines:
    1. sitename = u'_Your Wiki Title_'
    2. logo_string = u'<img src="/wiki/common/moinmoin.png" alt="MoinMoin Logo">'
    3. Remove hash (#) in front of: page_front_page = u"FrontPage"
    4. data_dir = '/home/_acctname_/share/moin/_dhwiki_/data/'
    5. data_underlay_dir = '/home/_acctname_/share/moin/_dhwiki_/underlay/'
    6. url_prefix_static = '/wiki'   \[(remove # from line)\]
    7. mail_smarhost = "_dreamhost smtp server_"
15. `cd ~/hosteddomain`
16. `cp -R $SHARE/htdocs wiki`
17. `chmod -R a+rX wiki`
18. `cd wiki`
19. `mkdir ./cgi-bin`
20. `cp $SHARE/server/moin.cgi ./cgi-bin`
21. `chmod -R a+rx ./cgi-bin`
22. `cd ./cgi-bin`
23. Edit file moin.cgi Find and change the following lines.  Please remove the # if they exist on THESE lines:
    1. sys.path.insert(0, 'home/_acctname_/lib/python2.4/site-packages')
    2. sys.path.insert(0, '/home/_acctname_/share/moin/_dhwiki_'_)_
24. cd ..
25. Edit file index.html Find and change the following lines:
    1. `<meta http-equiv="refresh" content="0; URL=cgi-bin/moin.cgi/">`
    2. Click `<a href="cgi-bin/moin.cgi">here</a> to get to the FrontPage`
26. **Go to your favorite browser and enter your wiki's domain:** **Http://hosteddomain/wiki**

_Use these instructions at your own risk.  I extend no warranties or guarantees about the accuracy or safety of your data or website._

These instructions where tested by building the following wiki: http://MMonDH.brettski.com/wiki

All comments are welcome

### References Used

- http://master.moinmo.in/MoinMoin/InstallDocs#basic-install
- http://www.wombatnation.com/misc/installMoinMoinDreamHost.html

### Revision Information

- 11/21/2009
  - Initial post after successfully building a wiki following exact steps

<table id="BodyTable" style="text-align:left;font-family:Segoe UI;table-layout:fixed;font-size:75%;vertical-align:top;" cellspacing="0"><tbody><tr style="background-color:#e0edff;"><td><span style="color:windowtext;">Is this a negotiation, or are you just not interested? I am spending about 40k a month right now on consultants, so I have plenty of money to spend. Culture, to me it's directly impacted by budget and resources. At the time that we spoke my budget isn't nearly as high as it is right now. If you are talking about working evenings you do that already.</span></td></tr><tr style="background-color:#e0edff;"><td>11/20/2009</td><td></td><td>8:11:16 PM</td><td></td><td>mikeg1@ephmc.com (E-mail address not verified)</td><td></td><td>Brettski *red+u</td><td></td><td><span style="color:windowtext;">When we first spoke, I was under the impression you no longer available after 6:00. You underpromised, so you could over deliver. I found out later that you were one of the hardest working guys that I know.</span></td></tr><tr style="background-color:#e0edff;"><td>11/20/2009</td><td></td><td>8:13:30 PM</td><td></td><td>mikeg1@ephmc.com (E-mail address not verified)</td><td></td><td>Brettski *red+u</td><td></td><td><span style="color:windowtext;">Maybe you don't want to work that hard which is why it became an issue for you when I was pressing it. When I interview people, I always try and understand where their comfort levels are so I understand their boundries. The way I saw it is you wanted to have dinner with your family and got back on the computer later. Here is what I would ask for you to do.</span></td></tr><tr style="background-color:#e0edff;"><td>11/20/2009</td><td></td><td>8:15:12 PM</td><td></td><td>mikeg1@ephmc.com (E-mail address not verified)</td><td></td><td>Brettski *red+u</td><td></td><td><span style="color:windowtext;">Look at your last month, and figure how many hours you really worked. Was it 40-50? 50-55? or +55 hours per week? I am interested in knowing because I am guessing your somewhere between 50-55.</span></td></tr><tr style="background-color:#e0edff;"><td>11/20/2009</td><td></td><td>8:18:46 PM</td><td></td><td>mikeg1@ephmc.com (E-mail address not verified)</td><td></td><td>Brettski *red+u</td><td></td><td><span style="color:windowtext;">When we were in our discussions, you were giving me the perception that it could cause a problem for you at home if you were hoing to have to put in over 45 hours. What I really think is if you could make $110,000 in a 50 hour work week, or you could make $150,000 in a 60 hour work week I think you would probibly work 60. And then figure how you could get it down to 55... and then 52...</span></td></tr><tr style="background-color:#e0edff;"><td>11/20/2009</td><td></td><td>8:21:25 PM</td><td></td><td>mikeg1@ephmc.com (E-mail address not verified)</td><td></td><td>Brettski *red+u</td><td></td><td><span style="color:windowtext;">And at the same time you were doing that, you would get me from 65 to 58, and 58 to 52, and so on. So at the end of the day, it really comes down to how much my time is worth as well as your time. Which is something you might not be taking into consiteration when you limit your opportunities and not discussing this further.</span></td></tr><tr style="background-color:#e0edff;"><td>11/20/2009</td><td></td><td>8:23:43 PM</td><td></td><td>mikeg1@ephmc.com (E-mail address not verified)</td><td></td><td>Brettski *red+u</td><td></td><td><span style="color:windowtext;">Currently, I have 3 consultants I am paying 170,000 and they are not as smart as you are. They are down the street and you were down the block. At a certain point, I am sure you can understand that I can only afford to spend so much time in IT. I am ready to discuss dollars if you are. I am willing to discuss the boundries, or we can not discuss it at all.</span></td></tr><tr style="background-color:#e0edff;"><td>11/20/2009</td><td></td><td>8:24:56 PM</td><td></td><td>mikeg1@ephmc.com (E-mail address not verified)</td><td></td><td>Brettski *red+u</td><td></td><td><span style="color:windowtext;">Hopefully you at least know where I am comming from. Bottom line, I am sitting here writing big checks saying to myself. Would I be writing checks this big and having to invest the time if Brett were here?</span></td></tr><tr style="background-color:#e0edff;"><td>11/20/2009</td><td></td><td>8:27:22 PM</td><td></td><td>mikeg1@ephmc.com (E-mail address not verified)</td><td></td><td>Brettski *red+u</td><td></td><td><span style="color:windowtext;">I don't mind writing the checks, what I mind is when I have ot write the checks and still put in the time. You asked me what my commitment to you would be. If we were to do something, I told you I would give you a year of 60 hours a week of helping you acclimate yourself to our company. Thats a big investment of my time. I apprechiated the question because no one had ever asked me before.</span></td></tr><tr style="background-color:#e0edff;"><td>11/20/2009</td><td></td><td>8:29:59 PM</td><td></td><td>mikeg1@ephmc.com (E-mail address not verified)</td><td></td><td>Brettski *red+u</td><td></td><td><span style="color:windowtext;">So here is what you have to ask yourself... Do I want to pass on the biggest financial opportunity of my life without going to see this man? The question I would ask you, is why would you want to limit your opportunities?</span></td></tr><tr style="background-color:#e0edff;"><td>11/20/2009</td><td></td><td>8:34:35 PM</td><td></td><td>mikeg1@ephmc.com (E-mail address not verified)</td><td></td><td>Brettski *red+u</td><td></td><td><span style="color:windowtext;">The only thing I can think of is that you would be affraid of the industry, maybe that you were getting dragged into the deep end of the pool, giving up a job that I like that I am currently doing. Also, I did hire a senior level programmer for more money than you were asking for when you were interviewing and I am willing to pay him. Because I see how much value he brings me.</span></td></tr><tr style="background-color:#e0edff;"><td>11/20/2009</td><td></td><td>8:35:27 PM</td><td></td><td>mikeg1@ephmc.com (E-mail address not verified)</td><td></td><td>Brettski *red+u</td><td></td><td><span style="color:windowtext;">I guess the question I would ask you is would you be willing to work with a programmer that makes more money that you did if he had the tallent?</span></td></tr><tr style="background-color:#e0edff;"><td>11/20/2009</td><td></td><td>8:38:26 PM</td><td></td><td>mikeg1@ephmc.com (E-mail address not verified)</td><td></td><td>Brettski *red+u</td><td></td><td><span style="color:windowtext;">We have an aggressive agenda, I am looking to bring in top guys to make my life easier. I think you would be a good fit. Tallent costs money, I realize that. Something to consider, the banks are looking to change the comp plans for the Loan Officers and cut what they pay the Loan Officers by 50% of what they pay now. They are doing this as a result of the pressure they are getting from the gov</span></td></tr><tr style="background-color:#e0edff;"><td>11/20/2009</td><td></td><td>8:39:50 PM</td><td></td><td>mikeg1@ephmc.com (E-mail address not verified)</td><td></td><td>Brettski *red+u</td><td></td><td><span style="color:windowtext;">The insurance companies that own mortgage companies are following suit. Which means that we have hundreds of people who are looking at our company as a result of massive pay cuts across the industry, which we are not participating in doing.</span></td></tr><tr style="background-color:#e0edff;"><td>11/20/2009</td><td></td><td>8:41:18 PM</td><td></td><td>mikeg1@ephmc.com (E-mail address not verified)</td><td></td><td>Brettski *red+u</td><td></td><td><span style="color:windowtext;">I know you have been looking for that 1 opportunity that you could capitalize on. Maybe this is it? Is it really that far from the relm of possibility?</span></td></tr></tbody></table>
