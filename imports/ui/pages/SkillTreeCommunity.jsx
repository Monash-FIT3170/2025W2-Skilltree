import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Meteor } from 'meteor/meteor';
import { SkillTreeEdit } from '../components/SkillTree';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { useParams } from 'react-router-dom';
import { NavigationDropdown } from '../components/NavigationDropdown';
import { Tracker } from 'meteor/tracker';

export const SkillTreeCommunity = () => {
  // extract id from url params
  const { id } = useParams();

  const [skilltree, setSkilltree] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handle = Meteor.subscribe('skilltreeById', id);

    const fetchData = async () => {
      if (handle.ready()) {
        const result = await SkillTreeCollection.findOneAsync({ _id: id });
        setSkilltree(result);
        setIsLoading(false);
      }
    };

    const computation = Tracker.autorun(() => {
      fetchData();
    });

    return () => computation.stop();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (!skilltree) return <div>Skill Tree not found</div>;

  console.log('Nodes:', skilltree.skillNodes);
  console.log('Edges:', skilltree.skillEdges);

  return (
    <>
      <Helmet>
        <title>SkillTree - Community Page</title>
      </Helmet>
      <div className="p-2">
        <NavigationDropdown id={id} />
        <h1 className="text-3xl font-bold mt-2">
          Welcome to {skilltree.title}!
        </h1>
        <div className="text-lg mt-2">
          <p>Description: {skilltree.description}</p>
          <p>Terms & Conditions: {skilltree.termsAndConditions}</p>
        </div>
      </div>
      <SkillTreeEdit
        isAdmin={false}
        onSave={() => {}}
        savedNodes={skilltree.skillNodes}
        savedEdges={skilltree.skillEdges}
      />
    </>
  );
};
