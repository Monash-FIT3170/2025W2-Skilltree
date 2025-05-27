// import React, { Suspense } from 'react';
// import { Helmet } from 'react-helmet';

// // JSX UI
// import { ProofsList } from '/imports/ui/components/ProofsList';
// import { Fallback } from '/imports/ui/components/Fallback';

// export const PendingProofs = () => {
//   <>
//     <Helmet>
//       <title>SkillTree - Pending Proofs</title>
//     </Helmet>
//     <div className="px-4 pt-4">
//       <button className="min-w-60 text-white-600 rounded-xl bg-[#328E6E]">
//         <h1 className="p-4">
//           <b>
//             <p className="text-white ...">Rock Climbing </p>
//           </b>
//         </h1>
//       </button>
//       {/* Responsive container for ProofsList */}
//       <Suspense fallback={<Fallback msg={'Loading proofs...'} />}>
//         <ProofsList />
//       </Suspense>
//     </div>
//   </>
// };
import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';

// JSX UI
import { ProofsList } from '/imports/ui/components/ProofsList';
import { Fallback } from '/imports/ui/components/Fallback';

export const PendingProofs = () => (
  <>
    <Helmet>
      <title>SkillTree - Pending Proofs</title>
    </Helmet>
    <div className="px-4 pt-4">
      <button className="min-w-60 text-white-600 rounded-xl bg-[#328E6E]">
        <h1 className="p-4">
          <b>
            <p className="text-white ...">Rock Climbing</p>
          </b>
        </h1>
      </button>

      <Suspense fallback={<Fallback msg={'Loading proofs...'} />}>
        <ProofsList />
      </Suspense>
    </div>
  </>
);
