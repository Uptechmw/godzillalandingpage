'use client';

import React from 'react';

export function AdminStatusIndicator() {
    return (
        <>
            <div className="status-indicator">
                <div className="indicator-dot active"></div>
                <span className="indicator-text">System Online</span>
            </div>
            <style jsx>{`
                .status-indicator {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding-right: 16px;
                    border-right: 1px solid var(--admin-border);
                }
                .indicator-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                }
                .indicator-dot.active {
                    background-color: var(--admin-success);
                    box-shadow: 0 0 8px var(--admin-success);
                }
                .indicator-text {
                    font-size: 0.7rem;
                    font-weight: 700;
                    color: var(--admin-text-secondary);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
            `}</style>
        </>
    );
}
