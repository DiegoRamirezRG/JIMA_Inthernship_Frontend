import React from 'react'
import './CareersAvailableCard.scss'
import { CareerPlansActives } from '../../../../../models/careerPlansModels/CareerPlansModels';
import { StudentToBe } from '../../../../../models/studentModels/StudentModel';
import { HiMiniUserGroup } from 'react-icons/hi2';
import { useReinsInscrContext } from '../../../../../contexts/reins_inscrContext/ReinsInscrContext';
import { useCareersContext } from '../../../../../contexts/careersContext/CareersContext';

interface CareerAvailableProps {
    careerId: string;
    asp: StudentToBe[];
}

export const CareersAvailableCard = ({ careerId, asp } : CareerAvailableProps) => {

    const { handleGroupModal } = useReinsInscrContext();
    const { careers } = useCareersContext();

    const handleCreateModal = () => {
        handleGroupModal(careerId);
    }

    return (
        <div className='CareerMakerGroupCard' onClick={handleCreateModal}>
            <div className="header">
                <p>{careers!.find(item => item.ID_Carrera === careerId)?.Nombre}</p>
            </div>
            <div className="aspSection">
                <p>Aspirantes</p>
                <div className="indicator">
                    <HiMiniUserGroup size={50} className='aspIcon'/>
                    <p className='number'>{asp.length}</p>
                </div>
            </div>
        </div>
    )
}
