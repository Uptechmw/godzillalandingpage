'use client';

import React from 'react';

export function AdminStyleWrapper({ children, styles }: { children: React.ReactNode, styles: React.ReactNode }) {
    return (
        <>
            {styles}
            {children}
        </>
    );
}
