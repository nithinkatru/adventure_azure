// src/components/admin/AdminUsers.jsx
/*****************************************************************
 * AdminUsers.jsx
 * Black & Yellow Montserrat UI via AdminLayout
 *****************************************************************/
import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { getAdminUsers, deleteUser } from '../api';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);
  const [search, setSearch] = useState('');
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetId, setTargetId] = useState(null);

  // Fetch data
  const fetchData = async () => {
    setBusy(true);
    try {
      const data = await getAdminUsers();
      setUsers(data);
    } catch {
      setError('Failed to fetch users.');
    } finally {
      setBusy(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Delete
  const askDelete = (id) => {
    setTargetId(id);
    setConfirmOpen(true);
  };
  const doDelete = async () => {
    setConfirmOpen(false);
    if (targetId) {
      await deleteUser(targetId);
      fetchData();
    }
  };

  // Filter + paginate
  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );
  const slice = filtered.slice(page * rows, page * rows + rows);

  // Loading
  if (busy) {
    return (
      <AdminLayout title="Users">
        <Box sx={{ display: 'grid', placeItems: 'center', height: '60vh' }}>
          <CircularProgress sx={{ color: '#FFD700' }} />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Users">
      <Box sx={{ minHeight: '100vh', p: 3 }}>
        {/* Header */}
        <Toolbar disableGutters sx={{ mb: 2, justifyContent: 'space-between' }}>
          <Typography variant="h4" sx={{ mb: { xs: 1, sm: 0 } }}>
            Manage Users
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              placeholder="Search users…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#000' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#fff',
                  color: '#000',
                  borderRadius: 0,
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ccc',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#999',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#FFD700',
                },
              }}
            />

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                bgcolor: '#FFD700',
                color: '#000',
                borderRadius: 0,
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: '#FFCC33',
                },
              }}
            >
              Add User
            </Button>
          </Box>
        </Toolbar>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {/* Table */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Paper sx={{ width: '100%', maxWidth: 1000 }}>
            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#000' }}>
                    {['Name', 'Email', 'Role', 'Actions'].map((head) => (
                      <TableCell
                        key={head}
                        sx={{
                          color: '#FFF',
                          fontWeight: '600',
                          borderBottom: '1px solid #FFD700',
                        }}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {slice.map((u) => (
                    <TableRow
                      key={u._id}
                      sx={{
                        borderBottom: '1px solid #FFD700',
                        '&:hover': { backgroundColor: '#FAFAFA' },
                      }}
                    >
                      <TableCell>{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{u.role}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          sx={{
                            mr: 1,
                            borderRadius: '50%',
                            border: '1px solid #FFD700',
                            color: '#000',
                            backgroundColor: 'transparent',
                            '&:hover': {
                              backgroundColor: '#FFD70033',
                            },
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => askDelete(u._id)}
                          sx={{
                            borderRadius: '50%',
                            border: '1px solid #f44336',
                            color: '#f44336',
                            backgroundColor: 'transparent',
                            '&:hover': {
                              backgroundColor: '#f4433633',
                            },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {slice.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No users found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filtered.length}
              rowsPerPage={rows}
              page={page}
              onPageChange={(_, p) => setPage(p)}
              onRowsPerPageChange={(e) => {
                setRows(parseInt(e.target.value, 10));
                setPage(0);
              }}
              sx={{
                borderTop: '1px solid #FFD700',
                '& .MuiTablePagination-displayedRows': { color: '#000' },
                '& .MuiTablePagination-selectLabel': { color: '#000' },
                '& .MuiSelect-icon': { color: '#000' },
                '& .MuiInputBase-root': { color: '#000' },
                '& .MuiIconButton-root': { color: '#000' },
              }}
            />
          </Paper>
        </Box>

        {/* Confirm Delete Dialog */}
        <Dialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          PaperProps={{
            sx: {
              p: 2,
              borderRadius: 0,
              border: '1px solid #ccc',
            },
          }}
        >
          <DialogTitle sx={{ fontWeight: 'bold' }}>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this user?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setConfirmOpen(false)}
              sx={{
                borderRadius: 0,
                border: '1px solid #000',
                color: '#000',
                bgcolor: '#fff',
                '&:hover': {
                  bgcolor: '#f9f9f9',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={doDelete}
              sx={{
                borderRadius: 0,
                border: '1px solid #f44336',
                color: '#fff',
                bgcolor: '#f44336',
                '&:hover': {
                  bgcolor: '#e53935',
                },
              }}
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminLayout>
  );
}
