import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function BasicSelect({options, label, onChange, ...props}) {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            {label}
          </InputLabel>
          <NativeSelect
            defaultValue={0}
            inputProps={{
              name: 'armor-type',
              id: 'uncontrolled-native',
            }}
            onChange={onChange}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
              ))}
          </NativeSelect>
        </FormControl>
      </Box>
    </ThemeProvider>
  );
}