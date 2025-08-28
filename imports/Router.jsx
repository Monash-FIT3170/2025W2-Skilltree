import { Meteor } from 'meteor/meteor';
import { FastRender } from 'meteor/communitypackages:fast-render';
import { renderWithSSR } from 'meteor/communitypackages:react-router-ssr';
import React from 'react';
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
// Render Router routes on both client side & server side rendering (SSR) via renderWithSSR from react-router-ssr
if (Meteor.settings.public.enableSSR == true) {
  renderWithSSR(RootRoutes);
} // Partial SSR (no subscribed prerender) [default]
else if (Meteor.settings.public.enablePartialSRR != false) {
  if (Meteor.isServer) {
    FastRender.onPageLoad(async sink => {
      const location = sink.request.url;
      const router = createMemoryRouter(RootRoutes, {
        initialEntries: [location]
      });
      const routerJsx = <StaticRouterProvider router={router} context={{}} />;

      sink.appendToElementById(rootId, renderToNodeStream(routerJsx)); // renderToNodeStream is deprecated but only that works as Meteor doesn't support renderToPipeableStream
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
