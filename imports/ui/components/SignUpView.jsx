import React from 'react';
import { useSubscribeSuspense } from "meteor/communitypackages:react-router-ssr";
import { useFind } from "meteor/react-meteor-data/suspense";

// Mongo Collections
import { SampleCollection } from '/imports/api/collections/Sample';

export const SignUpPage = () => { 
  useSubscribeSuspense("sample")  // Subscribe to the "sample" publication, suspense waits and allows for subscribed data on SSR pre-rendering 
  const samples = useFind(SampleCollection, []); // Fetch documents from SampleCollection using Meteor's useFind method for real-time updates from the database
  
  return (
    <>
      <h3 className='text-xl font-semibold mt-4'>Sample:</h3>
      <ul className='list-disc list-inside mt-2'>
        { samples.map(sample => <li key={sample._id} className="mb-1">{sample.title} by {sample.author}: {sample.copies}x</li>) }
      </ul>
    </>
  );
}
