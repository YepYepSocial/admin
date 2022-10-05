import React from 'react';
import {Backdrop, CircularProgress} from "@mui/material";

const AppLoader = ({ isOpen }) => {
  return (
    <Backdrop
      sx={{ color: '#1976d2', zIndex: 10 }}
      open={isOpen}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default AppLoader;
