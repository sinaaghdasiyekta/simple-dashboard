import React from 'react'
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
// @mui
import {
  Stack,
  Button,
  Container,
  Typography,
  Skeleton,
} from '@mui/material';
// components
import Iconify from './iconify';

const DashboardPageContainer = ({ children, title, onAddClick, loading }) => (
  <>
    <Helmet>
      <title> {title} </title>
    </Helmet>

    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Button variant="contained" onClick={onAddClick} startIcon={<Iconify icon="eva:plus-fill" />}>
          {`New ${title}`}
        </Button>
      </Stack>

      {loading ? (
        <Skeleton variant="rectangular" height={500} />
      ) : children}
    </Container>
  </>
);

DashboardPageContainer.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  onAddClick: PropTypes.func,
  loading: PropTypes.bool,
};

export default DashboardPageContainer;