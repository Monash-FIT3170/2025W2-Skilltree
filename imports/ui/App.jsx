import React from 'react';
import { Hello } from './Hello.jsx';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { SampleCollection } from '/imports/api/collections/Sample';

export const App = () => { 
  useSubscribe("sample"); // Subscribe to the "sample" publication
  samples = useFind(() => SampleCollection.find()); // Fetch documents from SampleCollection using Meteor's useFind method for real-time updates from the database
  return (
    <div className='p-2'>
      <h1 className='text-3xl font-bold mt-2'>Welcome to SkillTree!</h1>
      <Hello/>
      <h3 className='text-xl font-semibold mt-4'>Sample:</h3>
      <ul className='list-disc list-inside mt-2'>
        { samples.map(sample => <li key={sample._id} className="mb-1">{sample.title} by {sample.author}: {sample.copies}x</li>) }
      </ul>
    </div>
  );
}
