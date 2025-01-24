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
import AllInsight from "../pages/dashboard/AllInsight";
import VoteTopic from "../pages/dashboard/VoteTopic";
import SubmitInsight from "../pages/dashboard/SubmitInsight";
import LiveDashboard from "../pages/dashboard/LiveDashboard";
import WeeklyTopic from "../pages/topics/WeeklyTopic";
import ChatHome from "../pages/chat/Home";
import Recent from "../pages/chat/Recent";
import Conversation from "../pages/chat/Conversation";
import Trending from "../pages/chat/Trending";
import AddAvatar from "../pages/onboarding/AddAvatar";
import CreateAccount from "../pages/onboarding/CreateAccount";

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
        {/* routes outside the sidebar or dashboard here */}
        <Route element={<Authenticated />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/all-insight" element={<AllInsight />} />
          <Route path="/vote-topic" element={<VoteTopic />} />
          <Route path="/insight/:id/:name" element={<SubmitInsight />} />
          <Route path="/live-dashboard/:id" element={<LiveDashboard />} />
          <Route path="/weekly-topic/:quizId" element={<WeeklyTopic />} />
          <Route path="/chat" element={<ChatHome />} />
          <Route path="/recent" element={<Recent />} />
          <Route path="/chat/:sessionId" element={<Conversation />} />
          <Route path="/trending-topics" element={<Trending />} />
          <Route path="/add-avatar" element={<AddAvatar />} />
        </Route>
        {/* routes outside the sidebar or dashboard ends here */}

        {/* 404 page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PrivateRoutes;
