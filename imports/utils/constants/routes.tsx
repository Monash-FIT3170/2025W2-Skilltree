import React from 'react';
import ExampleAPage from '../../ui/ExampleAPage';
import ExampleBPage from '../../ui/ExampleBPage';
import HomePage from '../../ui/HomePage';
import NotFoundPage from '../../ui/NotFoundPage';

/**
 * This file defines where all the URL routes point.
 * We use a routing library called 'wouter', check out the docs below if
 * you need to do anything more complex than just copying the examples.
 * https://github.com/molefrog/wouter?tab=readme-ov-file#faq-and-code-recipes
 */


/**
 * User does not need to be logged in to view these pages
 */
export const publicRoutes = {
    // Examples of generic routes to pages, you can copy this format to add new ones.
    exampleA: {
        path: '/examplea',
        element: <ExampleAPage /> as React.ReactNode,
    },
    exampleB: {
        path: '/exampleb',
        element: <ExampleBPage /> as React.ReactNode,
    },
    // Add more routes here

    // Order matters, place these last two last.
    // I believe that if you don't, the router may look at /example in the url, see the /, and just send you to the / route.
    home: {
        path: '/',
        element: <HomePage /> as React.ReactNode,
    },
    // All undefined redirect here.
    default: {
        path: '*',
        element: <NotFoundPage /> as React.ReactNode,
    },
};

/**
 * User has to be logged in to view these pages
 */
export const protectedRoutes = {
    // Add routes here, same as above. The logic for what gets shown is in App.jsx
};