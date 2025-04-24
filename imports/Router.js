import { renderWithSSR } from 'meteor/communitypackages:react-router-ssr';

// Root Routes
import { AppRoutes } from '/imports/routes/App';

// Render Router routes on both client side & server side rendering (SSR)
renderWithSSR(AppRoutes);
