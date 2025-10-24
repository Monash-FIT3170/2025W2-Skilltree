import React from 'react';

export const SignUpFooter = () => {
  return (
    <div className="w-full max-w-6xl flex items-center justify-end gap-3 mt-4">
      <button className="rounded-lg p-2 cursor-pointer hover:bg-gray-300">
        Help
      </button>
      <button className="rounded-lg p-2 cursor-pointer hover:bg-gray-300">
        Privacy
      </button>
      <button className="rounded-lg p-2 cursor-pointer hover:bg-gray-300">
        Terms
      </button>
    </div>
  );
};
