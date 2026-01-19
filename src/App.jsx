import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SkeletonTheme } from "react-loading-skeleton";
import { useSelector } from 'react-redux';


// Layout
import MainLayout from './layouts/MainLayout';

// pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import PasswordChange from './pages/Auth/PasswordChange';
import Homepage from './pages/Homepage';
import WelcomePage from './pages/WelcomePage';
import ApartmentInfo from './pages/ApartmentInfo';
import Bookmarks from './pages/Bookmarks';
import CreateNewListing from './pages/CreateNewListing';
import ListingInfo from './pages/ListingInfo';
import MyDashboard from './pages/MyDashboard';
import SearchResults from './pages/SearchResults';
import UserProfile from './pages/UserProfile';
import NotificationPage from './pages/NotificationPage';
import SupportPage from './pages/SupportPage';
import Report from './pages/Report';
import DeactivatedListingInfo from './pages/DeactivatedListingInfo';
import AboutUs from './pages/AboutUs';
import ListAnApartment from './pages/ListAnApartment';
import RegistrationVerificationPage from './pages/Auth/RegistrationVerificationPage';



function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="font-sans">
      <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
        <Router>
          <Routes>
            {/* Auth Section */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/change-password" element={<PasswordChange />} />
            <Route path="/auth-verification" element={<RegistrationVerificationPage />} />

            {/* Guest Landing */}
            <Route
              path="/"
              element={
                user
                  ? <Navigate to="/home" replace />
                  : <WelcomePage />
              }
            />

            {/* Main App Layout */}
            <Route element={<MainLayout />}>
              <Route path="/home" element={<Homepage />} />
              <Route path="/apartment/:id" element={<ApartmentInfo />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/create-listing" element={<CreateNewListing />} />
              <Route path="/listing/:id" element={<ListingInfo />} />
              <Route path="/deactivated-listing/:id" element={<DeactivatedListingInfo />} />
              <Route path="/dashboard" element={<MyDashboard />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/notifications" element={<NotificationPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/list-an-apartment" element={<ListAnApartment />} />
              <Route path="/report" element={<Report />} />
            </Route>

          </Routes>
        </Router>
      </SkeletonTheme>
    </div>
  );
}


export default App;
 