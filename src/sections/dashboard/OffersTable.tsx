import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Alert,
  Box,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const tableHeadColumns = [
  { id: "user_name", label: "Name", minWidth: 170 },
  { id: "phone", label: "Phone Number", minWidth: 170 },
  { id: "company", label: "Company", minWidth: 170 },
  { id: "jobTitle", label: "Job Title", minWidth: 170 },
  { id: "type", label: "Type", minWidth: 170 },
  { id: "status", label: "Status", minWidth: 150 },
  { id: "actions", label: "Actions", minWidth: 150 },
];

const OffersTable = ({ data }: { data: any }) => {
  const getColor = (status: string) => {
    if (status === "accepted") {
      return "success";
    } else if (status === "pending") {
      return "warning";
    }
    return "error";
  };

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <TableContainer>
        <Table sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow>
              {tableHeadColumns.map((column) => (
                <TableCell key={column.id}>
                  {column.id === "actions" ? "" : column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              data.map((row: any) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {tableHeadColumns.map((column, index) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={index}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.id === "type" && (
                          <Typography
                            variant="body2"
                            textTransform="capitalize"
                          >
                            {value}
                          </Typography>
                        )}
                        {column.id === "actions" && (
                          <Stack direction="row">
                            <IconButton>
                              <EditIcon />
                            </IconButton>
                            <IconButton>
                              <MoreVertIcon />
                            </IconButton>
                          </Stack>
                        )}
                        {column.id === "status" && (
                          <Alert
                            severity={getColor(value)}
                            icon={false}
                            sx={{
                              textTransform: "capitalize",
                              fontWeight: "bold",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {value}
                          </Alert>
                        )}
                        {column.id !== "type" &&
                          column.id !== "status" &&
                          value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OffersTable;
