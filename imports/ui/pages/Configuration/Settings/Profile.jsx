import React from 'react';
import { Meteor } from 'meteor/meteor';
export const Profile = () => {

    const user = Meteor.user()
    return (
        <div className="space-y-8">
            {/* General Section */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-[#328E6E] mb-2">General</h2>
                        <p className="text-gray-600">Update your profile information.</p>
                    </div>
                    <button className="px-6 py-2 bg-[#328E6E] hover:bg-[#2d7a5e] text-white rounded-lg transition-colors">
                        Save
                    </button>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
                        <input
                            type="text"
                            value={user.profile.givenName + " " + user.profile.familyName}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-[#328E6E] focus:ring-1 focus:ring-[#328E6E]"
                            readOnly
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Date of Birth</label>
                        <input
                            type="date"
                            value={user.profile.dateOfBirth}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-[#328E6E] focus:ring-1 focus:ring-[#328E6E]"
                        />
                    </div>


                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">About</label>
                        <input
                            type="text"
                            value={user.profile?.bio}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-[#328E6E] focus:ring-1 focus:ring-[#328E6E]"
                        />
                    </div>

                </div>
            </div>
        </div>
    );




}



