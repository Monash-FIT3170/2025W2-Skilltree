import React from 'react';
import { ChevronRight, Users } from 'lucide-react';

export const SkillTreeCard = ({ skillTree, showSubscribers = false }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden cursor-pointer">
      <div
        className={`relative h-32 
        ${
          !skillTree.image
            ? 'bg-gradient-to-br from-[#025940] to-[#04BF8A]'
            : ''
        }`}
      >
        {skillTree.image && (
          <img
            src={skillTree.image}
            alt={skillTree.title}
            className="w-full h-full object-cover opacity-65"
            onError={e => {
              e.target.style.display = 'none';
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <h3 className="absolute bottom-3 left-3 text-white font-semibold text-lg">
          {skillTree.title}
        </h3>
      </div>

      <div className="p-4">
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {skillTree.description}
        </p>

        <div className="flex items-center justify-between">
          {showSubscribers && (
            <div className="flex items-center gap-1 text-gray-500">
              <Users size={14} />
              <span className="text-xs">
                {skillTree.subscribers.length} members
              </span>
            </div>
          )}
          <button className="text-[#04BF8A] hover:text-[#025940] transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
