import React from 'react'
import { useCalendarContext } from '../../../contexts/calendarContext/CalendarContext'
import { IoClose } from 'react-icons/io5';
import { CustomModalBodies } from './helpers/CustomModalBodies';
import { ConfirmEventModalType } from '../../../models/calendarModels/CalendarModels';

export const ConfirmEventActionModal = () => {

    const { confirmHelper, resizeHelper, handleConfirmChangeModal, sendEventUpdate, dropHelper } = useCalendarContext();

    const confirmActionMap = new Map<ConfirmEventModalType , () => Promise<void>>([
        ['rezise', sendEventUpdate],
        ['dropped', sendEventUpdate],
        [null, async () => {}]
    ]);

    const handleConfirmAction = async () => {
        const confirmAction = confirmActionMap.get(confirmHelper);
        confirmAction ? await confirmAction() : () => {};
    }

    return (
        <div className='modal-content'>
            <div className="modal-header">
                <h5>Confirmacion requerida</h5>
                <button className='modal-btn-close' onClick={() => {
                    resizeHelper != null ? resizeHelper.revert() : () => {};
                    dropHelper != null ? dropHelper.revert() : () => {};
                    handleConfirmChangeModal();
                }}>
                    <IoClose/>
                </button>
            </div>
            <div className="divider"></div>
            <div className="modal-body">
                <CustomModalBodies confirmType={confirmHelper}/>
            </div>
            <div className="divider"></div>
            <div className="modal-footer">
                <button onClick={async() => {
                    await handleConfirmAction();
                }}>Confirmar</button>
                <button onClick={() => {
                    resizeHelper != null ? resizeHelper.revert() : () => {};
                    dropHelper != null ? dropHelper.revert() : () => {};
                    handleConfirmChangeModal();
                }}>Cancelar</button>
            </div>
        </div>
    )
}
