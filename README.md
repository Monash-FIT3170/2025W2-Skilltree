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
> These extensions for <a href="https://code.visualstudio.com/">Visual Studio Code</a> or <a href="https://vscodium.com/">VSCodium</a> may be useful for the project:
> <details>
> <summary>⋯</summary>
>
> - [WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)
> - [devbox by Jetify](https://marketplace.visualstudio.com/items?itemName=jetpack-io.devbox)
> - [Git Graph v3](https://marketplace.visualstudio.com/items?itemName=Gxl.git-graph-3)
> - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
> - [Babel JavaScript](https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel)
>   </details>

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
> Option 1 should be preferred for best practices to ensure reproducibility. This is also not recommend on windows due to slower Meteor builds on non UNIX/Linux environments:
> <details>
> <summary>⋯</summary>
>
> - [NodeJS](https://nodejs.org/en/download) - _Visit the site for installation instructions._
> - [Meteor](https://docs.meteor.com/about/install.html) - _Install by running:_
>
>   ```shell
>   npx meteor
>   ```
>
> </details>

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
> <tr></tr>
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
>
> **Initialisation Flow Explanation**:
>
> <details>
> <summary>⋯</summary>
>
> `package.json` defines:
>
> > ```json
> > "mainModule": {
> >     "client": "client/main.jsx",
> >     "server": "server/main.js"
> > },
> > ```
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

<h2 align="center">⬦ User Interface (UI) ⬦</h2>

### React

> [!note]
>
> Front-end JavaScript library for the project, refer to the [docs](https://18.react.dev/learn). JSX React components are used to write HTML in JavaScript as reusable UI components. React hooks are generally used to make data on the page reactive, which is lost on page refresh. Long term data persistence should instead be from the database via Meteor's [react-meteor-data](https://docs.meteor.com/packages/react-meteor-data) for fetching and reactivity (real time changes etc).

#### JSX

> [!tip]
>
> Refer to the [docs](https://18.react.dev/learn/writing-markup-with-jsx). A file should end in `.jsx` rather than `.js` if it contains and returns reusable React components (`<HTML />` elements). The general structures for it would be of the following consisting of an ([arrow](https://www.w3schools.com/Js/js_arrow_function.asp)) function export:
>
> <details>
> <summary>⋯</summary>
> 
> `COMPONENT_NAME.jsx`
> >
> > ``` jsx
> > import React from 'react';
> > ```
>
> **JSX with just HTML (no const/hooks):**
> >
> > ```jsx
> > export const COMPONENT_NAME = () => (
> >   <>
> >     <p>Hello World!</p>
> >     ...
> >   </>
> > );
> > ```
> >
> > - Make sure both the filename and (export) function name are the same to avoid confusion (`COMPONENT_NAME`).
>
> **JSX with const/hooks:**
>
> > ```jsx
> > export const NAME_OF_EXPORT = () => { 
> >   const EXAMPLE_CONST = "Hello World!";
> > 
> >   return (
> >     <>
> >       <p>{EXAMPLE_CONST}</p>
> >       ...
> >     </>
> >   );
> > };
> > ```
> > 
> > - Wrap `{` `}` around to use JavaScript within HTML, refer to the [docs](https://18.react.dev/learn/javascript-in-jsx-with-curly-braces).
>
> **JSX components can be reused and imported in other files for modularity:**
> >
> > ```jsx
> > import { COMPONENT_NAME } from '/imports/ui/.../COMPONENT_NAME'
> > 
> > export const OTHER_COMPONENT_NAME = () => (
> >   <>
> >     <p>Welcome!</p>
> >     <COMPONENT_NAME />
> >     ...
> >   </>
> > );
> > ```
> > 
> > - Refer to the [docs](https://18.react.dev/learn/importing-and-exporting-components).
> > - Large JSX files should be broken down into smaller components when possible to be reused which reduces code repetition and improves readability.
>
> **Rendering Lists (mapping):**
> > 
> > `NumberList.jsx`
> > 
> > ```jsx
> > export const NumberList = () => {
> >   const numbers = [1, 2, 3, 4, 5];
> > 
> >   return (
> >     <ul>
> >       {numbers.map((num, index) => (
> >         <li key={index}>{num}</li>
> >       ))}
> >     </ul>
> >   );
> > };
> > ```
> > 
> > - Refer to the [docs](https://18.react.dev/learn/rendering-lists).
> </details>

#### Props

> [!tip]
>
> Refer to the [docs](https://18.react.dev/learn/passing-props-to-a-component). It allows for passing data from one component (parent) to another (child). It also enables merging similar JSX components together where props are used to handle the differences ([ternary operator](https://www.w3schools.com/java/java_conditions_shorthand.asp) etc, refer to the [docs](https://18.react.dev/learn/conditional-rendering)).
>
> <details>
> <summary>⋯</summary>
>
> **Passing Props via Parent JSX:**
> > `PARENT_COMPONENT.jsx`
> > 
> > ```jsx
> > import React from 'react';
> > import { CHILD_COMPONENT } from '/imports/ui/.../CHILD_COMPONENT'
> > 
> > export const PARENT_COMPONENT = () => { 
> >   const EXAMPLE_CONST = "World!";
> >   
> >   return (
> >     <>
> >       <CHILD_COMPONENT message={EXAMPLE_CONST} isPerson={false} />
> >       ...
> >     </>
> >   );
> > };
> > ```
>
> **Accessing & Destructuring Props via Child JSX:**
>
> > 
> > `CHILD_COMPONENT.jsx`
> > 
> > ```jsx
> > import React from 'react';
> > ...
> > export const CHILD_COMPONENT = ({ message, isPerson }) => (
> >   <>
> >     <p>Hello {message}</p>
> >     {isPerson ? <PersonJSX /> : <ObjectJSX />}
> >     ...
> >   </>
> > );
> > ```
> > 
> > - Try to avoid 'prop drilling' when possible. Instead of passing database fetches across different component levels, use props to pass the IDs and only fetch the relevant data fields that are used in the component it is in. Provider component + useContext hook, is an alternative approach for data that is commonly used across different levels of components such as the userId for the loggedIn user.  Refer to the [docs](https://18.react.dev/learn/passing-data-deeply-with-context).
> </details>

#### Hooks

> [!tip]
>
> Refer to the [docs](https://18.react.dev/reference/react/hooks). Hooks are generally used to manage reactive state and side effects in JSX components for any data that needs to be [reactively](https://18.react.dev/learn/adding-interactivity) [updated](https://18.react.dev/learn/managing-state) on the page. It is usually not needed for database fetches (which already provide reactivity) except for useContext to share a computation of a common fetch with the exact same fields once (does not change often) across several components such as the loggedIn userId.
>
> <details>
> <summary>⋯</summary>
>
> - **Responding to Events** ([docs](https://18.react.dev/learn/responding-to-events))
>
> - **useState** ([docs](https://18.react.dev/reference/react/useState))
> 
> - **useEffect** ([docs](https://18.react.dev/reference/react/useEffect))
> 
> - **useMemo** ([docs](https://18.react.dev/reference/react/useMemo))
> 
> - **useRef** ([docs](https://18.react.dev/reference/react/useRef))
> 
> - **useContext** ([docs](https://react.dev/reference/react/useContext))
> </details>

#### Components

> [!tip]
>
> Refer to the [docs](https://18.react.dev/reference/react-dom/components).
>
> <details>
> <summary>⋯</summary>
>
> - **Fragment**  ([docs](https://18.react.dev/reference/react/Fragment))
>
>   > ```jsx
>   > return (
>   >   <>
>   >     ...
>   >   </>
>   > );
>   > ```
>   >
>   > - used to wrap around if there are multiple HTML elements at the top level instead of using unneeded `<div>...</div>`
>
> - **Provider** ([docs](https://18.react.dev/reference/react/createContext#provider))
>
> - **Suspense** ([docs](https://18.react.dev/reference/react/Suspense))
>
>   > ```jsx
>   > <Suspense fallback={<Fallback />}>
>   >   <COMPONENT_THAT_FETCHES_DB />
>   > </Suspense>
>   > ```
>   >
>   > - Suspense should be used around a component that fetches from the database to work with server side rendering (SSR) and to handle the fallback instead of managing `isLoading` states from Meteor's [react-meteor-data](https://docs.meteor.com/packages/react-meteor-data) hooks. 
> </details>

### Deep Imports

> [!note]
>
> As of [Meteor](https://www.meteor.com/) [`v3.3.2`](https://release-3-3-2.docs.meteor.com/), [tree shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) is not supported by the bundler where some unused imports don't get excluded in the bundle. This can lead to large libraries such as react-icons (2.29 MB) including the entire icon library, which unnecessarily bloats the bundle size that may cause noticeable slowdown on initial bundle load at first page load/refresh. Deep imports can be used to only explicitly import needed parts without bundling the entire library as a workaround to the lack of tree shaking support.

#### React Icons

> [!TIP]
> `react-icons` supports deep imports via `@react-icons/all-files` to help reduce bundle size. Ensure all `react-icon` usage are **deep imports** so that only imported icons are included in the bundle:
>
> <details>
> <summary>⋯</summary>
>
> > ```jsx
> > import { <prefix><Name> } from "@react-icons/all-files/<prefix>/<prefix><Name>";
> > ```
>
> **Example**:
> 
> > `import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi';` ->
> >
> > ```jsx
> > import { FiEye } from '@react-icons/all-files/fi/FiEye';
> > import { FiEyeOff } from '@react-icons/all-files/fi/FiEyeOff';
> > import { FiLock } from '@react-icons/all-files/fi/FiLock';
> > ```
>
> </details>

<h2 align="center">⬦ Nested Structure (UI & Routing) ⬦</h2>

> [!NOTE]
>
> Refer to the [docs](https://reactrouter.com/6.30.1/start/overview#nested-routes).
>
> <details>
> <summary>⋯</summary>
> 
> > ```jsx
> > ...
> > ├── ui/ & routes/
> > │   ├── components/         	// Reusable JSX Components | URL /<page>/<layout>/<component>
> > │   ├── layouts/            	// Reusable JSX Layouts | URL /<page>/<layout>/
> > │   ├── pages/              	// JSX Pages | URL /<page>/
> > │   ├── App.jsx             	// App JSX Container (Holds NavBar) | App Routes (LoggedIn)
> > │   └── Root.jsx             	// Root JSX Container | Top Level Route /
> > ...
> > ```
>
> Routes mirrors UI where it follows a nested structure that begins with the Root JSX Container (`Root.jsx`) corresponding to the top level route `/`.  When the URL matches its path `/` that holds further deeper/nested routes as its children, it renders its element ` <Root />` JSX containing an `<Outlet>` to allow it to be switched into based on its children paths' element when the URL matches. The children of Root (`/`) JSX consists of **SignIn**Routes, **SignUp**Routes and **App**Routes where RouteGuard initially redirects to **SignIn**Routes' `/` `login/` while allowing **SignUp**Routes access such as `/` `signup/` before logging in which renders the App JSX. From there, it follows `/` -> `<page>/` -> `<layout>/` -> `<compoment>/`  where each `layout/` could nest further `/layout` or instead end at `component/` such as `/` `page/` `layout/` `layout/` `layout/` `compoment/` etc  or `/` `page/` and  `/` `page/`  `compoment/`.
>
> As a rule of thumb, the page -> layout -> component structure should be followed to modularise when it makes sense or on similar patterns instead of having everything inside one large JSX that is more difficult to read and may result in repeated code and larger bundle size. Similar repeated patterns of code are likely candidates to be its own JSX layout/compoment that is modularised by using its props to handle differing values across similar code patterns. Layouts are generally containers/groups `ids.map => id` of components `useFind(... _id: { $eq: id }...)` to __allow reuse across pages__ and make page code more tidy to have an easier glance of its content.
>
> For nested routing visualisation, visit this [link](https://remix.run/_docs/routing) where URL `/page/layout/component` can nest further `/page/layout/layout/component` and so on etc:
>
> - `<Root>` is  `Root.jsx` + `App.jsx`  (Top level /, contains navbar + `<outlet>` for page)
> - `<Sales>` is `pages/` (Dashboard etc)
> - `<Invoices>` is `layouts/` (DashboardSkillTrees etc)
> - `<Invoice id={id}>` is `components/` (SkillTreeCard etc)
>
> Overall idea is to define decoupled routes in each .jsx within `routes/`, corresponding to the same `ui/` JSX directory structure as the UI element to render. Children are nested routes that the parent UI JSX element can switch its `<Outlet />` into one of its `<Child />` JSX depending on the matching URL route. It starts from `Root.jsx` + `App.jsx` `/` with `/nested` children routes that can have its own & be `/nested/more`. The splitting follows SoC, code reuse, avoids long files to scale better and that its structure allows to refresh/bookmark the page to keep the same content from the URL without it 'resetting' to the default state.
> </details>

<h2 align="center">⬦ Routing ⬦</h2>

### React Router

> [!note]
>
> Refer to the [docs](https://reactrouter.com/6.30.1). Router library to provide client side routing/navigation for faster single page application (SPA) experience where the first page load (or refresh) loads the initial bundle from the server that provides subsequent navigation on the client side without requiring a full page reload. It is also used along with [FastRender](https://github.com/Meteor-Community-Packages/meteor-fast-render), [React](https://react.dev/) ([Stream](https://18.react.dev/reference/react-dom/server/renderToNodeStream)  + [Suspense](https://react.dev/reference/react/Suspense)) and [react-meteor-data](https://docs.meteor.com/packages/react-meteor-data#suspendable-version-of-hooks) to provide server side rendering (SSR) on the initial page load which gives the illusion of instantaneous page load before the bundle fully loads that makes the page reactive. 

#### Route Definition 

> [!TIP]
>
> Refer to the [docs](https://reactrouter.com/6.30.1/routers/create-browser-router#routes).
>
> <details>
> <summary>⋯</summary>
>
> > `/imports/routes/.../` `ROUTE_NAME.jsx`
> >
> > ```jsx
> > import { ROUTE_ELEMENT } from '/imports/ui/.../ROUTE_ELEMENT'; // The UI element JSX, contains the outlet
> > 
> > // Nested (Children) Routes
> > import { NESTED_1_Routes } from '/imports/routes/.../NESTED_1'; // Follows the same structure
> > import { NESTED_2_Routes } from '/imports/routes/.../NESTED_2'; // May have further nested children or not
> > 
> > // Define Routes for ROUTE_NAME's ROUTE_ELEMENT JSX
> > export const ROUTE_NAME_Routes = [
> >   {
> >     path: 'ROUTE_URL_PART/', // Not the full URL, ROUTE_NAME's ROUTE_ELEMENT JSX URL part
> >     element: <ROUTE_ELEMENT />, // The JSX element to render when the path matches
> >     children: [
> >       // Extends children array with nested routes via spread operator (...)
> >       ...NESTED_1_Routes,
> >       ...NESTED_2_Routes
> >     ]
> >   }
> > ];
> > ```
>
> **Modify the parent route to include in its children:**
>
> > `/imports/routes/.../` `PARENT_NAME.jsx`
> >
> > ```jsx
> > import { PARENT_ELEMENT } from '/imports/ui/.../PARENT_ELEMENT'; // The Parent UI element, contains the outlet
> > 
> > // Nested (Children) Routes
> > import { PARENT_NESTED_1_Routes } from '/imports/routes/.../.PARENT_NESTED_1'; // Follows the same structure
> > import { ROUTE_NAME_Routes } from '/imports/routes/.../ROUTE_NAME'; // New Route
> > 
> > export const PARENT_NAME_Routes = [
> >   {
> >     path: 'PARENT_ROUTE_URL_PART/', // Not the full URL, PARENT_ROUTE_NAME's PARENT_ELEMENT JSX URL part
> >     element: <PARENT_ELEMENT />, // The PARENT JSX element to render when the path matches
> >     children: [
> >       // Extends children array with nested routes via spread operator (...)
> >       ...PARENT_NESTED_1_Routes,
> >       ...ROUTE_NAME_Routes // Newly defined route
> >     ]
> >   }
> > ];
> > ```
>
> *The full URL becomes `/` `...` `/` `PARENT_ROUTE_URL_PART/` `ROUTE_URL_PART`, for example if the `PARENT_NAME_Routes` was a page child of App.jsx `/` then it would be `/` `PARENT_ROUTE_URL_PART/` `ROUTE_URL_PART/`*.
> </details>

#### Default Paths

> [!TIP]
>
> Refer to the [docs](https://reactrouter.com/6.30.1/route/route#index). A child route can be set as the default path for the parent by replacing the `path: '...'` with [`index: true`](https://reactrouter.com/6.30.1/start/tutorial#index-routes) or by using empty path `''`:
>
> <details>
> <summary>⋯</summary>
>
> > ```jsx
> > ...
> >   path: '',
> >   element: <ROUTE_ELEMENT />,
> > ...
> > ```
> >
> > ```jsx
> > ...
> >   index: true,
> >   element: <ROUTE_ELEMENT />,
> > ...
> > ```
> </details>

#### Dynamic Segments (:Params)

> [!TIP]
>
> Refer to the [docs](https://reactrouter.com/6.30.1/start/overview#dynamic-segments). A dynamic value in the URL can be set by prefixing `:` on the path as `:param` that can be used to pass values such as database IDs for fetches in the URL to any of its deeper nested elements that has it preceding its path:
>
> <details>
> <summary>⋯</summary>
>
> > ```jsx
> > ...
> > 	path: ':PARAM_NAME',
> >     element: <ROUTE_ELEMENT />,
> > ...
> > ```
></details>
>
> **useParams Hook**
>
> Refer to the [docs](https://reactrouter.com/6.30.1/hooks/use-params). In order to retrieve the parameter value from the URL at the JSX UI element, `useParams()` hook can be used where the defined `':PARAM_NAME'` should be unique to avoid conflicts for reusability:
>
> <details>
> <summary>⋯</summary>
>
> > `COMPONENT_NAME.jsx` (URL: `/.../:PARAM_NAME`)
> >
> > ```jsx
> > import { useParams } from 'react-router-dom';
> > ...
> > export const COMPONENT_NAME = () => { 
> >   const { PARAM_NAME } = useParams(); // Get the PARAM_NAME param from the URL.
> > 
> >   return (
> >     <>
> >       <p>{PARAM_NAME}</p>
> >       ...
> >     </>
> >   );
> > };
> > ```
> </details>

#### Outlet

> [!TIP]
>
> Refer to the [docs](https://reactrouter.com/6.30.1/components/outlet). An `<Outlet>` is used in the parent route's element to render its child route elements when the URL matches the path:
>
> <details>
> <summary>⋯</summary>
>
> > `COMPONENT_NAME.jsx`
> >
> > ```jsx
> > import { Outlet } from 'react-router-dom';
> > ...
> > export const COMPONENT_NAME = () => (
> >   <>
> >     <p>Hello World!</p>
> >     <Outlet />
> >     ...
> >   </>
> > );
> > ```
> </details>
>
> **OutletContext (Props Equivalent)**
>
> Refer to the [docs](https://reactrouter.com/6.30.1/hooks/use-outlet-context#useoutletcontext). Outlet context are used to pass values (props equivalent) from the parent to all of its outlet's children element:
>
> <details>
> <summary>⋯</summary>
>
> > `PARENT_COMPONENT.jsx`
> >
> > ```jsx
> > import { Outlet } from 'react-router-dom';
> > ...
> > export const PARENT_COMPONENT = () => {
> >   const value1 = value1_to_pass_from_parent
> >   const value2 = value2_to_pass_from_parent
> > 
> >   return (
> >     <>
> >       <p>Hello World from parent!</p>
> >       <Outlet context={ {value1, value2} }/>
> >       ...
> >     </>
> >   );
> > }
> > ```
> </details>
>
> **useOutletContext Hook**
>
> Refer to the [docs](https://reactrouter.com/6.30.1/hooks/use-outlet-context#useoutletcontext). The value from the parent's outlet context can be retrieved through the `useOutletContext()` hook:
>
> <details>
> <summary>⋯</summary>
>
> > `CHILD_COMPONENT.jsx`
> >
> > ```jsx
> > import { useOutletContext } from "react-router-dom";
> > ...
> > export const CHILD_COMPONENT = () => {
> >   const { value1 } = useOutletContext();
> > 
> >   return (
> >     <>
> >       <p>Parent's value is {value1}</p>
> >       ...
> >     </>
> >   );
> > }
> > ```
> </details>

#### URL Navigation

> [!TIP]
>
> Client side navigation (without page reload) requires the usage of `<Link>`, `<Navigate>` or `useNavigate()`.
>
>  **`<Link>` Component**
>
> Refer to the [docs](). Element that lets the user navigate to another page when clicking on it (href `<a>` equivalent):
>
> <details>
> <summary>⋯</summary>
>
> > `COMPONENT_NAME.jsx`
> >
> > ```jsx
> > import { Link } from "react-router-dom";
> > ...
> > export const COMPONENT_NAME = () => (
> >   <>
> >     <Link to={"page1/"}>
> >       <p>Go to Page1!</p>
> >     </Link>
> >     ...
> >   </>
> > );
> > ```
> </details>
>
>  **`<Navigate>` Component**
>
>  Refer to the [docs](https://reactrouter.com/6.30.1/components/navigate#navigate).  Element that changes the current location when it is rendered. Primarily used for redirecting default path/index route. 
>
> <details>
> <summary>⋯</summary>
>
> > ```jsx
> > ...  
> >   index: true,
> >   element: <Navigate to={'/redirect/url/path'} replace />
> > ...
> > ```
> >
> > *`replace` will make the navigation replace the current entry in the history stack instead of adding a new one. Refer to the [docs](https://reactrouter.com/6.30.1/hooks/use-navigate#optionsreplace).*
> </details>
>
> **useNavigate Hook**
>
> Refer to the [docs](https://reactrouter.com/6.30.1/hooks/use-navigate#usenavigate). Similar to `<Navigate>` component but as a hook to navigate programmatically (conditionally):
>
> <details>
> <summary>⋯</summary>
>
> > `COMPONENT_NAME.jsx`
> >
> > ```jsx
> > import { useNavigate } from "react-router-dom";
> > import { useState } from "react";
> > ...
> > export const COMPONENT_NAME = () => {
> >   const navigate = useNavigate();
> >   const [counter, setCounter] = useState(0); // Initialise counter to 0
> > 
> >   const incrementCounter = () => {
> >     const newCounter = counter + 1; // Increment counter
> >     setCounter(newCounter); // Update Counter Value
> > 
> >     if (newCounter > 5) {
> >       navigate('/'); // Navigate to home if counter > 5
> >     }
> >   };
> > 
> >   return (
> >     <>
> >       <Button onClick={incrementCounter}>+1</Button>
> >       <p>Counter: {counter}</p>
> >       ...
> >     </>
> >   );
> > };
> > ```
> </details>
>
> **useLocation Hook**
>
> Refer to the [docs](https://reactrouter.com/6.30.1/hooks/use-location).  It returns the current URL path from the location object:
>
> <details>
> <summary>⋯</summary>
>
> > ```jsx
> > import { useLocation } from 'react-router-dom';
> > ...
> >   const current_url = useLocation().pathname;
> > ...
> > ```
> </details>

### Route Protection (RouteGuard)

> [!note]
>
> React router does not provide route protection or route guard functionality to control access to routes thereby a custom implementation is used and defined from `/imports/utils/RouteGuard.jsx`.

#### useRouteGuard Hook (custom)

> [!TIP] 
>
> Custom hook implementation that conditionally renders or redirects based on given `AccessCondition` used in defining custom protected routes components to selectively restrict route access when wrapping around routes element once that affects all its deeper nested children:
>
> <details>
> <summary>⋯</summary>
>
> > `/imports/utils/RouteGuard.jsx`
> >
> > ```jsx
> > export const CUSTOM_PROTECTED_Route = ({ children, redirectUrl = '/URL_TO_REDIRECT' }) => {
> >   const AccessCondition = true; // AccessCondition to allow route access
> > 
> >   return useRouteGuard({
> >     AccessCondition, // Boolean condition to allow route access
> >     replace: false, // Whether redirect replaces current entry in history stack rather than adding new
> >     state: {}, // To store extra data in route state (current URL for previous etc)
> >     relativePath: false, // Whether relative .. should go up by path instead of parent route
> >     redirectUrl, // Url to redirect to when AccessCondition is false
> >     children, // The element (wrapped inside)
> >     fallback: <></> // Fallback element displayed before redirect happens or element rendered
> >   })
> > };
> > ```
> >
> > `/imports/routes/.../` `PROTECTED_ROUTE.jsx`
> >
> > ```jsx
> > import { CUSTOM_PROTECTED_Route } from '/imports/utils/RouteGuard';
> > ...
> >   path: 'PROTECTED_URL_PART/',
> >   element: (
> >     <CUSTOM_PROTECTED_Route redirect="OVERIDE_REDIRECT_URL">
> >       <PROTECTED_JSX_ELEMENT />
> >     </CUSTOM_PROTECTED_Route>
> >   )
> > ...
> > ```
> </details>

#### PublicRoute

> [!TIP]
>
> Custom protected route component to allow public (logged out) access to routes while optionally denying private (logged in) access (`hideForLoggedIn`) for the path and all further nested children used for public routes such as login and signup:
>
> <details>
> <summary>⋯</summary>
>
> > `/imports/routes/.../` `PUBLIC_ROUTE.jsx`
> >
> > ```jsx
> > import { PublicRoute } from '/imports/utils/RouteGuard';
> > ...
> >   path: 'PUBLIC_URL_PART/',
> >   element: (
> >     <PublicRoute hideForLoggedIn={true} redirect="OVERIDE_REDIRECT_URL/">
> >       <PROTECTED_JSX_ELEMENT />
> >     </PublicRoute>
> >   )
> > ...
> > ```
> </details>

#### PrivateRoute

> [!TIP]
>
> Custom protected route component to only allow private (logged in) access to routes while denying public (logged out) access for the path and all further nested children primarily used once for private AppRoutes:
>
> <details>
> <summary>⋯</summary>
>
> > `/imports/routes/.../` `PRIVATE_ROUTE.jsx`
> >
> > ```jsx
> > import { PrivateRoute } from '/imports/utils/RouteGuard';
> > ...
> >   path: 'PRIVATE_URL_PART/',
> >   element: (
> >     <PrivateRoute redirect="/login">
> >       <PROTECTED_JSX_ELEMENT >
> >     </PrivateRoute>
> >   )
> > ...
> > ```
> </details>

<h2 align="center">⬦ Database ⬦</h2>

> [!NOTE] 
>
> Meteor follows a pub/sub architecture that provides real-time data changes between the server (database) and the client which is tightly integrated with MongoDB (Mongo), Meteor methods and react-meteor-data (useFind/useTracker). SimpleSchema is used for providing schema functionality attached to Mongo Collections via Collection2, that are published to be subscribed by connected clients for fetching data from the database with real-time changes via react-meteor-data useFind hook (DB -> client). Meteor methods allow clients to call defined functions on the server for database modifications (client -> DB).

### Mongo Collections

> [!NOTE]
>
> Long term data persistence are stored in the database via Mongo collections as MongoDB documents. Database modification are done on the server within meteor methods that are called from the client to update data (client -> DB). Database fetches to client should instead be done via react-meteor-data useFind (DB -> client).

#### Collection Definition

> [!TIP]
>
> Refer to the [docs](https://docs.meteor.com/api/collections.html). Declaring a Mongo collection export provides a wrapper object reference to a MongoDB collection that can be accessed in other files with collection.methods (on the server) to fetch, insert, update, upset, and remove etc.
>
> <details>
> <summary>⋯</summary>
>
> > `/imports/api/collections/COLLECTION_NAME.js`
> >
> > ``` js
> > import { Mongo } from 'meteor/mongo';
> > 
> > // Create & export a new MongoDB collection named 'COLLECTION_NAME'
> > export const COLLECTION_NAME_Collection = new Mongo.Collection('COLLECTION_NAME');
> > ```
> </details>

#### Collection Methods

> [!TIP]
>
> Refer to the [docs](https://docs.meteor.com/api/collections). Primarily used on the server within Meteor methods, publications and unit tests for database modification operations.
> 
> <details>
> <summary>⋯</summary>
> 
> **Collection.find**()
>
> Refer to the [docs](https://docs.meteor.com/api/collections.html#Mongo-Collection-find). Primarily used in Meteor methods, publications or unit tests to fetch documents from a collection. Returns a cursor used for useFind whereas appending `.fetchAsync()` returns the array result.
>
> <details>
> <summary>⋯</summary>
> 
> > ```jsx
> > import { COLLECTION_NAME } from '/imports/collections/COLLECTION_NAME';
> > ...
> > const fetchResult = COLLECTION_NAME.find(
> >   MongoSelector,  // this param is optional 
> >   options,  // this param is optional 
> > );
> > ```
> >
> > - <u>MongoSelector</u> is the selection filter by query operators where omitting or `{}` returns all documents in a collection, refer to the [docs](https://www.mongodb.com/docs/manual/reference/mql/query-predicates/#std-label-query-projection-operators-top). 
> > - <u>options</u> is additional options for the query such as sort, refer to the [docs](https://docs.meteor.com/api/collections.html#Mongo-Collection-find) (open option table).
> >
> > ***Examples:***
> >
> > ```jsx
> > const RESULT_1 = COLLECTION_NAME.find({ FIELD_1: { $eq: 'FIELD_VALUE_TO_MATCH' } }); // Full $eq
> > const RESULT_2 = COLLECTION_NAME.find({ FIELD_1: 'FIELD_VALUE_TO_MATCH' }); // Shorthand $eq
> > const RESULT_3 = COLLECTION_NAME.find({}, { sort: { createdAt: -1 } }); // Sort result of all (option)
> > ```
> </details>
>
> **Collection.findOneAsync**()
>
> Refer to the [docs](https://docs.meteor.com/api/collections.html#Mongo-Collection-findOneAsync).  Primarily used in Meteor methods or unit tests to fetch a single document from a collection. Returns an object as the first document that matches the selector.
>
> <details>
> <summary>⋯</summary>
>
> > ```jsx
> > import { COLLECTION_NAME } from '/imports/collections/COLLECTION_NAME';
> > ...
> > const fetchResult = COLLECTION_NAME.findOneAsync(
> >   MongoSelector,  // this param is optional 
> >   options,  // this param is optional 
> > );
> > ```
> >
> > - <u>MongoSelector</u> is the selection filter by query operators where omitting or `{}` returns first document in a collection, refer to the [docs](https://www.mongodb.com/docs/manual/reference/mql/query-predicates/#std-label-query-projection-operators-top). 
> > - <u>options</u> is additional options for the query such as sort, refer to the [docs](https://docs.meteor.com/api/collections.html#Mongo-Collection-findOneAsync) (open option table).
> >
> > ***Examples:***
> >
> > ```jsx
> > const RESULT_1 = COLLECTION_NAME.findOneAsync({ FIELD_1: { $eq: 'FIELD_VALUE_TO_MATCH' } }); // Full $eq
> > const RESULT_2 = COLLECTION_NAME.findOneAsync({ FIELD_1: 'FIELD_VALUE_TO_MATCH' }); // Shorthand $eq
> > ```
> </details>
>
> **Collection.insertAsync**() 
>
> Refer to the [docs](https://docs.meteor.com/api/collections.html#Mongo-Collection-insertAsync). Primarily used in Meteor methods or unit tests to insert a single document into a collection. Returns its unique _id.
>
> <details>
> <summary>⋯</summary>
>
> > ```jsx
> > import { COLLECTION_NAME } from '/imports/collections/COLLECTION_NAME';
> > ...
> > const INSERTED_ID = COLLECTION_NAME.insertAsync(doc);
> > ```
> >
> > - <u>doc</u> is the object as the document to insert into the collection. If no '_id' is provided in the object document, it will be auto generated.
> >
> > ***Examples:***
> >
> > ```  jsx
> > const doc = { FIELD_1: 'VAL_1', FIELD_2: 'VAL_2' }
> > COLLECTION_NAME.insertAsync(doc);
> > COLLECTION_NAME.insertAsync({ FIELD_3: 'VAL_3' });
> > ```
> </details>
> 
> **Collection.updateAsync**()
>
> Refer to the [docs](https://docs.meteor.com/api/collections.html#Mongo-Collection-updateAsync). Primarily used in Meteor methods or unit tests to update  documents in a collection. Returns the number of matched documents.
> 
> <details>
> <summary>⋯</summary>
>
> > ```jsx
> > import { COLLECTION_NAME } from '/imports/collections/COLLECTION_NAME';
> > ...
> > const RESULT_COUNT = COLLECTION_NAME.updateAsync(
> >   MongoSelector,
> >   MongoModifier, 
> >   options,  // this param is optional 
> > );
> > ```
> >
> > - <u>MongoSelector</u> is the selection filter by query operators where `{}` targets all documents in a collection, refer to the [docs](https://www.mongodb.com/docs/manual/reference/mql/query-predicates/#std-label-query-projection-operators-top). 
> > - <u>MongoModifier</u> is the update operators that describes how to update a document in place by changing on its fields, refer to the [docs](https://www.mongodb.com/docs/manual/reference/mql/update/). 
> > - <u>options</u> is additional options for the query such as sort, refer to the [docs](https://docs.meteor.com/api/collections.html#Mongo-Collection-updateAsync) (open option table).
> >
> > ***Examples:***
> >
> > ```jsx
> > COLLECTION_NAME.updateAsync({ FIELD_1: 'FIELD_VALUE_TO_MATCH' }, { $set: { FIELD_2: 'VAL_UPDATE' } });
> > COLLECTION_NAME.updateAsync({ FIELD_2: 'FIELD_VALUE_TO_MATCH' }, { $inc: { FIELD_3_COUNTER: 1 } });
> > ```
> </details>
>
> **Collection.upsertAsync**()
>
> Refer to the [docs](https://docs.meteor.com/api/collections.html#Mongo-Collection-upsertAsync). Primarily used in Meteor methods or unit tests to modify or insert documents (if none matched) in a collection. Returns an object of `{ numberAffected, insertedId }`.
> 
> <details>
> <summary>⋯</summary>
>
> > ```jsx
> > import { COLLECTION_NAME } from '/imports/collections/COLLECTION_NAME';
> > ...
> > const { numberAffected, insertedId } = COLLECTION_NAME.upsertAsync(
> >   MongoSelector,
> >   MongoModifier,
> >   options,  // this param is optional 
> > );
> > ```
> >
> > - <u>MongoSelector</u> is the selection filter by query operators where `{}` targets all documents in a collection, refer to the [docs](https://www.mongodb.com/docs/manual/reference/mql/query-predicates/#std-label-query-projection-operators-top). 
> > - <u>MongoModifier</u> is the update operators that describes how to update a document in place by changing on its fields, refer to the [docs](https://www.mongodb.com/docs/manual/reference/mql/update/). 
> > - <u>options</u> is additional options for the query such as sort, refer to the [docs](https://docs.meteor.com/api/collections.html#Mongo-Collection-upsertAsync) (open option table).
> >
> > ***Examples:***
> >
> > ```jsx
> > COLLECTION_NAME.upsertAsync({ FIELD_1: 'FIELD_VALUE_TO_MATCH' }, { $set: { FIELD_2: 'VAL_UPDATE' } });
> > COLLECTION_NAME.upsertAsync({ FIELD_2: 'FIELD_VALUE_TO_MATCH' }, { $inc: { FIELD_3_COUNTER: 1 } });
> > ```
> </details>
>
> **Collection.removeAsync**()
>
> Refer to the [docs](https://docs.meteor.com/api/collections.html#Mongo-Collection-removeAsync). Primarily used in Meteor methods or unit tests to remove documents from a collection. Returns the removed document object.
>
> <details>
> <summary>⋯</summary>
>
> > ```jsx
> > import { COLLECTION_NAME } from '/imports/collections/COLLECTION_NAME';
> > ...
> > const REMOVED_DOCUMENT_OBJECT = COLLECTION_NAME.removeAsync(MongoSelector);
> > ```
> >
> > - <u>MongoSelector</u> is the selection filter by query operators where `{}` removes all documents in a collection, refer to the [docs](https://www.mongodb.com/docs/manual/reference/mql/query-predicates/#std-label-query-projection-operators-top). 
> >
> > ***Examples:***
> >
> > ```jsx
> > const RESULT_1 = COLLECTION_NAME.removeAsync({ FIELD_1: { $eq: 'FIELD_VALUE_TO_MATCH' } }); // Full $eq
> > const RESULT_2 = COLLECTION_NAME.removeAsync({ FIELD_1: 'FIELD_VALUE_TO_MATCH' }); // Shorthand $eq
> > const RESULT_3 = COLLECTION_NAME.removeAsync({}); // Remove all (drop collection), avoid in production...
> > ```
> </details>
>
> </details>

### Schema

> [!NOTE]
>
> Mongo collections lacks built-in schema functionality for MongoDB. SimpleSchema is used to provide consistent document structure, default values and validation. Collection2 is used to explicitly 'attach' the defined schema to a Mongo collection for seamless integration of validation and default values functionality etc.

#### Schema Definition 

> [!TIP]
>
> Refer to the [docs](https://github.com/Meteor-Community-Packages/meteor-simple-schema?tab=readme-ov-file#defining-a-schema). Each schema defines a document structure object (or a nested part) of `field: { type: ..., Rules... }` pairs where a field may nest deeper objects in its full structure. For better readability, such nested definitions are explicitly avoided by instead extending the (exported) 'Schemas' object (that holds all defined schema) with each single level of an object structure individually (no direct nesting) where   the nesting is done by setting a field type to its reference from it (`type: Schemas.NAME_OF_SCHEMA`). Schema parts or structures that are common to multiple collections are likely candidates to be moved out into its own collection to avoid duplication by storing an array of IDs representing its collection instead of it directly.
>
> <details>
> <summary>⋯</summary>
>
> > `/imports/api/schemas/SCHEMA_NAME.js`
> >
> > ```js
> > import SimpleSchema from 'meteor/aldeed:simple-schema';
> > import { Schemas } from '/imports/api/Schemas'; // Schemas object that holds all defined schema 
> > import { COLLECTION_NAME_Collection } from '/imports/api/collections/COLLECTION_NAME'; // Schema's Collection
> > 
> > // Define the schema for a FIELD_NESTED_OBJECT
> > Schemas.SCHEMA_NESTED_OBJECT_NAME = new SimpleSchema({
> >   FIELD: {
> >     type: RULE_TYPE,
> >     label: 'LABEL_FOR_FIELD',
> >     optional: true
> >   },
> >   FIELD_NESTED_OBJECT: {
> >     type: Schemas.SCHEMA_ANOTHER_NESTED_OBJECT_NAME, // Can be further nested etc
> >     label: 'FIELD_NESTED_OBJECT (Object)',
> >   },
> > });
> > 
> > // Define the SCHEMA_NAME schema for the COLLECTION_NAME_Collection using SimpleSchema to Schemas
> > Schemas.SCHEMA_NAME = new SimpleSchema({
> >   FIELD: {
> >     type: RULE_TYPE,
> >     label: 'LABEL_FOR_FIELD',
> >     optional: true
> >     // See Schema Rules for more...
> >   },
> >   FIELD_2: {
> >     type: String,
> >     label: 'FIELD_2 (String)'
> >   },
> >   FIELD_3: {
> >     type: SimpleSchema.Integer,
> >     label: 'FIELD_3 (Integer)'
> >   },
> >   FIELD_NESTED_OBJECT: {
> >     type: Schemas.SCHEMA_NESTED_OBJECT_NAME,
> >     label: 'FIELD_NESTED_OBJECT (Object)'
> >   },
> >   FIELD_ARRAY: {
> >     type: Array, // The field type is array
> >     label: 'Array of ANOTHER_COLLECTION IDs',
> >     defaultValue: []
> >   },
> >   'FIELD_ARRAY.$': {
> >     type: String, // FIELD_ARRAY.$ = an item (ID string) in FIELD_ARRAY
> >     label: 'ANOTHER_COLLECTION ID'
> >   }
> > });
> >   
> > // Attach the defined SCHEMA_NAME schema (from Schemas) to the COLLECTION_NAME_Collection which the publication file would import and call
> > COLLECTION_NAME_Collection.attachSchema(Schemas.SCHEMA_NAME);
> > ```
> > </details>

#### Schema Rules

> [!TIP]
>
> Refer to the [docs](https://github.com/Meteor-Community-Packages/meteor-simple-schema?tab=readme-ov-file#schema-rules) for the full list. Each defined field can have set rules such as type (String, Number, SimpleSchema.Integer, Boolean, Array... etc), a label (used in validation error messages), optional (whether the field is not required), min, max, defaultValue etc.    

#### Validating Data

> [!TIP]
>
> Refer to the [docs](https://github.com/Meteor-Community-Packages/meteor-collection2?tab=readme-ov-file#validation-contexts). Collection2 along with attached SimpleSchema automatically handles validating data on inserts and modification operations (not on existing data). As of Collection2 `v4.1.4`, only certain operators/modifiers are supported (see this [list](https://github.com/Meteor-Community-Packages/meteor-simple-schema/issues/9)) where some will not be automatically validated such as `$inc`, `$push`, `$pull` and `$pop` (see this [list](https://github.com/Meteor-Community-Packages/meteor-collection2/issues/12)) which would require either manual validation or using alternative supported operators/modifiers.

### Meteor Publications

> [!NOTE]
>
> Meteor will 'publish' (Mongo) collections from the server where connected client can 'subscribe' to for real-time changes (DB -> client) and reactivity (websockets) whenever data from the database are modified from Meteor methods calls (client -> DB) or the server. 

#### Publication definition

> [!TIP]
>
> Refer to the [docs](https://docs.meteor.com/api/meteor.html#Meteor-publish). The schema should be imported to be attached to the collection before it is published within the publication file.
>
> <details>
> <summary>⋯</summary>
>
> > ``/imports/api/publications/PUBLICATION_NAME.js``
> >
> > ```jsx
> > import { Meteor } from 'meteor/meteor';
> > import { COLLECTION_NAME_Collection } from '/imports/api/collections/COLLECTION_NAME'; // Collection to publish
> > 
> > // Schema
> > import '/imports/api/schemas/SCHEMA_NAME'; // Enable corresponding schema functionality + validation
> > 
> > // Publish the publication named as "PUBLICATION_NAME" from the backend, lets clients (front-end JSX) subscribe to the data in the COLLECTION_NAME_Collection for real time changes
> > Meteor.publish('PUBLICATION_NAME', () => COLLECTION_NAME_Collection.find());
> > ...
> > ```
> >
> > **Mock Data**
> >
> > ```jsx
> > ...
> > Meteor.startup(async () => { // [Mock Data] via Meteor Startup (same file as its publication)
> >   await COLLECTION_NAME_Collection.insertAsync({ // Insert mock document with schema validation
> >     FIELD: VALUE,
> >     ...
> >   });
> > });
> > ```
> >   
> > **Add publication import to `Publications.js` to consolidate for server startup**
> > 
> >``/imports/api/Publications.js``
> > 
> >```jsx
> > ...
> >import '/imports/api/publications/PUBLICATION_NAME';
> > ```
> > </details>

### Meteor Subscriptions + useFind (react-meteor-data)

> [!NOTE]
>
> [`meteor/react-meteor-data/suspense`](https://docs.meteor.com/packages/react-meteor-data#suspendable-version-of-hooks) provides the suspendable useSubscribe and useFind hooks that allows connected clients to subscribe to publications for fetching data from the database (DB -> client) with real time changes and reactivity. It is important to use the suspendable version of `react-meteor-data` to work with SSR and ensure the component with the useFind fetch is wrapped under `<Suspense> <JSX /> </Suspense>` at the parent which also handles the fallback instead of managing `isLoading` states. It also suspends the rendering (to fallback state) until the subscription with useFind fetch is ready where SSR fetches on the server side render before it is sent to the client and hydrated.

#### useSubscribe Hook

> [!TIP]
>
> Refer to the [docs](https://docs.meteor.com/packages/react-meteor-data#usesubscribe). Before the useFind hook, the client first must subscribe via useSubscribe hook (suspendable) to the collection's publication that will be fetched from.
>
> <details>
> <summary>⋯</summary>
>
> ```jsx
> import { useFind, useSubscribe } from 'meteor/react-meteor-data/suspense';
> ...
> useSubscribe('PUBLICATION_NAME');
> ```
> </details>

#### useFind Hook

> [!TIP]
>
> Refer to the [docs](https://docs.meteor.com/packages/react-meteor-data#usefind). Fetches data from the database with real-time changes and reactivity that returns an array of the fetch result. **Ensure only the needed fields are specified** in every useFind otherwise it would end up being very inefficient to fetch the entire document across many places repeatedly! To make it easier, fetch the entire document first then add the specifics after by finding all the fields via ctrl+f on `data.` etc. 
>
> <details>
> <summary>⋯</summary>
>
> It should generally be used at the bottom level (deepest nest) on fetching the fields it needs at the file. This ensures easier JSX reuse and less re-renders (when a field used in a component changes, it won't cause any other deeper components to re-render unlike passing data across props which affects the entire chain). It would also make it easier to avoid dealing with specifying required fields at the top level component that may pass unneeded fields across props down many levels and may be messy to keep track on finding the parent useFind over managing its specified fields each time for a nested child to use. 
>
> > "The general approach is to treat useFind for getting the needed fields at the JSX it's in to decouple from other files by only passing any id via props or route params to children instead of the fetch content itself so that each JSX file does the fetching it needs using the given id via props or `route/:params/`"
>
> `useFind(COLLECTION, [MongoSelector, options])`:
>
> - The 1st useFind parameter is the COLLECTION to fetch from `import { <COLLECTION> } from '/imports/api/collections/<COLLECTION>'`
> - The 2nd useFind parameter is the list `[...]` of same parameters corresponding to `Collection.find(...)` for the fetch:
>   - <u>MongoSelector</u> is the selection filter by query operators where `{}` returns all documents in a collection, refer to the [docs](https://www.mongodb.com/docs/manual/reference/mql/query-predicates/#std-label-query-projection-operators-top). 
>   - <u>options</u> is additional options for the query such as fields (very important), refer to the [docs](https://docs.meteor.com/api/collections.html#Mongo-Collection-find) (open option table).
>
> **Collection.find().fetch() equivalent**:
>
> <details>
> <summary>⋯</summary>
>
> > ```jsx
> > import { useSubscribe, useFind } from 'meteor/react-meteor-data/suspense';
> > import { COLLECTION_NAME_Collection } from '/imports/api/collections/COLLECTION_NAME';
> > ...
> > useSubscribe('PUBLICATION_NAME'); // Subscribe to the publication, suspense waits for subscribed data in SSR
> > const fetchResultArray = useFind(COLLECTION_NAME_Collection, [
> >   MongoSelector, // The selection query operators where {} returns all documents
> >   options // Ensure to specify {..., fields: { FIELD_1: 1, ...} }
> > ]);
> > ```
> >
> > Examples: 
> >
> > `Collection.find({...}, {..., fields: { FIELD: 1, ...} )` ->
> >
> > ```jsx
> > const RESULT_1 = useFind(COLLECTION_NAME_Collection, [
> >   {},
> >   { 
> >     sort: { createdAt: -1 },
> >     fields: { FIELD_1: 1, FIELD_2: 1 }
> >   }
> > ]); // Fetch all (sorted) with specified fields of FIELD_1, FIELD_2
> > ```
> > ```jsx
> > const RESULT_2 = useFind(COLLECTION_NAME_Collection, [
> >   { FIELD_1: { $eq: 'FIELD_VALUE_TO_MATCH' } },
> >   { fields: { FIELD_2: 1, FIELD_3: 1 } }
> > ]); // Full $eq, fetch all matching FIELD_1 value with specified fields of FIELD_2, FIELD_3
> > ```
> > ```jsx
> > const RESULT_2 = useFind(COLLECTION_NAME_Collection, [
> >   { FIELD_1: 'FIELD_VALUE_TO_MATCH' },
> >   { fields: { FIELD_2: 1, FIELD_3: 1 } }
> > ]); // Shorthand $eq, fetch all matching FIELD_1 value with specified fields of FIELD_2, FIELD_3
> > ```
> </details>
>
> **Collection.findOne().fetch() equivalent**:
>
> <details>
> <summary>⋯</summary>
>
> > ```jsx
> > import { useSubscribe, useFind } from 'meteor/react-meteor-data/suspense';
> > import { COLLECTION_NAME_Collection } from '/imports/api/collections/COLLECTION_NAME';
> > ...
> > useSubscribe('PUBLICATION_NAME'); // Subscribe to the publication, suspense waits for subscribed data in SSR
> > const fetchResultOne = useFind(COLLECTION_NAME_Collection, [
> >   MongoSelector, // The selection query operators where {} returns all documents
> >   options // Ensure to specify {..., fields: { FIELD: 1, ...} }
> > ])[0] ?? null; // Take the first result [0] else fallback ?? with null or anything in its place
> > ```
> >
> > Examples:
> >
> > `Collection.findOne({...}, {..., fields: { FIELD: 1, ...} )` ->
> >
> > ```jsx
> > const RESULT_1 = useFind(COLLECTION_NAME_Collection, [
> >   {},
> >   { fields: { FIELD_1: 1, FIELD_2: 1 } }
> > ])[0] ?? null;; // Fetch all with specified fields of FIELD_1, FIELD_2
> > ```
> > ```jsx
> > const RESULT_2 = useFind(COLLECTION_NAME_Collection, [
> >   { FIELD_1: { $eq: 'FIELD_VALUE_TO_MATCH' } },
> >   { fields: { FIELD_2: 1, FIELD_3: 1 } }
> > ])[0] ?? null;; // Full $eq, fetch all matching FIELD_1 value with specified fields of FIELD_2, FIELD_3
> > ```
> > ```jsx
> > const RESULT_2 = useFind(COLLECTION_NAME_Collection, [
> >   { FIELD_1: 'FIELD_VALUE_TO_MATCH' },
> >   { fields: { FIELD_2: 1, FIELD_3: 1 } }
> > ])[0] ?? null;; // Shorthand $eq, fetch all matching FIELD_1 value with specified fields of FIELD_2, FIELD_3
> > ```
> </details>
> </details>

#### useTracker Hook

> [!CAUTION]
>
> useTracker hook currently does not work properly in most cases as the suspendable version freezes with errors and the regular version breaks SSR, so it should be avoided where the useFind hook instead should be sufficient for most cases.

### User Data

> [!NOTE]
>
> [Meteor Accounts](https://docs.meteor.com/api/accounts.html) manages user documents in a built-in Mongo collection that is accessed via `Meteor.users`. Fetching data for the loggedIn user to the client is done through the custom 'AuthContext' (userId) and 'User' utils (data). Fetching any users data that is not from the loggedIn user is done via the useFind hook but with `Meteor.users` as the collection first argument on the `'users'` publication subscription.

#### useContext(AuthContext) Hook (for fetching loggedIn userId)

> [!TIP]
>
> The method to obtain the loggedIn userId is computed once reactively (after logging in/out) within the top level AuthProvider accessed and reused from anywhere via useContext hook on AuthContext. If the user is not loggedIn, the userId value would be `undefined` which also provides the method to check for the loggedIn state. This loggedIn userId would be used for many queries in database fetches such as user content data. 
>
> <details>
> <summary>⋯</summary>
>
> > ```jsx
> > import { AuthContext } from '/imports/utils/contexts/AuthContext';
> > ...
> > const loggedInUserId = useContext(AuthContext); // Computed once from top level
> > const loggedIn = useContext(AuthContext); // Same way to check if loggedIn (id == true, undefined == false)
> > ```
> </details>

#### User Utils (for fetching loggedIn userdata)

> [!TIP]
>
> A custom User utils helper utility function is used to fetch data more than just the userId for the loggedIn user. **Ensure only the needed fields are specified** in every User utils otherwise it would end up being incredibly inefficient to fetch entire user document across many places repeatedly.
>
> <details>
> <summary>⋯</summary>
>
> `User([...], options)`
>
> - The 1st User utils parameter is the list `[...]` of fields to specify for the fetch, it's important to only include the needed fields.
> - The 2nd User utils parameter (optional) is additional options for the query except for fields (do not pass fields here), refer to the [docs](https://docs.meteor.com/api/collections.html#Mongo-Collection-find) (open option table).
>
> > ```jsx
> > import { User } from '/imports/utils/User';
> > ...
> > const userData = User(fields = [], options = {});
> > const field_1 = userData.field_1;
> > const field_2 = userData.field_2 ?? 'fallback_value'; // Set optional ?? fallback value
> > 
> > // Or direct fields destructuring
> > { field_1, field_n...} = User(fields = [], options = {});
> > { field_1 = 'fallback_val', field_n = 'fallback_val'...} = User(fields = [], options = {});
> > ```
> >
> > - Fallback value for User isn't strictly needed as the RouteGuard should prevent rendering before it is ready but it might be good practice to deal with undefined, should it occur for a brief moment.
> >
> > Examples:
> >
> > ```jsx
> > const user = User(['_id', 'username', 'emails.address']); // Array of fields to fetch
> > const username = user?.username;
> > const email = user?.emails?.[0].address ?? 'fallback_value';
> > const userId = user?._id ?? ''; // Only fetch _id if also fetching other fields to replace AuthContext
> > ```
> >
> > ```jsx
> > const { _id, username = 'fallback', emails } = User(['_id', 'username', 'emails.address']);
> > ```
> >
> > ```jsx
> > const { _id, username, emails: { address } } = User(['_id', 'username', 'emails.address']);
> > ```
> </details>

#### UseFind Hook with `Meteor.users` (for fetching users data)

> [!TIP]
>
> Fetching any users data that is not from the loggedIn user is done through the useSubscribe hook on `'users'` publication with useFind hook  where `Meteor.users` is the collection as the first argument. **Ensure only the needed fields are specified** in every useFind otherwise it would end up being incredibly inefficient to fetch entire users documents across many places repeatedly.
>
> <details>
> <summary>⋯</summary>
>
> >   `useFind(Meteor.users, [MongoSelector, options])`:
> >
> > ```jsx
> > import { Meteor } from 'meteor/meteor';
> > import { useSubscribe, useFind } from 'meteor/react-meteor-data/suspense';
> > ...
> > useSubscribe('users'); // Subscribe to the 'users' publication, suspense waits for subscribed data in SSR
> > const fetchResultArray = useFind(Meteor.users, [
> >   MongoSelector, // The selection query operators where {} returns all documents
> >   options // Ensure to specify {..., fields: { FIELD_1: 1, ...} }
> > ]);
> > ```
> >
> > - The 1st useFind parameter is `Meteor.users` as the collection to fetch from.
> > - The 2nd useFind parameter is the list `[...]` of same parameters corresponding to `Collection.find(...)` for the fetch:
> >   - <u>MongoSelector</u> is the selection filter by query operators where `{}` returns all documents in a collection, refer to the [docs](https://www.mongodb.com/docs/manual/reference/mql/query-predicates/#std-label-query-projection-operators-top). 
> >   - <u>options</u> is additional options for the query such as fields (very important), refer to the [docs](https://docs.meteor.com/api/collections.html#Mongo-Collection-find) (open option table).
> >
> > Examples:
> >
> > ```jsx
> > useSubscribe('users');
> > ...
> > ```
> >
> > ```jsx
> > const RESULT_1 = useFind(Meteor.users, [
> >   {},
> >   { 
> >     sort: { createdAt: -1 },
> >     fields: { FIELD_1: 1, FIELD_2: 1 }
> >   }
> > ]); // Fetch all users (sorted) with specified fields of FIELD_1, FIELD_2
> > ```
> >
> > ```jsx
> > const RESULT_2 = useFind(Meteor.users, [
> >   { FIELD_1: { $eq: 'FIELD_VALUE_TO_MATCH' } },
> >   { fields: { FIELD_2: 1, FIELD_3: 1 } }
> > ]); // Full $eq, fetch all matching FIELD_1 value with specified fields of FIELD_2, FIELD_3
> > ```
> >
> > ```jsx
> > const RESULT_2 = useFind(Meteor.users, [
> >   { FIELD_1: 'FIELD_VALUE_TO_MATCH' },
> >   { fields: { FIELD_2: 1, FIELD_3: 1 } }
> > ]); // Shorthand $eq, fetch all matching FIELD_1 value with specified fields of FIELD_2, FIELD_3
> > ```
> </details>

## Server Side Rendering (SSR)

> [!TIP]
> _Non useFind, datetime (timezone) or modified data (sorting etc) fetches from the database that gets loaded directly on the page should opt out of SSR such as the DashboardSkillTrees (sort mismatch issue) and ProofsList (datetime timezone mismatch) etc._

<h1 align="center">⬥ Configuration (<code>settings.json</code>) ⬥</h1>

Create or edit the file `settings.json`:

> ```
> {
>   "public": {
>     "enableSSR": true
>   },
>   "private": {
>     "AWSAccessKeyId": "",
>     "AWSSecretAccessKey": "",
>     "google": {
>       "clientId": "",
>       "secret": ""
>     },
>     "smtp": {
>       "username": "your@gmail.com",
>       "password": "app-password",
>       "server": "smtp.gmail.com",
>       "port": 465
>     }
>   }
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
      <th><b>⦗ Start Webserver ⦘</b></th>
      <th><b>⦗ Stop Webserver ⦘</b></th>
      <th><b>⦗ Restart Webserver ⦘</b></th>
    </tr>
    <tr>
      <td><pre lang="shell">./start &emsp;&emsp;&emsp;&emsp;</pre></td>
      <td><pre lang="shell">./stop &emsp;&emsp;&emsp;&emsp;</pre></td>
      <td><pre lang="shell">./restart &emsp;&emsp;&emsp;&emsp;</pre></td>
    </tr>
    <tr>
      <th><b>⦗ Pull Repo Changes ⦘</b></th>
      <th><b>⦗ Update Webserver ⦘</b></th>
      <th><b>⦗ Build Deployment Bundle ⦘</b></th>
    </tr>
    <tr>
      <td><pre lang="shell">./pull &emsp;&emsp;&emsp;&emsp;</pre></td>
      <td><pre lang="shell">./update &emsp;&emsp;&emsp;&emsp;</pre></td>
      <td><pre lang="shell">./build &emsp;&emsp;&emsp;&emsp;</pre></td>
    </tr>
    <tr>
      <th><b>⦗ Webserver Console ⦘</b></th>
      <th><b>⦗ Reverse Proxy Console ⦘</b></th>
      <th><b>⦗ Build Console ⦘</b></th>
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
> **Use Ctrl+A then D to detach** from the session instead.
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
