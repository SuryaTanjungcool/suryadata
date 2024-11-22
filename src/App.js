import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import TambahMurid from "./TambahMurid";
import DataGuru from "./DataGuru";
import TambahGuru from "./TambahGuru";
import DataMurid from "./DataMurid";
import Editguru from "./Editguru";
import Editmurid from "./EditMurid";
import Navbar from "./component/Navbar"; // Navbar untuk navigasi tetap
import { Box } from "@mui/material";

// Halaman untuk rute yang tidak ditemukan
const NotFound = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#f8f8f8",
    }}
  >
    <h1>404</h1>
    <p>Halaman tidak ditemukan.</p>
  </Box>
);

// Layout untuk menggabungkan Navbar dengan konten utama
const Layout = ({ children }) => (
  <Box sx={{ display: "flex", minHeight: "100vh" }}>
    <Navbar />
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        backgroundColor: "#f4f4f4",
        padding: 3,
      }}
    >
      {children}
    </Box>
  </Box>
);

function App() {
  return (
    <Router>
      {/* Struktur Layout */}
      <Routes>
        {/* Rute Dashboard */}
        <Route
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/Dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        {/* Rute Murid */}
        <Route
          path="/TambahMurid"
          element={
            <Layout>
              <TambahMurid />
            </Layout>
          }
        />
        <Route
          path="/DataMurid"
          element={
            <Layout>
              <DataMurid />
            </Layout>
          }
        />
        <Route
          path="/Editmurid/:id"
          element={
            <Layout>
              <Editmurid />
            </Layout>
          }
        />

        {/* Rute Guru */}
        <Route
          path="/DataGuru"
          element={
            <Layout>
              <DataGuru />
            </Layout>
          }
        />
        <Route
          path="/TambahGuru"
          element={
            <Layout>
              <TambahGuru />
            </Layout>
          }
        />
        <Route
          path="/Editguru/:id"
          element={
            <Layout>
              <Editguru />
            </Layout>
          }
        />

        {/* Rute Tidak Ditemukan */}
        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
