import { useState } from 'react';
// @mui
import { Card } from '@mui/material';
// components
import DashboardPageContainer from '../components/DashboardPageContainer';
import GridTable from '../components/GridTable';
import AddDrawer from '../components/AddDrawer';
import { UserForm } from '../sections/@dashboard/user';
import useAsync from '../hooks/useAsync';
import api from '../apis/api';

export default function UserPage() {
  const [initiallized, setInitiallized] = useState(false);
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const columns = [
    { id: 'full-name', label: 'Full Name', alignRight: false },
    { id: 'phone-number', label: 'Phone Number', alignRight: false },
    { id: 'telegram-id', label: 'Telegram ID', alignRight: false },
  ];

  const resetValues = () => {
    setName('');
    setPhone('');
  };
  
  const openDrawer = () => setAddDrawerOpen(true);
  const closeDrawer = () => {
    setAddDrawerOpen(false);
    resetValues();
  };

  const { loading } = useAsync(
    api.getUsers,
    [],
    [],
    true,
    !initiallized,
    true,
    (succeed, response) => {
      if (succeed) setUsers(response.data);
      setInitiallized(true);
    }
  );
  const { loading: creating, execute: onAddUser } = useAsync(
    api.createUser,
    [{ fullName: name, phoneNumber: phone }],
    [name, phone],
    false,
    Boolean(name && phone),
    false,
    (succeed, response) => {
      if (succeed) {
        closeDrawer();
        setUsers([...users, response.data]);
      }
    },
  );

  return (
    <DashboardPageContainer loading={loading} title="User" onAddClick={openDrawer}>

      <Card>
        <GridTable
          data={users}
          columns={columns}
          avatarModel="beam"
          filterProperty="fullName"
          getCellsOfRow={({ fullName, phoneNumber, telId }) => [fullName, phoneNumber, telId].map((content) => ({ content, align: 'left' }))}
        />
      </Card>
  
      <AddDrawer
        title="User"
        loading={creating}
        open={addDrawerOpen}
        onClose={closeDrawer}
        onSubmit={onAddUser}
      >
        <UserForm
          name={name}
          phone={phone}
          onNameChange={(value) => setName(value)}
          onPhoneChange={(value) => setPhone(value)}
        />
      </AddDrawer>
    </DashboardPageContainer>
  );
}
