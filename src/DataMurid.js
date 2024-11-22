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
import Swal from "sweetalert2";
import { Box, Button, Typography, IconButton, Tooltip, Grid } from "@mui/material";

// Custom styles for table cells
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: "linear-gradient(90deg, #42a5f5, #64b5f6)", // Darker blue gradient for header
    color: "#ffffff",
    fontWeight: "bold",
    textTransform: "uppercase",
    border: "none",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "#333333",
    border: "none",
  },
}));

// Custom styles for table rows
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "rgba(224, 247, 250, 0.6)", // Slightly darker background for odd rows
  },
  "&:nth-of-type(even)": {
    backgroundColor: "rgba(225, 245, 254, 0.8)", // Slightly darker for even rows
  },
  "&:hover": {
    background: "rgba(41, 182, 246, 0.15)", // Slightly darker hover effect
    transition: "background 0.3s ease",
  },
}));

export default function Dashboard() {
  const [murids, setMurids] = useState([]);
  const navigate = useNavigate();

  // Fetch data from the server
  useEffect(() => {
    axios
      .get("http://localhost:3030/murids")
      .then((response) => {
        if (response.data && response.data.murids) {
          setMurids(response.data.murids);
        } else if (Array.isArray(response.data)) {
          setMurids(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
          setMurids([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Delete murid by ID
  const deleteMurid = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the murid item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3030/murids/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "Murid has been deleted.", "success");
            setMurids((prevMurids) =>
              prevMurids.filter((murid) => murid.id !== id)
            );
          })
          .catch((error) => {
            console.error("Error deleting murid:", error);
            Swal.fire("Error!", "Failed to delete murid.", "error");
          });
      }
    });
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          padding: "24px",
          background: "linear-gradient(135deg, #bbdefb, #64b5f6)", // Darker gradient for the background
          minHeight: "100vh",
          color: "#333333",
        }}
      >
        <Grid container spacing={3} alignItems="center">
          {/* Title Section */}
          <Grid item xs={12} md={8}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                fontFamily: "'Roboto', sans-serif",
                background: "linear-gradient(90deg, #42a5f5, #64b5f6)", // Darker gradient for title
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              📋 Daftar Murid
            </Typography>
          </Grid>

          {/* Add Button */}
          <Grid item xs={12} md={4} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/tambah")}
              sx={{
                background: "linear-gradient(90deg, #42a5f5, #64b5f6)", // Darker gradient for button
                color: "#ffffff",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                "&:hover": { background: "linear-gradient(90deg, #2196f3, #42a5f5)" },
              }}
            >
              <AddCircleOutlineIcon />
              Tambah Murid
            </Button>
          </Grid>
        </Grid>

        {/* Table Section */}
        <TableContainer
          component={Paper}
          sx={{
            marginTop: "24px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Softer shadow
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>No</StyledTableCell>
                <StyledTableCell align="center">Nama Murid</StyledTableCell>
                <StyledTableCell align="center">Kelas</StyledTableCell>
                <StyledTableCell align="center">Jurusan</StyledTableCell>
                <StyledTableCell align="center">NISN</StyledTableCell>
                <StyledTableCell align="center">ASAL Sekolah</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              
              </TableRow>
            </TableHead>
            <TableBody>
              {murids.map((murid, index) => (
                <StyledTableRow key={murid.id}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center">{murid.namaMurid}</StyledTableCell>
                  <StyledTableCell align="center">{murid.Kelas}</StyledTableCell>
                  <StyledTableCell align="center">{murid.Jurusan}</StyledTableCell>
                  <StyledTableCell align="center">{murid.NISN}</StyledTableCell>
                  <StyledTableCell align="center">{murid.AsalSekolah}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() => navigate(`/EditMurid/${murid.id}`)}
                        sx={{ color: "#1976d2" }} // Slightly darker blue for edit
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => deleteMurid(murid.id)}
                        sx={{ color: "#455a64" }} // Darker gray for delete
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View Details">
                      <IconButton
                        onClick={() => navigate(`/view/${murid.id}`)}
                        sx={{ color: "#1976d2" }} // Slightly darker blue for view action
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
