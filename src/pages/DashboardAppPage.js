import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
// @mui
import { Grid, Container, Typography } from '@mui/material';
// sections
import { AppWidgetSummary } from '../sections/@dashboard/app';
import useAuth from '../hooks/useAuth';
import navConfig from '../layouts/dashboard/nav/config';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const { user } = useAuth();

  const COLOR = ['primary', 'warning', 'success'];
  const TOTAL = [1, 1, 1];

  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {`Welcome back ${user.displayName}!`}
        </Typography>

        <Grid container spacing={3}>
          {navConfig.filter(({ title }) => title !== 'dashboard').map(({ icon, path, title }, index) => (
            <Grid item key={index} xs={12} sm={4} component={Link} to={path} sx={{ textDecoration: 'none' }}>
              <AppWidgetSummary title={title} total={TOTAL[index]} icon={icon} color={COLOR[index]} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
