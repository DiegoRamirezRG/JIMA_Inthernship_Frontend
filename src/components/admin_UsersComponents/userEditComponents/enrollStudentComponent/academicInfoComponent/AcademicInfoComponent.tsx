import React, { useEffect } from 'react'
import './AcademicInfoComponent.scss'
import { student } from '../../../../../models/userTypesModels/UserTypesModel'
import { useStudentContext } from '../../../../../contexts/studentContext/StudentContext';
import { LoadingComponent } from '../../../../generalComponents/loadingComponent/LoadingComponent';
import { InputEditComponent } from '../../inputEditComponent/InputEditComponent';
import { ColorArray } from '../../../../../utils/colorRandom/ColorArrayRandom';
import { lighten } from 'polished';

interface AcademicInfoComponent{
    RolData: student;
}

export const AcademicInfoComponent = ({ RolData } : AcademicInfoComponent) => {

    const { getAcademicInfo, loader, studentAcademicInfo, handleConfrimModalState } = useStudentContext();

    useEffect(() => {
        const awaitFunc = async () => {
            await getAcademicInfo(RolData.ID_Estudiante);
        }

        awaitFunc();
    }, [])

    return (
        <>
            {
                loader
                ?   <LoadingComponent/>
                :   <div className='academicContainer'>
                        <div className='academicInfoContainer'>
                            <InputEditComponent id={'student_career'} placeholder={'Carrera'} value={studentAcademicInfo != null ? studentAcademicInfo!.Nombre : ''} label={'Carrera'} name={'Nombre'} inputType={'text'} editActive={false} />
                            <InputEditComponent id={'student_turno'} placeholder={'Turno'} value={studentAcademicInfo != null ? studentAcademicInfo!.Turno : ''} label={'Turno'} name={'Turno'} inputType={'text'} editActive={false} />
                            <InputEditComponent id={'student_grade'} placeholder={'Grado'} value={studentAcademicInfo != null ? studentAcademicInfo!.Grado.toString() : ''} label={'Grado'} name={'Grado'} inputType={'text'} editActive={false} />
                            <InputEditComponent id={'student_group'} placeholder={'Grupo'} value={studentAcademicInfo != null ? studentAcademicInfo!.Grupo : ''} label={'Grupo'} name={'Grupo'} inputType={'text'} editActive={false} />
                            <InputEditComponent id={'student_active'} placeholder={'Estado de Estudiante'} value={studentAcademicInfo != null ? studentAcademicInfo!.Active ? 'Estudiante Activo' : 'Estudiante Inactivo' : 'No'} label={'Estado de Estudiante'} name={'Active'} inputType={'text'} editActive={false} />
                            <InputEditComponent id={'student_paid'} placeholder={'Adeudo de Inscripcion'} value={studentAcademicInfo != null ? studentAcademicInfo!.Pagado ? 'Sin Adeudo' : 'Adeudo de inscripcion' : 'No'} label={'Adeudo de Inscripcion'} name={'Active'} inputType={'text'} editActive={false} />
                        </div>
                        <div className="lastRowBillInfo">
                            <button style={{backgroundColor: ColorArray[1]}}>Desactivar Estudiante</button>
                            <button style={{backgroundColor: ColorArray[2]}}>Generar Papeleria</button>
                            <button style={{backgroundColor: ColorArray[3]}}>Informacion Economica</button>
                        </div>
                    </div>
            }
        </>
    )
}
