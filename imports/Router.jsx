import { Meteor } from 'meteor/meteor';
import { FastRender } from 'meteor/communitypackages:fast-render';
import React from 'react';
import { Helmet } from 'react-helmet';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouterProvider } from 'react-router-dom/server';
import {
  RouterProvider,
  createBrowserRouter,
  createMemoryRouter
} from 'react-router-dom';

// Root Routes
import { RootRoutes } from '/imports/routes/Root';

const rootId = 'react-target';
const helmetTags = [
  'base',
  'bodyAttributes',
  'htmlAttributes',
  'link',
  'meta',
  'noscript',
  'script',
  'style',
  'title'
];

// Render Router routes on both client side & server side rendering (SSR) [default]
if (Meteor.settings.public.enableSSR != false) {
  if (Meteor.isServer) {
    FastRender.onPageLoad(async sink => {
      const location = sink.request.url;
      const router = createMemoryRouter(RootRoutes, {
        initialEntries: [location]
      });
      const routerJsx = <StaticRouterProvider router={router} context={{}} />;

      sink.appendToElementById(rootId, renderToNodeStream(routerJsx)); // renderToNodeStream is deprecated but only that works as Meteor doesn't support renderToPipeableStream

      // Add helmet tags for server render
      const helmet = Helmet.renderStatic();
      helmetTags.forEach(tag => {
        sink.appendToHead(helmet[tag].toString());
      });
    });
  } else if (Meteor.isClient) {
    const router = createBrowserRouter(RootRoutes, {
      future: {
        v7_partialHydration: true
      }
    });
    const routerJsx = <RouterProvider router={router} />;

    FastRender.onPageLoad(() => {
      hydrateRoot(document.getElementById(rootId), routerJsx);
    });
  }
} // Without SSR
else if (Meteor.isClient) {
  const router = createBrowserRouter(RootRoutes);
  const routerJsx = <RouterProvider router={router} />;
  const root = createRoot(document.getElementById(rootId));

  root.render(routerJsx);
}
