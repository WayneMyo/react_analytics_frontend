import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';

export default function FileUpload({ onFileChange }) {
  const [fileName, setFileName] = useState('');

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileChange(file);
    }
  };

  return (
    <>
      <input
        accept="text/csv"
        style={{ display: 'none' }}
        id="contained-button-file"
        type="file"
        onChange={handleChange}
      />
      <Box display="flex" alignItems="center">
        <label htmlFor="contained-button-file">
          <Button variant="contained" component="span">
            Upload CSV
          </Button>
        </label>
        {fileName && (
          <Typography variant="body1" style={{ marginLeft: 10 }}>
            Selected file: {fileName}
          </Typography>
        )}
      </Box>
    </>
  );
}
