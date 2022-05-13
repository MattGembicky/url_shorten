# URL Shorten exercise

## Used Technologies:

Client: React, Typescript and less

## Documentation

### Shortening URL

Users can input a URL and click “shorten” to send entered URL to the server where the URL is shortened to 7 characters.
If Url is shortened to an already used short URL then the short URL is extended with a character in CHARSET. The maximum length of a short URL is 16 characters. CHARSET contains 62 characters. So the minimum of possibly stored URLs is 1 + 9^62 and the maximum is 16^62 URLs stored.

When URL can’t be shortened then the user gets information about it through popUp.

When URL can be shortened then the user receives shortened URL and it’s displayed in the input where the user typed the URL. Button “shorten” switches with the “copy” button that stores input value to the clipboard. And also clear button “X” appears, and it clears input.

### Redirecting

If a short URL is entered into the search bar, the user is redirected to the corresponding URL. When the short URL does not exist, the user gets information about that in form of a popUp and gets redirected to the main page with input.

### Database

## About errors and connection

Also if anything goes wrong with the database user is informed about the error through popUp.

If the connection with the database was not established then after 7 seconds server tries to establish it again. This can happen 3 times. After that server won’t try again.

## SQL commands

CREATE DATABASE url_shortener ENCODING ASCII;

USE url_shortener;

Script used to create Table can be found in setup.sql
