import { Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";

import Login from "./Pages/Auth/Login";

import Sector from "./Pages/Sector";
import SectorCreate from "./Pages/Sector/Create";
import SectorEdit from "./Pages/Sector/Edit";
import ProtectedRoute from "./Routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route
        path="/dashboard"
        exact
        element={
          <ProtectedRoute>
            <Sidebar>
              <Sector />
            </Sidebar>
          </ProtectedRoute>
        }
      />
      <Route
        path="/create"
        exact
        element={
          <ProtectedRoute>
            <Sidebar>
              <SectorCreate />
            </Sidebar>
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit/:id"
        exact
        element={
          <ProtectedRoute>
            <Sidebar>
              <SectorEdit />
            </Sidebar>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
