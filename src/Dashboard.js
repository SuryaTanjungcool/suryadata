import React from "react";
import { Box, Typography, Card, CardContent, Button, Grid } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Navbar from "./component/Navbar";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <Box
        sx={{
          padding: 4,
          minHeight: "100vh",
          backgroundColor: "#f9fafb", // Light background color for a clean look
        }}
      >
        {/* Header */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "#333",
            marginBottom: 4,
            textAlign: "center",
            fontFamily: "'Roboto', sans-serif", // Sleek and modern font
            textShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle text shadow for depth
          }}
        >
          Dashboard Sekolah
        </Typography>

        {/* Grid for Cards */}
        <Grid container spacing={3} justifyContent="center">
          {/* Card for Murid */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "20px", // Rounded corners for modern design
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Larger shadow for more emphasis
                transition: "all 0.3s ease", // Smooth transition for hover
                "&:hover": {
                  transform: "scale(1.05)", // Slight scaling effect on hover
                  boxShadow: "0 6px 30px rgba(0, 0, 0, 0.15)", // More pronounced shadow on hover
                },
              }}
            >
              <CardContent sx={{ textAlign: "center", padding: 4 }}>
                <SchoolIcon
                  sx={{
                    fontSize: 60, // Larger icon for more impact
                    color: "#1976d2",
                    marginBottom: 3,
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                  Daftar Murid
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#555",
                    marginBottom: 3,
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                  }}
                >
                  Lihat atau tambah data murid yang terdaftar di sekolah.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#1976d2",
                    "&:hover": { backgroundColor: "#1565c0" },
                    marginRight: 2,
                  }}
                  onClick={() => navigate("/DataMurid")}
                >
                  Lihat Murid
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<AddIcon />}
                  onClick={() => navigate("/TambahMurid")}
                  sx={{
                    marginTop: 2,
                    borderColor: "#1976d2",
                    color: "#1976d2",
                    "&:hover": { borderColor: "#1565c0", color: "#1565c0" },
                  }}
                >
                  Tambah Murid
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Card for Guru */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "20px", // Rounded corners
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 30px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <CardContent sx={{ textAlign: "center", padding: 4 }}>
                <PeopleIcon
                  sx={{
                    fontSize: 60,
                    color: "#ff7043",
                    marginBottom: 3,
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                  Daftar Guru
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#555",
                    marginBottom: 3,
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                  }}
                >
                  Lihat atau tambah data guru yang mengajar di sekolah.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#ff7043",
                    "&:hover": { backgroundColor: "#e64a19" },
                    marginRight: 2,
                  }}
                  onClick={() => navigate("/DataGuru")}
                >
                  Lihat Guru
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<AddIcon />}
                  onClick={() => navigate("/TambahGuru")}
                  sx={{
                    marginTop: 2,
                    borderColor: "#ff7043",
                    color: "#ff7043",
                    "&:hover": { borderColor: "#e64a19", color: "#e64a19" },
                  }}
                >
                  Tambah Guru
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
