import { Box, Button, Modal, TextField } from '@mui/material'
import './UserEditForm.css'
import type { User } from '../../types/user'
import { useState, useEffect } from 'react'

type FormProps = {
    isOpen: boolean,
    editedUser?: User,
    onFormClose: () => void,
    onUserSave: (user: User) => void
}

const UserEditForm = ({ isOpen, editedUser, onFormClose, onUserSave }: FormProps) => {

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        age: 0,
        role: '',
        city: '',
        about: ''
    })

    useEffect(() => {
        if (editedUser != undefined) { setFormData(editedUser) }

    }, [editedUser])


    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev, [name]: name === 'age' ? Number(value) : value,
        }))
    }

    const handleSubmitForm = (e: React.SubmitEvent) => {
        e.preventDefault()
        onUserSave(formData)
        onFormClose()
    }

    return (

        <Modal
            open={isOpen}
            onClose={(_, reason) => {
                if (reason == 'backdropClick') {
                    onFormClose()
                }
            }}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '80%',
                maxWidth: 600,
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                padding: '20px',
                borderRadius: '16px',
                bgcolor: 'var(--secondary-bg)',
                transform: 'translate(-50%, -50%)'
            }}
                component="form"
                onSubmit={handleSubmitForm}
            >
                <TextField
                    label="Имя"
                    name="name"
                    value={formData.name}
                    onChange={handleFieldChange}
                    fullWidth
                    required 
                />
                <TextField
                    label="Возраст"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleFieldChange}
                    fullWidth
                    required 
                />
                <TextField
                    label="Роль"
                    name="role"
                    value={formData.role}
                    onChange={handleFieldChange}
                    fullWidth
                    required 
                />
                <TextField
                    label="Город"
                    name="city"
                    value={formData.city}
                    onChange={handleFieldChange}
                    fullWidth
                    required 
                />
                <TextField
                    label="О себе"
                    name="about"
                    multiline
                    rows={5}
                    value={formData.about}
                    onChange={handleFieldChange}
                    fullWidth
                />
                <Button type='submit'>
                    Сохранить
                </Button>
            </Box>
        </Modal>

    )
}

export default UserEditForm