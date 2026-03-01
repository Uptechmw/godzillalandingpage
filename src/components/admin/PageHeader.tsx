'use client';
import React from 'react';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
}

export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
    return (
        <header className="page-header">
            <div className="header-text">
                <h2 className="header-title">{title}</h2>
                {subtitle && <p className="header-subtitle">{subtitle}</p>}
            </div>
            {children && <div className="header-actions">{children}</div>}

            <style jsx>{`
                .page-header {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    margin-bottom: 32px;
                }

                .header-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #fff;
                }

                .header-subtitle {
                    font-size: 0.9rem;
                    color: #94a3b8;
                    margin-top: 4px;
                }

                .header-actions {
                    display: flex;
                    gap: 12px;
                }
            `}</style>
        </header>
    );
}
