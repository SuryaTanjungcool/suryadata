import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import Swal from "sweetalert2";

export default function Editguru() {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    namaguru: "",
    umur: "",
    mengajarpelajaran: "",
    pengalamanterakhir: "",
  });

  // Fetch data to populate the form
  useEffect(() => {
    axios
      .get(`http://localhost:3030/gurus/${id}`)
      .then((response) => {
        setFormData(response.data); // Populate the form with the current data
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
      .put(`http://localhost:3030/gurus/${id}`, formData) // Update data by ID
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
          Update Guru Data
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Nama Guru"
            name="namaguru"
            value={formData.namaguru}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="umur"
            name="umur"
            value={formData.umur}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="mengajar pelajaran"
            name="mengajar pelajaran"
            value={formData.mengajarpelajaran}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="pengalaman terakhir"
            name="pengalaman terakhir"
            value={formData.pengalamanterakhir}
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
