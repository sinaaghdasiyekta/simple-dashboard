import { Box, Button, Divider, Drawer, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';
import React from 'react'
import useResponsive from '../hooks/useResponsive';

const AddDrawer = ({ title, open, loading, children, onClose, onSubmit }) => {
  const isMobile = useResponsive('down', 'sm');

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Stack py={3} width={isMobile ? '100%' : 320} height="100%">
        <Typography px={2} variant="h5" fontWeight="fontWeightBold">
          {`Add a New ${title}`}
        </Typography>
        <Divider sx={{ mt: 3 }} />
        <Stack overflow="auto">
          <Stack pt={3} p={2}>
            {children}
          </Stack>
        </Stack>
        <Box flexGrow={1} />
        <Divider sx={{ mb: 3 }} />
        <Stack px={2} direction="row" justifyContent="space-between">
          <Button color="inherit" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton variant="contained" loading={loading} onClick={onSubmit}>
            Add
          </LoadingButton>
        </Stack>
      </Stack>
    </Drawer>
  );
};

AddDrawer.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  loading: PropTypes.bool,
  children: PropTypes.node,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default AddDrawer;