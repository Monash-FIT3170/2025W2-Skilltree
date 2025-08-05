import { Meteor } from 'meteor/meteor';
import { SkillTreeCollection } from '/imports/api/collections/SkillTree';

// Method to search for SkillTree's by title and tag filters (Removed description search)
Meteor.methods({
  searchSkillTrees(titleKeyword, tagFilters = []) {
    // No search criteria provided, return empty array
    if (!titleKeyword && (!tagFilters || tagFilters.length === 0)) {
      return [];
    }

    const query = {};
    const conditions = [];

    // Add title search condition if keyword provided
    if (titleKeyword && titleKeyword.trim()) {
      const titleRegex = new RegExp(titleKeyword.trim(), 'i'); // case insensitive
      conditions.push({ title: { $regex: titleRegex } });
    }

    // Add tag filters condition if tags provided
    if (tagFilters && tagFilters.length > 0) {
      // Create regex patterns for each tag filter (case insensitive)
      const tagRegexArray = tagFilters.map(tag => new RegExp(tag, 'i'));
      
      // OR logic across multiple tags
      conditions.push({ tags: { $in: tagRegexArray } });
    }

    // If we have conditions, combine them with AND logic
    // Ensures that when you have both a title search and tag filters,
    // it finds SkillTrees that satisfy both criteria
    if (conditions.length > 0) {
      query.$and = conditions;
    }

    return SkillTreeCollection.find(query).fetch();
  }
});
