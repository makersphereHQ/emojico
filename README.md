# Emojico 👀

Use emojis instead of weak passwords!
Learn more about this project and how it works below.

Please note: This is a **beta release**. Debug mode is enabled.
Play with the application, and use the JavaScript console for debugging.

Feel free to open a Pull Request and help us, to make the internet a bit more secure.

Also check out https://makersphere.org & follow us on https://twitter.com/makerspherehq ✌️

## Why is this a thing?
* Passwords are often weak and easy to guess
* People are lazy
* Everyone loves emojis
* Emojis are images, and you can turn them into stories
* Stories are easier to memorize
* Also emoji! 😁

## How it works
This webapp is a simple, so called _bookmarklet_ you can add to your Bookmarks Bar.
The app is _client-side only_, so there is no server backend required.
We're turning your input into a unique and super secure password.

```
encode(scrypt.crypto_scrypt(scrypt.encode_utf8(string), scrypt.encode_utf8(salt), N, r, p, L));
```

The math behind it is easy. We'll compare a "regular password" [a-zA-Z0-9] to our only six characters long emoji passcode. Btw. 1791 is the amount of currently available emoji icons. We'll update the function when new emojis become available.

```
x = 6; z = 0;
z = (1791^x) - (62^y)
y ≈ 10.8897
```

As an input for our hash function, a emoji passcode is a bit stronger than a ten character regular password. Not bad.

After hashing we're *not* showing you the generated password, instead we're hiding it with some HTML/CSS magic. 😉

## Usage
Add the bookmarklet to your Bookmarks Bar, and launch the app.
You will see four input fields. Feel free to try, but only emojis are allowed.
Choose wisely, create a small emoji story and hit enter.
If everything is ok, follow the instructions to copy your new password. And done.

Some tips & advice:
* This is a **beta** release
* We're not liable if something breaks/explodes/whatever
* _Don't_ use common combinations E.g. 💩💩💩💩💩💩
* If you are a developer or researcher, try to break it!

More documentation is coming soon.

## Credits
This project is inspired by Emojli (made by [Tom Scott](https://twitter.com/tomscott) & [Matt Gray](https://twitter.com/unnamedculprit) ) and the love for Emojis of [Ryan Hoover](https://twitter.com/rrhoover).
We're using [scrypt](https://github.com/tonyg/js-scrypt) and [strip-variation-selectors](https://github.com/mathiasbynens/strip-variation-selectors).
Contributions by [DaKnOb](https://github.com/DaKnOb) and [atoponce](https://github.com/atoponce).
Thank you!
