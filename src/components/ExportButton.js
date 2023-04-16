import React from 'react';
import { Button } from '@mui/material';

export default function ExportButton({ onExport }) {
  return (
    <Button variant="contained" onClick={onExport}>
      Export
    </Button>
  );
}
