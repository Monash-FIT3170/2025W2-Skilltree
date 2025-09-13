<div align="center">

![LOGO](https://github.com/Monash-FIT3170/2025W2-Skilltree/blob/main/public/images/logo.png?raw=true)

# 2025W2-Skilltree

> "**Social media platform where users build communities around competitive and non-competitive skills, define progression systems, upskill and compete against each other.**"

</div>

<h2 align="center">⬦ Tech Stack ⬦</h2>

<div align="center">

《 **Frontend**: [React](https://react.dev/) [`v18.3.1`](https://18.react.dev/) 》

《 **Backend**: [Meteor](https://www.meteor.com/) [`v3.3.2`](https://release-3-3-2.docs.meteor.com/) 》

《 **Database**: [MongoDB](https://www.mongodb.com/) via [Mongo](https://github.com/meteor/meteor/tree/master/packages/mongo) 》

《 **Schema**: [SimpleSchema](https://github.com/Meteor-Community-Packages/meteor-simple-schema) + [Collection2](https://github.com/Meteor-Community-Packages/meteor-collection2) 》

《 **CSS**: [Tailwind](https://tailwindcss.com/) [`v4.1.13`](https://tailwindcss.com/docs) 》

《 **UI Library**: [Flowbite React](https://www.flowbite-react.com/) [`v0.11.9`](https://flowbite-react.com/docs/getting-started/introduction) 》

《 **Router**: [React Router](https://reactrouter.com/) [`v6.30.1`](https://reactrouter.com/6.30.1) 》

《 **SSR**: [FastRender](https://github.com/Meteor-Community-Packages/meteor-fast-render) & [React](https://react.dev/) [Stream](https://18.react.dev/reference/react-dom/server/renderToNodeStream) + [Suspense](https://react.dev/reference/react/Suspense) & [react-meteor-data](https://docs.meteor.com/packages/react-meteor-data#suspendable-version-of-hooks) 》

《 **Reproducible Environment**: [Devbox](https://www.jetify.com/devbox) + [Nix](https://nixos.org/) 》

《 **Unit Testing**: [Mocha](https://github.com/Meteor-Community-Packages/meteor-mocha) 》

</div>

<h1 align="center">⬥ Installation ⬥</h1>

<h3 align="center">⬦ Prerequisites ⬦</h3>

<div align="center">

[Git](https://git-scm.com/downloads) - _Visit the site for installation instructions._

</div>

> [!TIP]
>
> <details>
> <summary> These extensions for <a href="https://code.visualstudio.com/">Visual Studio Code</a> or <a href="https://vscodium.com/">VSCodium</a> may be useful for the project: </summary> 
>
> - [WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)
> - [devbox by Jetify](https://marketplace.visualstudio.com/items?itemName=jetpack-io.devbox)
> - [Git Graph v3](https://marketplace.visualstudio.com/items?itemName=Gxl.git-graph-3)
> - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
> - [Babel JavaScript](https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel)
>   </details>
>   &emsp; ⋯

<h2 align="center">⬦ Option 1: Reproducible Development Environment (Recommended) ⬦</h2>

> [!NOTE]
>
> This sets up a reproducible and lightweight Linux environment via [Devbox](https://www.jetify.com/devbox) that uses [Nix](https://nixos.org/) under the hood. It helps address "works on my machine" issues by ensuring consistent development environments and also results in faster Meteor builds than on Windows natively.

<h3 align="center"><u><a href="https://learn.microsoft.com/en-us/windows/wsl">WSL</a> (Windows)</u></h3>

<div align="center">

Requires [WSL](https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command). Open Powershell (as administrator) and enter the following command then reboot afterwards:

> ```powershell
> wsl --install
> ```
>
> Open the Distro option (Ubuntu) from the start menu then enter a username and password when prompted.

</div>

<h3 align="center"><u><a href="https://www.jetify.com/devbox">Devbox</a> (Unix/MacOS, Linux & Windows)</u></h3>

<div align="center">

To install [Devbox](https://www.jetify.com/docs/devbox/installing_devbox/), open a terminal or [WSL](https://learn.microsoft.com/en-us/windows/wsl) (from the start menu) and run:

> ```shell
> curl -fsSL https://get.jetify.com/devbox | bash
> ```

</div>

<h3 align="center"><u><a href="https://nixos.org/">Nix</a> (Unix/MacOS, Linux & Windows)</u></h3>

<div align="center">

If [Nix](https://docs.determinate.systems/) is not installed, prompt its installation by running any [Devbox](https://www.jetify.com/docs/devbox/installing_devbox/) command:

> ```shell
> devbox install
> ```

</div>

<h2 align="center">⬦ Option 2: Native Development Environment ⬦</h2>

> [!WARNING]
>
> <details>
> <summary>Option 1 should be preferred for best practises to ensure reproducibility. This is also not recommend on windows due to slower Meteor builds on non UNIX/Linux environments.</summary>
>
> - [NodeJS](https://nodejs.org/en/download) - _Visit the site for installation instructions._
> - [Meteor](https://docs.meteor.com/about/install.html) - _Install by running:_
>
>   ```shell
>   npx meteor
>   ```
>
> </details>
> ⋯

<h2 align="center">⬦ Project Setup ⬦</h2>

<h3 align="center">Git Repository</h3>

<div align="center">

> ```shell
> git clone https://github.com/Monash-FIT3170/2025W2-Skilltree.git
> ```
>
> ```shell
> cd 2025W2-Skilltree
> ```

</div>

<h3 align="center">Devbox Shell (Linux Environment)</h3>

<div align="center">

> ```shell
> devbox shell
> ```

</div>

<h3 align="center">Run Setup</h3>

<div align="center">

> <table>
> <tr>
>  <td><pre lang="shell">devbox run setup &emsp;&emsp;&emsp;&emsp;</pre></td>
>  <td><pre lang="shell">meteor npm run setup &emsp;&emsp;&emsp;&emsp;</pre></td>
> </tr>
> </table>

</div>

<h1 align="center">⬥ Development Workflow ⬥</h1>

<div align="center">

  <table>
    <tr>
      <th colspan="2"></th>
    </tr>
    <tr>
      <th colspan="2">⦗<b> Run the Development Server </b>⦘</th>
    </tr>
    <tr>
      <td><pre lang="shell">devbox run start &emsp;&emsp;&emsp;&emsp;</pre></td>
      <td><pre lang="shell">meteor npm run start &emsp;&emsp;&emsp;&emsp;</pre></td>
    </tr>
    <tr>
      <th colspan="2">⦗<b> Run Lint Checker </b>⦘</th>
    </tr>
    <tr>
      <td><pre lang="shell">devbox run lint &emsp;&emsp;&emsp;&emsp;</pre></td>
      <td><pre lang="shell">meteor npm run lint &emsp;&emsp;&emsp;&emsp;</pre></td>
    </tr>
    <tr>
      <th colspan="2">⦗<b> Run Lint Fixer </b>⦘</th>
    </tr>
    <tr>
      <td><pre lang="shell">devbox run lint:fix &emsp;&emsp;&emsp;&emsp;</pre></td>
      <td><pre lang="shell">meteor npm run lint:fix &emsp;&emsp;&emsp;&emsp;</pre></td>
    </tr>
    <tr>
      <th colspan="2">⦗<b> Run Unit Tests </b>⦘</th>
    </tr>
    <tr>
      <td><pre lang="shell">devbox run test &emsp;&emsp;&emsp;&emsp;</pre></td>
      <td><pre lang="shell">meteor npm run test &emsp;&emsp;&emsp;&emsp;</pre></td>
    </tr>
    <tr>
      <th colspan="2">⦗<b> Run Bundle Visualiser </b>⦘</th>
    </tr>
    <tr>
      <td><pre lang="shell">devbox run visualize &emsp;&emsp;&emsp;&emsp;</pre></td>
      <td><pre lang="shell">meteor npm run visualize &emsp;&emsp;&emsp;&emsp;</pre></td>
    </tr>
    <tr>
      <th colspan="2">⦗<b> Clean Reinstall </b>⦘</th>
    </tr>
    <tr>
      <td><pre lang="shell">devbox run ci &emsp;&emsp;&emsp;&emsp;</pre></td>
      <td><pre lang="shell">meteor npm run ci &emsp;&emsp;&emsp;&emsp;</pre></td>
    </tr>
  </table>

</div>

<h1 align="center">⬥ Architecture ⬥</h1>

<h2 align="center">⬦ Directory Structure ⬦</h2>

```
.deploy/				<Deployment Files>
.devbox/				<Devbox/Nix Files>
client/                 [Client-Side Code]
imports/
├── api/                  	[Backend]
│   ├── auth/        			// Accounts + OAuth
│   ├── collections/        	// MongoDB Collections
│   ├── methods/            	// Meteor Methods (Client Calls)
│   ├── publications/       	// Publications For Client Subscribe
│   ├── schemas/            	// Schemas for Validation
│   ├── Methods.js          	// Consolidates Methods Imports
│   ├── Publications.js     	// Consolidates Publications Imports
│   └── Schemas.js          	// Schemas (Array Reuse Export)
├── routes/               	[Route Definitions] Mirrors JSX from ui/
│   ├── components/				// URL /<page>/<layout>/<component>
│   ├── layouts/				// URL /<page>/<layout>/
│   ├── pages/					// URL /<page>/
│   ├── App.jsx             	// App Routes (LoggedIn)
│   └── Root.jsx             	// Top Level Route /
├── ui/                   	[Frontend]
│   ├── components/         	// Reusable JSX Components
│   ├── layouts/            	// Reusable JSX Layouts
│   ├── pages/              	// JSX Pages
│   ├── App.jsx             	// App JSX Container (Holds NavBar)
│   └── Root.jsx             	// Root JSX Container
├── utils/                	<Utility Helper Functions/Hooks>
│   ├── contexts/          		// React Contexts
│   └── providers/          	// React Providers
│   └── RouteGuard.jsx      	// Route Protection & Redirects
│   └── SuspenseHydrated.jsx	// Suspense Opt Out SSR
│   └── User.jsx				// User Utils (Fetch LoggedIn User)
└── Router.js             	// Router on Client (SPA) & Server (SSR)
private/                <Server Assets>
public/                 <Client Assets>
server/                 [Server-Side Code]
tests/					<Unit Tests>
└── main.js             	// Consolidates Tests Imports
```

> [!NOTE]
> <details>
> <summary><b>Initialisation Flow Explanation</b></summary>
>
> `package.json` defines:
>
> ```
> "mainModule": {
>   "client": "client/main.jsx",
>   "server": "server/main.js"
> },
> ```
>
> When the webserver is started,  `server/main.js` runs on the server and imports:
>
> - `/imports/api/Publications` -- *Loads defined Publications, each imports its*:
>   - `/imports/api/schemas/...` -- *Attaches the defined Schema, each imports its*:
>     - `/imports/api/collections/...` -- *Defines the collection to access from other files*.  
> - `/imports/api/Methods'` -- *Loads defined Meteors Methods*.
> - `/imports/Router` -- Loads the Router on the server for SSR
> - `/imports/api/auth/google_oauth` -- Loads Auth (google)
> - `/imports/api/auth/AccountConfig` -- Loads Meteor accounts reset password link configurations
>
> Clients receives `client/main.html,main.css` (instant) and `client/main.jsx` (on hydration/bundle load), imports:
>
> - `/imports/Router` -- *Loads the Router on the client for SPA routing/navigation*.
>
> *Both the Server (SSR) and Client (Hydration) loads the `/imports/Router`, contains all routes and ui from `/imports/routes,ui`.*
> 
> </details>
> ⋯

<h2 align="center">⬦ React ⬦</h2>

> [!note]
>
> Front-end JavaScript library for the project, refer to the [docs](https://18.react.dev/learn). JSX React components are used to write HTML in JavaScript as reusable UI components. React hooks are generally used to make data on the page reactive, which is lost on page refresh. Long term data persistence should instead be from the database via Meteor's [react-meteor-data](https://docs.meteor.com/packages/react-meteor-data) for fetching and reactivity (real time changes etc).

## Deep Imports

> [!TIP]
> Ensure all react-icon usage are **deep imports** so that only imported icons are included in the bundle:
>
> ```
> import { <prefix><Name> } from "@react-icons/all-files/<prefix>/<prefix><Name>";
> ```
>
> <details>
> <summary>Example:</summary>
>
> `import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi';` ->
>
> ```
> import { FiEye } from '@react-icons/all-files/fi/FiEye';
> import { FiEyeOff } from '@react-icons/all-files/fi/FiEyeOff';
> import { FiLock } from '@react-icons/all-files/fi/FiLock';
> ```
>
> </details>
> &emsp; ⋯

### Server Side Rendering (SSR)

> [!TIP]
> _Non useFind, datetime (timezone) or modified data (sorting etc) fetches from the database that gets loaded directly on the page should opt out of SSR such as the DashboardSkillTrees (sort mismatch issue) and ProofsList (datetime timezone mismatch) etc._

<h1 align="center">⬥ Configuration (<code>settings.json</code>) ⬥</h1>

Create or edit the file `settings.json`:

> ```
> {
>  "public": {
>    "enableSSR": true
>  },
>  "private": {
>    "AWSAccessKeyId": "",
>    "AWSSecretAccessKey": "",
>    "google": {
>      "clientId": "",
>      "secret": ""
>    },
>    "smtp": {
>      "username": "your@gmail.com",
>      "password": "app-password",
>      "server": "smtp.gmail.com",
>      "port": 465
>    }
>  }
> }
> ```

<h1 align="center">⬥ Deployment ⬥</h1>

<h3 align="center">Ubuntu 24.04 LTS (Noble)</h3>

> [!NOTE]
> Bash scripts for Ubuntu Linux are provided to set up the server, manage deployment, build bundles, automate pull + rebuild + webserver restart and provide simple commands to manage the webserver. Runs in screen sessions to allow it to operate in the background with the ability to detach and reattach to the session. Caddy is utilised as a reverse proxy server to handle SSL. Set the `$ENV_HOSTNAME` environment variable to the domain name for the server.

<h2 align="center">⬦ Environment Variables ⬦</h2>

<div align="center">

|       Variable        | Description                           | Default Value                         |
| :-------------------: | :------------------------------------ | :------------------------------------ |
|    `ENV_HOSTNAME`     | Server Hostname or IP Address.        | _Current IP address_                  |
|    `ENV_MONGO_URL`    | MongoDB Database URL                  | _mongodb://localhost:27017/skilltree_ |
|      `ENV_PORT`       | Webserver Port                        | 3000                                  |
| `ENV_METEOR_SETTINGS` | Meteor Application Settings from JSON | Output of `settings.json`             |

</div>

<h3 align="center">Set Environment Variables</h3>

<div align="center">

Edit `~/.bash_profile`:

> ```
> export ENV_VAR="value"
> ```

To apply changes to the existing terminal session, run:

> ```
> . .bash_profile
> ```

</div>

<h2 align="center">⬦ Server Setup ⬦</h2>

<h3 align="center">Git Repository</h3>

<div align="center">

> ```shell
> git clone https://github.com/Monash-FIT3170/2025W2-Skilltree.git
> ```
>
> ```shell
> cd 2025W2-Skilltree
> ```

</div>

<h3 align="center">Server Setup Script</h3>

<div align="center">

> ```shell
> chmod +x ./2025W2-Skilltree/.deploy/setup.sh
> ```
>
> ```shell
> ./2025W2-Skilltree/.deploy/setup.sh
> ```

</div>

<h2 align="center">⬦ Server Usage ⬦</h2>

<div align="center">
  <table>
    <tr>
      <td colspan="3"></td>
    </tr>
    <tr>
      <th><b>Start Webserver</b></th>
      <th><b>Stop Webserver</b></th>
      <th><b>Restart Webserver</b></th>
    </tr>
    <tr>
      <td><pre lang="shell">./start &emsp;&emsp;&emsp;&emsp;</pre></td>
      <td><pre lang="shell">./stop &emsp;&emsp;&emsp;&emsp;</pre></td>
      <td><pre lang="shell">./restart &emsp;&emsp;&emsp;&emsp;</pre></td>
    </tr>
    <tr>
      <th><b>Pull Repo Changes</b></th>
      <th><b>Update Webserver</b></th>
      <th><b>Build Deployment Bundle</b></th>
    </tr>
    <tr>
      <td><pre lang="shell">./pull &emsp;&emsp;&emsp;&emsp;</pre></td>
      <td><pre lang="shell">./update &emsp;&emsp;&emsp;&emsp;</pre></td>
      <td><pre lang="shell">./build &emsp;&emsp;&emsp;&emsp;</pre></td>
    </tr>
    <tr>
      <th><b>Webserver Console</b></th>
      <th><b>Reverse Proxy Console</b></th>
      <th><b>Build Console</b></th>
    </tr>
    <tr>
      <td><pre lang="shell">./console &emsp;&emsp;&emsp;&emsp;</pre></td>
      <td><pre lang="shell">./console-proxy &emsp;&emsp;&emsp;&emsp;</pre></td>
      <td><pre lang="shell">./console-build &emsp;&emsp;&emsp;&emsp;</pre></td>
    </tr>
    <tr>
      <td colspan="3">

> [!CAUTION]
> DO NOT PRESS CTRL+C OR CTRL+D TO EXIT!
> Use Ctrl+A then D to detach from the session instead.
      </td>
    </tr>
  </table>
</div>

<h1 align="center">⬥ Project Team ⬥</h1>

<h3 align="center">【 System Architects 】</h3>

| Mitchell Hare `33164029` &#10; mhar0085@student.monash.edu | Romal Patel `32496273` &#10; rpat0035@student.monash.edu | Jason Sakolkraisorn `33109397` &#10; jsak0004@student.monash.edu |
| :---------------------------------------------------: | :------------------------------------------------: | :--------------------------------------------------------------: |

<h3 align="center">【 Product Managers 】</h3>

| Jia (Kelly) Tan `32463804` &#10; jtan0276@student.monash.edu |  Aaron See `32505108` &#10; asee0014@student.monash.edu   | Laetitia Teo `32516940` &#10; lteo0014@student.monash.edu  |
| :----------------------------------------------------------: | :-------------------------------------------------------: | :--------------------------------------------------------: |
|  Samarth Gupta `32472765` &#10; sgup0024@student.monash.edu  | Shaurya Seth `33892180` &#10; sset0012@student.monash.edu | Amolika Yadav `33745234` &#10; ayad0013@student.monash.edu |

<h3 align="center">【 Release Train Engineers 】</h3>

| Kelly Li `33088047` &#10; klii0057@student.monash.edu |   Yiyou (Fred) Xu `33113963` &#10; yxuu0194@student.monash.edu   | Marcus Chow `32493568` &#10; mcho0083@student.monash.edu |
| :---------------------------------------------------: | :--------------------------------------------------------------: | :------------------------------------------------------: |
|  Ankush `35102845` &#10; aank0004@student.monash.edu  | Chi Thuan (Ben) Tia `32442777` &#10; ctia0007@student.monash.edu | Keziah Lang `33878552` &#10; klan0018@student.monash.edu |
|                                                       |    Steven Kaing `33155666` &#10; skai0008@student.monash.edu     |                                                          |
