import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useSubscribeSuspense } from 'meteor/communitypackages:react-router-ssr';
import { useFind } from 'meteor/react-meteor-data/suspense';

// Mongo Collections
import { SampleCollection } from '/imports/api/collections/Sample';

export const SampleView = () => {
  useSubscribeSuspense('sample'); // Subscribe to the "sample" publication, suspense waits and allows for subscribed data on SSR pre-rendering
  const samples = useFind(SampleCollection, []); // Fetch documents from SampleCollection using Meteor's useFind method for real-time updates from the database
  const SampleCopiesInc = sampleId => async amount => {
    await Meteor.callAsync('sampleCopiesInc', sampleId, amount); // Call Meteor method to increase copies by amount on SampleCollection by the sampleId
  };
  const copiesAddOne = sampleId => SampleCopiesInc(sampleId)(+1);
  const copiesSubOne = sampleId => SampleCopiesInc(sampleId)(-1);

  return (
    <>
      <h3 className="text-xl font-semibold mt-4">Sample:</h3>
      <ul className="list-disc list-inside mt-2">
        {samples.map(sample => (
          <li key={sample._id} className="mb-1">
            {sample.title} by {sample.author}: {sample.copies}x
            <button
              onClick={() => copiesAddOne(sample._id)}
              className="bg-gray-500 text-white py-1 px-2 rounded mt-3 hover:bg-gray-600 active:bg-gray-400"
            >
              +1
            </button>
            <button
              onClick={() => copiesSubOne(sample._id)}
              className="bg-gray-500 text-white py-1 px-2 rounded mt-3 hover:bg-gray-600 active:bg-gray-400"
            >
              -1
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
