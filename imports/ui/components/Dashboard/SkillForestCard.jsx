import React from 'react';
import { Link } from 'react-router-dom';
import { RiVipCrownLine } from '@react-icons/all-files/ri/RiVipCrownLine';

// Remove unused imports: ChevronRight, Users, useFind, SkillForestCollection

export const SkillForestCard = ({ skillForest, currentUserId }) => {
  const isOwner = skillForest.owner === currentUserId;

  return (
    <Link to={`/skillForest/${skillForest._id}`}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden cursor-pointer">
        <div
          className={`relative h-32 
          ${
            !skillForest.image
              ? 'bg-gradient-to-br from-[#025940] to-[#04BF8A]'
              : ''
          }`}
        >
          {skillForest.image && (
            <img
              src={skillForest.image}
              alt={skillForest.title}
              className="w-full h-full object-cover opacity-65"
              onError={e => {
                e.target.style.display = 'none';
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          {/* Owner Crown */}
          {isOwner && (
            <div className="absolute top-2 right-2 bg-yellow-500 rounded-full p-1.5 shadow-lg">
              <RiVipCrownLine size={14} className="text-white" />
            </div>
          )}

          <h3 className="absolute bottom-3 left-3 text-white font-semibold text-lg">
            {skillForest.title}
          </h3>
        </div>

        <div className="p-4">
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {skillForest.description}
          </p>
        </div>
      </div>
    </Link>
  );
};
