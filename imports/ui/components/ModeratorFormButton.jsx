import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Spinner } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

export const ModeratorFormButton = ({ skillTreeId, requireLogin = true }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const userID = Meteor.userId();

  const openFormButton = () => {
    if (!skillTreeId) {
      console.error('ModeratorFormButton: skillTreeId is missing');
      return;
    }

    if (requireLogin && !userID) {
      navigate('/login');
      return;
    }

    setIsLoading(true);
    const id = encodeURIComponent(skillTreeId);
    navigate(`/skilltree/moderator-form/${id}`);
  };

  return (
    <div className="flex flex-wrap items-start gap-2 w-15/100">
      <Button
        color="blue"
        pill
        type="button"
        onClick={openFormButton}
        disabled={isLoading || !skillTreeId}
        isProcessing={isLoading}
        processingSpinner={<Spinner size="sm" />}
        className="cursor-pointer w-full mt-2 text-white text-2xl font-semibold leading-none !font-sans flex items-center gap-3 px-6 py-3 bg-[#2563eb] rounded-[22px] transition-all duration-200 hover:bg-[#1d4ed8] focus:outline-none focus:ring-0"
      >
        {isLoading ? 'Opening…' : 'Apply as Moderator'}
      </Button>
    </div>
  );
};
