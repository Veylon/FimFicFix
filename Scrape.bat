@ECHO OFF
REM This batch file goes through tags in http://www.fimfiction.net/tag/*
REM via number and lists out existing tags

REM This prevents issues within the below for loop
SETLOCAL EnableDelayedExpansion
REM Beginning tag set here
SET ID=0
REM Writes header to output file
Echo ID Name > Tags.txt
:Loop
	REM Quit when this number is reached
	IF "%ID%" == "500" GOTO EndLoop
	REM Use WGET to download each web page
	wget --no-check-certificate --output-document=scrape.txt http://www.fimfiction.net/tag/%ID%
	REM To find the actual name of the tag, we have to find some kind of self-reference
	REM There is a tag of the form "


<form enctype="multipart/form-data" method="post" action="/tag/TAG_NAME">" that works
	REM It's the only tag that uses enctype, so we search for that.
	REM Then we split the line that it's on by slashes. The forth token is the name of tag
	FOR /F "tokens=4 delims=//" %%A in ('FINDSTR "enctype" scrape.txt') do (
		SET TAG=%%A
		REM The last "> is chopped away
		SET TAG=!TAG:~0,-2!
		REM The Tag Number and Name are appended to the output file
		ECHO %ID% !TAG! >> Tags.txt
	)
	REM Increment the loop counter
	SET /A ID+=1
	GOTO Loop
:EndLoop
REM And we're done
ECHO Done