import { Stack, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react'

const UserForm = ({ name, onNameChange, phone, onPhoneChange, telId, onTelIdChange }) => (
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
    <TextField
      name="id"
      type="number"
      label="Telegram ID"
      value={telId}
      InputProps={{ value: telId === null ? '' : telId }}
      onChange={(event) => onTelIdChange(event.target.value)}
    />
  </Stack>
);

UserForm.propTypes = {
  name: PropTypes.string,
  onNameChange: PropTypes.func,
  phone: PropTypes.number,
  onPhoneChange: PropTypes.func,
  telId: PropTypes.string,
  onTelIdChange: PropTypes.func,
};

export default UserForm;