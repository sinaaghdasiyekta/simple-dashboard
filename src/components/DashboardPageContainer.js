import React from 'react'
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
// @mui
import {
  Stack,
  Button,
  Container,
  Typography,
} from '@mui/material';
// components
import Iconify from './iconify';

const DashboardPageContainer = ({ children, title }) => (
  <>
    <Helmet>
      <title> {title} </title>
    </Helmet>

    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
          {`New ${title}`}
        </Button>
      </Stack>

      {children}
    </Container>
  </>
);

DashboardPageContainer.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default DashboardPageContainer;