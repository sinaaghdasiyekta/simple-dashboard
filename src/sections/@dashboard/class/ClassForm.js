import { Autocomplete, ListItem, ListItemAvatar, ListItemText, Stack, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react'
import BoringAvatar from '../../../components/BoringAvatar';

const ClassForm = ({
  code,
  users,
  categories,
  loadingUsers,
  loadingCategories,
  selectedUsers,
  selectedCategories,
  onCodeChange,
  onUserSelect,
  onCategorySelect,
}) => (
  <Stack gap={2}>
    <TextField
      autoFocus
      name="class-code"
      label="Class Code"
      value={code}
      onChange={(event) => onCodeChange(event.target.value)}
    />
    <Autocomplete
      multiple
      options={users}
      value={selectedUsers}
      onChange={(e, v) => onUserSelect(v)}
      loading={loadingUsers}
      renderInput={(params) => <TextField {...params} label="Users" />}
      getOptionLabel={(option) => option.fullName}
      renderOption={(props, { fullName, phoneNumber }) => (
        <ListItem {...props}>
          <ListItemAvatar>
            <BoringAvatar name={fullName} variant="beam" />
          </ListItemAvatar>
          <ListItemText primary={fullName} secondary={phoneNumber} />
        </ListItem>
      )}
    />
    <Autocomplete
      multiple
      options={categories}
      value={selectedCategories}
      onChange={(e, v) => onCategorySelect(v)}
      loading={loadingCategories}
      renderInput={(params) => <TextField {...params} label="Categories" />}
      getOptionLabel={(option) => option.name}
      renderOption={(props, { name, voices }) => (
        <ListItem {...props}>
          <ListItemAvatar>
            <BoringAvatar name={name} variant="bauhaus" />
          </ListItemAvatar>
          <ListItemText primary={name} secondary={`${voices.length || 'No' } Voices`} />
        </ListItem>
      )}
    />
  </Stack>
);
  
ClassForm.propTypes = {
  code: PropTypes.string,
  users: PropTypes.array,
  categories: PropTypes.array,
  loadingUsers: PropTypes.bool,
  loadingCategories: PropTypes.bool,
  selectedUsers: PropTypes.array,
  selectedCategories: PropTypes.array,
  onCodeChange: PropTypes.func,
  onUserSelect: PropTypes.func,
  onCategorySelect: PropTypes.func,
};

export default ClassForm;