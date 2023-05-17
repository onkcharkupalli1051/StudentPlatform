import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import AdminHomePage from "./pages/AdminHomePage";
import { AdminProtectedRoute } from "./components/AdminProtectedRoute";
import { AdminPublicRoute } from "./components/AdminPublicRoute";
import PageNotFound from "./pages/PageNotFound";
import UserSchedule from "./pages/UserPages/UserSchedule";
import HabitReport from "./pages/UserPages/HabitReport";
import AssignCoordinator from "./pages/AdminPages/AssignCoordinator";
import ScheduleSession from "./pages/AdminPages/ScheduleSession";
import ReviewProgress from "./pages/AdminPages/ReviewProgress";
import AdminProfile from "./pages/AdminPages/AdminProfile";
import TrackProgress from "./pages/UserPages/TrackProgress";
import UserProfile from "./pages/UserPages/UserProfile";
import Room from "./pages/UserPages/Room";
import ManageUsers from "./pages/AdminPages/ManageUsers";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            {/* User Routes */}

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                  {/* <UserSchedule /> */}
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <PublicRoute>
                  <PageNotFound />
                </PublicRoute>
              }
            />
            <Route
              path="/userlogin"
              element={
                <PublicRoute>
                  <UserLogin />
                </PublicRoute>
              }
            />
            <Route
              path="/userregister"
              element={
                <PublicRoute>
                  <UserRegister />
                </PublicRoute>
              }
            />
            <Route
              path="/userschedule"
              element={
                <ProtectedRoute>
                  <UserSchedule />
                </ProtectedRoute>
              }
            />
            <Route
              path="/habitreport"
              element={
                <ProtectedRoute>
                  <HabitReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trackprogress"
              element={
                <ProtectedRoute>
                  <TrackProgress />
                </ProtectedRoute>
              }
            />
            <Route
              path="/userprofile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/room/:roomID"
              element={
                <ProtectedRoute>
                  <Room />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/adminhomepage"
              element={
                <AdminProtectedRoute>
                  <AdminHomePage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/adminregister"
              element={
                <AdminPublicRoute>
                  <AdminRegister />
                </AdminPublicRoute>
              }
            />
            <Route
              path="/adminlogin"
              element={
                <AdminPublicRoute>
                  <AdminLogin />
                </AdminPublicRoute>
              }
            />
            <Route
              path="/assigncoordinator"
              element={
                <AdminProtectedRoute>
                  <AssignCoordinator />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/manageusers"
              element={
                <AdminProtectedRoute>
                  <ManageUsers />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/schedulesession"
              element={
                <AdminProtectedRoute>
                  <ScheduleSession />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/reviewprogress"
              element={
                <AdminProtectedRoute>
                  <ReviewProgress />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/adminprofile"
              element={
                <AdminProtectedRoute>
                  <AdminProfile />
                </AdminProtectedRoute>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
