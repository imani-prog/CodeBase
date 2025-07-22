import BecomePartner from "./Pages/partners/BecomePartner.jsx";
import Sponsors from "./Pages/partners/Sponsors.jsx";
import Blog from "./Pages/resources/Blog.jsx";
import Support from "./Pages/resources/Support.jsx";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import Accessibility from "./Pages/Accessibility.jsx";
import DataProtection from "./Pages/DataProtection.jsx";
import GDPR from "./Pages/GDPR.jsx";
import Newsletter from "./Pages/Newsletter.jsx";
import Privacy from "./Pages/Privacy.jsx";
import Terms from "./Pages/Terms.jsx";
// import About from "./Pages/About.jsx";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about/aboutmedilink" element={<AboutMediLink />} />
        <Route path="/about/story" element={<Story />} />
        <Route path="/about/team" element={<Team />} />
        <Route path="/about/mission" element={<Mission />} />
        <Route path="/services" element={<Services />} />
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
      </Routes>
    </Router>
  );
}

export default App;
