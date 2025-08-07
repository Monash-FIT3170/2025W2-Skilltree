import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';

import { Fallback } from '/imports/ui/components/Fallback';

export const CommunityLeaderboard = () => (
    <>
        <Helmet>
            <title>SkillTree - Community Leaderboard</title>
        </Helmet>
        <div>
            <Suspense fallback={<Fallback msg={'Loading leaderboard'}/>} >
                
            </Suspense>
        </div>
    </>
)