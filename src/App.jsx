import BecomePartner from "./Pages/partners/BecomePartner.jsx";
import Sponsors from "./Pages/partners/Sponsors.jsx";
import Blog from "./Pages/resources/Blog.jsx";
import Support from "./Pages/resources/Support.jsx";

import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import './App.css';
import { AuthProvider } from "./hooks/useAuth.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Unauthorized from "./Pages/Unauthorized.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import { clientRoutes } from "./routes/clientRoutes.jsx";
import { adminRoutes } from "./routes/adminRoutes.jsx";
import Accessibility from "./Pages/Accessibility.jsx";
import DataProtection from "./Pages/DataProtection.jsx";
import GDPR from "./Pages/GDPR.jsx";
import Newsletter from "./Pages/Newsletter.jsx";
import Privacy from "./Pages/Privacy.jsx";
import Terms from "./Pages/Terms.jsx";
import HospitalStyle from "./Components/HospitalStyle.jsx";
import Navbar from "./Components/Navbar.jsx";
import AboutMediLink from "./Pages/about/AboutMediLink.jsx";
import Mission from "./Pages/about/Mission.jsx";
import Story from "./Pages/about/Story.jsx";
import Team from "./Pages/about/Team.jsx";
import Careers from "./Pages/Careers.jsx";
import Contact from "./Pages/Contact.jsx";
import Donate from "./Pages/Donate.jsx";
import FrequentQuestions from "./Pages/FrequentQuestions.jsx";
import Home from "./Pages/Home.jsx";
import Partners from "./Pages/Partners.jsx";
import Services from "./Pages/Services.jsx";
import CHWs from "./Pages/services/CHWs.jsx";
import Clinics from "./Pages/services/Clinics.jsx";
import Patients from "./Pages/services/Patients.jsx";
import CHWsSolutions from "./Pages/solutions/CHWsSolutions.jsx";
import Hospitals from "./Pages/solutions/HospitalsSolutions.jsx";
import PatientsSolutions from "./Pages/solutions/PatientsSolutions.jsx";
import Tech from "./Pages/Tech.jsx";
import Testimonials from "./Pages/Testimonials.jsx";
import Footer from "./Components/Footer.jsx";
import LiveChatButton from "./Components/LiveChatButton.jsx";
import SecurityCompliance from "./Pages/resources/SecurityCompliance.jsx";
import DevelopersAPI from "./Pages/resources/DevelopersAPI.jsx";
import Training from "./Pages/resources/Training.jsx";
import Demo from "./Pages/services/Demo.jsx";

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Render the normal site navbar only on non-admin routes. AdminLayout renders its own AdminNavbar. */}
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about/aboutmedilink" element={<AboutMediLink />} />
        <Route path="/about/story" element={<Story />} />
        <Route path="/about/team" element={<Team />} />
        <Route path="/about/mission" element={<Mission />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/demo" element={<Demo />} />
        <Route path="/resources/training" element={<Training />} />
        <Route path="/resources/developers-api" element={<DevelopersAPI />} />
        <Route path="/resources/security-compliance" element={<SecurityCompliance />} />
        <Route path="/resources" element={<HospitalStyle />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/frequent-questions" element={<FrequentQuestions />} />
        <Route path="/tech" element={<Tech />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services/patients" element={<Patients />} />
        <Route path="/services/chws" element={<CHWs />} />
        <Route path="/services/clinics" element={<Clinics />} />
        <Route path="/solutions/patients" element={<PatientsSolutions />} />
        <Route path="/solutions/chws" element={<CHWsSolutions />} />
        <Route path="/solutions/hospitals" element={<Hospitals />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/support" element={<Support />} />
        <Route path="/partners/join" element={<BecomePartner />} />
        <Route path="/partners/sponsors" element={<Sponsors />} />
        <Route path="/careers" element={<Careers />} />

        {/* Footer legal/info pages */}
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/dataprotection" element={<DataProtection />} />
        <Route path="/gdpr" element={<GDPR />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/newsletter" element={<Newsletter />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Client portal (protected) */}
        <Route
          path="/client/*"
          element={
            <PrivateRoute role={["chw", "patient"]}>
              <Routes>
                {clientRoutes[0].children.map((route) => (
                  <Route key={route.path} path={route.path} element={route.element} />
                ))}
              </Routes>
            </PrivateRoute>
          }
        />

        {/* Admin portal (protected) */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute role="admin">
              {adminRoutes[0].element}
            </PrivateRoute>
          }
        >
          {adminRoutes[0].children.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>

      {!isAdminRoute && (
        <>
          <LiveChatButton />
          <Footer />
        </>
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;
