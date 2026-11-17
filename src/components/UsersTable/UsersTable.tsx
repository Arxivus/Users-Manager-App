import './UsersTable.css'
import type { User } from '../../types/user'
import { Table, TableHead, TableBody, TableRow, TableCell, Button, TablePagination } from '@mui/material'
import { Link } from 'react-router-dom'
import { useState } from 'react'

type UsersTableProps = {
    users: User[]
    editFunction: (id: string) => void
}

const UsersTable = ({ users, editFunction }: UsersTableProps) => {

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const displayedUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

    const handlePageChange = (_: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    return (
        <div className='table-container'>
            <Table sx={{
                maxWidth: 900,
                border: 'var(--border)',
                borderRadius: '16px',
                borderCollapse: 'separate',
                overflow: 'hidden'
            }}>
                <TableHead sx={{ backgroundColor: 'var(--primary-bg)' }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }} align="center">№</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} align="left">Имя пользователя</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} align="center">Роль</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        displayedUsers && displayedUsers.map(((user, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">{index + rowsPerPage * page + 1}</TableCell>
                                <TableCell align="left">
                                    <Link to={`users/${user.id}`}>
                                        {user.name}
                                    </Link>
                                </TableCell>
                                <TableCell align="center">{user.role}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => editFunction(user.id)}>Редактировать</Button>
                                </TableCell>
                            </TableRow>
                        )))
                    }
                </TableBody>
            </Table>
            <TablePagination
                sx={{
                    border: 'none',
                }}
                count={users.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handlePageChange}
                rowsPerPageOptions={[5, 10]}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Строк на странице:"
            />
        </div>
    )
}

export default UsersTable