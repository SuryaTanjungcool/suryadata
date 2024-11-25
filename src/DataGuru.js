import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from "./component/Navbar";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search"; // Importing Search Icon
import Swal from "sweetalert2";
import { Box, Button, Typography, IconButton, Tooltip, Grid, TextField, InputAdornment } from "@mui/material";

// Custom styles for table cells
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: "linear-gradient(90deg, #1e88e5, #42a5f5)",
    color: theme.palette.common.white,
    fontWeight: "bold",
    textTransform: "uppercase",
    border: "none",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: theme.palette.text.primary,
    border: "none",
  },
}));

// Custom styles for table rows
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.background.paper,
  },
  "&:hover": {
    background: "rgba(25, 118, 210, 0.1)",
    transition: "background 0.3s ease",
  },
}));

export default function Dashboard() {
  const [gurus, setGurus] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3030/gurus")
      .then((response) => {
        setGurus(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const deleteguru = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the guru item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3030/gurus/${id}`)
          .then(() => {
            setGurus(gurus.filter((guru) => guru.id !== id));
            Swal.fire("Deleted!", "Guru item has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
            Swal.fire("Failed!", "Could not delete guru item.", "error");
          });
      }
    });
  };

  // Filter gurus based on the search query
  const filteredGurus = gurus.filter((guru) =>
    guru.namaguru.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <Box
        sx={{
          padding: "24px",
          background: "linear-gradient(135deg, #bbdefb, #64b5f6)",
          minHeight: "100vh",
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                fontFamily: "'Roboto', sans-serif",
                background: "linear-gradient(90deg, #1e88e5, #42a5f5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textAlign: { xs: "center", sm: "left" }, // Center for small screens, left for larger
              }}
            >
              📃Daftar Guru📃
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/TambahGuru")}
              sx={{
                background: "linear-gradient(90deg, #1e88e5, #42a5f5)",
                color: "#ffffff",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                "&:hover": { background: "linear-gradient(90deg, #1565c0, #1e88e5)" },
              }}
            >
              <AddCircleOutlineIcon />
              Tambah Guru
            </Button>
          </Grid>
        </Grid>

        {/* Search Input with Search Icon */}
        <Box sx={{ marginTop: 3, textAlign: "center" }}>
          <TextField
            variant="outlined"
            fullWidth
            label="Search by Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ maxWidth: "500px", margin: "auto" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Table for displaying filtered data */}
        <TableContainer
          component={Paper}
          sx={{
            marginTop: "24px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "12px",
            overflowX: "auto", // Allow horizontal scrolling on smaller screens
          }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>No</StyledTableCell>
                <StyledTableCell align="center">Nama Guru</StyledTableCell>
                <StyledTableCell align="center">umur</StyledTableCell>
                <StyledTableCell align="center">mengajar pelajaran</StyledTableCell>
                <StyledTableCell align="center">pengalaman terakhir</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredGurus.map((guru, index) => (
                <StyledTableRow key={guru.id}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell align="center">{guru.namaguru}</StyledTableCell>
                  <StyledTableCell align="center">{guru.umur}</StyledTableCell>
                  <StyledTableCell align="center">{guru.mengajarpelajaran}</StyledTableCell>
                  <StyledTableCell align="center">{guru.pengalamanterakhir}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Tooltip title="Editguru">
                      <IconButton
                        onClick={() => navigate(`/Editguru/${guru.id}`)}
                        sx={{ color: "#1e88e5" }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => deleteguru(guru.id)}
                        sx={{ color: "#d32f2f" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View Details">
                      <IconButton
                        onClick={() => navigate(`/view/${guru.id}`)}
                        sx={{ color: "#1e88e5" }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
