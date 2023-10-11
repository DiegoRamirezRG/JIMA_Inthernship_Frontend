import React from 'react'
import { ConfirmEventModalType } from '../../../../models/calendarModels/CalendarModels'
import { ResizeConfirmModalBody } from './rezideConfirmModalBody/ResizeConfirmModalBody'
import { DropConfrimModalBody } from './dropConfirmModalBody/DropConfrimModalBody'

interface confirmModalProps  {
    confirmType: ConfirmEventModalType
}

export const CustomModalBodies = ({ confirmType }: confirmModalProps) => {

    const renders = new Map<ConfirmEventModalType , JSX.Element>([
        ['rezise', <ResizeConfirmModalBody/>],
        ['dropped', <DropConfrimModalBody/>],
        [null, <ErrorBody/>]
    ])

    return (
        renders.get(confirmType)
    );
}

export const ErrorBody = () => {
    return (
        <div>CustomModalBodies</div>
    )
}
