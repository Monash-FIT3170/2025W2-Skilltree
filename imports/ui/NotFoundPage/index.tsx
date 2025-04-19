import React from 'react';

interface NotFoundPageProps {
    message?: string;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ message }) => {
    return (
        <h1>
            {message ?? 'The page you were looking for was not found'}
        </h1>
    );
};


export default NotFoundPage;