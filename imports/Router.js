import { renderWithSSR } from 'meteor/communitypackages:react-router-ssr';

// Root Routes
import { RootRoutes } from '/imports/routes/Root';

// Render Router routes on both client side & server side rendering (SSR)
renderWithSSR(RootRoutes);
