import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/onboarding/Login";
import Features from "../pages/auth/features";
import Verify from "../pages/onboarding/Verify";
import Register from "../pages/onboarding/Register";
import Password from "../pages/onboarding/Password";
import PrivacyPolicy from "../pages/auth/PrivacyPolicy";
import ResetPassword from "../pages/auth/ResetPassword";
import ForgetPassword from "../pages/auth/ForgetPassword";
import TermCondition from "../pages/auth/TermCondition";
import Authenticated from "./Authenticated";
import ProfileCreation from "../pages/onboarding/ProfileCreation";
import Home from "../pages/dashboard/Home";
import Profile from "../pages/personal/Profile";
import CreateAccount from "../pages/onboarding/CreateAccount";
import AudioDetails from "../pages/dashboard/AudioDetails";
import Notification from "../pages/personal/Notification";
import Explore from "../pages/general/Explore";
import VideoDetails from "../pages/dashboard/VideoDetails";

const PrivateRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/features" element={<Features />} />
        <Route path="/verify-account" element={<Verify />} />
        <Route path="/get-started" element={<Register />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/create-password" element={<Password />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/terms-and-condition" element={<TermCondition />} />
        <Route path="/onboarding" element={<ProfileCreation />} />

        {/* Protected routes */}
        <Route element={<Authenticated />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/dashboard/listen/:id" element={<AudioDetails />} />
          <Route path="/dashboard/watch/:id" element={<VideoDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/explore" element={<Explore />} />
        </Route>

        {/* 404 page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PrivateRoutes;
