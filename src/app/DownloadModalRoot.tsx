'use client';

import React from 'react';
import { useDownloadModal } from '@/hooks/useDownloadModal';
import DownloadModal from '@/components/landing/enterprise/DownloadModal';

const DownloadModalRoot = () => {
    const { isOpen, closeModal } = useDownloadModal();

    return <DownloadModal isOpen={isOpen} onClose={closeModal} />;
};

export default DownloadModalRoot;
