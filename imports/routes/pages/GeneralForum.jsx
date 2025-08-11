import React from 'react';

// Forum page component
import { GeneralForum } from '/imports/ui/components/GeneralForum';

export const GeneralForumRoutes = [
  {
    path: 'generalforum/:skilltreeId',
    element: <GeneralForum />
  }
];
