//Validate before send

import { AddressModelCreate } from "../../../models/addressModels/AddressModel";
import { AlergiesModelCreate } from '../../../models/alergiesModel/AlergiesModel';
import { UserModelPersonCreate } from "../../../models/authModels/UserModel";
import { administrativeCrate, parentCreate, studentCreate, teacherCreate } from "../../../models/userTypesModels/UserTypesModel";

interface typeUserInterface {
    user: UserModelPersonCreate;
    userType: administrativeCrate | teacherCreate | studentCreate | parentCreate[] | any
}

export const validate_user = (user: UserModelPersonCreate) => {
    return new Promise((resolve, reject) => {
        if (user.Nombre!.length <= 0 || user.Nombre!.length > 50) {
            return reject(new Error('El nombre no cumple los requisitos.'));
        }

        if (user.Apellido_Paterno!.length <= 0 || user.Apellido_Paterno!.length > 50) {
            return reject(new Error('El apellido paterno no cumple los requisitos.'));
        }

        if (user.Apellido_Materno!.length > 0) {
            if(user.Apellido_Materno!.length <= 0 || user.Apellido_Materno!.length > 50){
                return reject(new Error('El apellido materno no cumple los requisitos.'));
            }
        }
        
        if(user.CURP!.length > 0){
            if(user.CURP!.length <= 0 || user.CURP!.length > 50){
                return reject(new Error('La CURP materno no cumple los requisitos.'));
            }
        }

        const validGenders = ['Masculino', 'Femenino', 'Otro'];
        if (!validGenders.includes(user.Genero!)) {
            return reject(new Error('El genero no cumple los requisitos.'));
        }

        const dateOfBirth = new Date(user.Fecha_De_Nacimiento!);
        if (isNaN(dateOfBirth.getTime())) {
            return reject(new Error('La fecha de nacimiento no cumple los requisitos.'));
        }

        const validBloodTypes = ['A', 'B', 'AB', 'O', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
        if (!validBloodTypes.includes(user.Tipo_De_Sagre!)) {
            return reject(new Error('El tipo de sangre no cumple los requisitos.'));
        }

        const phoneNumberPattern = /^\d{10}$/;
        if(user.Numero_De_Emergencia){
            if (!phoneNumberPattern.test(user.Numero_De_Emergencia.toString())) {
                return reject(new Error('El numero de emergencia no cumple los requisitos.'));
            }
        }

        if(!phoneNumberPattern.test(user.Numero_De_Telefono!.toString())){
            return reject(new Error('El numero de telefono no cumple los requisitos.'));
        }

        if(user.Nacionalidad!.length > 0){
            if(user.Nacionalidad!.length <= 0 || user.Nacionalidad!.length > 50){
                return reject(new Error('La nacionalidad no cumple los requisitos.'));
            }
        }

        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
        if (!emailPattern.test(user.Correo_Electronico!)) {
            return reject(new Error('El correo electronico no cumple los requisitos.'));
        }

        const validRoles = ['Estudiante', 'Profesor', 'Administrativo', 'Padre'];
        if(!validRoles.includes(user.Rol!)){
            return reject(new Error('El rol no cumple los requisitos.'));
        }

        if(user.Contraseña!.length <= 0){
            return reject(new Error('La contraseña no cumple los requisitos.'));
        }

        resolve('Informacion valida');
    })
}

//Validate address
export const validate_adress = (address: AddressModelCreate) => {
    return new Promise((resolve, reject) => {
        if(
            address.Ciudad === '' ||
            address.Estado === '' ||
            address.Pais === '' ||
            address.Codigo_Postal === '' ||
            address.Numero_Exterior === '' ||
            address.Calle === ''
        ){
            return reject(new Error('La direccion no cumple con los requisitos.'))
        }else{
            resolve('Informacion valida');
        }
    })
}

export const validate_alergies = (alergies: AlergiesModelCreate[]) => {
    return new Promise((resolve, reject) => {
        if(alergies.length > 0){

            alergies.forEach((alergie: AlergiesModelCreate) => {
                
                if(alergie.Nombre.length < 0 || alergie.Nombre.length > 50){
                    return reject(new Error('El nombre no cumple con los requisitos.'))
                }

                resolve('Informacion valida');
            });

        }else{
            resolve('Nada que validar');
        }
    })
}



export const validate_userType =  ({ user, userType }: typeUserInterface) => {
    return new Promise(async (resolve, reject) => {
        switch(user.Rol){
            case 'Administrativo':
                await validate_typeAdmin(userType)
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        return reject(error);
                    })
                break;
            
            case 'Profesor':
                await validate_typeTeacher(userType)
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        console.log('Error en switcher: ' + error);
                        return reject(error);                        
                    });
                    break;
            
            case 'Estudiante':
                await validate_typeStudent(userType)
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        return reject(error);
                    });
                    break;
            case 'Padre':
                resolve('No ingresar padres aun');
        }
    })
}

const validate_typeAdmin = (adminType: administrativeCrate) => {
    return new Promise((resolve, reject) => {
        if(adminType.NSS.length <= 0){
            return reject(new Error('El NSS del administrativo a registrar no cumple con los requisitos.'));
        }

        const contractDate = new Date(adminType.Fecha_De_Contratacion!);
        if(isNaN(contractDate.getTime())){
            return reject(new Error('La fecha de contratacion no cumple con los requisitos.'));
        }

        if(adminType.URL.length > 0){
            const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
            if(!urlPattern.test(adminType.URL)){
                return reject(new Error('La URL del administrativo no cumple con los requisitos.'))
            }
        }
        resolve('Informacion valida');
    })
}

const validate_typeTeacher = (teacherType: teacherCreate) => {
    return new Promise((resolve, reject) => {
        
        if(teacherType.NSS.length <= 0){            
            return reject(new Error('El NSS del profesor a registrar no cumple con los requisitos.'));
        }

        const contractDate = new Date(teacherType.Fecha_De_Contratacion!);
        if(isNaN(contractDate.getTime())){
            return reject(new Error('La fecha de profesor no cumple con los requisitos.'));
        }

        if(teacherType.URL.length > 0){
            const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
            if(!urlPattern.test(teacherType.URL)){
                return reject(new Error('La URL del profesor no cumple con los requisitos.'))
            }
        }
        resolve('Informacion valida');
    })
}

const validate_typeStudent = (studentType: studentCreate) => {
    return new Promise((resolve, reject) => {
        if(studentType.URL.length > 0){
            const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
            if(!urlPattern.test(studentType.URL)){
                return reject(new Error('La URL del estudiante no cumple con los requisitos.'))
            }
        }
        resolve('Informacion valida');
    })
}