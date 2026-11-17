import './Main.css'
import UsersTable from '../../components/UsersTable/UsersTable'
import UserEditForm from '../../components/UserEditForm/UserEditForm'
import { useState } from 'react'
import type { User } from '../../types/user'
import { Button } from '@mui/material'
import { useUsers } from '../../hooks/useUsers'

const Main = () => {

    const { users, isLoading, saveUser } = useUsers()
    const [isModalOpen, setModalOpen] = useState(false)
    const [editedUser, setEditedUser] = useState<User>()

    const handleEditForm = (userId: string) => {
        setModalOpen(true)
        setEditedUser(users.find(user => user.id === userId))
    }

    const handleAddUser = () => {
        setModalOpen(true)
        setEditedUser(undefined)
    }

    const handleSaveUser = async (user: User) => {
        try {
            await saveUser(user)
            setModalOpen(false)
            setEditedUser(undefined)

        } catch (e) {
            alert('Не удалось сохранить пользователя')
        }
    };

    return (
        <div className='container'>
            <div className='main-container'>
                <h1>Пользователи</h1>
                {
                    isLoading ? <h2>Загрузка пользователей...</h2>
                    :
                        <UsersTable
                            users={users}
                            editFunction={handleEditForm}
                        />
                }
                {
                    isModalOpen &&
                    <UserEditForm
                        isOpen={isModalOpen}
                        editedUser={editedUser}
                        onFormClose={() => setModalOpen(false)}
                        onUserSave={handleSaveUser}
                    />
                }
                <Button onClick={handleAddUser}>
                    Добавить пользователя
                </Button>
            </div>
        </div>
    )
}

export default Main