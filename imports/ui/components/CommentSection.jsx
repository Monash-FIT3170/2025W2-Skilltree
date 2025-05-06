import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { CommentsCollection } from '/imports/api/collections/Comments';
import { Meteor } from 'meteor/meteor';

export const CommentSection = () => {
    // Subscribe to comments and get real-time data
    const { comments, isLoading } = useTracker(() => {
        // Subscribe to the publication
        const subscription = Meteor.subscribe('comments');
        const isLoading = !subscription.ready();
        
        // Get the comments from the collection, sorted by creation date (newest first)
        const comments = CommentsCollection.find({}, { 
            sort: { createdAt: -1 } 
        }).fetch();
        
        
        return { comments, isLoading };
    }, []);

    // Format date to be more readable
    const formatDate = (date) => {
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Shows a scrollable comment section
    return (
        <div style={{ maxHeight: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
        {console.log(comments)}
            {isLoading ? (
                <div>Loading comments...</div>
            ) : !comments || !Array.isArray(comments) || comments.length === 0 ? (
                <div>No comments yet. Be the first to comment!</div>
            ) : (
                comments.map((item) => (
                    <div key={item._id} style={{ 
                        marginBottom: '15px', 
                        padding: '10px', 
                        borderBottom: '1px solid #eee'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <strong>{item.username}</strong>
                            <span style={{ fontSize: '0.8rem', color: '#666' }}>
                                {formatDate(item.createdAt)}
                            </span>
                        </div>
                        <p style={{ margin: '5px 0' }}>{item.comment}</p>
                    </div>
                ))
            )}
        </div>
    );
};