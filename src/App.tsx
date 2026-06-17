import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { Layout } from "./components/layout/Layout";

import { HomePage } from "./pages/HomePage";
import { SpheresPage } from "./pages/SpheresPage";
import { ToolsPage } from "./pages/ToolsPage";
import { ResearchPage } from "./pages/ResearchPage";
import { ConversionTypesPage } from "./pages/ConversionTypesPage";
import { ResearchCategoriesPage } from "./pages/ResearchCategoriesPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage";
import { ProfilePage } from "./pages/ProfilePage";
import { MyPromptsPage } from "./pages/MyPromptsPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { CreatePromptPage } from "./pages/CreatePromptPage";

import CatalogPage from "./pages/CatalogPage";
import PromptDetailsPage from "./pages/PromptDetailsPage";
import { SearchResultsPage } from "./pages/SearchResultsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/home"
            element={<HomePage />}
          />

          <Route
            path="/directories/spheres"
            element={<SpheresPage />}
          />

          <Route
            path="/directories/tools"
            element={<ToolsPage />}
          />

          <Route
            path="/directories/conversion-types"
            element={
              <ConversionTypesPage />
            }
          />

          <Route
            path="/directories/research-categories"
            element={
              <ResearchCategoriesPage />
            }
          />

          <Route
            path="/research"
            element={<ResearchPage />}
          />

          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/register"
            element={
              <RegisterPage />
            }
          />

          <Route
            path="/forgot-password"
            element={
              <ForgotPasswordPage />
            }
          />

          <Route
            path="/profile"
            element={
              <ProfilePage />
            }
          />

          <Route
            path="/my-prompts"
            element={
              <MyPromptsPage />
            }
          />

          <Route
            path="/favorites"
            element={
              <FavoritesPage />
            }
          />

          <Route
            path="/"
            element={<CatalogPage />}
          />

          <Route
            path="/prompts/:id"
            element={<PromptDetailsPage />}
          />
          <Route
            path="/create-prompt"
            element={<CreatePromptPage />}
          />
          <Route
            path="/search"
            element={<SearchResultsPage />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;