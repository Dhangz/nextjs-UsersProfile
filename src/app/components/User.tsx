"use client";
import React, { useState } from "react";
import { IUser } from "../types/Users";
import { TableRow, TableCell, DialogActions, Grid, MenuItem, Button } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import { viewUser, DeleteUser, EditUser } from "../api";
import { useRouter } from "next/navigation";
import AppRegistrationSharpIcon from '@mui/icons-material/AppRegistrationSharp';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Modal from "./modal";
import ModalView from "./modalView";
import ModalDelete from "./modalDelete";
import PreviewIcon from '@mui/icons-material/Preview';

interface UserProps {
    user: IUser;
}



const User: React.FC<UserProps> = ({ user }) => {
    const router = useRouter();
    const [OpenModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [OpenModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [OpenModalView, setOpenModalView] = useState<boolean>(false);
    const [viewedUser, setViewedUser] = useState<IUser | null>(null);

    const genderOptions = [
        { value: 'M', label: 'Male' },
        { value: 'F', label: 'Female' },
        { value: 'Others', label: 'Others' }
    ];

    const civilStatusOptions = [
        { value: 'Single', label: 'Single' },
        { value: 'Married', label: 'Married' },
        { value: 'Divorced', label: 'Divorced' },
        { value: 'Widowed', label: 'Widowed' },
        { value: 'Civil Union', label: 'Civil Union' }
    ];

    const validationSchema = Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        middleInitial: Yup.string().required('Middle initial is required'),
        age: Yup.number().required('Age is required').positive('Age must be positive').integer('Age must be an integer'),
        gender: Yup.string().required('Gender is required'),
        civilStatus: Yup.string().required('Civil status is required'),
        email: Yup.string().email('Invalid email address').required('Email is required')
    });

    const formik = useFormik({
        initialValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            middleInitial: user.middleInitial,
            age: user.age,
            gender: user.gender,
            civilStatus: user.civilStatus,
            email: user.email
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await EditUser({
                id: user.id,
                ...values
            });

            setOpenModalEdit(false);
            router.refresh();
        }
    });

    const handleDeleteUser = async (id: string) => {
        await DeleteUser(id);
        setOpenModalDelete(false);
        router.refresh();
    }

    const handleViewUser = async (id: string) => {
        const userData = await viewUser(id);
        setViewedUser(userData);
        setOpenModalView(true);
    }

    

    const handleClose = () => {
        setOpenModalDelete(false);
    };

    return (
        <TableRow
            key={user.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            className="hover:bg-gray-100"
        >
            <TableCell align="left" component="th" scope="row">
                {user.lastName}, {user.firstName} {user.middleInitial}.
            </TableCell>
            <TableCell align="left">{user.gender}</TableCell>
            <TableCell align="left">{user.age}</TableCell>
            <TableCell align="left">{user.civilStatus}</TableCell>
            <TableCell align="left">{user.email}</TableCell>
            <TableCell className="flex gap-3" align="right">
                <DeleteForeverSharpIcon fontSize="small" onClick={() => setOpenModalDelete(true)} cursor='pointer' className="text-red-500" />
                <ModalDelete modalOpen={OpenModalDelete} setModalOpen={(setOpenModalDelete)}>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                    </DialogActions>
                </ModalDelete>
                <AppRegistrationSharpIcon fontSize="small" onClick={() => setOpenModalEdit(true)} cursor='pointer' className="text-blue-500" />
                <Modal  modalOpen={OpenModalEdit} setModalOpen={(setOpenModalEdit)}>
                    <Box
                        component="form"
                        onSubmit={formik.handleSubmit}
                        sx={{ width: '100%' }}
                        noValidate
                        autoComplete="off"
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    id="outlined-first-name"
                                    label="First Name"
                                    {...formik.getFieldProps('firstName')}
                                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                    helperText={formik.touched.firstName && formik.errors.firstName}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    id="outlined-last-name"
                                    label="Last Name"
                                    {...formik.getFieldProps('lastName')}
                                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                    helperText={formik.touched.lastName && formik.errors.lastName}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    id="outlined-middle-initial"
                                    label="M.I"
                                    {...formik.getFieldProps('middleInitial')}
                                    error={formik.touched.middleInitial && Boolean(formik.errors.middleInitial)}
                                    helperText={formik.touched.middleInitial && formik.errors.middleInitial}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, marginTop: 3, width: '15ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    id="outlined-age"
                                    label="Age"
                                    {...formik.getFieldProps('age')}
                                    error={formik.touched.age && Boolean(formik.errors.age)}
                                    helperText={formik.touched.age && formik.errors.age}
                                />
                                <TextField
                                    id="outlined-select-gender"
                                    select
                                    label="Gender"
                                    {...formik.getFieldProps('gender')}
                                    error={formik.touched.gender && Boolean(formik.errors.gender)}
                                    helperText={formik.touched.gender && formik.errors.gender}
                                >
                                    {genderOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="outlined-select-civil-status"
                                    select
                                    label="Civil Status"
                                    {...formik.getFieldProps('civilStatus')}
                                    error={formik.touched.civilStatus && Boolean(formik.errors.civilStatus)}
                                    helperText={formik.touched.civilStatus && formik.errors.civilStatus}
                                >
                                    {civilStatusOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </Box>
                        <Box
                            sx={{
                                width: '100%',
                                maxWidth: '100%',
                                marginTop: '15px',
                            }}
                        >
                            <TextField
                                fullWidth
                                label="Email"
                                id="fullWidth"
                                {...formik.getFieldProps('email')}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Box>
                        <br />
                        <DialogContent className="flex justify-end" dividers>
                            <Button variant="text" size="small" type="submit">Save Changes</Button>
                        </DialogContent>
                    </Box>
                </Modal>

                {/* Modal For View Specific User */}
                <PreviewIcon fontSize="small" onClick={() => handleViewUser(user.id)} cursor='pointer' className="text-green-500"/>
                <ModalView modalOpen={OpenModalView} setModalOpen={(setOpenModalView)}>
                <Box
                        component="form"
                        onSubmit={formik.handleSubmit}
                        sx={{ width: '100%' }}
                        noValidate
                        autoComplete="off"
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    id="outlined-first-name"
                                    label="First Name"
                                    value={viewedUser?.firstName}
                                    fullWidth
                                    
                                />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    id="outlined-last-name"
                                    label="Last Name"
                                    value={viewedUser?.lastName}
                                    fullWidth
                                    
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    id="outlined-middle-initial"
                                    label="M.I"
                                    value={viewedUser?.middleInitial}
                                    fullWidth
                                    
                                />
                            </Grid>
                        </Grid>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, marginTop: 3, width: '15ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    id="outlined-age"
                                    label="Age"
                                    value={viewedUser?.age}
                                    fullWidth
                                    
                                    
                                />
                                <TextField
                                    id="outlined-select-gender"
                                    
                                    label="Gender"
                                    value={viewedUser?.gender}
                                    fullWidth
                                    
                                >
                                </TextField>
                                <TextField
                                    id="outlined-select-civil-status"
                                    
                                    label="Civil Status"
                                    value={viewedUser?.civilStatus}
                                    fullWidth                     
                                >
                                </TextField>
                            </div>
                        </Box>
                        <Box
                            sx={{
                                width: '100%',
                                maxWidth: '100%',
                                marginTop: '15px',
                            }}
                        >
                            <TextField
                                fullWidth
                                label="Email"
                                id="fullWidth"
                                value={viewedUser?.email}
                            />
                        </Box>
                        <br />
                    </Box>
                </ModalView>


            </TableCell>
        </TableRow>
    );
}

export default User;


