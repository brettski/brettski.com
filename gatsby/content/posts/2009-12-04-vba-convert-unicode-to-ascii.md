---
author: brettski111
comments: true
date: 2009-12-04 21:18:16+00:00
layout: post
link: http://blog.brettski.com/2009/12/04/vba-convert-unicode-to-ascii/
slug: vba-convert-unicode-to-ascii
title: VBA Convert Unicode to ASCII
wordpress_id: 438
categories:
- nerdiness
- programming
---

## 




## Unicode Characters converted to ASCII string


I hacking together a report today and discovered the Unicode text I received was actually in Unicode not ASCII.

Basically I have this:  こんにちは

And I want this:   [![](http://brettski111.files.wordpress.com/2009/12/unicodestring.png)](http://brettski111.files.wordpress.com/2009/12/unicodestring.png)

By using AscW(Char) you can convert a Unicode character into an integer value.  Add some delimiters to encode the string and you have a [Unicode HTML Entity Reference](http://en.wikipedia.org/wiki/Unicode_and_HTML).  It isn't perfect, as AscW(Char) sometimes returns a negative number, which isn't allowed, though this is an easy work around explained [here](http://support.microsoft.com/kb/272138).  It is used below.

[sourcecode language="VB"]
Public Function UnicodeToAscii(sText As String) As String
  Dim x As Long, sAscii As String, ascval As Long

  If Len(sText) = 0 Then
    Exit Function
  End If

  sAscii = ""
  For x = 1 To Len(sText)
    ascval = AscW(Mid(sText, x, 1))
    If (ascval < 0) Then
      ascval = 65536 + ascval ' http://support.microsoft.com/kb/272138
    End If
    sAscii = sAscii & "&#" & ascval & ";"
  Next
  UnicodeToAscii = sAscii
End Function
[/sourcecode]


## Now lets go the other way: ASCII string to Unicode


Now I have this:  [![](http://brettski111.files.wordpress.com/2009/12/unicodestring.png)](http://brettski111.files.wordpress.com/2009/12/unicodestring.png)

And I want this:  こんにちは

I remembered that ChrW(int) will convert character codes to their associated character.  I really wasn't in the mood to write parsing logic and test it, but luckily I came across a class which does this.  I ripped out the method I needed and it worked great in all it's simplicity.  I have included this function below:

[sourcecode language="VB"]
Public Function AsciiToUnicode(sText As String) As String
  Dim saText() As String, sChar As String
  Dim sFinal As String, saFinal() As String
  Dim x As Long, lPos As Long

  If Len(sText) = 0 Then
    Exit Function
  End If

  saText = Split(sText, ";") 'Unicode Chars are semicolon separated

  If UBound(saText) = 0 And InStr(1, sText, "&#") = 0 Then
    AsciiToUnicode = sText
    Exit Function
  End If

  ReDim saFinal(UBound(saText))

  For x = 0 To UBound(saText)
    lPos = InStr(1, saText(x), "&#", vbTextCompare)

    If lPos > 0 Then
      sChar = Mid$(saText(x), lPos + 2, Len(saText(x)) - (lPos + 1))

      If IsNumeric(sChar) Then
        If CLng(sChar) > 255 Then
          sChar = ChrW$(sChar)
        Else
          sChar = Chr$(sChar)
        End If
      End If

      saFinal(x) = Left$(saText(x), lPos - 1) & sChar
    ElseIf x < UBound(saText) Then
      saFinal(x) = saText(x) & ";" 'This Semicolon wasn't a Unicode Character
    Else
      saFinal(x) = saText(x)
    End If
  Next

  sFinal = Join(saFinal, "")
  AsciiToUnicode = sFinal

  Erase saText
  Erase saFinal
End Function
[/sourcecode]

I didn't always understand why you wouldn't just want to work with the Unicode characters themselves.  Well is seems that not all applications treat Unicode the same way and the characters may be changed.  If you are storing and passing around a text representation of the characters there is no way for them to be misinterpreted.

One of the neatest things I like about this is that I can just put the text represented Unicode in a web page and the browser will automatically convert it to Unicode characters.  This is the reason I needed to use an image above to show what the text represented Unicode looks like.  If I just put the string there, it is converted by the browser when displayed.

If you have been to this post in the past, you have probably noticed that it has changed a bit.  That is because I had it all backwards! Yeah well it happens.  I said I want wanted to change Unicode characters to Ascii string, but the code actually was for the other way around.  Well I finally got around to fixing this and made sure that code worked before displaying it.  I hope this helps someone out there.
