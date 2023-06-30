import { useState } from 'react';
// @mui
import { Card } from '@mui/material';
// components
import DashboardPageContainer from '../components/DashboardPageContainer';
import GridTable from '../components/GridTable';
import AddDrawer from '../components/AddDrawer';
import { ClassForm } from '../sections/@dashboard/class';

export default function UserPage() {
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);

  const openDrawer = () => setAddDrawerOpen(true);
  const closeDrawer = () => setAddDrawerOpen(false);

  const onAddClass = () => {};

  return (
    <DashboardPageContainer title="Class" onAddClick={openDrawer}>
      <Card>
        <GridTable />
      </Card>
  
      <AddDrawer open={addDrawerOpen} onClose={closeDrawer} title="Class" onSubmit={onAddClass}>
        <ClassForm />
      </AddDrawer>
    </DashboardPageContainer>
  );
}
