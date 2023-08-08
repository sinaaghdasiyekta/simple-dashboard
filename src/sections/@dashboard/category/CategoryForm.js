import { Button, IconButton, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material';
import React from 'react'
import PropTypes from 'prop-types';
import Iconify from '../../../components/iconify/Iconify';

const CategoryForm = ({ name, onNameChange, voices, onVoicesChange }) => {

  const onAddVoice = () => onVoicesChange([
    ...voices,
    { name: `Voice ${voices.length + 1}`, duration: 2, src: '' }
  ]);

  const onVoiceFieldChange = (field, index, value) => {
    onVoicesChange(voices.map((voice, i) => index === i ? ({ ...voice, [field]: value }) : voice));
  };

  const removeVoice = (index) => {
    const newVoices = voices.filter((v, i) => i !== index);
    onVoicesChange(newVoices);
  };

  return (
    <Stack gap={4}>
      <TextField
        autoFocus
        name="category-name"
        label="Category Name"
        value={name}
        onChange={(event) => onNameChange(event.target.value)}
      />
      <Stack gap={2}>
        {voices.map(({ name, duration, src }, index) => (
          <Paper key={index} sx={{ p: 1.5, bgcolor: 'background.neutral' }}>
            <Stack gap={1}>
              <Stack alignItems="center" direction="row" justifyContent="space-between">
                <Typography variant="caption" color="text.secondary">
                  {`Voice ${index + 1}`}
                </Typography>
                <IconButton color="error" size="small" onClick={() => removeVoice(index)}>
                  <Iconify icon="ic:round-remove-circle-outline" />
                </IconButton>
              </Stack>
              <TextField
                size="small"
                name="name"
                label="Name"
                value={name}
                onChange={(event) => onVoiceFieldChange('name', index, event.target.value)}
              />
              <TextField
                size="small"
                name="source"
                label="Source"
                value={src}
                onChange={(event) => onVoiceFieldChange('src', index, event.target.value)}
              />
              <Select
                size="small"
                value={duration}
                placeholder="Duration"
                onChange={(event) => onVoiceFieldChange('duration', index, event.target.value)}
              >
                {[2, 5, 12].map((item) => (
                  <MenuItem key={item} value={item}>
                    {`${item} minutes`}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Paper>
        ))}
  
        {voices.length < 3 && (
          <Button
            onClick={onAddVoice}
            sx={{ alignSelf: 'flex-end' }}
          >
            Add a Voice
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

CategoryForm.propTypes = {
  name: PropTypes.string,
  onNameChange: PropTypes.func,
  voices: PropTypes.array,
  onVoicesChange: PropTypes.func,
};

export default CategoryForm;