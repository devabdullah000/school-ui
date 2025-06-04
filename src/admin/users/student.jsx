import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import dayjs from 'dayjs';

// Mock API call to fetch classes
const fetchMockClasses = () => {
  return Promise.resolve([
    { id: '1', name: 'Class 1' },
    { id: '2', name: 'Class 2' },
    { id: '3', name: 'Class 3' },
    { id: '4', name: 'Class 4' },
  ]);
};

const StudentRegistrationForm = ({ initialData = null, onSubmit }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    phoneNumber: '',
    email: '',
    gender: 'male',
    dob: '',
    profileImage: null,
    address: '',
    emergencyContact: '',
    rollNumber: '',
    classId: '',
    admissionDate: dayjs().format('YYYY-MM-DD'),
    fatherId: '',
    status: 'active',
  });

  useEffect(() => {
    // Fetch mock classes on mount
    fetchMockClasses().then(setClasses);
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        password: '',
        admissionDate: initialData.admissionDate || dayjs().format('YYYY-MM-DD'),
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleClassChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      classId: e.target.value, // this will be the class id
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const gridProps = { xs: 12, sm: 6, lg: 3 };
  const fieldSx = { width: '100%', '& .MuiInputBase-root': { minWidth: 0 } };

  return (
    <Box sx={{ mx: 'auto' }}>
      <Typography
        variant="h5"
        align="center"
        sx={{ color: 'green', fontWeight: 'bold' }}
        gutterBottom
      >
        {initialData ? 'Update Student Details' : 'Register New Student'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item {...gridProps}>
            <TextField
              required
              name="fullName"
              label="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              sx={fieldSx}
            />
          </Grid>

          <Grid item {...gridProps}>
            <TextField
              required
              name="username"
              label="Username"
              value={formData.username}
              onChange={handleChange}
              sx={fieldSx}
              disabled={!!initialData}
            />
          </Grid>

          <Grid item {...gridProps}>
            <TextField
              type="password"
              name="password"
              label="Password"
              required={!initialData}
              value={formData.password}
              onChange={handleChange}
              sx={fieldSx}
              helperText={initialData ? 'Leave blank to keep existing password' : ''}
            />
          </Grid>

          <Grid item {...gridProps}>
            <TextField
              name="phoneNumber"
              label="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              sx={fieldSx}
            />
          </Grid>

          <Grid item {...gridProps}>
            <TextField
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              sx={fieldSx}
              type="email"
            />
          </Grid>

          <Grid item {...gridProps}>
            <TextField
              name="emergencyContact"
              label="Emergency Contact"
              value={formData.emergencyContact}
              onChange={handleChange}
              sx={fieldSx}
            />
          </Grid>

          <Grid item {...gridProps}>
            <TextField
              name="rollNumber"
              label="Roll Number"
              value={formData.rollNumber}
              onChange={handleChange}
              sx={fieldSx}
            />
          </Grid>

          <Grid item {...gridProps}>
            <TextField
              select
              name="classId"
              label="Class"
              value={formData.classId}
              onChange={handleClassChange}
              sx={{minWidth: 120, width: '100%', '& .MuiInputBase-root': { minWidth: 0 } }}
            >
              {classes.map((cls) => (
                <MenuItem key={cls.id} value={cls.id}>
                  {cls.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item {...gridProps}>
            <TextField
              multiline
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
              sx={fieldSx}
            />
          </Grid>

          <Grid item {...gridProps}>
            <Button
              variant="outlined"
              component="label"
              sx={{
                height: 56,
                textTransform: 'none',
                '& .MuiInputBase-root': { minWidth: 0 },
              }}
              fullWidth
            >
              {formData.profileImage?.name || 'Upload Profile Image'}
              <input
                type="file"
                name="profileImage"
                hidden
                accept="image/*"
                onChange={handleChange}
              />
            </Button>
          </Grid>

          <Grid item {...gridProps}>
            <TextField
              type="date"
              name="dob"
              label="Date of Birth"
              InputLabelProps={{ shrink: true }}
              value={formData.dob}
              onChange={handleChange}
              sx={fieldSx}
            />
          </Grid>

          <Grid item {...gridProps}>
            <TextField
              type="date"
              name="admissionDate"
              label="Admission Date"
              InputLabelProps={{ shrink: true }}
              value={formData.admissionDate}
              InputProps={{ readOnly: true }}
              sx={fieldSx}
            />
          </Grid>

          <Grid item {...gridProps}>
            <TextField
              name="fatherId"
              label="Father CNIC"
              value={formData.fatherId}
              onChange={handleChange}
              sx={fieldSx}
            />
          </Grid>

          <Grid item {...gridProps}>
            <TextField
              select
              name="status"
              label="Status"
              value={formData.status}
              onChange={handleChange}
              sx={fieldSx}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="blocked">Blocked</MenuItem>
              <MenuItem value="terminated">Terminated</MenuItem>
              <MenuItem value="left">Left</MenuItem>
            </TextField>
          </Grid>

          <Grid item {...gridProps}>
            <TextField
              required
              select
              name="gender"
              label="Gender"
              value={formData.gender}
              onChange={handleChange}
              sx={fieldSx}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: 'green',
                color: '#fff',
                py: 1.5,
                fontWeight: 'bold',
                width: isMobile ? '100%' : 250,
              }}
            >
              {initialData ? 'Update Student' : 'Register Student'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default StudentRegistrationForm;
