import React from 'react';

// Placeholder AddComment component
import { AddComment } from '/imports/ui/components/AddComment';
import { CommentSection } from '/imports/ui/components/CommentSection';

// FullCommentSection component
export const FullCommentSection = ({ username, proofid }) => {
    return (
        <div
            style={{
                background: '#fff',
                borderRadius: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                padding: '1.5rem',
                maxWidth: '500px',
                margin: '2rem auto',
            }}
        >
            <AddComment
                username={username}
                proofid={proofid}
            />
            <CommentSection />
        </div>
    );
}