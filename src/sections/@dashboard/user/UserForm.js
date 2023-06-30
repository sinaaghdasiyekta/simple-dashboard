import { Stack, TextField } from '@mui/material';
import React from 'react'

const UserForm = () => {
  return (
    <Stack gap={2}>
      <TextField
        name="firstname"
        label="Firstname"
        // value={username}
        // onChange={(event) => setUsername(event.target.value)}
      />
      <TextField
        name="lastname"
        label="Lastname"
        // value={username}
        // onChange={(event) => setUsername(event.target.value)}
      />
      <TextField
        name="number"
        label="Phone Number"
        // value={username}
        // onChange={(event) => setUsername(event.target.value)}
      />
    </Stack>
  );
};

export default UserForm;