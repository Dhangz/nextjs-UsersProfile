import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import User from './User';
import { IUser } from '../types/Users';

interface UserListProps {
  users: IUser[]
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='font-bold'>Full Name</TableCell>
            <TableCell className='font-bold' align="left">Gender</TableCell>
            <TableCell className='font-bold' align="left">Age</TableCell>
            <TableCell className='font-bold' align="left">Civil Status</TableCell>
            <TableCell className='font-bold' align="left">Email</TableCell>
            <TableCell className='font-bold' align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UserList