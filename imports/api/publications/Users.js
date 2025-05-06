import { Meteor } from 'meteor/meteor';
import { UsersCollection } from '/imports/api/collections/Users';

// Schema
import '/imports/api/schemas/Users'; // Enable Users Schema Validation (demonstration) 

// Publish the publication named as "users" from the backend, lets clients (front-end JSX) subscribe to the data in the UsersCollection for real time changes
Meteor.publish("users", () => UsersCollection.find());

// [Mock Data] via Meteor Startup
Meteor.startup(async () => {
    // Insert a sample document into the UsersCollection with schema validation
    await UsersCollection.removeAsync({}); // Drop collection content to update and avoid dupes (debug)

    const exampleUserInput = {
        username: "typeShii",
        email: "godDragonSlayer@example.com",
        passwordHash: "$2b$10$7zTgW8gZcF9szQOGzCzKX.3OeWNjWwuzdN8nZ6eTfqGoK8.LtAfDO",
        password: "Example123445678@!#",
        dateOfBirth: new Date("2024-05-07"),
        subscribedCommunities: [
          "iCZmdXWy5GyqoqBox", 
          "iCZmdXWy5GyqoqBox"
        ],
        profile: {
          fullName: "Steven Kaing",
          avatarUrl: "https://example.com/avatar.jpg",
          bio: "idk what to put here lol"
        },
        roles: ["user", "moderator"],
        isActive: true,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        proof_of_practice_uploads: [
          "65a8b11f3d93c27b3c1b9de1", 
          "65a8b11f3d93c27b3c1b9de2"
        ],
        expertise_areas: ["Web Development", "Cybersecurity", "Devsssps"],
        membership_tier: "pro"
    };

    await UsersCollection.insertAsync(exampleUserInput);
});
