import React from 'react';

// Forum page component
import { GeneralForum } from '/imports/ui/pages/GeneralForum';

export const GeneralForumRoutes = [
  {
    path: 'generalforum/:skilltreeId',
    element: <GeneralForum />
  }
];
