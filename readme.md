# Wallpaper scrapper

Download wallpapers just by specifing the type of wallpaper you want  
The script uses puppetteer to scrape the following [website](https://www.wallpaperflare.com/)

## Run this on your machine

_This script is only tested in linux_

1. Download the project
```bash
git clone https://github.com/yashkathe/download-wallpapers-cli.git
```

2. Add nodemon.json to the project directory and add the following content. Set the port to what you want.
```json
{
    "env" : {
        "PORT": "8080"
    },
    "ignore":"settings.json"
}
```

3. Download all the dependencies and then run the script
```bash
npm install
```

```bash
npm start
```

4. Tweak some settings (not yet added)  
To set settings manually change selfEdit to true
```json
{
  "selfEdit": true,
  "wallpaperPath": "/home/user/download-wallpapers-cli/wallpapers/downloads"
}
```