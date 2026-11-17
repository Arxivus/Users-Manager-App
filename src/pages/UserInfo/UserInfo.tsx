import './UserInfo.css'
import avatarUrl from '/images/user-avatar.jpg'
import { useNavigate, useParams } from 'react-router-dom'
import { useUsers } from '../../hooks/useUsers'

const UserInfo = () => {

    const navigate = useNavigate()

    const params = useParams()
    const userId = params.id
    const { users, isLoading } = useUsers()

    const currentUser = users.find(user => user.id === userId)

    return (
        <div className='container'>
            <div className='user-container'>
                {
                    isLoading ? <h2>Загрузка данных пользователя...</h2>
                        : <>
                            <div
                                className='back-btn'
                                onClick={() => navigate(-1)}
                            >
                                <p>Вернуться назад</p>
                            </div>
                            <div className='user-block'>
                                <img src={avatarUrl} alt="Аватар пользователя" />
                                <div className='block-info'>
                                    <h2>{currentUser?.name}</h2>
                                    <p><b>Возраст:</b> {currentUser?.age}</p>
                                    <p><b>Роль:</b> {currentUser?.role}</p>
                                    <p><b>Город:</b> {currentUser?.city}</p>
                                    <p>{currentUser?.about}</p>
                                </div>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}

export default UserInfo