import { Box, Button, Drawer, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';
import React from 'react'
import useResponsive from '../hooks/useResponsive';

const AddDrawer = ({ title, open, loading, children, onClose, onSubmit }) => {
  const isMobile = useResponsive('down', 'sm');

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Stack p={3} gap={2} width={isMobile ? '100%' : 320} height="100%">
        <Typography variant="h5" fontWeight="fontWeightBold" mb={3}>
          {`Add a New ${title}`}
        </Typography>
        <Box>
          {children}
        </Box>
        <Box flexGrow={1} />
        <Stack direction="row" justifyContent="space-between">
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