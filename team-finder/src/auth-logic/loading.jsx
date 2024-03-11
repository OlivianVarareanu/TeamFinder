import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import "./loading.css";


export default function CircularIndeterminate() {
  return (
    <div className='circular-wrapper-app'>
      <CircularProgress />
    </div>
  );
}