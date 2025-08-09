
import { useState } from "react";


// Company culture data
const COMPANY_CULTURE = [
  {
    title: "Innovation First",
    description: "We embrace cutting-edge technology to solve healthcare challenges",
    icon: "",
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Impact Driven",
    description: "Every line of code and every decision directly improves lives",
    icon: "",
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Remote Friendly",
    description: "Work from anywhere while building the future of healthcare",
    icon: "",
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Growth Mindset",
    description: "Continuous learning and professional development opportunities",
    icon: "",
    color: "from-blue-500 to-blue-600"
  }
];

// Benefits data
const BENEFITS = [
  {
    category: "Health & Wellness",
    items: ["Comprehensive health insurance", "Mental health support", "Wellness stipend"],
    icon: ""
  },
  {
    category: "Work-Life Balance",
    items: ["Flexible working hours", "Unlimited PTO", "Remote work options"],
    icon: ""
  },
  {
    category: "Professional Growth",
    items: ["Learning budget", "Conference attendance", "Mentorship programs"],
    icon: ""
  },
  {
    category: "Financial",
    items: ["Competitive salary", "Equity options", "Performance bonuses"],
    icon: ""
  }
];

// Career opportunities data
const careerOpportunities = [
  {
    title: "Frontend Developer",
    location: "Remote / Onsite",
    type: "Full-time",
    department: "Engineering",
    
    description:
      "Build beautiful, scalable React interfaces for MediLink's healthcare platform. Collaborate with designers and backend engineers to deliver seamless user experiences.",
    requirements: [
      "Basic knowledge of React.js",
      "Strong CSS/Tailwind skills",
      "Experience with REST APIs",
      "Interest in healthcare tech"
    ],
    responsibilities: [
      "Develop responsive web applications",
      "Collaborate with UX/UI designers",
      "Optimize application performance",
      "Write clean, maintainable code"
    ],
    featured: true
  },
  {
    title: "Backend Engineer",
    location: "Remote / Onsite",
    type: "Full-time",
    department: "Engineering",
    
    description:
      "Design and implement robust backend services for patient data, appointments, and analytics. Work with Java, Spring Boot, and cloud platforms.",
    requirements: [
      "Basic Knowledge and understanding of Java/Spring Boot",
      "Database experience (SQL/NoSQL)",
      "API design and security best practices",
      "Healthcare data experience a plus"
    ],
    responsibilities: [
      "Design scalable backend systems",
      "Implement security best practices",
      "Optimize database performance",
      "Build RESTful APIs"
    ],
    featured: false
  },
  {
    title: "Healthcare Program Manager",
    location: "Onsite (Regional Offices)",
    type: "Full-time",
    department: "Operations",
    
    description:
      "Lead healthcare initiatives, coordinate with clinics and CHWs, and ensure MediLink's solutions meet real-world needs.",
    requirements: [
      "Experience managing healthcare programs",
      "Strong communication and leadership skills",
      "Knowledge of digital health solutions"
    ],
    responsibilities: [
      "Lead healthcare program implementation",
      "Coordinate with healthcare partners",
      "Monitor program effectiveness",
      "Train and support field teams"
    ],
    featured: true
  },
  {
    title: "Clinical Data Analyst",
    location: "Remote / Onsite",
    type: "Full-time / Contract",
    department: "Data Science",
    
    description:
      "Analyze patient and clinic data to improve outcomes and inform product development. Use modern analytics tools and collaborate with tech teams.",
    requirements: [
      "Experience with data analysis (Python, R, SQL)",
      "Healthcare analytics background",
      "Ability to communicate insights"
    ],
    responsibilities: [
      "Analyze healthcare data trends",
      "Create data visualizations",
      "Generate insights reports",
      "Support product decisions"
    ],
    featured: false
  },
  {
    title: "Community Health Worker (CHW)",
    location: "Onsite (Various Regions)",
    type: "Part-time / Full-time",
    department: "Community Health",
    
    description:
      "Support patients and clinics, deliver health education, and help implement MediLink's technology in the field.",
    requirements: [
      "Certified CHW or relevant experience",
      "Tech-savvy and adaptable",
      "Passion for community health"
    ],
    responsibilities: [
      "Provide community health services",
      "Use digital health tools",
      "Educate patients and families",
      "Report on health outcomes"
    ],
    featured: false
  },
  {
    title: "Product Designer",
    location: "Remote / Onsite",
    type: "Full-time",
    department: "Design",
    
    description:
      "Design intuitive healthcare interfaces that improve patient outcomes. Work closely with engineering and clinical teams.",
    requirements: [
      "3+ years UI/UX design experience",
      "Proficiency in Figma/Sketch",
      "Healthcare design experience preferred",
      "User research skills"
    ],
    responsibilities: [
      "Design user-centered interfaces",
      "Conduct user research",
      "Create design systems",
      "Collaborate with development teams"
    ],
    featured: true
  }
];

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedJobType, setSelectedJobType] = useState("All");
  const [expandedJob, setExpandedJob] = useState(null);

  const departments = ["All", "Engineering", "Operations", "Data Science", "Community Health", "Design"];
  const jobTypes = ["All", "Full-time", "Part-time", "Contract"];

  const filteredJobs = careerOpportunities.filter(job => {
    const departmentMatch = selectedDepartment === "All" || job.department === selectedDepartment;
    const typeMatch = selectedJobType === "All" || job.type.includes(selectedJobType);
    return departmentMatch && typeMatch;
  });

 
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
      
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
       
        
        <div className="relative max-w-6xl mx-auto text-center">
          
          
          <h1 className="text-6xl font-serif md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
              Build the Future of Healthcare
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto mb-10">
            Join MediLink and help transform healthcare with technology. We're building solutions that 
            connect underserved communities to life-saving healthcare across Africa.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={() => document.getElementById('open-positions').scrollIntoView({behavior: 'smooth'})}
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center justify-center">
                
                View Open Positions
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            <button className="border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300">
              Learn About Our Culture
            </button>
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-20 px-4 bg-blue-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-yellow-300 font-serif mb-4">Why Work With Us?</h2>
            <p className="text-xl text-white max-w-3xl mx-auto">
              We're more than just a tech company - we're a mission-driven team changing lives through innovation
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            {COMPANY_CULTURE.map((value, index) => (
              <div key={index} className="group text-center">
                <div className={` p-1 rounded-2xl shadow-xl `}>
                  <div className="bg-blue-50 rounded-xl p-6 h-full">
                    <h3 className="text-xl font-bold font-serif text-blue-800 mb-3">{value.title}</h3>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-blue-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-yellow-300 font-serif mb-4">Comprehensive Benefits</h2>
            <p className="text-xl text-white">We invest in our people because they invest in our mission</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BENEFITS.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <h3 className="text-xl font-bold text-blue-800 font-serif mb-4">{benefit.category}</h3>
                <ul className="space-y-2">
                  {benefit.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-gray-600">
                      <span className="text-blue-500 mr-2">✓</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-800 font-serif mb-4">Open Positions</h2>
            <p className="text-xl mb-8">Find your perfect role and start making an impact</p>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex gap-2">
                <span className="text-gray-600 font-medium">Department:</span>
                <select 
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:border-blue-500"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex gap-2">
                <span className="text-gray-600 font-medium">Type:</span>
                <select 
                  value={selectedJobType}
                  onChange={(e) => setSelectedJobType(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:border-blue-500"
                >
                  {jobTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Job Listings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredJobs.map((job, index) => (
              <div key={index} className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                {job.featured && (
                  <div className="bg-blue-800 text-white text-center py-2 text-sm font-semibold">
                     Featured Position
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 font-serif mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {job.department}
                        </span>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">{job.salary}</div>
                      <div className="text-sm text-gray-500">{job.experience}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium"> Location:</span> {job.location}
                    </div>
                    <div>
                      <span className="font-medium"> Type:</span> {job.type}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{job.description}</p>
                  
                  {expandedJob === index && (
                    <div className="space-y-4 mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Requirements:</h4>
                        <ul className="space-y-1">
                          {job.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-center text-gray-600 text-sm">
                              <span className="text-blue-500 mr-2">•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Responsibilities:</h4>
                        <ul className="space-y-1">
                          {job.responsibilities.map((resp, respIndex) => (
                            <li key={respIndex} className="flex items-center text-gray-600 text-sm">
                              <span className="text-blue-500 mr-2">•</span>
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setExpandedJob(expandedJob === index ? null : index)}
                      className="flex-1 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl font-semibold transition-all duration-300"
                    >
                      {expandedJob === index ? 'Show Less' : 'View Details'}
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No positions found</h3>
              <p className="text-gray-600">Try adjusting your filters or check back later for new opportunities</p>
            </div>
          )}
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-800 font-serif mb-4">Application Process</h2>
          <p className="text-xl mb-12">Simple, transparent, and focused on finding the right fit</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Apply", description: "Submit your application with resume and cover letter", icon: "" },
              { step: "2", title: "Review", description: "Our team reviews your application within 48 hours", icon: "" },
              { step: "3", title: "Interview", description: "Technical and cultural fit interviews", icon: "" },
              { step: "4", title: "Decision", description: "Quick decision and onboarding process", icon: "" }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {step.step}
                </div>
                <div className="text-2xl mb-2">{step.icon}</div>
                <h3 className="text-xl font-bold text-blue-700 font-serif mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
                
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-300 to-indigo-300 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-blue-950 relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold font-serif text-yellow-300 mb-6">Ready to Make an Impact?</h2>
          <p className="text-xl text-white mb-10 max-w-2xl mx-auto">
            Join our mission to transform healthcare delivery across Africa. 
            Your skills can save lives and build a healthier future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 transform hover:scale-105">
               Browse All Positions
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300">
               Contact Recruiting Team
            </button>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center font-bold text-white">
            <div className="flex items-center">
              
              <span>Remote-First Culture</span>
            </div>
            <div className="flex items-center">
              
              <span>Innovation Focused</span>
            </div>
            <div className="flex items-center">
              
              <span>Mission Driven</span>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Careers;
