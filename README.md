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

## Setup

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
  "private": {
    "AWSAccessKeyId": "",
    "AWSSecretKey": "",
    "google": {
      "clientId": "",
      "secret": ""
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
