'use client';

import React from 'react';

export function AdminLayoutStyles({ children }: { children: React.ReactNode }) {
    return (
        <>
            <style jsx global>{`
                .admin-container {
                    display: flex;
                    width: 100%;
                    height: 100vh;
                    background-color: #020617;
                    color: #f8fafc;
                    overflow: hidden;
                }

                .admin-main {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                .admin-header {
                    height: 64px;
                    padding: 0 32px;
                    background-color: #0f172a;
                    border-bottom: 1px solid #1e293b;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .page-title {
                    font-size: 1rem;
                    font-weight: 600;
                    color: #f8fafc;
                }

                .header-right {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                .admin-profile {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .admin-avatar {
                    width: 32px;
                    height: 32px;
                    background-color: #3b82f6;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: white;
                }

                .admin-info {
                    display: flex;
                    flex-direction: column;
                }

                .admin-name {
                    font-size: 0.85rem;
                    font-weight: 600;
                }

                .admin-role {
                    font-size: 0.7rem;
                    color: #94a3b8;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .admin-content {
                    flex: 1;
                    padding: 32px;
                    overflow-y: auto;
                    background-color: #020617;
                }
            `}</style>
            {children}
        </>
    );
}
