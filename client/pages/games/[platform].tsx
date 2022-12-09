import React from 'react';
import BasicLayout from '../../layouts/BasicLayout/BasicLayout';
import { useRouter } from 'next/router';

export default function Platform() {
    const {query} = useRouter();
    
    return (
        <BasicLayout>
            <h1>Platform: {query.platform}</h1>
        </BasicLayout>
    )
}
