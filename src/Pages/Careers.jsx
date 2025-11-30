
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
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50 overflow-x-hidden">
      
      
      {/* Hero Section */}
      <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 overflow-hidden">
       
        
        <div className="relative max-w-6xl mx-auto text-center">
          
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold mb-4 sm:mb-6 leading-tight px-2">
            <span className="bg-blue-700  bg-clip-text text-transparent">
              Build the Future of Healthcare
            </span>
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-10 px-2">
            Join MediLink and help transform healthcare with technology. We're building solutions that 
            connect underserved communities to life-saving healthcare across Africa.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10 sm:mb-12 md:mb-16">
            <button 
              onClick={() => document.getElementById('open-positions').scrollIntoView({behavior: 'smooth'})}
              className="group bg-blue-600  text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                View Open Positions
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            <button className="border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg transition-all duration-300">
              Learn About Our Culture
            </button>
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 bg-blue-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-yellow-300 font-serif mb-3 sm:mb-4 px-2">Why Work With Us?</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-3xl mx-auto px-2">
              We're more than just a tech company - we're a mission-driven team changing lives through innovation
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {COMPANY_CULTURE.map((value, index) => (
              <div key={index} className="group text-center">
                <div className={` p-1 rounded-xl sm:rounded-2xl shadow-xl `}>
                  <div className="bg-blue-50 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 h-full">
                    <h3 className="text-lg sm:text-xl font-bold font-serif text-blue-800 mb-2 sm:mb-3">{value.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 bg-blue-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-yellow-300 font-serif mb-3 sm:mb-4 px-2">Comprehensive Benefits</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white px-2">We invest in our people because they invest in our mission</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {BENEFITS.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <h3 className="text-lg sm:text-xl font-bold text-blue-800 font-serif mb-3 sm:mb-4">{benefit.category}</h3>
                <ul className="space-y-1.5 sm:space-y-2">
                  {benefit.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start text-gray-600">
                      <span className="text-blue-500 mr-2 flex-shrink-0 text-sm sm:text-base">✓</span>
                      <span className="text-xs sm:text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-800 font-serif mb-3 sm:mb-4 px-2">Open Positions</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 px-2">Find your perfect role and start making an impact</p>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <div className="flex gap-2 items-center w-full sm:w-auto">
                <span className="text-gray-600 font-medium text-xs sm:text-sm">Department:</span>
                <select 
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-1 text-xs sm:text-sm focus:outline-none focus:border-blue-500 flex-1 sm:flex-initial"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex gap-2 items-center w-full sm:w-auto">
                <span className="text-gray-600 font-medium text-xs sm:text-sm">Type:</span>
                <select 
                  value={selectedJobType}
                  onChange={(e) => setSelectedJobType(e.target.value)}
                  className="border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-1 text-xs sm:text-sm focus:outline-none focus:border-blue-500 flex-1 sm:flex-initial"
                >
                  {jobTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Job Listings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {filteredJobs.map((job, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                {job.featured && (
                  <div className="bg-blue-800 text-white text-center py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-t-lg sm:rounded-t-xl flex items-center justify-center gap-1.5">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Featured Position
                  </div>
                )}
                
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-3 sm:mb-4 gap-3">
                    <div className="flex-1 w-full">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 font-serif mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2">
                        <span className="bg-blue-100 text-blue-700 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                          {job.department}
                        </span>
                        <span className="bg-blue-100 text-blue-700 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                          {job.type}
                        </span>
                      </div>
                    </div>
                    {(job.salary || job.experience) && (
                      <div className="text-left sm:text-right w-full sm:w-auto">
                        {job.salary && <div className="text-base sm:text-lg font-bold text-blue-600">{job.salary}</div>}
                        {job.experience && <div className="text-xs sm:text-sm text-gray-500">{job.experience}</div>}
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-medium">Location:</span> {job.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium">Type:</span> {job.type}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-xs sm:text-sm md:text-base mb-3 sm:mb-4">{job.description}</p>
                  
                  {expandedJob === index && (
                    <div className="space-y-3 sm:space-y-4 mb-3 sm:mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1.5 sm:mb-2 text-sm sm:text-base">Requirements:</h4>
                        <ul className="space-y-1">
                          {job.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-start text-gray-600 text-xs sm:text-sm">
                              <span className="text-blue-500 mr-2 flex-shrink-0">•</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1.5 sm:mb-2 text-sm sm:text-base">Responsibilities:</h4>
                        <ul className="space-y-1">
                          {job.responsibilities.map((resp, respIndex) => (
                            <li key={respIndex} className="flex items-start text-gray-600 text-xs sm:text-sm">
                              <span className="text-blue-500 mr-2 flex-shrink-0">•</span>
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button 
                      onClick={() => setExpandedJob(expandedJob === index ? null : index)}
                      className="flex-1 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-semibold transition-all duration-300"
                    >
                      {expandedJob === index ? 'Show Less' : 'View Details'}
                    </button>
                    <button className="flex-1 bg-blue-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 transform hover:scale-105">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredJobs.length === 0 && (
            <div className="text-center py-8 sm:py-10 md:py-12 px-4">
              
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">No positions found</h3>
              <p className="text-gray-600 text-sm sm:text-base">Try adjusting your filters or check back later for new opportunities</p>
            </div>
          )}
        </div>
      </section>

      {/* Application Process */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-800 font-serif mb-3 sm:mb-4 px-2">Application Process</h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-8 sm:mb-10 md:mb-12 px-2">Simple, transparent, and focused on finding the right fit</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { 
                step: "1", 
                title: "Apply", 
                description: "Submit your application with resume and cover letter", 
                icon: <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              },
              { 
                step: "2", 
                title: "Review", 
                description: "Our team reviews your application within 48 hours", 
                icon: <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              },
              { 
                step: "3", 
                title: "Interview", 
                description: "Technical and cultural fit interviews", 
                icon: <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              },
              { 
                step: "4", 
                title: "Decision", 
                description: "Quick decision and onboarding process", 
                icon: <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mx-auto mb-3 sm:mb-4">
                  {step.step}
                </div>
                <div className="flex justify-center mb-1 sm:mb-2">{step.icon}</div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-blue-700 font-serif mb-1.5 sm:mb-2">{step.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm px-2">{step.description}</p>
                
                {index < 3 && (
                  <div className="hidden md:block absolute top-6 sm:top-7 md:top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-300 to-indigo-300 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 bg-blue-950 relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-serif text-yellow-300 mb-4 sm:mb-6 px-2">Ready to Make an Impact?</h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-2">
            Join our mission to transform healthcare delivery across Africa. 
            Your skills can save lives and build a healthier future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Browse All Positions
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Recruiting Team
            </button>
          </div>
          
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center font-bold text-white text-xs sm:text-sm md:text-base">
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Remote-First Culture</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span>Innovation Focused</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Mission Driven</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
