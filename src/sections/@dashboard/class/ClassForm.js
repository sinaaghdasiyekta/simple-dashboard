import { Autocomplete, Avatar, ListItem, ListItemAvatar, ListItemText, Stack, TextField } from '@mui/material';
import React from 'react'
import { boringAvatarGenerator } from '../../../utils/boringAvatars';

const ClassForm = () => {
  return (
    <Stack gap={2}>
      <Autocomplete
        options={[{ firstname: 'Sina', lastname: 'Aghdasi', phonenumber: '+989123456789' }, { firstname: 'Parham', lastname: "Abhar", phonenumber: '+989123456789' }]}
        renderInput={(params) => <TextField {...params} />}
        getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
        renderOption={(props, { firstname, lastname, phonenumber }) => (
          <ListItem {...props}>
            <ListItemAvatar>
              <Avatar src={boringAvatarGenerator(`${firstname} ${lastname}`, 'beam')} />
            </ListItemAvatar>
            <ListItemText primary={`${firstname} ${lastname}`} secondary={phonenumber} />
          </ListItem>
        )}
      />
      <Autocomplete
        options={[{ name: 'Category 1' }, { name: 'Category 2' }]}
        renderInput={(params) => <TextField {...params} />}
        getOptionLabel={(option) => option.name}
        renderOption={(props, { name }) => (
          <ListItem {...props}>
            <ListItemAvatar>
              <Avatar src={boringAvatarGenerator(name, 'bauhaus')} />
            </ListItemAvatar>
            <ListItemText primary={name} />
          </ListItem>
        )}
      />
    </Stack>
  );
};

export default ClassForm;