import React from 'react'
import { roles } from '../../../../models/authModels/UserModel'
import { StudentTypeEditor } from './studentTypeEditor/StudentTypeEditor';
import { RolesInformation } from '../interfaces/UserEditInterface';
import { TeacherTypeEditor } from './teacherTypeEditor/TeacherTypeEditor';
import { AdminTypeEditor } from './adminTypeEditor/AdminTypeEditor';

export const ProfileTypeComponent = ({ user, user_id, RolData, handleActiveEdit, isEditing, editingObserver, handleRolEdit, handleModalState }: RolesInformation) => {

    const interfaces = new Map<roles, JSX.Element>([
        ['Estudiante', <StudentTypeEditor  user={user} user_id={user_id} RolData={RolData} handleActiveEdit={handleActiveEdit} isEditing={isEditing} editObserver={editingObserver} handleRolEdit={handleRolEdit} handleModalState={handleModalState}/>],
        ['Profesor', <TeacherTypeEditor user={user} user_id={user_id} RolData={RolData} handleActiveEdit={handleActiveEdit} isEditing={isEditing} editObserver={editingObserver} handleRolEdit={handleRolEdit}/>],
        ['Administrativo', <AdminTypeEditor user={user} user_id={user_id} RolData={RolData} handleActiveEdit={handleActiveEdit} isEditing={isEditing} editObserver={editingObserver} handleRolEdit={handleRolEdit}/>],
    ]);

    return interfaces.get(user.Rol!);
}
