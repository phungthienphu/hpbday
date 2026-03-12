import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import CodeInput from "./pages/CodeInput/CodeInput";
import Memories from "./pages/Memories/Memories";
import EventPage from "./pages/EventValentine";
import StartScreen from "./pages/EventValentine/StartScreen";
import LoginPage from "./pages/Auth/LoginPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import ItemsPage from "./pages/Items/ItemsPage";
import ItemForm from "./pages/Items/ItemForm";
import GroupsPage from "./pages/Groups/GroupsPage";
import GroupDetail from "./pages/Groups/GroupDetail";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Layout routes (header + shell) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route
          path="/code-input"
          element={
            <PrivateRoute>
              <CodeInput />
            </PrivateRoute>
          }
        />
        <Route
          path="/memories"
          element={
            <PrivateRoute>
              <Memories />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/items"
          element={
            <PrivateRoute>
              <ItemsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/items/new"
          element={
            <PrivateRoute>
              <ItemForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/groups"
          element={
            <PrivateRoute>
              <GroupsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/groups/:id"
          element={
            <PrivateRoute>
              <GroupDetail />
            </PrivateRoute>
          }
        />
      </Route>

      {/* Fullscreen routes (no header/shell) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/start-game" element={<StartScreen />} />
      <Route path="/event-page" element={<EventPage />} />
    </Routes>
  );
};

export default AppRoutes;
