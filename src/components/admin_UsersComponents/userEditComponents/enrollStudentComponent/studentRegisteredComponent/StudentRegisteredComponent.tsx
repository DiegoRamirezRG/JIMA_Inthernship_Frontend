import React, { useEffect, useState } from 'react';
import './StudentRegisterComponent.scss';
import { useSchoolInfo } from '../../../../../hooks/school_information/useSchoolInfo';
import { LoadingComponent } from '../../../../generalComponents/loadingComponent/LoadingComponent';
import { Student, studentToBe } from '../../../../../models/enrollModels/EnrollModels';
import { optionSelect } from '../../../../../models/universalApiModels/UniversalApiModel';
import { findLabelByValue } from '../../../../../hooks/admin_user/helpers/findValueByData';
import moment from 'moment'
import 'moment/locale/es';
import { formatMonthDate } from '../../../../../utils/dateSpanishFormater/dateSpanishFormater';
import { useDeleteConfirmModalContext } from '../../../../../contexts/modals_states/deleteConfimModal/deleteConfirmMContext';

interface StudentAspiranteActionsProps{
    studentData: studentToBe | Student;
    allCareersOptions: optionSelect[];
}

export const StudentRegisteredComponent = ({ studentData, allCareersOptions }: StudentAspiranteActionsProps) => {
    
    const {

        //Loaders
        isGettingInitDataLoading,

        //Get Data
        getInitialData,

    } = useSchoolInfo();

    const { changeDeleteConfirmModalState } = useDeleteConfirmModalContext();


    const parsedDate = moment(studentData.Creado_En).locale('es');
    const day = parsedDate.format('D');
    const month = parsedDate.format('MM');
    const year = parsedDate.format('YYYY');

    useEffect(() => {
        const asyncFunc = async () => {
            await getInitialData();
        }

        asyncFunc();
    }, []);

    return (
        <>
            {
                isGettingInitDataLoading
                ?   <LoadingComponent/>
                :   <div className='AspInformationContainer'>
                        <p>El estudiante se ha registrado como aspirante para la carrera de</p>
                        <p>{findLabelByValue(allCareersOptions, studentData.FK_Carrera)}</p>
                        <p><b>El dia:</b> <i>{day} de {formatMonthDate(month)} de {year}</i></p>
                        <div className="inner-row">
                            <button onClick={changeDeleteConfirmModalState}>Cancelar registro de Aspirante</button>
                        </div>
                    </div>
            }
        </>
    )
}
