import { useState } from 'react';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Collapse, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { login, loading, error } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <form onSubmit={handleClick}>
      <Stack spacing={3}>
        <Collapse in={error.show}>
          <Alert severity="error">
            {error.text}
          </Alert>
        </Collapse>

        <Stack spacing={2}>
          <TextField
            name="email"
            label="Email address"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <TextField
            name="password"
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <LoadingButton fullWidth type="submit" size="large" variant="contained" loading={loading}>
          Login
        </LoadingButton>
      </Stack>
    </form>
  );
}
