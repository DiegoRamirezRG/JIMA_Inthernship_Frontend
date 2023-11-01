import React, { useEffect, useState } from 'react'
import './GroupMakerModal.scss'
import { IoClose } from 'react-icons/io5'
import { VscPersonAdd } from 'react-icons/vsc'
import { InputEditComponent, SelectedEditComponentWithAddBtn } from '../../../../admin_UsersComponents/userEditComponents/inputEditComponent/InputEditComponent'
import { useStudentContext } from '../../../../../contexts/studentContext/StudentContext'
import { useReinsInscrContext } from '../../../../../contexts/reins_inscrContext/ReinsInscrContext'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { StudentToBe } from '../../../../../models/studentModels/StudentModel'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { ListStudentComponetn } from '../ListStudentComponent/ListStudentComponetn'

export const GroupMakerModal = () => {

    const { studentsToBe } = useStudentContext();
    const { careerID, groups, addGroupFunc, removeGroupFunc, addStudentToGroup, cancelGroupMaking, handleShiftModal } = useReinsInscrContext();
    const [searched, setSearched] = useState('');
    const [sortedNames, setSortedNames] = useState<StudentToBe[]>([]);
    const [groupRendering, setGroupRendering] = useState(0);

    const cancelGroup = () => {
        cancelGroupMaking();
        setSearched('');
        setGroupRendering(0);
    }

    const handleSearch = (e: any, value: any) => {
        setSearched(value);
    }

    const sortNames = (studens: StudentToBe[]) : StudentToBe[] => {
        return studens.sort((a, b) => {

            if (a.Apellido_Paterno! < b.Apellido_Paterno!) {
                return -1;
            }
            if (a.Apellido_Paterno! > b.Apellido_Paterno!) {
                return 1;
            }

            if (a.Apellido_Paterno! === null && b.Apellido_Paterno! === null) {
                return 0;
            }

            if (a.Apellido_Paterno! === null) {
                return -1;
            }
            if (b.Apellido_Paterno! === null) {
                return 1;
            }

            if (a.Apellido_Paterno! < b.Apellido_Paterno!) {
                return -1;
            }
            if (a.Apellido_Paterno! > b.Apellido_Paterno!) {
                return 1;
            }

            return 0;
        })
    }

    useEffect(() => {
        if(studentsToBe){
            setSortedNames(sortNames(studentsToBe));
        }
    }, [studentsToBe])

    return (
        <div className='maxModalContainer'>
            <div className="modalCreateGroupHeaders">
                <div className="headerTitle">
                    <p>Inscripciones</p>
                </div>
                <div className="extraInfoContainer">
                    <InputEditComponent key={'asp_search'} id={'asp_search'} placeholder={'Buscar Aspirante'} value={searched} label={'Buscador'} name={'Nombre'} inputType={'text'} editActive={true} onChange={handleSearch}/>
                </div>
                <div className="closeBtn" onClick={cancelGroup}>
                    <IoClose/>
                </div>
            </div>
            <div className="conentSection">
                <div className="usersList">
                    <div className="dynamicGridRender">
                        {
                            sortedNames && sortedNames
                            .filter(student => student.ID_Carrera === careerID)
                            .filter(student => {
                                if(searched == ''){
                                    return true;
                                }else{
                                    const name = `${student.Nombre} ${student.Apellido_Paterno} ${student.Apellido_Materno ? student.Apellido_Materno : ''}`;
                                    return name.toLowerCase().includes(searched.toLowerCase());
                                }
                            })
                            .map((student, index) => (
                                <div className='check-filter' key={index} onClick={groups.some(group => Object.values(group).flat().includes(student.ID_Estudiante)) ? () => {} :() => addStudentToGroup(student.ID_Estudiante, groupRendering)}>
                                    <label>
                                        <div className="checked">
                                            {
                                                groups.some(group => Object.values(group).flat().includes(student.ID_Estudiante))
                                                ?   <AiOutlineCheckCircle/>
                                                :   <></>
                                            }
                                        </div>
                                        <div className="studentToBeInfo">
                                            <p className='studentName'>{student.Nombre} {student.Apellido_Paterno} {student.Apellido_Materno ? student.Apellido_Materno : ''}</p>
                                            <p>{student.Correo_Electronico}</p>
                                        </div>
                                    </label>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="actionsSection">
                    <div className="groupDetails">
                        <div className="headerGroup">
                            <p>Grupo {groupRendering + 1}</p>
                            {   
                                groups.length > 1
                                ?   <>
                                        {
                                            groupRendering !== 0
                                            ?   <div className="afterGroup" onClick={() => setGroupRendering(groupRendering - 1)}>
                                                    <IoIosArrowBack/>
                                                </div>
                                            :   <></>
                                        }
                                        {
                                            groupRendering !== groups.length - 1
                                            ?   <div className="nextGroup" onClick={() => setGroupRendering(groupRendering + 1)}>
                                                    <IoIosArrowForward/>
                                                </div>
                                            :   <></>
                                        }
                                    </>
                                :   <></>
                            }
                        </div>
                        <div className="studentIngroup">
                            {
                                Object.values(groups[groupRendering]).length > 0
                                ?   Object.values(groups[groupRendering]).map((item: string[], index) => (
                                    <div key={index} className='listItemsStudents'>
                                        {
                                            item.map((id, subIndex) => (
                                                <ListStudentComponetn key={subIndex} student={studentsToBe!.find(obj => obj.ID_Estudiante === id)!} group={groupRendering}/>
                                            ))
                                        }
                                    </div>
                                ))
                                :   <div className='noStudentsAddeed'>
                                        <VscPersonAdd size={50}/>
                                        <p>Aun no tiene alumnos en la lista, para añadir de click sobre alguno de ellos.</p>
                                    </div>
                            }
                        </div>
                        <div className="groupActions">
                            {
                                groups.length > 1
                                ?   <button className='back' onClick={() => {
                                    setGroupRendering(0)
                                    removeGroupFunc(groupRendering)
                                }}>Eliminar Grupo</button>
                                :   <></>
                            }
                            {
                                studentsToBe && groups.length < studentsToBe.filter(student => student.ID_Carrera === careerID).length && Number(groups.map(group => Object.values(group)[0].length)) < studentsToBe.filter(student => student.ID_Carrera === careerID).length
                                ?   <button className='next' onClick={addGroupFunc}>Añadir Grupo</button>
                                :   <></>
                            }    
                        </div>
                    </div>
                    <div className="makeGroupOrCancel">
                        <button className='back' onClick={cancelGroup}>Cancelar</button>
                        <button className='next' onClick={handleShiftModal}>Asignar Turnos</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
