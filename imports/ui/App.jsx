import React from 'react';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { SampleCollection } from '/imports/api/collections/Sample';
import { Route, Switch } from 'wouter';
import { publicRoutes } from '../utils/constants/routes';

export const App = () => {
    useSubscribe('sample'); // Subscribe to the "sample" publication
    samples = useFind(() => SampleCollection.find()); // Fetch documents from SampleCollection using Meteor's useFind method for real-time updates from the database
    return (
        <div className="p-2">
            <h1 className="text-3xl font-bold mt-2">Welcome to SkillTree!</h1>

            {/* Content depends on what route the user is on. */}
            <Switch>
                {/* Make available all public routes.
                 To add protected routes you can check if the user is logged in
                 and then do the same for protectedRoutes (make sure to import) */}
                {Object.values(publicRoutes).map(route => (
                    <Route key={route.path} path={route.path}>
                        {route.element}
                    </Route>
                ))}
            </Switch>

            <h3 className="text-xl font-semibold mt-4">Sample:</h3>
            <ul className="list-disc list-inside mt-2">
                {samples.map(sample => <li key={sample._id}
                                           className="mb-1">{sample.title} by {sample.author}: {sample.copies}x</li>)}
            </ul>
        </div>
    );
};