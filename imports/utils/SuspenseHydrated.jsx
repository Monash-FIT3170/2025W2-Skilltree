import { Meteor } from 'meteor/meteor';
import React, { Suspense, useEffect, useState } from 'react';
import { FastRender } from 'meteor/communitypackages:fast-render';

// JSX UI
import { Fallback } from '/imports/ui/components/SiteFrame/Fallback';

export const SuspenseHydrated = ({
  children, // <SuspenseHydrated> <The child JSX /> </SuspenseHydrated>
  msg = '', // Fallback message
  fallback = <Fallback msg={msg} /> //  <The Fallback JSX />
}) => {
  const [isHydrated, setIsHydrated] = useState(false); // Track if client is hydrated yet

  useEffect(() => {
    FastRender.onDataReady(() => setIsHydrated(true)); // onDataReady = hydrated, safe to render subscription calls
  }, []);

  return (
    <Suspense fallback={fallback}>
      {
        Meteor.settings.public.enableSSR && (Meteor.isServer || !isHydrated) // Full SSR <AND> (on Server or Client waiting for hydration)...
          ? fallback // Full SSR will render fallback on Server and client waiting for hydration, allows opting out of SSR
          : children // Always show in noSSR or only after client hydrates for Full SSR to workaround any 'hydration mismatch' :)
      }
    </Suspense>
  );
};
