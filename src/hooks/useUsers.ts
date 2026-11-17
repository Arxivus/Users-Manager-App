import { useContext, useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { UsersContext } from '../contexts/usersContext'
import type { User } from '../types/user'

const API_URL = 'https://6afc37b9892984c4494b2123.mockapi.io/api/v1/users'

export const useUsers = () => {

    const { users, setUsers } = useContext(UsersContext)
    const [isLoading, setIsLoading] = useState(true)

    const getUsers = useCallback(async () => {
        try {
            setIsLoading(true)

            const response = await axios.get<User[]>(API_URL)
            setUsers(response.data)

        } catch (err) {
            console.error('Ошибка загрузки пользователей: ', err)

        } finally {
            setIsLoading(false)
        }

    }, [setUsers])

    useEffect(() => {
        getUsers()
    }, [])

   
    const saveUser = async (user: User | Omit<User, 'id'>) => {
        try {

            if ('id' in user && user.id) {
                const response = await axios.put<User>(`${API_URL}/${user.id}`, user)

                setUsers((prev) => prev.map((u) => (u.id === user.id ? response.data : u)))
                return response.data

            } else {
                const response = await axios.post<User>(API_URL, user)

                setUsers((prev) => [...prev, response.data])
                return response.data
            }

        } catch (err) {
            console.error('Ошибка сохранения пользователя:', err)
            throw err
        }
    }

    return {
        users,
        isLoading,
        getUsers,
        saveUser,
    };
};