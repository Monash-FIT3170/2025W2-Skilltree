import React from 'react';
import { Hello } from './Hello.jsx';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { SampleCollection } from '/imports/api/collections/Sample';

export const App = () => { 
  useSubscribe("sample"); // Subscribe to the "sample" publication
  samples = useFind(() => SampleCollection.find()); // Fetch documents from SampleCollection using Meteor's useFind method for real-time updates from the database
  return (
    <div>
      <h1>Welcome to SkillTree!</h1>
      <Hello/>
      <h3>Sample:</h3>
      <ul>
        { samples.map(sample => <li key={sample._id}>{sample.title} by {sample.author}: {sample.copies}x</li>) }
      </ul>
    </div>
  );
}
