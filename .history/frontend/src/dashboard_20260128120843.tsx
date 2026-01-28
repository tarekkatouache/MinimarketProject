import React, { useState, useEffect, useCallback } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  IconButton,
  Tooltip,
  Chip,
  Alert,
  Skeleton,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  ShoppingCart as CartIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  Inventory as InventoryIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

// Type Definitions
export interface DashboardMetrics {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  salesGrowth: number;
  inventoryAlerts: number;
}

export interface SalesData {
  date: string;
  amount: number;
  orders: number;
}

export interface RecentOrder {
  id: string;
  customerName: string;
  amount: number;
  status: "pending" | "completed" | "cancelled";
  date: string;
  items: number;
}

export interface DashboardProps {
  title?: string;
  timeRange?: "today" | "week" | "month" | "year";
  showRefresh?: boolean;
  onRefresh?: () => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  metrics?: DashboardMetrics;
  salesData?: SalesData[];
  recentOrders?: RecentOrder[];
  onTimeRangeChange?: (range: DashboardProps["timeRange"]) => void;
  onOrderSelect?: (orderId: string) => void;
}

// Status color mapping
const statusColors = {
  pending: "warning",
  completed: "success",
  cancelled: "error",
} as const;

const Dashboard: React.FC<DashboardProps> = ({
  title = "Dashboard Overview",
  timeRange = "month",
  showRefresh = true,
  onRefresh,
  isLoading = false,
  error = null,
  metrics = {
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    salesGrowth: 0,
    inventoryAlerts: 0,
  },
  salesData = [],
  recentOrders = [],
  onTimeRangeChange,
  onOrderSelect,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange);

  // Handle refresh
  const handleRefresh = useCallback(async () => {
    if (!onRefresh || isRefreshing) return;

    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  }, [onRefresh, isRefreshing]);

  // Time range options
  const timeRanges: Array<{
    value: DashboardProps["timeRange"];
    label: string;
  }> = [
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "year", label: "This Year" },
  ];

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string): string => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  // Handle time range change
  const handleTimeRangeChange = (range: DashboardProps["timeRange"]) => {
    setSelectedTimeRange(range);
    onTimeRangeChange?.(range);
  };

  // Recent orders columns
  const orderColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "Order ID",
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: "medium" }}>
          #{params.value.slice(-6)}
        </Typography>
      ),
    },
    {
      field: "customerName",
      headerName: "Customer",
      width: 150,
    },
    {
      field: "date",
      headerName: "Date",
      width: 120,
      valueFormatter: (params) => formatDate(params.value),
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 120,
      valueFormatter: (params) => formatCurrency(params.value),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={statusColors[params.value as keyof typeof statusColors]}
          variant="outlined"
        />
      ),
    },
    {
      field: "items",
      headerName: "Items",
      width: 80,
    },
  ];

  // Metrics cards data
  const metricCards = [
    {
      title: "Total Sales",
      value: formatCurrency(metrics.totalSales),
      icon: <MoneyIcon />,
      color: "#4caf50",
      growth: metrics.salesGrowth,
      subtitle: `${selectedTimeRange} sales`,
    },
    {
      title: "Total Orders",
      value: metrics.totalOrders.toString(),
      icon: <CartIcon />,
      color: "#2196f3",
      subtitle: `${selectedTimeRange} orders`,
    },
    {
      title: "Total Customers",
      value: metrics.totalCustomers.toString(),
      icon: <PeopleIcon />,
      color: "#9c27b0",
      subtitle: "Registered customers",
    },
    {
      title: "Total Products",
      value: metrics.totalProducts.toString(),
      icon: <InventoryIcon />,
      color: "#ff9800",
      subtitle: "In inventory",
      alert: metrics.inventoryAlerts > 0,
    },
  ];

  if (isLoading && !isRefreshing) {
    return <DashboardSkeleton />;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {/* Time Range Selector */}
          <Box sx={{ display: "flex", gap: 1 }}>
            {timeRanges.map((range) => (
              <Chip
                key={range.value}
                label={range.label}
                onClick={() => handleTimeRangeChange(range.value)}
                color={
                  selectedTimeRange === range.value ? "primary" : "default"
                }
                variant={
                  selectedTimeRange === range.value ? "filled" : "outlined"
                }
                size="small"
              />
            ))}
          </Box>

          {/* Refresh Button */}
          {showRefresh && (
            <Tooltip title="Refresh Data">
              <IconButton
                onClick={handleRefresh}
                disabled={isRefreshing}
                color="primary"
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  "&:hover": { bgcolor: "primary.dark" },
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <strong>Error:</strong> {error}
        </Alert>
      )}

      {/* Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metricCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: "100%",
                position: "relative",
                overflow: "visible",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Box>
                    <Typography
                      color="textSecondary"
                      variant="body2"
                      gutterBottom
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{ fontWeight: "bold" }}
                    >
                      {isRefreshing ? "..." : card.value}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {card.subtitle}
                    </Typography>

                    {card.growth !== undefined && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", mt: 1 }}
                      >
                        <TrendingUpIcon
                          sx={{
                            fontSize: 16,
                            mr: 0.5,
                            color: card.growth >= 0 ? "#4caf50" : "#f44336",
                          }}
                        />
                        <Typography
                          variant="body2"
                          color={
                            card.growth >= 0 ? "success.main" : "error.main"
                          }
                        >
                          {card.growth >= 0 ? "+" : ""}
                          {card.growth}%
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: `${card.color}15`,
                      color: card.color,
                    }}
                  >
                    {card.icon}
                  </Box>
                </Box>

                {/* Alert Badge */}
                {card.alert && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      bgcolor: "#ff9800",
                      color: "white",
                      borderRadius: "50%",
                      width: 24,
                      height: 24,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <WarningIcon sx={{ fontSize: 14 }} />
                  </Box>
                )}
              </CardContent>

              {isRefreshing && (
                <LinearProgress
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                  }}
                />
              )}
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts and Data Grid */}
      <Grid container spacing={3}>
        {/* Sales Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Sales Trend
            </Typography>

            {salesData.length > 0 ? (
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) => formatDate(value)}
                  />
                  <YAxis />
                  <RechartsTooltip
                    formatter={(value) => [
                      formatCurrency(Number(value)),
                      "Sales",
                    ]}
                    labelFormatter={(label) => `Date: ${formatDate(label)}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#4caf50"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  color: "text.secondary",
                }}
              >
                <ErrorIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                <Typography>No sales data available</Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Recent Orders */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Recent Orders
            </Typography>

            {recentOrders.length > 0 ? (
              <Box sx={{ height: "90%" }}>
                <DataGrid
                  rows={recentOrders}
                  columns={orderColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
                  onRowClick={(params) => onOrderSelect?.(params.row.id)}
                  sx={{
                    border: "none",
                    "& .MuiDataGrid-cell:hover": {
                      cursor: "pointer",
                    },
                  }}
                  loading={isRefreshing}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  color: "text.secondary",
                }}
              >
                <CartIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                <Typography>No recent orders</Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Inventory Alerts */}
      {metrics.inventoryAlerts > 0 && (
        <Alert severity="warning" sx={{ mt: 3 }} icon={<InventoryIcon />}>
          <strong>Inventory Alert:</strong> {metrics.inventoryAlerts} product(s)
          are running low on stock.
        </Alert>
      )}

      {/* Loading overlay */}
      {isRefreshing && (
        <LinearProgress
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
          }}
        />
      )}
    </Box>
  );
};

// Skeleton Loader Component
const DashboardSkeleton: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Header Skeleton */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Skeleton variant="text" width={300} height={50} />
        <Skeleton variant="rectangular" width={200} height={40} />
      </Box>

      {/* Metrics Cards Skeleton */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[1, 2, 3, 4].map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item}>
            <Skeleton variant="rectangular" height={150} />
          </Grid>
        ))}
      </Grid>

      {/* Charts and Data Grid Skeleton */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Skeleton variant="rectangular" height={400} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Skeleton variant="rectangular" height={400} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
