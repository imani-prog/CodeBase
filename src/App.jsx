import BecomePartner from "./Pages/partners/BecomePartner.jsx";
import Sponsors from "./Pages/partners/Sponsors.jsx";
import Blog from "./Pages/resources/Blog.jsx";
import Support from "./Pages/resources/Support.jsx";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
// import About from "./Pages/About.jsx";
import AboutMediLink from "./Pages/about/AboutMediLink.jsx";
import Mission from "./Pages/about/Mission.jsx";
import Story from "./Pages/about/Story.jsx";
import Team from "./Pages/about/Team.jsx";
import Careers from "./Pages/Careers.jsx";
import Contact from "./Pages/Contact.jsx";
import Donate from "./Pages/Donate.jsx";
import FAQs from "./Pages/FAQs.jsx";
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
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/about/aboutmedilink" element={<AboutMediLink />} />
        <Route path="/about/story" element={<Story />} />
        <Route path="/about/team" element={<Team />} />
        <Route path="/about/mission" element={<Mission />} />
        <Route path="/services" element={<Services />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/faqs" element={<FAQs />} />
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
        <Route path="/blog" element={<Blog />} />
        <Route path="/support" element={<Support />} />
        <Route path="/careers" element={<Careers />} />
      </Routes>
    </Router>
  );
}

export default App;
