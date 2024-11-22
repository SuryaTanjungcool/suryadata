import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TambahMurid() {
  const [formData, setFormData] = useState({
    namaMurid: "",
    Kelas: "",
    Jurusan: "",
    Nisn: "",
    AsalSekolah: "",
  });

  const [loading, setLoading] = useState(false);  // Add loading state
  const [error, setError] = useState("");  // To handle errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset the error state on every submission attempt

    try {
      // Make the POST request to the backend API
      const response = await axios.post("http://localhost:3030/murids", formData);
      console.log("Data successfully added:", response.data);
      
      // Navigate to the dashboard after successful addition
      navigate("/"); 
    } catch (error) {
      console.error("Error adding data:", error);
      setError("Failed to add student. Please try again.");  // Set error message if the API call fails
    } finally {
      setLoading(false);  // Stop the loading spinner when the request is complete
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px",
        backgroundColor: "#f0f4f8",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
        Tambah Murid Baru
      </Typography>

      {/* Display error message if there's an error */}
      {error && (
        <Typography variant="body2" color="error" sx={{ marginBottom: "20px" }}>
          {error}
        </Typography>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          width: "400px",
          backgroundColor: "#fff",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <TextField
          label="Nama Murid"
          name="namaMurid"
          value={formData.namaMurid}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Kelas"
          name="Kelas"
          value={formData.Kelas}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Jurusan"
          name="Jurusan"
          value={formData.Jurusan}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="NISN"
          name="NISN"
          value={formData.Nisn}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Asal Sekolah"
          name="AsalSekolah"
          value={formData.AsalSekolah}
          onChange={handleChange}
          fullWidth
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#1565c0" },
          }}
          disabled={loading}  // Disable the button while the request is loading
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </Button>
      </Box>
    </Box>
  );
}
