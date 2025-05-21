import React from 'react';
import { CommentSection } from '/imports/ui/components/CommentSection'; // Importing the CommentSection component
import { AddComment } from './AddComment';

export const ProofsPostList = () => {
  // Dummy data for rendering empty boxes (since no data is available yet)
  const posts = Array(5).fill({});

  return (
    <div className="min-h-screen bg-white py-10">
      <div className="max-w-5xl mx-auto px-4">
        <h3 className="text-xl font-semibold mt-4">Posts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Render empty boxes */}
          {posts.map((_, index) => (
            <div
              key={index}
              className="p-4 border border-gray-300 mb-4 bg-gray-200"
            >
              {/* Placeholder for Post */}
              <div className="text-sm text-white bg-[#a0bc86] h-6 mb-2 flex items-center">
                <span className="mr-1">👑</span>
                <span>Username Placeholder</span>
              </div>
              <div className="text-sm text-white bg-gray-400 h-6 mb-2">
                Community Placeholder
              </div>

              {/* Placeholder for Image */}
              <div className="w-full h-48 mb-4 bg-gray-300"></div>

              {/* Placeholder for Caption */}
              <div className="text-sm text-white bg-[#a0bc86] h-6 mb-4">
                Caption Placeholder
              </div>

              {/* Placeholder for Comment Section */}
              
              <div className="p-3 border-t border-gray-300 mt-12">
                
                <div className="mb-2">
                  <AddComment username ="Username Placeholder" postid="Post ID Placeholder" />
                </div>
                <CommentSection />
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
