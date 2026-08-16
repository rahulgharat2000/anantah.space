import { Navigate, Route, Routes } from "react-router-dom";
import { CatalogPage } from "../../features/catalog/CatalogPage";
import { HomePage } from "../../features/home/HomePage";
import { FashionLayout } from "../layouts/FashionLayout";

export function FashionRouter() {
  return (
    <Routes>
      <Route element={<FashionLayout />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="*" element={<Navigate to="." replace />} />
      </Route>
    </Routes>
  );
}