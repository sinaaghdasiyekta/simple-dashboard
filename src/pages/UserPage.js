import { useState } from 'react';
// @mui
import { Card } from '@mui/material';
// components
import DashboardPageContainer from '../components/DashboardPageContainer';
import GridTable from '../components/GridTable';
import AddDrawer from '../components/AddDrawer';
import { UserForm } from '../sections/@dashboard/user';

export default function UserPage() {
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);

  const openDrawer = () => setAddDrawerOpen(true);
  const closeDrawer = () => setAddDrawerOpen(false);

  const onAddUser = () => {};

  return (
    <DashboardPageContainer title="User" onAddClick={openDrawer}>
      <Card>
        <GridTable />
      </Card>
  
      <AddDrawer open={addDrawerOpen} onClose={closeDrawer} title="User" onSubmit={onAddUser}>
        <UserForm />
      </AddDrawer>
    </DashboardPageContainer>
  );
}
