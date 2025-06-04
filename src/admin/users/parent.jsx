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
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

const StudentParentForm = ({ defaultData = null, onSubmit }) => {
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
    profileImage: null,
    address: '',
    qualification: '',
    status: 'active',
    relation: '',
    occupation: '',
    cnic: '',
    childIds: [],
    ...defaultData,
  });

  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');
  const [foundParent, setFoundParent] = useState(null);

  useEffect(() => {
    if (defaultData) {
      setFormData(prev => ({
        ...prev,
        ...defaultData,
        password: '',
      }));
    }
  }, [defaultData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleChildIdsChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      childIds: e.target.value.split(',').map(id => id.trim()),
    }));
  };

  const handleCNICSearch = async () => {
    setSearching(true);
    setError('');
    try {
      const res = await axios.get(`/api/parents/${formData.cnic}`);
      const parent = res.data;
      if (parent) {
        setFormData(prev => ({
          ...prev,
          fullName: parent.fullName || '',
          phoneNumber: parent.phoneNumber || '',
          email: parent.email || '',
          address: parent.address || '',
          relation: parent.relation || '',
          occupation: parent.occupation || '',
          qualification: parent.qualification || '',
          status: parent.status || 'active',
          childIds: [...(parent.childIds || []), defaultData.childId || ''],
        }));
        setFoundParent(true);
      } else {
        setError('Parent not found. You may enter details manually.');
        setFoundParent(false);
      }
    } catch (err) {
      setError('Error fetching parent data.');
      setFoundParent(false);
    } finally {
      setSearching(false);
    }
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
        Parent Information for Student Registration
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* CNIC Search Field */}
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              required
              name="cnic"
              label="CNIC Number"
              value={formData.cnic}
              onChange={handleChange}
              inputProps={{ maxLength: 15 }}
              sx={fieldSx}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleCNICSearch}
              disabled={searching || !formData.cnic}
              sx={{
                backgroundColor: 'green',
                color: '#fff',
                height: '56px',
                textTransform: 'none',
              }}
            >
              {searching ? <CircularProgress size={24} color="inherit" /> : 'Search'}
            </Button>
          </Grid>

          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}

          {/* Parent Information Fields */}
          <Grid item {...gridProps}>
            <TextField
              fullWidth
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
              fullWidth
              required
              name="username"
              label="Username"
              value={formData.username}
              onChange={handleChange}
              sx={fieldSx}
              disabled={!!defaultData}
            />
          </Grid>

          <Grid item {...gridProps}>
            <TextField
              fullWidth
              required={!defaultData}
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              sx={fieldSx}
              helperText={defaultData ? 'Leave blank to keep existing password' : ''}
            />
          </Grid>

          <Grid item {...gridProps}>
            <TextField
              fullWidth
              name="phoneNumber"
              label="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              sx={fieldSx}
            />
          </Grid>

          <Grid item {...gridProps}>
            <TextField
              fullWidth
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
              fullWidth
              select
              name="gender"
              label="Gender"
              value={formData.gender}
              onChange={handleChange}
              sx={{ minWidth: 120, width: '100%', '& .MuiInputBase-root': { minWidth: 0 } }}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </TextField>
          </Grid>

          <Grid item {...gridProps}>
            <TextField
              fullWidth
              name="dob"
              label="Date of Birth"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.dob}
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

          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="address"
              label="Address"
              multiline
              value={formData.address}
              onChange={handleChange}
              sx={fieldSx}
            />
          </Grid>

          <Grid item {...gridProps}>
            <TextField
              fullWidth
              name="qualification"
              label="Qualification"
              value={formData.qualification}
              onChange={handleChange}
              sx={fieldSx}
            />
          </Grid>

          <Grid item {...gridProps}>
            <TextField
              fullWidth
              name="occupation"
              label="Occupation"
              value={formData.occupation}
              onChange={handleChange}
              sx={fieldSx}
            />
          </Grid>

          <Grid item {...gridProps}>
            <TextField
              fullWidth
              name="relation"
              label="Relation to Child"
              value={formData.relation}
              onChange={handleChange}
              sx={fieldSx}
            />
          </Grid>

          <Grid item {...gridProps}>
            <TextField
              fullWidth
              select
              name="status"
              label="Status"
              value={formData.status}
              onChange={handleChange}
              sx={{ minWidth: 120, width: '100%', '& .MuiInputBase-root': { minWidth: 0 } }}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="blocked">Blocked</MenuItem>
              <MenuItem value="left">Left</MenuItem>
            </TextField>
          </Grid>

          
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } , mt: 2 }}>
            
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
              {defaultData ? 'Update Parent Info' : 'Register Parent Info'}
            </Button>
          </Grid>
      </Box>
    </Box>
  );
};

export default StudentParentForm;