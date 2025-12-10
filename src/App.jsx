import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import OrganizersList from "./Pages/Admin/OrganizersList";
import CreateOrganizerProfile from "./Pages/Organizer/CreateOrganizerProfile";
import MyProfile from "./Pages/Organizer/MyProfile";
import UploadDocs from "./Pages/Organizer/UploadDocs";
import CreateEvent from "./Pages/Organizer/CreateEvent";

// Pages
import Home from "./Pages/Home";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import UpdateEvent from "./Pages/Organizer/UpdateEvent";
import OrganizerDashboard from "./Pages/Organizer/OrganizerDashboard";
import OrganizerEvents from "./Pages/Organizer/OrganizerEvents";
import MyProfileAttandee from "./Pages/Attandee/MyProfileAttandee";
import AttendeeHome from "./Pages/Attandee/AttandeeHome";
import BrowseEvents from "./Pages/Attandee/BrowseEvents";
import RegisteredEvents from "./Pages/Attandee/RegisteredEvents";
import MyTickets from "./Pages/Attandee/MyTickets";
import PreferencesPage from "./Pages/Attandee/PreferencePage";
import LoyaltyPoints from "./Pages/Attandee/LoyaltyPoints";
import PaymentSuccess from "./Pages/Attandee/PaymentSuccess";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/organizers"
            element={
              <ProtectedRoute role="admin">
                <OrganizersList />
              </ProtectedRoute>
            }
          />
          {/* ORGANIZER ROUTES */}
        <Route
          path="/organizer/create-profile"
          element={
            <ProtectedRoute role="organizer">
              <CreateOrganizerProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/organizer/profile"
          element={
            <ProtectedRoute role="organizer">
              <MyProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizer/upload-docs"
          element={
            <ProtectedRoute role="organizer">
              <UploadDocs />
            </ProtectedRoute>
          }
        />
          <Route
          path="/organizer/create-event"
          element={
            <ProtectedRoute role="organizer">
              <CreateEvent />
            </ProtectedRoute>
          }
          
        />
          <Route
          path="/organizer/event/:eventId"
          element={
            <ProtectedRoute role="organizer">
              <UpdateEvent />
            </ProtectedRoute>
          }
        /> 
        <Route
          path="organizer/dashboard"
          element={
            <ProtectedRoute role="organizer">
              <OrganizerDashboard />
            </ProtectedRoute>
          }
        /> 
          <Route
          path="organizer/myevents"
          element={
            <ProtectedRoute role="organizer">
              <OrganizerEvents />
            </ProtectedRoute>
          }
        /> 
         <Route
          path="/profile"
          element={
            <ProtectedRoute role="attendee">
              <MyProfileAttandee />
            </ProtectedRoute>
          }
        />
         <Route
          path="/events"
          element={
            <ProtectedRoute role="attendee">
      <AttendeeHome />
    </ProtectedRoute>
          }
        />
         <Route
          path="/attendee/events"
          element={
            <ProtectedRoute role="attendee">
      <BrowseEvents />
    </ProtectedRoute>
          }
        />
        <Route
          path="/attendee/my-events"
          element={
            <ProtectedRoute role="attendee">
      <RegisteredEvents />
    </ProtectedRoute>
          }
        />
          <Route
          path="/attendee/tickets"
          element={
            <ProtectedRoute role="attendee">
      <MyTickets />
    </ProtectedRoute>
          }
        />
          <Route
          path="/attendee/preferences"
          element={
            <ProtectedRoute role="attendee">
      <PreferencesPage />
    </ProtectedRoute>
          }
        />
        <Route
  path="/attendee/loyalty"
  element={
    <ProtectedRoute role="attendee">
      <LoyaltyPoints />
    </ProtectedRoute>
  }
/>
<Route path="/payment-success" element={<PaymentSuccess />} />


        {/* <Route
          path="/organizer/update-profile"
          element={
            <ProtectedRoute role="organizer">
              <UpdateProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/organizer/upload-docs"
          element={
            <ProtectedRoute role="organizer">
              <UploadDocs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/organizer/events"
          element={
            <ProtectedRoute role="organizer">
              <OrganizerEvents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/organizer/create-event"
          element={
            <ProtectedRoute role="organizer">
              <CreateEvent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/organizer/event/:id"
          element={
            <ProtectedRoute role="organizer">
              <EditEvent />
            </ProtectedRoute>
          }
        /> */}

        {/* Attendee Routes (uncomment when you add them)
        <Route
          path="/events"
          element={
            <ProtectedRoute role="attendee">
              <Events />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events/:id"
          element={
            <ProtectedRoute role="attendee">
              <EventDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute role="attendee">
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/loyalty"
          element={
            <ProtectedRoute role="attendee">
              <Loyalty />
            </ProtectedRoute>
          }
        />
        */}

        {/* Organizer Routes */}
        {/* <Route
          path="/organizer/dashboard"
          element={
            <ProtectedRoute role="organizer">
              <OrganizerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/organizer/create-event"
          element={
            <ProtectedRoute role="organizer">
              <CreateEvent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/organizer/upload-docs"
          element={
            <ProtectedRoute role="organizer">
              <UploadDocs />
            </ProtectedRoute>
          }
        />
        */}

        {/* Admin Routes */}
        {/* <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/events"
          element={
            <ProtectedRoute role="admin">
              <ManageEvents />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </>
  );
}

export default App;
