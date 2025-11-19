import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PhotoListPage from "../pages/PhotoListPage";
import PhotoDetailPage from "../pages/PhotoDetailPage";

export default function AppRouter() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Navigate to="/photos" />} />
        <Route path="/photos" element={<PhotoListPage />} />
        <Route path="/photos/:id" element={<PhotoDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
