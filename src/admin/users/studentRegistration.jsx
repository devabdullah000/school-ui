import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';

const StudentRegistrationForm = ({ 
  initialStudentData = null, 
  initialParentData = null,
  onSuccess,
  isUpdate = false 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  // Student form state
  const [classes, setClasses] = useState([]);
  const [studentData, setStudentData] = useState({
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

  // Parent form state
  const [parentData, setParentData] = useState({
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
  });

  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');
  const [foundParent, setFoundParent] = useState(null);
  const [loading, setLoading] = useState(false);

  // Initialize form with initial data if provided
  useEffect(() => {
    if (initialStudentData) {
      setStudentData({
        ...initialStudentData,
        profileImage: initialStudentData.profileImage || null,
        dob: initialStudentData.dob || '',
        admissionDate: initialStudentData.admissionDate || dayjs().format('YYYY-MM-DD')
      });
    }

    if (initialParentData) {
      setParentData({
        ...initialParentData,
        profileImage: initialParentData.profileImage || null,
        dob: initialParentData.dob || ''
      });
      setFoundParent(true);
    }
  }, [initialStudentData, initialParentData]);

  // Fetch classes on mount
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        // // Replace with your actual API call
        // const res = await axios.get('/api/classes');
        // setClasses(res.data);
        setClasses([
          { id: '1', name: 'Class 1' },
          { id: '2', name: 'Class 2' },
          { id: '3', name: 'Class 3' },
          { id: '4', name: 'Class 4' },
        ]);
      } catch (err) {
        console.error('Error fetching classes:', err);
        // Fallback mock data
        setClasses([
          { id: '1', name: 'Class 1' },
          { id: '2', name: 'Class 2' },
          { id: '3', name: 'Class 3' },
          { id: '4', name: 'Class 4' },
        ]);
      }
    };

    fetchClasses();
  }, []);
console.log(classes);
  // Handle student form changes
  const handleStudentChange = (e) => {
    const { name, value, files } = e.target;
    setStudentData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle parent form changes
  const handleParentChange = (e) => {
    const { name, value, files } = e.target;
    setParentData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle class selection
  const handleClassChange = (e) => {
    setStudentData((prev) => ({
      ...prev,
      classId: e.target.value,
    }));
  };

  // Search parent by CNIC
  const handleCNICSearch = async () => {
    setSearching(true);
    setError('');
    try {
      const res = await axios.get(`/api/parents/${parentData.cnic}`);
      const parent = res.data;
      if (parent) {
        setParentData(prev => ({
          ...prev,
          fullName: parent.fullName || '',
          phoneNumber: parent.phoneNumber || '',
          email: parent.email || '',
          address: parent.address || '',
          relation: parent.relation || '',
          occupation: parent.occupation || '',
          qualification: parent.qualification || '',
          status: parent.status || 'active',
          childIds: [...(parent.childIds || [])],
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Link student to parent via CNIC
      const finalStudentData = {
        ...studentData,
        fatherId: parentData.cnic
      };

      const payload = {
        parent: parentData,
        student: finalStudentData
      };

      if (isUpdate) {
        // Update existing records
        await axios.put(`/api/students/${initialStudentData.id}`, {
          student: finalStudentData,
          parent: parentData
        });
      } else {
        // Create new records
        await axios.post('/api/register', payload);
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Common props for grid items
  const gridProps = { xs: 12, sm: 6, lg: 3 };
  const fieldSx = { width: '100%', '& .MuiInputBase-root': { minWidth: 0 } };

  return (
    <Box sx={{ p: 2 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Student Form Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'green', fontWeight: 'bold' }}>
                Student Details
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item {...gridProps}>
                  <TextField
                    required
                    name="fullName"
                    label="Full Name"
                    value={studentData.fullName}
                    onChange={handleStudentChange}
                    sx={fieldSx}
                  />
                </Grid>

                <Grid item {...gridProps}>
                  <TextField
                    required
                    name="username"
                    label="Username"
                    value={studentData.username}
                    onChange={handleStudentChange}
                    sx={fieldSx}
                    disabled={isUpdate}
                  />
                </Grid>

                {!isUpdate && (
                  <Grid item {...gridProps}>
                    <TextField
                      type="password"
                      name="password"
                      label="Password"
                      required={!isUpdate}
                      value={studentData.password}
                      onChange={handleStudentChange}
                      sx={fieldSx}
                    />
                  </Grid>
                )}

                <Grid item {...gridProps}>
                  <TextField
                    name="phoneNumber"
                    label="Phone Number"
                    value={studentData.phoneNumber}
                    onChange={handleStudentChange}
                    sx={fieldSx}
                  />
                </Grid>

                <Grid item {...gridProps}>
                  <TextField
                    name="email"
                    label="Email"
                    value={studentData.email}
                    onChange={handleStudentChange}
                    sx={fieldSx}
                    type="email"
                  />
                </Grid>

                <Grid item {...gridProps}>
                  <TextField
                    name="emergencyContact"
                    label="Emergency Contact"
                    value={studentData.emergencyContact}
                    onChange={handleStudentChange}
                    sx={fieldSx}
                  />
                </Grid>

                <Grid item {...gridProps}>
                  <TextField
                    name="rollNumber"
                    label="Roll Number"
                    value={studentData.rollNumber}
                    onChange={handleStudentChange}
                    sx={fieldSx}
                  />
                </Grid>

                <Grid item {...gridProps}>
                  <TextField
                    select
                    name="classId"
                    label="Class"
                    value={studentData.classId}
                    onChange={handleClassChange}
                    sx={{ minWidth: 120, width: '100%', '& .MuiInputBase-root': { minWidth: 0 } }}
                  >
                    {classes.length > 0 && classes.map((cls) => (
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
                    value={studentData.address}
                    onChange={handleStudentChange}
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
                    {studentData.profileImage?.name || 'Upload Profile Image'}
                    <input
                      type="file"
                      name="profileImage"
                      hidden
                      accept="image/*"
                      onChange={handleStudentChange}
                    />
                  </Button>
                </Grid>

                <Grid item {...gridProps}>
                  <TextField
                    type="date"
                    name="dob"
                    label="Date of Birth"
                    InputLabelProps={{ shrink: true }}
                    value={studentData.dob}
                    onChange={handleStudentChange}
                    sx={fieldSx}
                  />
                </Grid>

                <Grid item {...gridProps}>
                  <TextField
                    type="date"
                    name="admissionDate"
                    label="Admission Date"
                    InputLabelProps={{ shrink: true }}
                    value={studentData.admissionDate}
                    onChange={handleStudentChange}
                    sx={fieldSx}
                  />
                </Grid>

                <Grid item {...gridProps}>
                  <TextField
                    name="fatherId"
                    label="Father CNIC"
                    value={parentData.cnic}
                    sx={fieldSx}
                    disabled
                  />
                </Grid>

                <Grid item {...gridProps}>
                  <TextField
                    select
                    name="status"
                    label="Status"
                    value={studentData.status}
                    onChange={handleStudentChange}
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
                    value={studentData.gender}
                    onChange={handleStudentChange}
                    sx={fieldSx}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Divider */}
          <Grid item xs={12} md={0.5} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Divider
              orientation={isSmallScreen ? 'horizontal' : 'vertical'}
              flexItem
              sx={{ my: isSmallScreen ? 2 : 0 }}
            />
          </Grid>

          {/* Parent Form Section */}
          <Grid item xs={12} md={5.5}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'green', fontWeight: 'bold' }}>
                Parent Details
              </Typography>

              <Grid container spacing={2}>
                {/* CNIC Search Field */}
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    required
                    name="cnic"
                    label="CNIC Number"
                    value={parentData.cnic}
                    onChange={handleParentChange}
                    inputProps={{ maxLength: 15 }}
                    sx={fieldSx}
                    disabled={isUpdate}
                  />
                </Grid>
                {!isUpdate && (
                  <Grid item xs={12} sm={4}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleCNICSearch}
                      disabled={searching || !parentData.cnic}
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
                )}

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
                    value={parentData.fullName}
                    onChange={handleParentChange}
                    sx={fieldSx}
                  />
                </Grid>

                <Grid item {...gridProps}>
                  <TextField
                    fullWidth
                    required
                    name="username"
                    label="Username"
                    value={parentData.username}
                    onChange={handleParentChange}
                    sx={fieldSx}
                    disabled={isUpdate}
                  />
                </Grid>

                {!isUpdate && (
                  <Grid item {...gridProps}>
                    <TextField
                      fullWidth
                      required={!isUpdate}
                      name="password"
                      label="Password"
                      type="password"
                      value={parentData.password}
                      onChange={handleParentChange}
                      sx={fieldSx}
                    />
                  </Grid>
                )}

                <Grid item {...gridProps}>
                  <TextField
                    fullWidth
                    name="phoneNumber"
                    label="Phone Number"
                    value={parentData.phoneNumber}
                    onChange={handleParentChange}
                    sx={fieldSx}
                  />
                </Grid>

                <Grid item {...gridProps}>
                  <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    value={parentData.email}
                    onChange={handleParentChange}
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
                    value={parentData.gender}
                    onChange={handleParentChange}
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
                    value={parentData.dob}
                    onChange={handleParentChange}
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
                    {parentData.profileImage?.name || 'Upload Profile Image'}
                    <input
                      type="file"
                      name="profileImage"
                      hidden
                      accept="image/*"
                      onChange={handleParentChange}
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
                    value={parentData.address}
                    onChange={handleParentChange}
                    sx={fieldSx}
                  />
                </Grid>

                <Grid item {...gridProps}>
                  <TextField
                    fullWidth
                    name="qualification"
                    label="Qualification"
                    value={parentData.qualification}
                    onChange={handleParentChange}
                    sx={fieldSx}
                  />
                </Grid>

                <Grid item {...gridProps}>
                  <TextField
                    fullWidth
                    name="occupation"
                    label="Occupation"
                    value={parentData.occupation}
                    onChange={handleParentChange}
                    sx={fieldSx}
                  />
                </Grid>

                <Grid item {...gridProps}>
                  <TextField
                    fullWidth
                    name="relation"
                    label="Relation to Child"
                    value={parentData.relation}
                    onChange={handleParentChange}
                    sx={fieldSx}
                  />
                </Grid>

                <Grid item {...gridProps}>
                  <TextField
                    fullWidth
                    select
                    name="status"
                    label="Status"
                    value={parentData.status}
                    onChange={handleParentChange}
                    sx={{ minWidth: 120, width: '100%', '& .MuiInputBase-root': { minWidth: 0 } }}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="blocked">Blocked</MenuItem>
                    <MenuItem value="left">Left</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                backgroundColor: 'green',
                color: '#fff',
                py: 1.5,
                fontWeight: 'bold',
                width: isMobile ? '100%' : 250,
                '&:disabled': {
                  backgroundColor: '#e0e0e0',
                }
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : isUpdate ? (
                'Update Student'
              ) : (
                'Register Student'
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default StudentRegistrationForm;