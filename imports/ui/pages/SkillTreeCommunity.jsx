import React from 'react';
import { Helmet } from 'react-helmet';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { SkillTreeEdit } from '../components/SkillTree';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';
import { useParams } from 'react-router-dom';
import { NavigationDropdown } from '../components/NavigationDropdown';

export const SkillTreeCommunity = () => {
  // extract id from url params
  const { id } = useParams();

  // load skilltree data
  const { skilltree, isLoading } = useTracker(() => {
    const handle = Meteor.subscribe('skilltreeById', id);
    const isLoading = !handle.ready();
    const skilltree = SkillTreeCollection.findOne({ _id: id });

    return {
      skilltree,
      isLoading: isLoading
    };
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
