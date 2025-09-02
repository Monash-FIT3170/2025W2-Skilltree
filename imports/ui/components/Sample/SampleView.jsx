import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useSubscribe, useFind } from 'meteor/react-meteor-data/suspense';
import { Button } from 'flowbite-react';

// Mongo Collections
import { SampleCollection } from '/imports/api/collections/Sample';

export const SampleView = () => {
  useSubscribe('sample'); // Subscribe to the "sample" publication, suspense waits and allows for subscribed data on SSR pre-rendering
  const samples = useFind(SampleCollection, [
    {}, // selector - query to find
    {
      fields: { title: 1, author: 1, copies: 1 } // options: fields = Dictionary of fields to return or exclude, sort = order etc
    }
  ]); // Fetch documents from SampleCollection using Meteor's useFind method for real-time updates from the database
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
            <Button
              color="green"
              size="sm"
              onClick={() => copiesAddOne(sample._id)}
              pill
            >
              +1
            </Button>
            <Button
              color="green"
              size="sm"
              onClick={() => copiesSubOne(sample._id)}
              pill
            >
              -1
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
};
