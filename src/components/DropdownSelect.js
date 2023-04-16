import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function DropdownSelect({ label, options, value, onChange }) {
  return (
    <FormControl fullWidth style={{ margin: '1rem 0' }}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
