import React from 'react';
import { Meteor } from 'meteor/meteor';

export const UserList = ({ skillTreeId }) => {
  // call meteor method skilltrees.get
  const getSkillTree = async () => {
    const skillTree = Meteor.call('skilltrees.get', skillTreeId);
    return skillTree.subscribers;
  };

  // call meteor method user
  const getUserInfo = async userId => {
    const user = Meteor.user.findOneAsync({ _id: userId });
    return user;
  };

  // array of userId
  const subscribers = getSkillTree();

  // NOT FORMATTED
  return (
    <div class="relative overflow-x-auto">
      <table>
        <thead>
          <tr>User ID</tr>
          <tr>Username</tr>
          <tr>User Email</tr>
        </thead>
        <tbody>
          {subscribers.map(userId => (
            <tr>
              <td>{userId}</td>
              <td>{getUserInfo(userId.username)}</td>
              <td>{getUserInfo(userId.emails[0])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
