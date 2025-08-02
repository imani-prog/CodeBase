
import KenyattaLogo from "../assets/Kenyatta hospital.jpeg";
import MamaLucyLogo from "../assets/Lucy.jpg";
import MinistryLogo from "../assets/MinistryOfHealth.png";
import RedcrossLogo from "../assets/kenya-red-cross-seeklogo.png";
import NHIFLogo from "../assets/nhif-seeklogo.png";
import SHAlogo from "../assets/sha-social-health-authority-seeklogo.png";


// Partner categories for better organization
const PARTNER_CATEGORIES = {
  INSURANCE: "Insurance Providers",
  GOVERNMENT: "Government Agencies", 
  HEALTHCARE: "Healthcare Facilities",
  HUMANITARIAN: "Humanitarian Organizations"
};

// Enhanced partner data with categories
const PARTNERS_DATA = [
  {
    id: 1,
    name: "NHIF",
    fullName: "National Hospital Insurance Fund",
    logo: NHIFLogo,
    category: PARTNER_CATEGORIES.INSURANCE,
    description: "Kenya's leading public health insurance provider, enabling millions of citizens to access affordable healthcare services in both public and private facilities nationwide.",
    services: ["Health Insurance", "Claims Processing", "Provider Network"],
    established: "1966",
    coverage: "17M+ Members"
  },
  {
    id: 2,
    name: "SHA",
    fullName: "Social Health Authority",
    logo: SHAlogo,
    category: PARTNER_CATEGORIES.INSURANCE,
    description: "Kenya's new insurance provider, focused on universal health coverage and financial protection for all citizens. SHA partners with MediLink to streamline claims, payments, and access to essential health services.",
    services: ["Universal Health Coverage", "Digital Payments", "Health Finance"],
    established: "2023",
    coverage: "Universal Coverage"
  },
  {
    id: 3,
    name: "Kenya Red Cross",
    fullName: "Kenya Red Cross Society",
    logo: RedcrossLogo,
    category: PARTNER_CATEGORIES.HUMANITARIAN,
    description: "A humanitarian organization providing emergency medical services, disaster response, and ambulance support. As a MediLink partner, Red Cross ensures rapid response and lifesaving care in critical situations.",
    services: ["Emergency Response", "Ambulance Services", "Disaster Relief"],
    established: "1965",
    coverage: "Nationwide Emergency"
  },
  {
    id: 4,
    name: "Ministry of Health",
    fullName: "Ministry of Health Kenya",
    logo: MinistryLogo,
    category: PARTNER_CATEGORIES.GOVERNMENT,
    description: "Sets national health policy, standards, and regulations. Through collaboration with MediLink, the Ministry advances digital health, public health outreach, and quality care for all Kenyans.",
    services: ["Policy Development", "Health Regulation", "Public Health"],
    established: "1963",
    coverage: "National Oversight"
  },
  {
    id: 5,
    name: "Mama Lucy Hospital",
    fullName: "Mama Lucy Kibaki Hospital",
    logo: MamaLucyLogo,
    category: PARTNER_CATEGORIES.HEALTHCARE,
    description: "A leading public hospital in Nairobi, providing outpatient, inpatient, and emergency services. As a MediLink partner, Mama Lucy Hospital expands access to quality care for urban and peri-urban communities.",
    services: ["Emergency Care", "Outpatient Services", "Specialized Treatment"],
    established: "2012",
    coverage: "500+ Beds"
  },
  {
    id: 6,
    name: "Kenyatta Hospital",
    fullName: "Kenyatta National Hospital",
    logo: KenyattaLogo,
    category: PARTNER_CATEGORIES.HEALTHCARE,
    description: "Kenya's largest referral and teaching hospital, offering specialized medical care, research, and training. Partnering with MediLink, Kenyatta Hospital supports advanced healthcare delivery and innovation.",
    services: ["Specialized Care", "Medical Research", "Teaching Hospital"],
    established: "1901",
    coverage: "2000+ Beds"
  }
];

const Partners = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
      
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 bg-clip-text text-transparent">
              Our Strategic Partners
            </span>
            
          </h1>
          
          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto mb-12">
            MediLink connects a diverse network of partners—including hospitals, insurance providers, 
            government agencies, and humanitarian organizations—through a unified digital health platform. 
            Together, we're transforming healthcare delivery across Kenya.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center justify-center">
                 Become a Partner
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            <button className="border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300">
               Partnership Benefits
            </button>
          </div>
        </div>
      </section>

      {/* Partnership Impact Stats */}
      <section className="py-16 px-4 bg-blue-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center group">
              <div className="bg-white backdrop-blur rounded-2xl p-6 hover:bg-white/90 transition-all duration-300 transform hover:scale-105 border border-blue-100">
                <div className="text-3xl text-blue-700 font-bold mb-2">50+</div>
                <div className="text-lg text-blue-900 font-semibold mb-1">Active Partners</div>
                <div className="text-sm text-gray-600">Across all sectors</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white backdrop-blur rounded-2xl p-6 hover:bg-white/90 transition-all duration-300 transform hover:scale-105 border border-blue-100">
                <div className="text-3xl text-blue-700 font-bold mb-2">20M+</div>
                <div className="text-lg text-blue-900 font-semibold mb-1">Lives Covered</div>
                <div className="text-sm text-gray-600">Through our network</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white backdrop-blur rounded-2xl p-6 hover:bg-white/90 transition-all duration-300 transform hover:scale-105 border border-blue-100">
                <div className="text-3xl text-blue-700 font-bold mb-2">24/7</div>
                <div className="text-lg text-blue-900 font-semibold mb-1">Support Network</div>
                <div className="text-sm text-gray-600">Emergency response</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white backdrop-blur rounded-2xl p-6 hover:bg-white/90 transition-all duration-300 transform hover:scale-105 border border-blue-100">
                <div className="text-3xl text-blue-700 font-bold mb-2">47</div>
                <div className="text-lg text-blue-900 font-semibold mb-1">Counties</div>
                <div className="text-sm text-gray-600">Nationwide coverage</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Grid - Modern Design */}
      <section className="py-20 px-4 bg-blue-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Meet Our Partners</h2>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Leading organizations that trust MediLink to deliver innovative healthcare solutions
            </p>
          </div>
                    
          <div className="space-y-16">
            {PARTNERS_DATA.map((partner, index) => (
              <div 
                key={partner.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Text Content - Left for even index, Right for odd index */}
                <div className={`${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'} space-y-6`}>
                  {/* Category Badge */}
                  <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                    {partner.category}
                  </div>
                  
                  {/* Partner Info */}
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {partner.name}
                    </h3>
                    <p className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold">{partner.fullName}</p>
                    
                    <p className="text-white leading-relaxed mb-6">
                      {partner.description}
                    </p>
                  </div>
                  
                  {/* Partner Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="text-sm text-blue-600 font-semibold">Established</div>
                      <div className="text-lg font-bold text-blue-800">{partner.established}</div>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="text-sm text-blue-600 font-semibold">Coverage</div>
                      <div className="text-lg font-bold text-blue-800">{partner.coverage}</div>
                    </div>
                  </div>
                  
                  {/* Services Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {partner.services.map((service, idx) => (
                      <span 
                        key={idx}
                        className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                  
                  {/* Action Button */}
                  <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 px-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Learn More
                  </button>
                </div>

                {/* Image Content - Right for even index, Left for odd index */}
                <div className={`${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} flex justify-center`}>
                  <div className="relative group">
                    <div className="w-80 h-80 bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-blue-100 hover:border-blue-300 flex items-center justify-center">
                      <img 
                        src={partner.logo} 
                        alt={partner.name} 
                        className="w-full h-full object-contain rounded-2xl"
                      />
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits Section */}
      <section className="py-20 px-4 ">
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-700 mb-4">Why Partner With MediLink?</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Join our ecosystem and unlock the power of digital health innovation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">

              <h3 className="text-xl font-bold text-blue-700 mb-4">Digital Innovation</h3>
              <p className="">
                Access cutting-edge digital health tools and technologies to enhance service delivery and patient outcomes.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">

              <h3 className="text-xl font-bold text-blue-700 mb-4">Network Expansion</h3>
              <p className="">
                Connect with a vast network of healthcare providers, increasing your reach and impact across Kenya.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">

              <h3 className="text-xl font-bold text-blue-700 mb-4">Data Insights</h3>
              <p className="">
                Leverage real-time health data and analytics to make informed decisions and improve service quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-800 mb-6">Ready to Join Our Network?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Become part of Kenya's most comprehensive digital health ecosystem. 
            Together, we can transform healthcare delivery and improve lives.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 transform hover:scale-105">
              Start Partnership
            </button>
            <button className="border-2 border-blue-300 text-blue-700 hover:border-blue-500 hover:bg-blue-50 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300">
              Contact Us
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center text-blue-600">
              <span className="mr-2">✅</span>
              <span>Seamless Integration</span>
            </div>
            <div className="flex items-center justify-center text-blue-600">
              <span className="mr-2">🔒</span>
              <span>Secure & Compliant</span>
            </div>
            <div className="flex items-center justify-center text-blue-600">
              <span className="mr-2">🎯</span>
              <span>Proven Results</span>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Partners;
