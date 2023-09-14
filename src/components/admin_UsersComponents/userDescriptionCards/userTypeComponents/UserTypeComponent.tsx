import React from 'react'
import './UserTypeComponent.scss'
import { administrativeCrate, parentCreate, studentCreate, teacherCreate } from '../../../../models/userTypesModels/UserTypesModel';
import { InputComp, SelectComp } from '../inputComponents/InputComponents';
import Select from 'react-select/dist/declarations/src/Select';

interface renderIndex{
    render?: Number;
    rolInfo: administrativeCrate | teacherCreate | studentCreate | parentCreate[] | any;
    handleRolInfo: (name: keyof administrativeCrate | keyof teacherCreate | keyof studentCreate | keyof parentCreate, value: string) => void;
}

export const UserTypeRender = ({render, handleRolInfo, rolInfo}: renderIndex) => {

    const renders = new Map<Number, JSX.Element>([
        [0, <UserTypeAdmin handleRolInfo={handleRolInfo} rolInfo={rolInfo}/>],
        [1, <UserTypeTeacher handleRolInfo={handleRolInfo} rolInfo={rolInfo}/>],
        [2, <UserTypeStudent handleRolInfo={handleRolInfo} rolInfo={rolInfo}/>],
        [3, <UserTypeParent handleRolInfo={handleRolInfo} rolInfo={rolInfo}/>],
    ])

    return (
        <>
            {renders.get(render!)}
        </>
    )
}

const UserTypeAdmin = ({ handleRolInfo, rolInfo }: renderIndex) => {

    const { Codigo_De_Administrativo, NSS, Fecha_De_Contratacion, URL } = rolInfo as administrativeCrate;

    return (
        <div className='maximunUserTypeContainer'>
            <div className="centeredContainer">
                <InputComp id='id_code_admin' label='Código de Administrativo' name='Codigo_De_Administrativo' placeholder='Codigo de Administrativo' type='text' handleRolInfo={handleRolInfo} value={Codigo_De_Administrativo as string}/>
                <InputComp id='id_NSS_admin' label='NSS' name='NSS' placeholder='NSS' type='text' handleRolInfo={handleRolInfo} value={NSS as string}/>
                <InputComp id='id_contract_admin' label='Fecha de contratación' name='Fecha_De_Contratacion' placeholder='00/00/0000' type='date' handleRolInfo={handleRolInfo} value={Fecha_De_Contratacion as string}/>
                <InputComp id='id_url_admin' label='URL' name='URL' placeholder='URL' type='text' handleRolInfo={handleRolInfo} value={URL as string}/>
            </div>
        </div>
    )
}

const UserTypeTeacher = ({ handleRolInfo, rolInfo }: renderIndex) => {

    const { Codigo_De_Profesor, NSS, Fecha_De_Contratacion, URL } = rolInfo as teacherCreate;

    return (
        <div className='maximunUserTypeContainer'>
            <div className="centeredContainer">
                <InputComp id='id_code_teacher' label='Código de Profesor' name='Codigo_De_Profesor' placeholder='Código de Profesor' type='text' handleRolInfo={handleRolInfo} value={Codigo_De_Profesor as string}/>
                <InputComp id='id_NSS_teacher' label='NSS' name='NSS' placeholder='NSS' type='text' handleRolInfo={handleRolInfo} value={NSS as string}/>
                <InputComp id='id_contract_teacher' label='Fecha de contratación' name='Fecha_De_Contratacion' placeholder='00/00/0000' type='date' handleRolInfo={handleRolInfo} value={Fecha_De_Contratacion as string}/>
                <InputComp id='id_url_teacher' label='URL' name='URL' placeholder='URL' type='text' handleRolInfo={handleRolInfo} value={URL as string}/>
            </div>
        </div>
    )
}

const UserTypeStudent = ({ handleRolInfo, rolInfo }: renderIndex) => {
    const { Matricula, URL } = rolInfo as studentCreate;
    return (
        <div className='maximunUserTypeContainer'>
            <div className="centeredContainer">
                <InputComp id='id_matricula_student' label='Matricula' name='Matricula' placeholder='No. de Matricula' type='text' handleRolInfo={handleRolInfo} value={Matricula as string}/>
                <InputComp id='id_url_student' label='URL' name='URL' placeholder='URL' type='text' handleRolInfo={handleRolInfo} value={URL as string}/>
            </div>
        </div>
    )
}

const UserTypeParent = ({ handleRolInfo, rolInfo }: renderIndex) => {
    return (
        <div className='maximunUserTypeContainer'>
            {
                JSON.stringify(rolInfo)
            }
        </div>
    )
}
