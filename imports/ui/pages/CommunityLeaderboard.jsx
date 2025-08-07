import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';

import { CommunityLeaderboardList } from '/imports/ui/components/CommunityLeaderboardList';
import { Fallback } from '/imports/ui/components/Fallback';

export const CommunityLeaderboard = () => {
    // id from url
    const { id } = useParams();

    <>
        <Helmet>
            <title>SkillTree - Community Leaderboard</title>
        </Helmet>
        <div>
            <Suspense fallback={<Fallback msg={'Loading leaderboard'}/>} >
                <CommunityLeaderboardList skillTreeId={id}/>
            </Suspense>
        </div>
    </>
}