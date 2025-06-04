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

const ConfirmationPopup = ({ message, confirmText = 'Confirm', onConfirm, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open
      onClose={onClose}
      fullScreen={fullScreen}
      aria-labelledby="confirmation-dialog-title"
      PaperProps={{
        sx: {
          zIndex: 2000, // ensure it stays above everything
        },
      }}
    >
      <DialogTitle id="confirmation-dialog-title">Confirmation</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{message}</Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined" sx={{ color: '#555', borderColor: '#ccc' }}>
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" sx={{ backgroundColor: '#4caf50' }}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationPopup;
