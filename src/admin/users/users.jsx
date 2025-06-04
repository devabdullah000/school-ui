import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import StudentRegistrationPage from './studentRegistration'; // ✅ Renamed in JSX below
import TeacherRegistrationForm from './teacher';
import AdminForm from './admin';
import AccountantForm from './accountant';

// Styled green select with white text
const GreenSelect = styled(Select)(({ theme }) => ({
  color: 'green',
  '& .MuiSelect-icon': {
    color: 'green',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'green',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#43a047',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#388e3c',
  },
}));

const Users = () => {
  const [userType, setUserType] = useState('');

  const handleChange = (e) => {
    setUserType(e.target.value);
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 3 }}>
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel sx={{ color: 'green' }}>Select User Type</InputLabel>
          <GreenSelect
            value={userType}
            onChange={handleChange}
            label="Select User Type"
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="accountant">Accountant</MenuItem>
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="teacher">Teacher</MenuItem>
          </GreenSelect>
        </FormControl>

        {!userType && (
          <Typography
            variant="body1"
            align="center"
            sx={{ color: '#d32f2f', mb: 2, fontWeight: 500 }}
          >
            Please select the registration type to continue.
          </Typography>
        )}

        {userType === 'admin' && (
          <AdminForm
            onSubmit={(data) => {
              console.log('Register Admin:', data);
              // registerAdmin(data)
            }}
          />
        )}

        {userType === 'accountant' && (
          <AccountantForm
            onSubmit={(data) => {
              console.log('Register Accountant:', data);
              // registerAccountant(data)
            }}
          />
        )}

        {userType === 'student' && (
          <StudentRegistrationPage /> // ✅ Correct component name
        )}

        {userType === 'teacher' && (
          <TeacherRegistrationForm
            onSubmit={(data) => {
              console.log('Register Teacher:', data);
              // registerTeacher(data)
            }}
          />
        )}
    </Box>
  );
};

export default Users;
