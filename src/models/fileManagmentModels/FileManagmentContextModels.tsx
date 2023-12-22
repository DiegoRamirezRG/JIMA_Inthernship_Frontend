import React, { ReactNode } from 'react';
import { AttachmentFile } from './FileManagmentModels';
export interface FileManagmentInterface{
    //Teacher Attachment Files
    teacherAttachedFiles: AttachmentFile[];
    getTeacgerAttachedFiles: (assignment_id: string) => Promise<void>;
}

export interface FileManagmentProvider{
    children: ReactNode;
}