import React, { Suspense } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const SignUpPage = () => {
  return (
    <div>
      <Suspense>
        <Outlet /> {/* Renders step1, step2, or step3 */}
      </Suspense>
    </div>
  );
};
