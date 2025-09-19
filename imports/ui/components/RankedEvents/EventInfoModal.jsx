import React from 'react';

export const EventInfoModal = ({ isOpen, onClose, skilltree }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"
      onClick={onClose} // Close modal on overlay click
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {skilltree.title} - Rules & Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Description
          </h3>
          <p className="text-gray-600 mb-4">
            {skilltree.description || 'No description provided.'}
          </p>

          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Terms & Conditions
          </h3>
          <p className="text-gray-600">
            {skilltree.termsAndConditions || 'No terms and conditions provided.'}
          </p>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end pt-4 mt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};











// import React from 'react';

// export const EventInfoModal = ({ isOpen, onClose, skilltree }) => {
//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 bg-transparent z-50 flex justify-center items-center p-4"
//       onClick={onClose} // Close modal on overlay click
//     >
//       <div
//         className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//         onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the modal
//       >
//         {/* Modal Header */}
//         <div className="flex justify-between items-center border-b pb-3 mb-4">
//           <h2 className="text-2xl font-bold text-gray-800">
//             {skilltree.title} - Rules & Details
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
//             aria-label="Close modal"
//           >
//             &times;
//           </button>
//         </div>

//         {/* Modal Body */}
//         <div>
//           <h3 className="text-xl font-semibold text-gray-700 mb-2">
//             Description
//           </h3>
//           <p className="text-gray-600 mb-4">
//             {skilltree.description || 'No description provided.'}
//           </p>

//           <h3 className="text-xl font-semibold text-gray-700 mb-2">
//             Terms & Conditions
//           </h3>
//           <p className="text-gray-600">
//             {skilltree.termsAndConditions || 'No terms and conditions provided.'}
//           </p>
//         </div>

//         {/* Modal Footer */}
//         <div className="flex justify-end pt-4 mt-4 border-t">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };