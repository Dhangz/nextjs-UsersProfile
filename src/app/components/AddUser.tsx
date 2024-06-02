"use client";

import { Button, Grid, MenuItem } from "@mui/material";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Modal from "./modal";
import { useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addNewUser } from "../api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

const AddUser = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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
      firstName: '',
      lastName: '',
      middleInitial: '',
      age: '',
      gender: '',
      civilStatus: '',
      email: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await addNewUser({
        id: uuidv4(),
        ...values
      });

      formik.resetForm();
      setModalOpen(false);
      router.refresh();
    }
  });

  return (
    <div>
      <Button className="btn btn-primary w-full" variant="contained" onClick={() => setModalOpen(true)}>
        Add New User &nbsp; &nbsp; <GroupAddIcon/>
      </Button>
      <Modal modalOpen={modalOpen} setModalOpen={(setModalOpen)}>
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
            <Button variant="outlined" size="small" type="submit">Add User</Button>
          </DialogContent>
        </Box>
      </Modal>
    </div>
  )
}

export default AddUser;