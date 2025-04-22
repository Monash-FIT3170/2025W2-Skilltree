import React from 'react';
import { Helmet } from 'react-helmet';
import { useSubscribeSuspense } from "meteor/communitypackages:react-router-ssr";
import { useFind } from "meteor/react-meteor-data/suspense";

// Mongo Collections
import { SampleCollection } from '/imports/api/collections/Sample';

export const Sample = () => { 
  useSubscribeSuspense("sample")  // Subscribe to the "sample" publication, suspense waits and allows for subscribed data on SSR pre-rendering 
  const samples = useFind(SampleCollection, []); // Fetch documents from SampleCollection using Meteor's useFind method for real-time updates from the database
  
  return (
    <div>
      <Helmet>
        <title>SkillTree - Home</title>
      </Helmet>
      <div className='p-2'>
        <h1 className='text-3xl font-bold mt-2'>Welcome to SkillTree!</h1>
        <h3 className='text-xl font-semibold mt-4'>Sample:</h3>
        <ul className='list-disc list-inside mt-2'>
          { samples.map(sample => <li key={sample._id} className="mb-1">{sample.title} by {sample.author}: {sample.copies}x</li>) }
        </ul>
      </div>
    </div>
  );
}
