import React from 'react'
import './UserCard.scss'
import { persona } from '../../../models/usersModels/UserModel'
import defaultImg from '../../../assets/img/default.jpg'

interface props{
    user: persona
}

export const UserCard = ({user}: props) => {
    return (
        <div className="UserCardContainer">
            <div className="UserImage">
                <img src={user.Imagen != null ? user.Imagen : defaultImg} alt="USER" />
            </div>
            <div className="sideSection">
                <div className="UserInformation">
                    <p>{`${user.Nombre} ${user.Apellido_Paterno}`+`${user.Apellido_Materno != null ? ' '+user.Apellido_Materno : ''}`}</p>
                    <p>{user.Rol}</p>
                </div>
                <div className="UserStatus">
                    <div className={`indicatorCircle ${user.Active ? 'active' : 'inactive'}`}></div>
                    <div className="informationSection">
                        {user.Active ? 'Activo' : 'Inactivo'}
                    </div>
                </div>
            </div>
        </div>
    )
}
