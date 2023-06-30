// @mui
import { Card } from '@mui/material';
// components
import DashboardPageContainer from '../components/DashboardPageContainer';
import GridTable from '../components/GridTable';

export default function UserPage() {

  return (
    <DashboardPageContainer title="Class">
      <Card>
        <GridTable />
      </Card>
    </DashboardPageContainer>
  );
}
