# 2025W2-Skilltree

## The Team

### System Architects

- Mitchell Hare `33164029` mhar0085@student.monash.edu
- Romal Patel `32496273` rpat0035@student.monash.edu
- Jason Sakolkraisorn `33109397` jsak0004@student.monash.edu

### Product Managers

- Jia (Kelly) Tan `32463804` jtan0276@student.monash.edu
- Aaron See `32505108` asee0014@student.monash.edu
- Laetitia Teo `32516940` lteo0014@student.monash.edu
- Samarth Gupta `32472765` sgup0024@student.monash.edu
- Shaurya Seth `33892180` sset0012@student.monash.edu
- Amolika Yadav `33745234` ayad0013@student.monash.edu

### Release Train Engineers

- Kelly Li `33088047` klii0057@student.monash.edu
- Yiyou (Fred) Xu `33113963` yxuu0194@student.monash.edu
- Marcus Chow `32493568` mcho0083@student.monash.edu
- Ankush `35102845` aank0004@student.monash.edu
- Chi Thuan (Ben) Tia `32442777` ctia0007@student.monash.edu
- Keziah Lang `33878552` klan0018@student.monash.edu
- Steven Kaing `33155666` skai0008@student.monash.edu

## Development Setup

```
meteor npm run setup
```

```
meteor npm run start
```

### Manual Setup:

```
meteor npm install
```

Create new file called `settings.json` and copy paste the below code into it.
This is a dummy `settings.json`, to allow the program to run without errors:

```
{
  "public": {
    "enableSSR": true,
    "enablePartialSRR": false
  },
  "private": {
    "AWSAccessKeyId": "",
    "AWSSecretAccessKey": "",
    "google": {
      "clientId": "",
      "secret": ""
    },
    "smtp": {
      "username": "your@gmail.com",
      "password": "app-password",
      "server": "smtp.gmail.com",
      "port": 465
    }
  }
}
```

## Lint

```
meteor npm run lint
```

```
meteor npm run lint:fix
```

## Tests

```
meteor npm run test
```

## Directory Structure

```
client/                 [Client-side Code]
imports/
├── api/                  [Backend]
│   ├── collections/        // MongoDB collections
│   ├── methods/            // Meteor methods (client calls)
│   ├── publications/       // Publications for client subscribe
│   ├── schemas/            // Schemas for validation
│   ├── Methods.js          // Consolidates methods imports
│   ├── Publications.js     // Consolidates publications imports
│   └── Schemas.js          // Consolidates to Schemas array reuse
├── routes/               [Route definitions] mirrors JSX from ui/
│   ├── components/
│   ├── layouts/
│   └── pages/
│   └── App.jsx             // Top Level Route /
├── ui/                   [Frontend]
│   ├── components/         // Reusable JSX components
│   ├── layouts/            // Reusable JSX layouts
│   ├── pages/              // JSX pages
│   └── App.jsx             // Root JSX container
├── utils/                // Utility helper functions
│   ├── contexts/           // React contexts
│   └── providers/          // React providers
└── Router.js             // Router loaded on client & server (SSR)
private/                <Server Assets>
public/                 <Client Assets>
server/                 [Server-side Code]
tests/
└── main.js               // Consolidates Tests
```
## Development Info
>  [!TIP]
>  Ensure all react-icon usage are **deep imports** so that only imported icons are included in the bundle:
>
>  ```
>  import { <prefix><Name> } from "@react-icons/all-files/<prefix>/<prefix><Name>";
>  ```
>
>  For example: `import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi';` ->
>
>  ``````
>  import { FiEye } from '@react-icons/all-files/fi/FiEye';
>  import { FiEyeOff } from '@react-icons/all-files/fi/FiEyeOff';
>  import { FiLock } from '@react-icons/all-files/fi/FiLock';`
>  ``````

## Deployment
### Ubuntu 24.04 LTS (Noble)
> [!NOTE]
> Bash scripts for Ubuntu Linux to set up the server, manage deployment, build bundles, automate pull + rebuild + webserver restart and provide simple commands to manage the webserver. Runs in screen sessions to allow it to operate in the background with the ability to detach and reattach to the session. Caddy is utilised as a reverse proxy server to handle SSL. Set the `$ENV_HOSTNAME` environment variable to the domain name for the server.

#### Environment Variables
`$ENV_HOSTNAME` -- Server hostname or IP address. *Default: current IP address*.

`$ENV_MONGO_URL` -- MongoDB database URL. *Default: mongodb://localhost:27017/skilltree*

`$ENV_PORT` -- Webserver port. *Default: 3000*

`$ENV_METEOR_SETTINGS` -- Meteor application settings from JSON. *Default: project's settings.json*

#### Set Environment Variables
Edit `~/.bash_profile`:
```
export ENV_VAR="value"
```
To apply changes to the existing terminal session, run:
```
. .bash_profile
```
#### Setup
```
git clone https://github.com/Monash-FIT3170/2025W2-Skilltree
```
```
chmod +x ./2025W2-Skilltree/.deploy/setup.sh
```
```
./2025W2-Skilltree/.deploy/setup.sh
```
#### Usage
Script to start the webserver in the screen session:

```
./start
```
Script to stop the webserver in the screen session:

```
./stop
```

Script to restart (stop + start) webserver in the screen session:
```
./restart
```
Script to build deployment bundle:
```
./build
```
Script to enter the screen session for accessing the webserver console:

```
./console
```
Script to enter the screen session for accessing the proxy console:

```
./console-proxy
```
Script to enter the screen session for accessing the build console:

```
./console-build
```
> [!CAUTION]
> DO NOT PRESS CTRL+C OR CTRL+D TO EXIT!
> Use Ctrl+A then D to detach from the session instead.
