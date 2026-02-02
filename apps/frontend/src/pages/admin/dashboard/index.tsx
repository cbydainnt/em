import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Tabs, Tab, Table, TableHead, TableRow, TableCell, TableBody, Typography, TableContainer, Paper, Stack, Card, CardContent, Button, CardActions, Grid, TextField, Switch, FormControlLabel } from '@mui/material';
import AdminLayout from '../layout/AdminLayout';
import MSystemDialog from './MSystemDialog';
import { IconEdit, IconTrash, IconRestore } from '@tabler/icons-react';

interface MSystemItem {
  id: number;
  param_key: string;
  param_no: string;
  param_name: string;
  param_value: string;
  del_flg: number;
}

const TABS = [
  { key: '1', label: 'Liên hệ', slug: 'Contact' },
  { key: '2', label: 'Cộng đồng', slug: 'Community' },
  { key: '5', label: 'Mạng xã hội', slug: 'Profile' },
  { key: '4', label: 'Chính sách', slug: 'Policy' },
];

export default function MSystemDashboard() {
  const [tabIndex, setTabIndex] = useState(0);
  const [data, setData] = useState<MSystemItem[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<MSystemItem | null>(null);
  const currentKey = TABS[tabIndex].key;
  const currentSlug = TABS[tabIndex].slug;
  const [showDeleted, setShowDeleted] = useState(false);

  const fetchData = async () => {
    const res = await axios.get(`/api/msystem/${currentSlug}`, {
      params: {
        deleted: showDeleted,
      },
    });
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [tabIndex, showDeleted]);

  const handleToggleDelete = async (item: MSystemItem) => {
    await axios.put(`/api/msystem/${item.id}/toggle`, {
      del_flg: item.del_flg === 0 ? 1 : 0,
    });
    fetchData();
  };

  return (
    <AdminLayout>
      <Box p={3}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Dashboard
        </Typography>

        <FormControlLabel control={<Switch checked={showDeleted} onChange={(e) => setShowDeleted(e.target.checked)} color="warning" />} label="Chỉ hiển thị đã xoá" sx={{ mb: 2 }} />

        <Tabs value={tabIndex} onChange={(_, v) => setTabIndex(v)} sx={{ mb: 3 }}>
          {TABS.map((t) => (
            <Tab
              sx={{
                color: '#1b1d20',
                '.dark &': {
                  color: '#e5e7eb',
                },
                '&.Mui-selected': {
                  color: '#60a5fa',
                },
              }}
              key={t.key}
              label={t.label}
            />
          ))}
        </Tabs>

        {tabIndex === 0 && data.length > 0 && (
          <Paper
            className="dark:bg-gray-800 shadow-lg overflow-hidden"
            sx={{
              borderRadius: 3,
              border: '1px solid',
              borderColor: '#e5e7eb',
              '.dark &': {
                borderColor: '#374151',
              },
            }}
          >
            <TableContainer
              sx={{
                bgcolor: '#ffffff',
                '.dark &': {
                  bgcolor: '#1f2937',
                },
              }}
            >
              <Table stickyHeader size="medium">
                <TableHead
                  sx={{
                    backgroundImage: 'linear-gradient(to right, #ede9fe, #fae8ff)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 2,
                    borderBottom: '2px solid #ddd6fe',
                    '.dark &': {
                      borderBottomColor: '#4c1d95',
                    },
                  }}
                  className="dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800"
                >
                  <TableRow className="dark:bg-gray-700">
                    <TableCell
                      sx={{
                        fontWeight: 'bold',
                        textAlign: 'left',
                        whiteSpace: 'nowrap',
                        bgcolor: 'inherit',
                        '.dark &': {
                          borderBottomColor: '#374151',
                          color: '#d1d5db',
                        },
                      }}
                    >
                      No
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 'bold',
                        textAlign: 'left',
                        whiteSpace: 'nowrap',
                        bgcolor: 'inherit',
                        '.dark &': {
                          borderBottomColor: '#374151',
                          color: '#d1d5db',
                        },
                      }}
                    >
                      Tên
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 'bold',
                        textAlign: 'left',
                        whiteSpace: 'nowrap',
                        bgcolor: 'inherit',
                        '.dark &': {
                          borderBottomColor: '#374151',
                          color: '#d1d5db',
                        },
                      }}
                    >
                      Nội dung
                    </TableCell>
                    <TableCell
                      width={120}
                      sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        bgcolor: 'inherit',
                        '.dark &': {
                          borderBottomColor: '#374151',
                          color: '#d1d5db',
                        },
                      }}
                    >
                      Thao tác
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item.id} hover className="dark:hover:bg-gray-700">
                      <TableCell className="dark:text-gray-200" sx={{ fontWeight: 'bold', maxWidth: 260, textAlign: 'left', whiteSpace: 'normal' }}>
                        {item.param_no}
                      </TableCell>
                      <TableCell className="dark:text-gray-200" sx={{ fontWeight: 'bold', maxWidth: 260, textAlign: 'left', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                        {item.param_name}
                      </TableCell>
                      <TableCell className="dark:text-gray-200" sx={{ maxWidth: 260, textAlign: 'left', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                        {item.param_value}
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                          {item.del_flg === 0 && (
                            <Box
                              onClick={() => {
                                setEditing(item);
                                setOpen(true);
                              }}
                              sx={{
                                width: 32,
                                height: 32,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: 'primary.main',
                              }}
                            >
                              <IconEdit size={20} />
                            </Box>
                          )}
                          <Box
                            onClick={() => handleToggleDelete(item)}
                            sx={{
                              width: 32,
                              height: 32,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              color: item.del_flg === 0 ? 'error.main' : 'success.main',
                            }}
                          >
                            {item.del_flg === 0 ? <IconTrash size={20} /> : <IconRestore size={20} />}
                          </Box>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {tabIndex === 1 && data.length > 0 && (
          <Paper
            className="dark:bg-gray-800 shadow-lg overflow-hidden"
            sx={{
              borderRadius: 3,
              border: '1px solid',
              borderColor: '#e5e7eb',
              '.dark &': {
                borderColor: '#374151',
              },
            }}
          >
            <TableContainer
              sx={{
                bgcolor: '#ffffff',
                '.dark &': {
                  bgcolor: '#1f2937',
                },
              }}
            >
              <Table stickyHeader size="medium">
                <TableHead
                  sx={{
                    backgroundImage: 'linear-gradient(to right, #ede9fe, #fae8ff)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 2,
                    borderBottom: '2px solid #ddd6fe',
                    '.dark &': {
                      borderBottomColor: '#4c1d95',
                    },
                  }}
                  className="dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800"
                >
                  <TableRow className="dark:bg-gray-700">
                    <TableCell
                      sx={{
                        fontWeight: 'bold',
                        textAlign: 'left',
                        whiteSpace: 'nowrap',
                        bgcolor: 'inherit',
                        '.dark &': {
                          borderBottomColor: '#374151',
                          color: '#d1d5db',
                        },
                      }}
                    >
                      No
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 'bold',
                        textAlign: 'left',
                        whiteSpace: 'nowrap',
                        bgcolor: 'inherit',
                        '.dark &': {
                          borderBottomColor: '#374151',
                          color: '#d1d5db',
                        },
                      }}
                    >
                      Tên
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 'bold',
                        textAlign: 'left',
                        whiteSpace: 'nowrap',
                        bgcolor: 'inherit',
                        '.dark &': {
                          borderBottomColor: '#374151',
                          color: '#d1d5db',
                        },
                      }}
                    >
                      Nội dung
                    </TableCell>
                    <TableCell
                      width={120}
                      sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        bgcolor: 'inherit',
                        '.dark &': {
                          borderBottomColor: '#374151',
                          color: '#d1d5db',
                        },
                      }}
                    >
                      Thao tác
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item.id} hover className="dark:hover:bg-gray-700">
                      <TableCell className="dark:text-gray-200" sx={{ fontWeight: 'bold', maxWidth: 260, textAlign: 'left', whiteSpace: 'normal' }}>
                        {item.param_no}
                      </TableCell>
                      <TableCell className="dark:text-gray-200" sx={{ fontWeight: 'bold', maxWidth: 260, textAlign: 'left', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                        {item.param_name}
                      </TableCell>
                      <TableCell className="dark:text-gray-200">{item.param_value}</TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                          {item.del_flg === 0 && (
                            <Box
                              onClick={() => {
                                setEditing(item);
                                setOpen(true);
                              }}
                              sx={{
                                width: 32,
                                height: 32,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: 'primary.main',
                              }}
                            >
                              <IconEdit size={20} />
                            </Box>
                          )}
                          <Box
                            onClick={() => handleToggleDelete(item)}
                            sx={{
                              width: 32,
                              height: 32,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              color: item.del_flg === 0 ? 'error.main' : 'success.main',
                            }}
                          >
                            {item.del_flg === 0 ? <IconTrash size={20} /> : <IconRestore size={20} />}
                          </Box>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {tabIndex === 2 && data.length > 0 && (
          <Paper
            className="dark:bg-gray-800 shadow-lg overflow-hidden"
            sx={{
              borderRadius: 3,
              border: '1px solid',
              borderColor: '#e5e7eb',
              '.dark &': {
                borderColor: '#374151',
              },
            }}
          >
            <TableContainer
              sx={{
                bgcolor: '#ffffff',
                '.dark &': {
                  bgcolor: '#1f2937',
                },
              }}
            >
              <Table stickyHeader size="medium">
                <TableHead
                  sx={{
                    backgroundImage: 'linear-gradient(to right, #ede9fe, #fae8ff)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 2,
                    borderBottom: '2px solid #ddd6fe',
                    '.dark &': {
                      borderBottomColor: '#4c1d95',
                    },
                  }}
                  className="dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800"
                >
                  <TableRow className="dark:bg-gray-700">
                    <TableCell
                      sx={{
                        fontWeight: 'bold',
                        textAlign: 'left',
                        whiteSpace: 'nowrap',
                        bgcolor: 'inherit',
                        '.dark &': {
                          borderBottomColor: '#374151',
                          color: '#d1d5db',
                        },
                      }}
                    >
                      No
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 'bold',
                        textAlign: 'left',
                        whiteSpace: 'nowrap',
                        bgcolor: 'inherit',
                        '.dark &': {
                          borderBottomColor: '#374151',
                          color: '#d1d5db',
                        },
                      }}
                    >
                      Tên
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 'bold',
                        textAlign: 'left',
                        whiteSpace: 'nowrap',
                        bgcolor: 'inherit',
                        '.dark &': {
                          borderBottomColor: '#374151',
                          color: '#d1d5db',
                        },
                      }}
                    >
                      Nội dung
                    </TableCell>
                    <TableCell
                      width={120}
                      sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        bgcolor: 'inherit',
                        '.dark &': {
                          borderBottomColor: '#374151',
                          color: '#d1d5db',
                        },
                      }}
                    >
                      Thao tác
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item.id} hover className="dark:hover:bg-gray-700">
                      <TableCell className="dark:text-gray-200" sx={{ fontWeight: 'bold', maxWidth: 260, textAlign: 'left', whiteSpace: 'normal' }}>
                        {item.param_no}
                      </TableCell>
                      <TableCell className="dark:text-gray-200" sx={{ fontWeight: 'bold', maxWidth: 260, textAlign: 'left', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                        {item.param_name}
                      </TableCell>
                      <TableCell className="dark:text-gray-200">{item.param_value}</TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                          {item.del_flg === 0 && (
                            <Box
                              onClick={() => {
                                setEditing(item);
                                setOpen(true);
                              }}
                              sx={{
                                width: 32,
                                height: 32,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: 'primary.main',
                              }}
                            >
                              <IconEdit size={20} />
                            </Box>
                          )}
                          <Box
                            onClick={() => handleToggleDelete(item)}
                            sx={{
                              width: 32,
                              height: 32,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              color: item.del_flg === 0 ? 'error.main' : 'success.main',
                            }}
                          >
                            {item.del_flg === 0 ? <IconTrash size={20} /> : <IconRestore size={20} />}
                          </Box>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {tabIndex === 3 && (
          <Card>
            <CardContent
              sx={{
                bgcolor: '#ffffff',
                '.dark &': {
                  bgcolor: '#1f2937',
                },
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tiêu đề chính sách"
                    InputProps={{
                      sx: {
                        backgroundColor: '#fff',
                        '.dark &': {
                          backgroundColor: '#1f2937',
                          color: '#f3f4f6',
                        },
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        '.dark &': {
                          color: '#9ca3af',
                        },
                      },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(var(--border-default))',
                      },

                      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(var(--border-focus))',
                      },

                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(var(--border-focus))',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={8}
                    label="Nội dung chính sách"
                    InputProps={{
                      sx: {
                        backgroundColor: '#fff',
                        '.dark &': {
                          backgroundColor: '#1f2937',
                          color: '#f3f4f6',
                        },
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        '.dark &': {
                          color: '#9ca3af',
                        },
                      },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(var(--border-default))',
                      },

                      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(var(--border-focus))',
                      },

                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(var(--border-focus))',
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <CardActions sx={{ pb: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={handleSave}
                  // disabled={loading}
                  sx={{
                    transition: 'transform 0.1s ease',
                    '&:active': {
                      transform: 'scale(0.97)',
                    },
                  }}
                >
                  Lưu thay đổi
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        )}
      </Box>
      <MSystemDialog open={open} editing={editing} paramKey={currentKey} onClose={() => setOpen(false)} onSuccess={fetchData} />
    </AdminLayout>
  );
}
