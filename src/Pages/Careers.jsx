
const careerOpportunities = [
  {
    title: "Frontend Developer",
    location: "Remote / Onsite",
    type: "Full-time",
    description:
      "Build beautiful, scalable React interfaces for MediLink's healthcare platform. Collaborate with designers and backend engineers to deliver seamless user experiences.",
    requirements: [
      "2+ years experience with React.js",
      "Strong CSS/Tailwind skills",
      "Experience with REST APIs",
      "Interest in healthcare tech"
    ],
  },
  {
    title: "Backend Engineer",
    location: "Remote / Onsite",
    type: "Full-time",
    description:
      "Design and implement robust backend services for patient data, appointments, and analytics. Work with Node.js, Express, and cloud platforms.",
    requirements: [
      "3+ years experience with Node.js/Express",
      "Database experience (SQL/NoSQL)",
      "API design and security best practices",
      "Healthcare data experience a plus"
    ],
  },
  {
    title: "Healthcare Program Manager",
    location: "Onsite (Regional Offices)",
    type: "Full-time",
    description:
      "Lead healthcare initiatives, coordinate with clinics and CHWs, and ensure MediLink's solutions meet real-world needs.",
    requirements: [
      "Experience managing healthcare programs",
      "Strong communication and leadership skills",
      "Knowledge of digital health solutions"
    ],
  },
  {
    title: "Clinical Data Analyst",
    location: "Remote / Onsite",
    type: "Full-time / Contract",
    description:
      "Analyze patient and clinic data to improve outcomes and inform product development. Use modern analytics tools and collaborate with tech teams.",
    requirements: [
      "Experience with data analysis (Python, R, SQL)",
      "Healthcare analytics background",
      "Ability to communicate insights"
    ],
  },
  {
    title: "Community Health Worker (CHW)",
    location: "Onsite (Various Regions)",
    type: "Part-time / Full-time",
    description:
      "Support patients and clinics, deliver health education, and help implement MediLink's technology in the field.",
    requirements: [
      "Certified CHW or relevant experience",
      "Tech-savvy and adaptable",
      "Passion for community health"
    ],
  },
];

const Careers = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Careers at MediLink</h1>
      <p className="mb-8 text-gray-700">
        Join MediLink and help transform healthcare with technology. We offer opportunities for tech professionals, healthcare experts, and community leaders. Explore our open positions below:
      </p>
      <div className="space-y-8">
        {careerOpportunities.map((job, idx) => (
          <div key={idx} className="border rounded-lg p-6 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">{job.title}</h2>
            <div className="flex flex-wrap gap-4 mb-2 text-sm text-gray-600">
              <span><strong>Location:</strong> {job.location}</span>
              <span><strong>Type:</strong> {job.type}</span>
            </div>
            <p className="mb-2 text-gray-800">{job.description}</p>
            <ul className="list-disc ml-6 text-gray-700 mb-2">
              {job.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Careers;
