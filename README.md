![Urban Cuisines](./.github/images/urban-cuisines-cover.png 'Urban Cuisines')

# Urban Cuisines :coffee:

> Urban Cuisines is a very simple application that helps people to find their favorite restaurants easily and faster anywhere :globe_with_meridians: :coffee:.

[![Author](https://img.shields.io/badge/author-yuziem14-FC6600?style=flat-square)](https://github.com/yuziem14)
![Version](https://img.shields.io/badge/version-1.0.0-FC6600?style=flat-square)
[![License](https://img.shields.io/badge/license-MIT-FC6600?style=flat-square)](LICENSE.md)
![Languages](https://img.shields.io/github/languages/count/yuziem14/urban-cuisines?style=flat-square&color=FC6600)
![Stars](https://img.shields.io/github/stars/yuziem14/urban-cuisines?style=social)
![Contributors](https://img.shields.io/github/contributors/yuziem14/urban-cuisines?style=social)

---

<p align="center">
<a href="https://insomnia.rest/run/?label=Urban%20Cuisines%20API&uri=https%3A%2F%2Fraw.githubusercontent.com%2FYuziem14%2Furban-cuisines%2Fdevelop%2F.github%2Furban-cuisines-api.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

---

> The project is for study purposes only. The intent is to build an installable and functional [Progressive Web Application (PWA)](https://web.dev/progressive-web-apps/).

# :pushpin: Table of Contents

- [About](#information_source-about)
- [Features](#bulb-features)
- [Requirements](#construction-requirements)
- [Installation](#white_check_mark-installation)
- [Quick Start](#rocket-quick-start)
- [Technologies](#fire-technologies)
- [Layouts](#art-layouts)
- [Contributing](#robot-contributing)
- [License](#pencil-license)

# :information_source: About

The Urban Cuisines is a [Progressive Web Application (PWA)](https://web.dev/progressive-web-apps/) build with [React](https://reactjs.org/). It's build to fit in any device and can be easily install on any platform.

<p>
  <img src="./.github/images/pwa.png" style="background: #f5f5f5; padding: 8px" width="88"/>
  <img src="./.github/images/reactjs-logo.svg" style="background: #333; padding: 8px" width="32"/>
</p>

# :bulb: Features

- [x] :fork_and_knife: Register new restaurants.
- [x] :mag: Find restaurants next to you.
- [x] :paperclip: Filter restaurants by tags.
- [x] :coffee: Check restaurant information and get in touch.
- [x] :iphone: Easily install on any platform.
- [x] :no_entry: Offline Fallback Page

# :construction: Requirements

- [x] [Git](https://git-scm.com/)
- [x] [Node.js](https://nodejs.org/en/)
- [x] [Modern Web Browser](https://brave.com/)

# :white_check_mark: Installation

**First check if you have all the requirements above, then clone this repository:**

- Using HTTP protocol:

  - `git clone https://github.com/Yuziem14/urban-cuisines.git`

- Using SSH protocol:
  - `git clone git@github.com:Yuziem14/urban-cuisines.git`

_Obs: Only clone with SSH if you already have a safe SSH key configured._

# :rocket: Quick Start

1. **Config the server directory, to run your backend** \
    Go to the server folder using `cd server`, then:

   1. In order to install dependencies, run: `npm install`

   2. In order to config your environment variables, run: `cp .env.example .env` and setup the HOST, PORT, database connection and your HOST URL in the .env file

   3. In order to setup a new Adonis App Key, run: `adonis key:generate`.

   4. In order to setup the database, run: `adonis migration:run`

   5. Finally, run your server using: `adonis serve --dev`

2. **Config the web directory, to run your fronted** \
    Run the server and go to the web folder using `cd web`, then:

   1. In order to install dependencies, run: `npm install`

   2. In order to config your environment variables, run: `cp .env.example .env` and setup your API URL in the .env file.

   3. Finally, run your app using: `npm run start`

> _Obs: If you want, use yarn instead of npm._

## :warning: Important

> #### To validate the project as a PWA in your browser you need to have a secure HTTPS network, because [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers) only works under HTTPS.
>
> #### Fortunately, localhost is an exception to this rule. But if you want to run the app in other devices make sure to enable the [remote debugging tool](https://developers.google.com/web/tools/chrome-devtools/remote-debugging) in your browser and allow port forwarding.

# :fire: Technologies

This project was build with:

- [Node.js](https://nodejs.org/en/) + [Adonis.js](https://adonisjs.com/)
- [React.js](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)

> _Obs: If you want, use [SQLite](https://www.sqlite.org/index.html) instead of PostgreSQL._

# :art: Layout

> [Access the project layout.](https://www.figma.com/file/Uh8MihRdDhxDBsafHLnLah/Urban-Cuisines)

This project design and prototype was build with [Figma](https://www.figma.com/).

You can copy this layout to your Figma account and modify it as you want. :pray:

# :robot: Contributing

This project is under MIT license, so feel free to contribue with this project.

# :pencil: License

Read the [License](LICENSE.md) for this project.

---

> _Made with :yellow_heart: by Yuri Ziemba._
