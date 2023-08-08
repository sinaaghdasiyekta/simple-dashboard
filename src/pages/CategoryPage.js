import { useState } from 'react';
// @mui
import { Button, Card, Collapse, Paper, Stack, Typography } from '@mui/material';
// components
import DashboardPageContainer from '../components/DashboardPageContainer';
import GridTable from '../components/GridTable';
import AddDrawer from '../components/AddDrawer';
import { CategoryForm } from '../sections/@dashboard/category';
import useAsync from '../hooks/useAsync';
import api from '../apis/api';

export default function UserPage() {
  const [voicesOpen, setVoicesOpen] = useState(false);
  const [initiallized, setInitiallized] = useState(false);
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [voicesToView, setVoicesToView] = useState([]);
  const [name, setName] = useState('');
  const [voices, setVoices] = useState([]);

  const columns = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'voices', label: 'Voices', alignRight: false },
  ];

  const resetValues = () => {
    setName('');
    setVoices([]);
  };

  const openDrawer = () => setAddDrawerOpen(true);
  const closeDrawer = () => {
    resetValues();
    setAddDrawerOpen(false);
  };

  const { loading } = useAsync(
    api.getCategories,
    [],
    [],
    true,
    !initiallized,
    true,
    (succeed, response) => {
      if (succeed) setCategories(response.data);
      setInitiallized(true);
    }
  );

  const { loading: creating, execute: onAddCategory } = useAsync(
    api.createCategory,
    [{ name, voices }],
    [name, voices],
    false,
    Boolean(name && voices),
    false,
    (succeed, response) => {
      if (succeed) {
        closeDrawer();
        setCategories([...categories, response.data]);
      }
    },
  );

  return (
    <DashboardPageContainer loading={loading} title="Category" onAddClick={openDrawer}>
      <Card>
        <GridTable
          data={categories}
          columns={columns}
          avatarModel="bauhaus"
          filterProperty="name"
          getCellsOfRow={({ name, voices }, index) => [name, voices.length > 0 ? (
            <Stack alignItems="flex-start" gap={1}>
              <Button key={index} color="inherit" size="small" onClick={() => {
                setVoicesToView(voices);
                setVoicesOpen(!voicesOpen);
              }}>
                <Typography sx={{ textDecoration: 'underline' }}>
                  {`${voices.length} Voice${voices.length > 1 ? 's' : ''}`}
                </Typography>
              </Button>

              <Collapse in={voicesToView.id === voices.id && voicesOpen}>
                {voicesToView.map(({ name, src, duration }, index) => (
                  <Paper key={index} sx={{ p: 1.5, bgcolor: 'background.neutral' }}>
                    <Stack gap={1}>
                      {[
                        { title: 'Name', value: name },
                        { title: 'Source', value: src },
                        { title: 'Duration', value: `${duration} minutes` }
                      ].map(({ title, value }, index) => (
                        <Stack key={index}>
                          <Typography variant="body2" color="text.secondary">
                            {title}
                          </Typography>
                          <Typography sx={{ wordBreak: 'break-all' }}>
                            {value}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Paper>
                ))}
              </Collapse>
            </Stack>
          ) : (
            <Typography color="text.disabled">
              No Voices
            </Typography>
          )].map((content) => ({ content, align: 'left' }))}
        />
      </Card>
  
      <AddDrawer open={addDrawerOpen} loading={creating} onClose={closeDrawer} title="Category" onSubmit={onAddCategory}>
        <CategoryForm
          name={name}
          voices={voices}
          onNameChange={(value) => setName(value)}
          onVoicesChange={(value) => setVoices(value)}
        />
      </AddDrawer>
    </DashboardPageContainer>
  );
}
