import React, { useEffect, useState } from 'react';
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

const AdminForm = ({ defaultData = {}, onSubmit }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    phoneNumber: '',
    email: '',
    gender: 'male',
    dob: '',
    profileImage: '',
    address: '',
    emergencyContact: '',
    joiningDate: '',
    experience: '',
    qualification: '',
    status: 'active',
    ...defaultData,
  });

  useEffect(() => {
    if (
      defaultData &&
      JSON.stringify(defaultData) !== JSON.stringify(formData)
    ) {
      setFormData((prev) => ({ ...prev, ...defaultData }));
    }
  }, [defaultData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
        {defaultData?.id ? 'Update Admin Details' : 'Register New Admin'}
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
            />
          </Grid>

          <Grid item {...gridProps}>
            <TextField
              required
              type="password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              sx={fieldSx}
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
            />
          </Grid>


          
          <Grid item {...gridProps}>
            <TextField
              required
              name="emergencyContact"
              label="Emergency Contact"
              value={formData.emergencyContact}
              onChange={handleChange}
              sx={fieldSx}
            />
          </Grid>

          
          <Grid item {...gridProps}>
            <TextField
              name="experience"
              label="Experience"
              value={formData.experience}
              onChange={handleChange}
              sx={fieldSx}
            />
          </Grid>

          <Grid item {...gridProps}>
            <TextField
              name="qualification"
              label="Qualification"
              value={formData.qualification}
              onChange={handleChange}
              sx={fieldSx}
            />
          </Grid>
          <Grid item {...gridProps}>
            <TextField
              required
              multiline
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
              sx={fieldSx}
            />
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
              name="joiningDate"
              label="Joining Date"
              InputLabelProps={{ shrink: true }}
              value={formData.joiningDate}
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

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }}}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#4caf50',
                color: '#fff',
                py: 1.5,
                fontWeight: 'bold',
                width: isMobile ? '100%' : 250,
              }}
            >
              {defaultData?.id ? 'Update Admin' : 'Register Admin'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminForm;
