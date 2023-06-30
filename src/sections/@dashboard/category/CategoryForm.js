import { Stack, TextField } from '@mui/material';
import React from 'react'

const CategoryForm = () => {
  return (
    <Stack gap={2}>
      <TextField
        name="category-name"
        label="Category Name"
        // value={username}
        // onChange={(event) => setUsername(event.target.value)}
      />
      <TextField
        name="first-link"
        label="First Link"
        // value={username}
        // onChange={(event) => setUsername(event.target.value)}
      />
      <TextField
        name="second-link"
        label="Second Link"
        // value={username}
        // onChange={(event) => setUsername(event.target.value)}
      />
      <TextField
        name="third-link"
        label="Third Link"
        // value={username}
        // onChange={(event) => setUsername(event.target.value)}
      />
    </Stack>
  );
};

export default CategoryForm;