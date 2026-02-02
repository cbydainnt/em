import AdminLayout from '@/pages/admin/layout/AdminLayout';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery, useTheme, TablePagination } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatVND } from '@/utils';
import { Tabs, Tab } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import TopBuyChart from './TopBuyChart';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BarChartIcon from '@mui/icons-material/BarChart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function OrderTransactionReportPage() {
  const theme = useTheme();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [params, setParams] = useSearchParams();
  const [page, setPage] = useState<number>(Number(params.get('page') || '1'));
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/admin/orders/report');
      setData(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const top10Courses = data?.courses?.slice(0, 10)?.map((course: any) => ({
    name: course.course_name,
    paid_count: course.paid_count,
  }));

  const top10Combos = data?.combos?.slice(0, 10)?.map((combo: any) => ({
    name: combo.combo_name,
    paid_count: combo.paid_count,
  }));

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage + 1);
    setParams({ page: String(newPage + 1) });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(1);
    setParams({ page: '1' });
  };

  const pagedCourses = data?.courses?.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedCombos = data?.combos?.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pagedUsers = data?.users?.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <AdminLayout>
      <Box p={3}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Button
            className="border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
            startIcon={<ArrowBackIcon sx={{ fontSize: 18 }} />}
            onClick={() => navigate('/admin/manage/transactions')}
            sx={{
              whiteSpace: 'nowrap',
              minWidth: 'fit-content',
              fontSize: isMobile ? 12 : 14,
            }}
          >
            Quay lại
          </Button>
        </Box>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Báo cáo tổng hợp giao dịch
        </Typography>
        <Tabs value={tabIndex} onChange={(_, newValue) => setTabIndex(newValue)} sx={{ mb: 3 }}>
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
            label="Khóa học"
          />
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
            label="Combo"
          />
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
            label="Người mua"
          />
        </Tabs>

        {(tabIndex === 0 || tabIndex === 1) && (
          <Box display="flex" justifyContent="flex-start" mb={2}>
            <Button
              variant="outlined"
              size={isMobile ? 'small' : 'medium'}
              startIcon={<BarChartIcon />}
              onClick={() => setShowChart((prev) => !prev)}
              sx={{
                textTransform: 'none',
                borderColor: 'rgb(var(--border-default))',
                color: 'rgb(var(--text-primary))',
                '.dark &': {
                  borderColor: '#374151',
                  color: '#e5e7eb',
                },
              }}
            >
              {showChart ? 'Ẩn biểu đồ' : 'Hiển thị biểu đồ'}
            </Button>
          </Box>
        )}

        {/* ================= COURSE REPORT ================= */}
        {tabIndex === 0 && (
          <>
            {showChart && <TopBuyChart title="Top 10 khóa học theo số lượt mua" data={top10Courses} nameKey="name" />}

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
                <Table stickyHeader size={isMobile ? 'small' : 'medium'}>
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
                        Tên khóa học
                      </TableCell>
                      <TableCell
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
                        Giá gốc
                      </TableCell>
                      <TableCell
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
                        Đã thanh toán thành công
                      </TableCell>
                      <TableCell
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
                        Đã hủy
                      </TableCell>
                      <TableCell
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
                        Số voucher đã sử dụng
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 'bold',
                          textAlign: 'right',
                          whiteSpace: 'nowrap',
                          bgcolor: 'inherit',
                          '.dark &': {
                            borderBottomColor: '#374151',
                            color: '#d1d5db',
                          },
                        }}
                      >
                        Doanh thu
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={isMobile ? 5 : 9} align="center" sx={{ py: 10 }}>
                          <Typography className="dark:text-gray-300">Đang tải...</Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      pagedCourses?.map((row: any) => (
                        <TableRow key={row.course_id} hover className="dark:hover:bg-gray-700">
                          <TableCell className="dark:text-gray-200" sx={{ fontWeight: 'bold', maxWidth: 260, textAlign: 'left', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                            {row.course_name}
                          </TableCell>
                          <TableCell className="dark:text-gray-200" sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                            {row.original_course_price ? formatVND(row.original_course_price) : '-'}
                          </TableCell>
                          <TableCell className="dark:text-gray-200" sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                            {row.paid_count}
                          </TableCell>
                          <TableCell className="dark:text-gray-200" sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                            {row.cancelled_count}
                          </TableCell>
                          <TableCell className="dark:text-gray-200" sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                            {row.voucher_count}
                          </TableCell>
                          <TableCell className="dark:text-gray-200" sx={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                            {formatVND(row.revenue)}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={isMobile ? [5, 10, 20] : [10, 20, 50]}
                component="div"
                count={data?.courses?.length ?? 0}
                rowsPerPage={rowsPerPage}
                page={page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Số dòng:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
                className="dark:text-gray-200 dark:bg-gray-800"
                sx={{
                  '.dark &': {
                    color: '#d1d5db',
                    bgcolor: '#1f2937',
                    borderTop: '1px solid #374151',
                    '& .MuiTablePagination-selectIcon': {
                      color: '#9ca3af',
                    },
                    '& .MuiTablePagination-actions button': {
                      color: '#d1d5db',
                      '&:disabled': {
                        color: '#6b7280',
                      },
                    },
                    '& .MuiTablePagination-select': {
                      color: '#d1d5db',
                    },
                  },
                }}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        bgcolor: '#ffffff',
                        color: '#111827',

                        '.dark &': {
                          bgcolor: '#1f2937',
                          color: '#f3f4f6',
                        },

                        // hover item
                        '& .MuiMenuItem-root:hover': {
                          bgcolor: '#e5e7eb',
                        },
                        '.dark & .MuiMenuItem-root:hover': {
                          bgcolor: '#374151',
                        },

                        // selected item
                        '& .MuiMenuItem-root.Mui-selected': {
                          bgcolor: '#e0e7ff',
                        },
                        '.dark & .MuiMenuItem-root.Mui-selected': {
                          bgcolor: '#312e81',
                        },
                      },
                    },
                  },
                }}
              />
            </Paper>
          </>
        )}

        {/* ================= COMBO REPORT ================= */}
        {tabIndex === 1 && (
          <>
            {showChart && <TopBuyChart title="Top 10 combo theo số lượt mua" data={top10Combos} nameKey="name" />}

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
              <TableContainer sx={{ maxHeight: isMobile ? 400 : 600 }}>
                <Table stickyHeader size={isMobile ? 'small' : 'medium'}>
                  <TableHead
                    style={{
                      backgroundImage: 'linear-gradient(to right, #ede9fe, #fae8ff)',
                      position: 'sticky',
                      top: 0,
                      zIndex: 2,
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
                        Tên combo
                      </TableCell>
                      <TableCell
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
                        Giá gốc
                      </TableCell>
                      <TableCell
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
                        Đã thanh toán thành công
                      </TableCell>
                      <TableCell
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
                        Đã hủy
                      </TableCell>
                      <TableCell
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
                        Số voucher đã sử dụng
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 'bold',
                          textAlign: 'right',
                          whiteSpace: 'nowrap',
                          bgcolor: 'inherit',
                          '.dark &': {
                            borderBottomColor: '#374151',
                            color: '#d1d5db',
                          },
                        }}
                      >
                        Doanh thu
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          Đang tải...
                        </TableCell>
                      </TableRow>
                    ) : (
                      pagedCombos?.map((row: any) => (
                        <TableRow key={row.combo_id} hover className="dark:hover:bg-gray-700">
                          <TableCell className="dark:text-gray-200" sx={{ fontWeight: 'bold', textAlign: 'left', whiteSpace: 'wrap' }}>
                            {row.combo_name}
                          </TableCell>
                          <TableCell className="dark:text-gray-200" sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                            {row.original_combo_price ? formatVND(row.original_combo_price) : '-'}
                          </TableCell>
                          <TableCell className="dark:text-gray-200" sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                            {row.paid_count}
                          </TableCell>
                          <TableCell className="dark:text-gray-200" sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                            {row.cancelled_count}
                          </TableCell>
                          <TableCell className="dark:text-gray-200" sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                            {row.voucher_count}
                          </TableCell>
                          <TableCell className="dark:text-gray-200" sx={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                            {formatVND(row.revenue)}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={isMobile ? [5, 10, 20] : [10, 20, 50]}
                component="div"
                count={data?.combos?.length ?? 0}
                rowsPerPage={rowsPerPage}
                page={page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Số dòng:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
                className="dark:text-gray-200 dark:bg-gray-800"
                sx={{
                  '.dark &': {
                    color: '#d1d5db',
                    bgcolor: '#1f2937',
                    borderTop: '1px solid #374151',
                    '& .MuiTablePagination-selectIcon': {
                      color: '#9ca3af',
                    },
                    '& .MuiTablePagination-actions button': {
                      color: '#d1d5db',
                      '&:disabled': {
                        color: '#6b7280',
                      },
                    },
                    '& .MuiTablePagination-select': {
                      color: '#d1d5db',
                    },
                  },
                }}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        bgcolor: '#ffffff',
                        color: '#111827',

                        '.dark &': {
                          bgcolor: '#1f2937',
                          color: '#f3f4f6',
                        },

                        // hover item
                        '& .MuiMenuItem-root:hover': {
                          bgcolor: '#e5e7eb',
                        },
                        '.dark & .MuiMenuItem-root:hover': {
                          bgcolor: '#374151',
                        },

                        // selected item
                        '& .MuiMenuItem-root.Mui-selected': {
                          bgcolor: '#e0e7ff',
                        },
                        '.dark & .MuiMenuItem-root.Mui-selected': {
                          bgcolor: '#312e81',
                        },
                      },
                    },
                  },
                }}
              />
            </Paper>
          </>
        )}

        {/* ================= USER REPORT ================= */}
        {tabIndex === 2 && (
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
              <Table stickyHeader size={isMobile ? 'small' : 'medium'}>
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
                      Tên người dùng
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
                      Email
                    </TableCell>
                    <TableCell
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
                      Số điện thoại
                    </TableCell>
                    <TableCell
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
                      Khóa học
                    </TableCell>
                    <TableCell
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
                      Combo
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 'bold',
                        textAlign: 'left',
                        whiteSpace: 'nowrap',
                        width: 160,
                        maxWidth: 160,
                        bgcolor: 'inherit',
                        '.dark &': {
                          borderBottomColor: '#374151',
                          color: '#d1d5db',
                        },
                      }}
                    >
                      Doanh thu
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={isMobile ? 5 : 9} align="center" sx={{ py: 10 }}>
                        <Typography className="dark:text-gray-300">Đang tải...</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    pagedUsers?.map((row: any) => (
                      <TableRow key={row.user_id} hover className="dark:hover:bg-gray-700">
                        <TableCell className="dark:text-gray-200" sx={{ fontWeight: 'bold', maxWidth: 260, textAlign: 'left', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                          {row.name}
                        </TableCell>
                        <TableCell className="dark:text-gray-200" sx={{ textAlign: 'left', whiteSpace: 'nowrap' }}>
                          {row.email}
                        </TableCell>
                        <TableCell className="dark:text-gray-200" sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                          {row.phone}
                        </TableCell>
                        <TableCell className="dark:text-gray-200" sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                          {row.total_courses}
                        </TableCell>
                        <TableCell className="dark:text-gray-200" sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                          {row.total_combos}
                        </TableCell>
                        <TableCell className="dark:text-gray-200" sx={{ width: 160, maxWidth: 160, textAlign: 'left', whiteSpace: 'nowrap' }}>
                          {formatVND(row.revenue)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={isMobile ? [5, 10, 20] : [10, 20, 50]}
              component="div"
              count={data?.users?.length ?? 0}
              rowsPerPage={rowsPerPage}
              page={page - 1}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Số dòng:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
              className="dark:text-gray-200 dark:bg-gray-800"
              sx={{
                '.dark &': {
                  color: '#d1d5db',
                  bgcolor: '#1f2937',
                  borderTop: '1px solid #374151',
                  '& .MuiTablePagination-selectIcon': {
                    color: '#9ca3af',
                  },
                  '& .MuiTablePagination-actions button': {
                    color: '#d1d5db',
                    '&:disabled': {
                      color: '#6b7280',
                    },
                  },
                  '& .MuiTablePagination-select': {
                    color: '#d1d5db',
                  },
                },
              }}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    sx: {
                      bgcolor: '#ffffff',
                      color: '#111827',

                      '.dark &': {
                        bgcolor: '#1f2937',
                        color: '#f3f4f6',
                      },

                      // hover item
                      '& .MuiMenuItem-root:hover': {
                        bgcolor: '#e5e7eb',
                      },
                      '.dark & .MuiMenuItem-root:hover': {
                        bgcolor: '#374151',
                      },

                      // selected item
                      '& .MuiMenuItem-root.Mui-selected': {
                        bgcolor: '#e0e7ff',
                      },
                      '.dark & .MuiMenuItem-root.Mui-selected': {
                        bgcolor: '#312e81',
                      },
                    },
                  },
                },
              }}
            />
          </Paper>
        )}
      </Box>
    </AdminLayout>
  );
}
