import { Meteor } from 'meteor/meteor';
import React, { Suspense, useEffect, useState } from 'react';
import { FastRender } from 'meteor/communitypackages:fast-render';

// JSX UI
import { Fallback } from '/imports/ui/components/SiteFrame/Fallback';
import { DashboardLoadingState } from '/imports/ui/components/Dashboard/LoadingState';

export const SuspenseHydrated = ({
  children, // <SuspenseData> <The child JSX /> </SuspenseData>
  animate = false,
  fallback = animate ? <DashboardLoadingState /> : <Fallback /> //  <The Fallback JSX />
}) => {
  const [isHydrated, setIsHydrated] = useState(false); // Track if client is hydrated yet

  useEffect(() => {
    FastRender.onDataReady(() => setIsHydrated(true)); // onDataReady = hydrated, safe to render subscription calls
  }, []);

  return (
    <Suspense fallback={fallback}>
      {
        (Meteor.settings.public.enablePartialSRR != false && // PartialSRR AND...
          Meteor.isServer && // Server side AND...
          !Meteor.settings.public.enableSSR) || // Not Full SSR OR...
        (!isHydrated && !Meteor.settings.public.enableSSR) // PartialSRR waiting for hydration in client
          ? fallback // For partialSSR only, server will always render fallback or client waiting for hydration
          : children // Always show in fullSSR/noSSR or only after client hydrates for partialSSR to workaround 'hydration mismatch' :)
      }
    </Suspense>
  );
};
