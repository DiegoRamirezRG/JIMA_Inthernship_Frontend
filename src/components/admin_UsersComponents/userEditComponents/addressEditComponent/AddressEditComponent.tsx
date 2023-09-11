import React, { useEffect } from 'react'
import { DefaultCard, EditBtn } from '../../userDescriptionCards/defaultUI/DefaultUI';
import { IoSave, IoTrash } from 'react-icons/io5';
import { AddressInformation } from '../interfaces/UserEditInterface';
import { InputEditComponent, SelectedEditComponent } from '../inputEditComponent/InputEditComponent';
import { useUniversalApi } from '../../../../hooks/useUniversalApi/useUniversalApi';

export const AddressEditComponent = ({address, editActive, handleActivateEdit, handleAddressEdit, cancelAddressEdit, activeSureModal}: AddressInformation) => {

    const { countries, states, cities, getStates, getCities } = useUniversalApi();

    useEffect(() => {
        const asyncFunc = async() => {
            await getStates(address.Pais!);
        }
        asyncFunc();
    }, [address.Pais]);
    

    useEffect(() => {
        const asyncFunc = async() => {
            await getCities(address.Estado!);
        }
        asyncFunc();
    }, [address.Estado]);

    return (
        <DefaultCard hasTitle={false} hasActionBtn={false}>
            <div className="internalHeader">
                <p className='internalTitle'>Dirección</p>
                {
                    !editActive 
                    ? <EditBtn funct={handleActivateEdit}/> 
                    : <div className='editing-btns'>
                        <button onClick={activeSureModal}>
                            <IoSave/>
                            <p>Guardar</p>
                        </button>
                        <button onClick={cancelAddressEdit}>
                            <IoTrash/>
                            <p>Cancelar</p>
                        </button>
                    </div>
                }
            </div>
            <div className="internalContentSection">
                <SelectedEditComponent id='address_country' label='País' name='Pais' value={address.Pais ? address.Pais : 'Mexico'} editActive={editActive} key={'address_country'} opts={countries ? countries : [{label: 'Mexico', value: 'Mexico'}]} onChange={handleAddressEdit}/>
                <SelectedEditComponent id='address_state' label='Estado' name='Estado' value={address.Estado ? address.Estado : 'Jalisco'} editActive={editActive} key={'address_state'} opts={states ? states : [{label: 'Jalisco', value: 'Jalisco'}]} onChange={handleAddressEdit}/>
                <SelectedEditComponent id='address_city' label='Ciudad' name='Ciudad' value={address.Ciudad ? address.Ciudad : 'Arandas'} editActive={editActive} key={'address_city'} opts={cities ? cities : [{label: 'Arandas', value: 'Arandas'}]} onChange={handleAddressEdit}/>

                <InputEditComponent id='address_street' inputType='text' placeholder='Calle' label='Calle' name='Calle' value={address.Calle ? address.Calle : ''} editActive={editActive} key={'address_street'} onChange={handleAddressEdit}/>
                <InputEditComponent id='address_number_ext' inputType='text' placeholder='Numero Exterior' label='Numero Exterior' name='Numero_Exterior' value={address.Numero_Exterior ? address.Numero_Exterior.toString() : ''} editActive={editActive} key={'address_number_ext'} onChange={handleAddressEdit}/>
                <InputEditComponent id='address_number_int' inputType='text' placeholder='Numero Interior' label='Numero Interior (?)' name='Numero_Interior' value={address.Numero_Interior ? address.Numero_Interior.toString() : ''} editActive={editActive} key={'address_number_int'} onChange={handleAddressEdit}/>
                <InputEditComponent id='id_postalCode_creation' label='Codigo Postal' name='Codigo_Postal' placeholder='Codigo Postal' inputType='text' value={address.Codigo_Postal as string} onChange={handleAddressEdit} editActive={editActive}/>
            </div>
        </DefaultCard>
    )
}
