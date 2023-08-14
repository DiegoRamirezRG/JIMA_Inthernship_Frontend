import React from 'react'
import { NavigationComponent } from '../../components/generalComponents/navigationComponent/NavigationComponent'
import './Admin_UserScreen.scss'
import { IoAdd, IoAddCircleOutline, IoBriefcase, IoChevronDownOutline, IoFilter, IoFlask, IoSchool, IoSearch } from 'react-icons/io5'
import { FilterButton } from '../../components/admin_UsersComponents/filterButton/FilterButton'
import { FilterDropdown } from '../../components/admin_UsersComponents/filterDropdown/FilterDropdown';
import { UserCard } from '../../components/admin_UsersComponents/userCard/UserCard'
import Select from 'react-select';
import { useUsersAdministration } from '../../hooks/admin_user/useUsersAdministration'
import { typeFilter } from '../../models/usersModels/UserModel'
import { PaginationComponent } from '../../components/admin_UsersComponents/paginationComponent/PaginationComponent'
import { LoadingComponent } from '../../components/generalComponents/loadingComponent/LoadingComponent'

export const Admin_UserScreen = () => {

    const { filterOptions, userList, filterType, filterOrder, handleChangeFilter, handleChangeOrder, maxPagination, pagination, addPagination, resPagination, paginationOnIndex, isInitialDataLoading, nameFilter, handleInputSearch, createNewUser } = useUsersAdministration();

    return (
        <NavigationComponent>
            <div className="AdminUserContainer">
                <div className="addBtnOnScreenXs">
                    <button onClick={createNewUser}>
                        <IoAddCircleOutline/>
                    </button>
                </div>
                <div className="headerTitle">
                    <h2>Usuarios</h2>
                </div>
                <div className="contentSection">
                    <div className="filterColumn">
                        <div className="normalFilters">
                            <div className="headerSection">
                                <IoFilter/>
                                <p>Filtrar</p>
                            </div>
                            <div className="buttonFilters">
                                <FilterButton text='Todos los usuarios' isActive={filterType == 'all' ? true : false}      idBtn='all'  onClickFunc={(e) => handleChangeFilter(e.currentTarget.id as typeFilter)}/>
                                <FilterButton text='Profesores'         isActive={filterType == 'teachers' ? true : false} idBtn='teachers'  onClickFunc={(e) => handleChangeFilter(e.currentTarget.id as typeFilter)}/>
                                <FilterButton text='Estudiantes'        isActive={filterType == 'students' ? true : false} idBtn='students'  onClickFunc={(e) => handleChangeFilter(e.currentTarget.id as typeFilter)}/>
                                <FilterButton text='Administrativos'    isActive={filterType == 'admins' ? true : false}   idBtn='admins'  onClickFunc={(e) => handleChangeFilter(e.currentTarget.id as typeFilter)}/>
                                <FilterButton text='Activos'            isActive={filterType == 'active' ? true : false}   idBtn='active'  onClickFunc={(e) => handleChangeFilter(e.currentTarget.id as typeFilter)}/>
                                <FilterButton text='Inactivos'          isActive={filterType == 'inactive' ? true : false} idBtn='inactive'  onClickFunc={(e) => handleChangeFilter(e.currentTarget.id as typeFilter)}/>
                            </div>
                        </div>
                        {/* {
                            filterType == 'students'
                            ? (
                                <div className="studentFilters">
                                    <div className="headerSection">
                                        <p>Filtros de estudiantes</p>
                                    </div>
                                    <div className="dropdownsSection">
                                        <FilterDropdown/>
                                        <FilterDropdown/>
                                        <FilterDropdown/>
                                    </div>
                                </div>
                            ) : (<></>)
                        } */}
                    </div>
                    <div className="listviewContent">
                        <div className="actionsSection">
                            <div className="searchField">
                                <input type="text" placeholder='Buscar' value={nameFilter} onChange={handleInputSearch}/>
                                <IoSearch/>
                            </div>
                            <div className="orderBttn">
                                <Select
                                    value={filterOrder}
                                    onChange={handleChangeOrder}
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            borderColor: !state.isFocused ? '#D6D5DD' : 'transparent',
                                            borderWidth: 2,
                                            borderRadius: 40,
                                            fontFamily: 'Quicksand',
                                            fontSize: 20,
                                            fontWeight: 550,
                                            height: 45,
                                            backgroundColor: 'white',
                                        }),
                                        dropdownIndicator: base => ({
                                            ...base,
                                            borderBottom: 'none',
                                        }),
                                        option: (base, state) => ({
                                            ...base,
                                            backgroundColor: state.isSelected ? '#6941C6' : state.isFocused ? '#E2E8F0' : 'white',
                                            color: state.isSelected ? 'white' : 'black',
                                            fontSize: 15,
                                            fontFamily: 'Quicksand',
                                        }),
                                    }}
                                    options={filterOptions}
                                />
                            </div>
                            <div className="adduserBtn">
                                <button onClick={createNewUser}>Añadir Usuario</button>
                            </div>
                        </div>
                        <div className="listViewSection">
                            <div className="usersList">
                            {

                                isInitialDataLoading ? <LoadingComponent/>
                                : userList?.map((user, index) => (
                                    <UserCard user={user} key={index}/>
                                ))
                            }
                            </div>
                        </div>
                        <div className="paginationSection">
                            <p>Mostrando de {(pagination * 10) - 9} al {pagination * 10}</p>
                            <PaginationComponent maxIndex={maxPagination} currentIndex={pagination} increaseIndex={addPagination} decreaseIndex={resPagination} navigateIndex={paginationOnIndex}/>
                        </div>
                    </div>
                </div>
            </div>
        </NavigationComponent>
    )
}
