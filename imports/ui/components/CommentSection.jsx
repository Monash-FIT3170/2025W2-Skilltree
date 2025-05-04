import React from 'react';

export const CommentSection = () => {
    const dummyComments = [
        { username: 'user1', comment: 'This is the first comment!' },
        { username: 'user2', comment: 'Here is another comment.' },
        { username: 'user3', comment: 'Loving this comment section!' },
        { username: 'user4', comment: 'Great work on this feature!' },
        { username: 'user5', comment: 'Keep up the good work!' },
    ];

    return (
        <div style={{ maxHeight: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
            {dummyComments.map((item, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <strong>{item.username}</strong>
                    <p>{item.comment}</p>
                </div>
            ))}
        </div>
    );
};

// export default CommentSection;