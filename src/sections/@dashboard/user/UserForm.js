import { Stack, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react'

const UserForm = ({ name, onNameChange, phone, onPhoneChange }) => (
  <Stack gap={4}>
    <TextField
      autoFocus
      name="name"
      label="Full Name"
      value={name}
      onChange={(event) => onNameChange(event.target.value)}
    />
    <TextField
      name="phone-number"
      label="Phone Number"
      value={phone}
      onChange={(event) => onPhoneChange(event.target.value)}
    />
  </Stack>
);

UserForm.propTypes = {
  name: PropTypes.string,
  onNameChange: PropTypes.func,
  phone: PropTypes.number,
  onPhoneChange: PropTypes.func,
};

export default UserForm;