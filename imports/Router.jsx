import { renderWithSSR } from 'meteor/communitypackages:react-router-ssr';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Root Routes
import { RootRoutes } from '/imports/routes/Root';

// Render Router routes on both client side & server side rendering (SSR)
if (Meteor.settings.enableSSR != false) {
  renderWithSSR(RootRoutes);
} // Without SSR
else if (Meteor.isClient) {
  const root = ReactDOM.createRoot(document.getElementById('react-target'));
  root.render(<RouterProvider router={createBrowserRouter(RootRoutes)} />);
}
