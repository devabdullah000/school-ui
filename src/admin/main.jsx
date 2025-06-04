import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardActionArea,
  CardContent,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Components to mount
import Users from './users/users';

const modules = [
  { label: 'Users', value: 'users' },
  // Add more modules here
];

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#4caf50',
  color: 'white',
  height: '100%',
  '&:hover': {
    backgroundColor: '#388e3c',
    transform: 'scale(1.02)',
    transition: '0.2s ease-in-out',
  },
}));

const AdminPanel = () => {
  const [selectedModule, setSelectedModule] = useState(null);

  const renderSelectedComponent = () => {
    switch (selectedModule) {
      case 'users':
        return <Users />;
      case 'classes':
        return <Classes />;
      // Add more case blocks for new modules
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        {!selectedModule ? (
          <>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              fontWeight="bold"
              color="primary"
            >
              Admin Panel
            </Typography>

            <Grid container spacing={3} sx={{ mt: 2 }}>
              {modules.map((module) => (
                <Grid item xs={12} sm={6} md={3} key={module.value}>
                  <StyledCard onClick={() => setSelectedModule(module.value)}>
                    <CardActionArea>
                      <CardContent>
                        <Typography variant="h6" align="center">
                          {module.label}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography
  variant="button"
  sx={{
    backgroundColor: '#4caf50',  // green background
    color: '#fff',               // white text
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'inline-block',
    userSelect: 'none',
    fontWeight: 'bold',
    textAlign: 'center',
    '&:hover': {
      backgroundColor: '#43a047',  // slightly darker green on hover
    },
  }}
  onClick={() => setSelectedModule(null)}
>
   Back to Dashboard
</Typography>

            </Box>
            {renderSelectedComponent()}
          </>
        )}
      </Paper>
    </Box>
  );
};

export default AdminPanel;
