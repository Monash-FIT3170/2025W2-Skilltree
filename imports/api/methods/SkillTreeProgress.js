import { Meteor } from 'meteor/meteor';
import { SkillTreeProgressCollection } from '/imports/api/collections/SkillTreeProgress';
import { check } from 'meteor/check';

Meteor.methods({
    async saveSkillTreeProgress(skillTreeId, progressTree) {
        check(skillTreeId, String);
        check(progressTree, [Object]);

        const existing = await SkillTreeProgressCollection.findOneAsync({
            userId: this.userId,
            skillTreeId
        });

        if (existing) {
            return await SkillTreeProgressCollection.updateAsync(
                { userId: this.userId, skillTreeId },
                {
                    $set: {
                        progress: progressTree,
                    }
                }
            );
        }
        else {
            return await SkillTreeProgressCollection.insertAsync({
                userId: this.userId,
                skillTreeId,
                progress: progressArray,
            });
        }
    });