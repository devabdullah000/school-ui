import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const NotificationPopup = ({ message, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open
      onClose={onClose}
      fullScreen={fullScreen}
      aria-labelledby="notification-dialog-title"
      PaperProps={{
        sx: {
          zIndex: 2000,
        },
      }}
    >
      <DialogTitle id="notification-dialog-title">Notification</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{message}</Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="contained" sx={{ backgroundColor: '#4caf50' }}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotificationPopup;
