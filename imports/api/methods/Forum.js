import { Meteor } from 'meteor/meteor';
import { ForumCollection } from '/imports/api/collections/Forum';
import { check } from 'meteor/check';

// Define Meteor Methods for ForumCollection
Meteor.methods({
  // Method to insert a forum
  async insertForum(forumTitle, skillTreeName) {
    check(forumTitle, String);
    check(skillTreeName, String);

    try {
      // Generate a unique id number for the forum
      const lastForum = await ForumCollection.findOneAsync(
        {},
        { sort: { forumId: -1 } }
      );
      const newForumId =
        lastForum && lastForum.forumId ? lastForum.forumId + 1 : 1;

      // Insert forum into collection
      const res = await ForumCollection.insertAsync({
        forumId: newForumId,
        title: forumTitle,
        skillTreeName: skillTreeName,
        messages: []
      });

      return res;
    } catch {
      throw new Meteor.Error('insert-forum-failed', 'Failed to create forum');
    }
  },

  async findForumID(forumId) {
    check(forumId, Number);

    try {
      return await ForumCollection.findOneAsync({ forumId: forumId });
    } catch {
      throw new Meteor.Error('find-forum-failed', 'Failed to find forum');
    }
  },

  async getSkillTreeForums(skillTreeName) {
    check(skillTreeName, String);

    try {
      return await ForumCollection.find({
        skillTreeName: skillTreeName
      }).fetchAsync();
    } catch {
      throw new Meteor.Error('get-forums-failed', 'Failed to get forums');
    }
  },

  async addMessageToForum(forumId, content, userId) {
    check(forumId, Number);
    check(content, String);
    check(userId, String);

    try {
      // Add a message to the forum
      const messageObj = {
        content,
        userId,
        timestamp: new Date() // Added timestamp for better UX
      };

      return await ForumCollection.updateAsync(
        { forumId: forumId },
        { $push: { messages: messageObj } }
      );
    } catch {
      throw new Meteor.Error('add-message-failed', 'Failed to add message');
    }
  }
});
