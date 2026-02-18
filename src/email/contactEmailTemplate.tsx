import * as React from 'react';

interface EmailTemplateProps {
    name: string;
}

export function ContactEmailTemplate({ name }: EmailTemplateProps) {
    return (
        <div>
            <h1>Welcome, {name}!</h1>
        </div>
    );
}