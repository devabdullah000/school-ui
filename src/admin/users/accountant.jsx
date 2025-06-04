import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const AccountantForm = ({ defaultData = {}, onSubmit }) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    phoneNumber: "",
    email: "",
    gender: "male",
    dob: "",
    profileImage: "",
    address: "",
    emergencyContact: "",
    joiningDate: "",
    experience: "",
    qualification: "",
    status: "active",
    ...defaultData,
  });

  useEffect(() => {
    // Only update formData if defaultData exists and is different from current formData
    if (
      defaultData &&
      JSON.stringify(defaultData) !== JSON.stringify(formData)
    ) {
      setFormData((prev) => ({ ...prev, ...defaultData }));
    }
  }, [defaultData, formData]);
  
  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    onSubmit(formData);
  };

// Replace getGridSize with this updated logic:
const getGridSize = () => {
  if (isMobile) return 12;      // 1 field per row
  if (isTablet) return 6;       // 2 fields per row
  return 3;                     // 4 fields per row on desktop
};

// Define common field style (match Email field width on mobile and tablet)
const fieldStyle = {
  width: '100%',
  maxWidth: isMobile ? '100%' : isTablet ? '100%' : undefined,
};


  return (
    <Box sx={{ mx: "auto" }}>
      <Typography variant="h5" align="center" sx={{color:'green',fontWeight: 'bold'}} gutterBottom>
        {defaultData?.id
          ? "Update Accountant Details"
          : "Register New Accountant"}
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Full Name */}
          <Grid item xs={12} sm={getGridSize()}>
            <TextField
              fullWidth
              required
              name="fullName"
              label="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              sx={fieldStyle}
            />
          </Grid>

          {/* Username */}
          <Grid item xs={12} sm={getGridSize()}>
            <TextField
              fullWidth
              required
              name="username"
              label="Username"
              value={formData.username}
              onChange={handleChange}
              sx={fieldStyle}
            />
          </Grid>

          {/* Password */}
          <Grid item xs={12} sm={getGridSize()}>
            <TextField
              fullWidth
              required
              type="password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              sx={fieldStyle}

            />
          </Grid>

          {/* Phone Number */}
          <Grid item xs={12} sm={getGridSize()}>
            <TextField
              fullWidth
              name="phoneNumber"
              label="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              sx={fieldStyle}

            />
          </Grid>
          {/* Address */}
          <Grid item xs={12} sm={getGridSize()}>
            <TextField
              fullWidth
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
              sx={fieldStyle}

            />
          </Grid>

          {/* Emergency Contact */}
          <Grid item xs={12} sm={getGridSize()}>
            <TextField
              fullWidth
              required
              name="emergencyContact"
              label="Emergency Contact"
              value={formData.emergencyContact}
              onChange={handleChange}
              sx={fieldStyle}

            />
          </Grid>

          {/* Experience */}
          <Grid item xs={12} sm={getGridSize()}>
            <TextField
              fullWidth
              name="experience"
              label="Experience"
              value={formData.experience}
              onChange={handleChange}
              sx={fieldStyle}

            />
          </Grid>

          {/* Qualification */}
          <Grid item xs={12} sm={getGridSize()}>
            <TextField
              fullWidth
              name="qualification"
              label="Qualification"
              value={formData.qualification}
              onChange={handleChange}
              sx={fieldStyle}

            />
          </Grid>
          {/* Email */}
<Grid item xs={12} sm={getGridSize()}>
  <TextField
    fullWidth
    name="email"
    label="Email"
    value={formData.email}
    onChange={handleChange}
    sx={fieldStyle}

  />
</Grid>
{/* Profile Image */}
<Grid item xs={12} sm={getGridSize()} sx={{ maxWidth: 150 }} >
  <Button
    fullWidth
    variant="outlined"
    component="label"
    sx={{ textTransform: 'none', height: '56px' }} // Match TextField height
  >
    {formData.profileImage?.name || "Upload Profile Image"}
    <input
      type="file"
      name="profileImage"
      hidden
      accept="image/*"
      onChange={handleChange}
      sx={fieldStyle}

    />
  </Button>
</Grid>


{/* Date of Birth */}
<Grid item xs={12} sm={getGridSize()}>
  <TextField
    fullWidth
    type="date"
    name="dob"
    label="Date of Birth"
    InputLabelProps={{ shrink: true }}
    value={formData.dob}
    onChange={handleChange}
    sx={fieldStyle}

  />
</Grid>


{/* Joining Date */}
<Grid item xs={12} sm={getGridSize()}>
  <TextField
    fullWidth
    type="date"
    name="joiningDate"
    label="Joining Date"
    InputLabelProps={{ shrink: true }}
    value={formData.joiningDate}
    onChange={handleChange}
    sx={fieldStyle}

  />
</Grid>


          {/* Status */}
          <Grid item xs={12} sm={getGridSize()}>
            <TextField
              select
              fullWidth
              name="status"
              label="Status"
              value={formData.status}
              onChange={handleChange}
              sx={fieldStyle}

            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="blocked">Blocked</MenuItem>
              <MenuItem value="terminated">Terminated</MenuItem>
              <MenuItem value="left">Left</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={getGridSize()}>
            <TextField
              select
              fullWidth
              name="gender"
              label="Gender"
              value={formData.gender}
              onChange={handleChange}
              sx={{ minWidth: 90 }} // 👈 prevents layout shift
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </TextField>
          </Grid>

          {/* Submit Button */}
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: {
                xs: "center",
                sm: "center",
                md: "flex-end",
              },
              mt: 2,
            }}
          >
            
          </Grid>
          <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#4caf50",
                color: "#fff",
                py: 1.5,
                fontWeight: "bold",
                width: isMobile ? "100%" : 250,
              }}
            >
              {defaultData?.id ? "Update Accountant" : "Register Accountant"}
            </Button>
        </Grid>
      </Box>
    </Box>
  );
};

export default AccountantForm;
