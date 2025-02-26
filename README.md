# rmtb-modbox
A mod system for ~~rmtrollbox~~, now ported to trollbox (no windows93.net/trollbox supported..... yet)
### Install
The installation is simple, ~~[Just click this link!](https://windows93.net/#!js%20try%20%7B%20fetch%28%27http%3A%2F%2Fmodbox.codersquack.nl%2Finstall.js%27%29.then%28%28r%29%3D%3Er.text%28%29%29.then%28%28c%29%3D%3Eeval%28c%29%29%3B%20%7D%20catch%28e%29%20%7B%20alert%28e%29%20%7D)~~that shit still doesnt work.

Instead:
- open win93
- open terminal
- paste this: `try { fetch('https://mewhenthegit.github.io/modbox/install.js').then((r)=>r.text()).then((c)=>eval(c)); } catch(e) { alert(e) }`
### Documentation
You can check the documentation [here](https://nicejs-is-cool.github.io/modbox/docs)

### Adding Mods
To add mods, simply go to /a/modbox/mods and add a JS file containing mod code. As of right now there is no mod store or anything (tho you can make that if you want :) \)

Here's one of the mods i made (BetterChat): https://pastebin.com/J5AibSLg 

### Making mods
See the example mod (in examples/alert.js or /a/modbox/mods/alert.js). Also see the official documentation https://nicejs-is-cool.github.io/modbox/docs/.

Do keep in mind, the `rmtrollbox` mod has been renamed to `trollbox`