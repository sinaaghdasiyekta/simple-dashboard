import { useEffect, useState } from 'react';
// @mui
import { Card, Stack, Tooltip, Typography } from '@mui/material';
// components
import DashboardPageContainer from '../components/DashboardPageContainer';
import GridTable from '../components/GridTable';
import AddDrawer from '../components/AddDrawer';
import { ClassForm } from '../sections/@dashboard/class';
import useAsync from '../hooks/useAsync';
import api from '../apis/api';
import BoringAvatar from '../components/BoringAvatar';
import useAuth from '../hooks/useAuth';

export default function UserPage() {
  const { user } = useAuth();
  const [initiallized, setInitiallized] = useState(false);
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [code, setCode] = useState('');
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  const columns = [
    { id: 'code', label: 'Class Code', alignRight: false },
    { id: 'creator', label: 'Creator', alignRight: false },
    { id: 'users', label: 'Users', alignRight: false },
    { id: 'categories', label: 'Categories', alignRight: false },
  ];

  const { loading: loadingCategories, response: categoriesResponse } = useAsync(api.getCategories);
  const { loading: loadingUsers, response: usersResponse } = useAsync(api.getUsers);
  useEffect(() => {
    if (usersResponse) setUsers(usersResponse.data);
    if (categoriesResponse) setCategories(categoriesResponse.data);
  }, [usersResponse, categoriesResponse]);

  const resetValues = () => {
    setCode('');
    setSelectedUsers([]);
    setSelectedCategories([]);
  };

  const openDrawer = () => setAddDrawerOpen(true);
  const closeDrawer = () => {
    resetValues();
    setAddDrawerOpen(false);
  };

  const { loading } = useAsync(
    api.getClasses,
    [],
    [],
    true,
    !initiallized,
    true,
    (succeed, response) => {
      if (succeed) setClasses(response.data);
      setInitiallized(true);
    }
  );
  const { loading: creating, execute: onAddClass } = useAsync(
    api.createClass,
    [{
      code,
      createdBy: user.email,
      categoryIds: selectedCategories.map(({ _id }) => _id),
      userIds: selectedUsers.map(({ _id }) => _id),
    }],
    [code, selectedCategories, selectedUsers],
    false,
    Boolean(code && selectedCategories.length && selectedUsers.length),
    false,
    (succeed, response) => {
      if (succeed) {
        closeDrawer();
        setClasses([...classes, response.data]);
      }
    },
  );

  return (
    <DashboardPageContainer loading={loading} title="Class" onAddClick={openDrawer}>
      <Card>
        <GridTable
          data={classes}
          columns={columns}
          avatarModel="pixel"
          filterProperty="code"
          getCellsOfRow={({ code, createdBy, userIds, categoryIds }, index) => [code, createdBy, userIds?.length > 0 ? (
            <Stack direction="row" alignItems="flex-start" flexWrap="wrap" gap={0.25}>
              {users.filter(({ _id }) => userIds.includes(_id)).map(({ fullName }) => (
                <Tooltip key={index} title={fullName}>
                  <span>
                    <BoringAvatar
                      size={24}
                      name={fullName}
                      variant="beam"
                    />
                  </span>
                </Tooltip>
              ))}
            </Stack>
          ) : (
            <Typography color="text.disabled">
              No Users
            </Typography>
          ), categoryIds?.length > 0 ? (
            <Stack direction="row" alignItems="flex-start" flexWrap="wrap" gap={0.25}>
              {categories.filter(({ _id }) => categoryIds.includes(_id)).map(({ name }) => (
                <Tooltip key={index} title={name}>
                  <span>
                    <BoringAvatar
                      size={24}
                      name={name}
                      variant="bauhaus"
                    />
                  </span>
                </Tooltip>
              ))}
            </Stack>
          ) : (
            <Typography color="text.disabled">
              No Categories
            </Typography>
          )].map((content) => ({ content, align: 'left' }))}
        />
      </Card>
  
      <AddDrawer loading={creating} open={addDrawerOpen} onClose={closeDrawer} title="Class" onSubmit={onAddClass}>
        <ClassForm
          code={code}
          users={users}
          categories={categories}
          loadingUsers={loadingUsers}
          loadingCategories={loadingCategories}
          selectedUsers={selectedUsers}
          selectedCategories={selectedCategories}
          onCodeChange={(value) => setCode(value)}
          onUserSelect={(value) => setSelectedUsers(value)}
          onCategorySelect={(value) => setSelectedCategories(value)}
        />
      </AddDrawer>
    </DashboardPageContainer>
  );
}
