import React from 'react'
import './CareersAvailableCard.scss'
import { CareerPlansActives } from '../../../../../models/careerPlansModels/CareerPlansModels';
import { StudentToBe } from '../../../../../models/studentModels/StudentModel';
import { HiMiniUserGroup } from 'react-icons/hi2';
import { useReinsInscrContext } from '../../../../../contexts/reins_inscrContext/ReinsInscrContext';

interface CareerAvailableProps {
    careerOfPlan: CareerPlansActives;
    asp: StudentToBe[];
}

export const CareersAvailableCard = ({ careerOfPlan, asp } : CareerAvailableProps) => {

    const { handleGroupModal } = useReinsInscrContext();

    const handleCreateModal = () => {
        handleGroupModal(careerOfPlan.ID_Carrera!);
    }

    return (
        <div className='CareerMakerGroupCard' onClick={handleCreateModal}>
            <div className="header">
                <p>{careerOfPlan.Nombre}</p>
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
