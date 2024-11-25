import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import Swal from "sweetalert2";

export default function EditMurid() {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    namaMurid: "",
    Kelas: "",
    Jurusan: "",
    Nisn: "",
    AsalSekolah: "",
  });

  // Fetch data to populate the form
  useEffect(() => {
    axios
      .get(`http://localhost:3030/murids/${id}`)
      .then((response) => {
        const data = response.data;

        // Normalisasi data dari API
        const normalizedData = {
          namaMurid: data.namaMurid || data.NamaMurid || "",
          Kelas: data.Kelas || data.kelas || "",
          Jurusan: data.Jurusan || data.jurusan || "",
          Nisn: data.Nisn || data.NISN || "",
          AsalSekolah: data.AsalSekolah || data["asal sekolah"] || "",
        };

        setFormData(normalizedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        Swal.fire("Error", "Failed to load data.", "error");
      });
  }, [id]);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3030/murids/${id}`, formData) // Update data by ID
      .then(() => {
        Swal.fire("Success", "Data updated successfully!", "success");
        navigate("/"); // Redirect to the main page after updating
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        Swal.fire("Error", "Failed to update data.", "error");
      });
  };

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Box
      sx={{
        padding: "24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f4f8",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "32px",
          borderRadius: "12px",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginBottom: "16px",
            fontWeight: "bold",
            textAlign: "center",
            color: "#1976d2",
          }}
        >
          Edit Data Murid
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Nama Murid"
            name="namaMurid"
            value={formData.namaMurid}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Kelas"
            name="Kelas"
            value={formData.Kelas}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Jurusan"
            name="Jurusan"
            value={formData.Jurusan}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="NISN"
            name="Nisn"
            value={formData.Nisn}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Asal Sekolah"
            name="AsalSekolah"
            value={formData.AsalSekolah}
            onChange={handleChange}
            required
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "24px" }}>
            <Button
              type="button"
              variant="outlined"
              color="error"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
