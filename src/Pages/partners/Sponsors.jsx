

// Import profile images
import SarahChenImg from "../../assets/Susan Mwangi.jpeg";
import MichaelRobertsImg from "../../assets/Kevin Murage.jpeg";

// Sponsorship Impact Data
const SPONSORSHIP_IMPACT = [
  {
    metric: "50,000+",
    label: "Lives Impacted",
    description: "Through sponsored programs"
  },
  {
    metric: "200+",
    label: "CHWs Supported",
    description: "With sponsored training & equipment"
  },
  {
    metric: "15+",
    label: "Active Sponsors",
    description: "Partnering for health equity"
  },
  {
    metric: "95%",
    label: "Transparency Score",
    description: "In fund utilization reporting"
  }
];

// Sponsorship Opportunities
const SPONSORSHIP_OPPORTUNITIES = [
  {
    title: "CHW Program Sponsorship",
    description: "Fund Community Health Worker salaries, training, and equipment for rural communities",
    impact: "Each $500 sponsors 1 CHW for a month, reaching 500+ patients",
    icon: ""
  },
  {
    title: "Technology Infrastructure",
    description: "Support digital health platform development and maintenance",
    impact: "Technology sponsorship enables 24/7 telemedicine services",
    icon: ""
  },
  {
    title: "Emergency Medical Fund",
    description: "Provide critical funding for urgent patient cases and medical emergencies",
    impact: "Emergency fund saves lives in remote areas within hours",
    icon: ""
  },
  {
    title: "Training & Capacity Building",
    description: "Fund comprehensive training programs for healthcare workers",
    impact: "Training programs improve care quality by 80%",
    icon: ""
  },
  {
    title: "Medical Equipment & Supplies",
    description: "Sponsor essential medical equipment for community health centers",
    impact: "Equipment sponsorship serves 1000+ patients annually",
    icon: ""
  },
  {
    title: "Health Awareness Campaigns",
    description: "Support community outreach and health education initiatives",
    impact: "Campaigns reach 10,000+ community members per initiative",
    icon: ""
  }
];

// Sponsor Benefits
const SPONSOR_BENEFITS = [
  {
    title: "Impact Transparency",
    description: "Detailed quarterly reports showing exactly how your sponsorship creates change",
    features: ["Real-time impact dashboards", "Patient outcome metrics", "Community feedback reports"]
  },
  {
    title: "Brand Recognition",
    description: "Professional acknowledgment across our platforms and community presence",
    features: ["Website sponsor recognition", "Social media mentions", "Event acknowledgments"]
  },
  {
    title: "Tax Benefits",
    description: "Maximize your corporate social responsibility while gaining tax advantages",
    features: ["Tax-deductible donations", "CSR compliance documentation", "Impact certificates"]
  },
  {
    title: "Partnership Opportunities",
    description: "Collaborate on innovative healthcare solutions and community programs",
    features: ["Co-branded initiatives", "Innovation partnerships", "Stakeholder engagement"]
  }
];

// Testimonials from Current Sponsors
const SPONSOR_TESTIMONIALS = [
  {
    quote: "Our partnership with MediLink has transformed how we approach healthcare CSR. The transparency and impact reports are exceptional.",
    author: "Sarah Chen",
    position: "CSR Director",
    company: "TechForGood Corp",
    logo: "",
    profileImage: SarahChenImg
  },
  {
    quote: "Sponsoring CHW programs through MediLink gives us direct visibility into lives saved and communities strengthened.",
    author: "Dr. Michael Roberts",
    position: "Foundation President",
    company: "Roberts Health Foundation",
    logo: "",
    profileImage: MichaelRobertsImg
  }
];

const Sponsors = () => (

  <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
    
    
    {/* Hero Section */}
    <section className="py-8">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold text-blue-700 mb-6">Partner with Purpose</h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Join leading organizations in transforming healthcare delivery across Africa. 
          Your sponsorship directly impacts communities, saves lives, and builds sustainable health systems.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="mailto:sponsors@medilink.africa" 
            className="bg-white text-blue-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            Become a Sponsor
          </a>
          <a 
            href="#opportunities" 
            className="bg-white border-2 border-white text-blue-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
          >
            Explore Opportunities
          </a>
        </div>
      </div>
    </section>

    {/* Impact Statistics */}
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Our Collective Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SPONSORSHIP_IMPACT.map((stat, index) => (
            <div key={index} className="text-center p-6 ">
              <div className="text-4xl font-bold text-blue-700 mb-2">{stat.metric}</div>
              <div className="text-lg font-semibold text-gray-800 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Sponsorship Opportunities */}
    <section id="opportunities" className="py-16 ">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Sponsorship Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SPONSORSHIP_OPPORTUNITIES.map((opportunity, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200">
              <div className="text-4xl mb-4">{opportunity.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{opportunity.title}</h3>
              <p className="text-gray-600 mb-4">{opportunity.description}</p>
              <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm font-semibold text-blue-800">Impact: {opportunity.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Sponsor Benefits */}
    <section className="bg-blue-950 text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 ">Why Sponsor MediLink?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SPONSOR_BENEFITS.map((benefit, index) => (
            <div key={index} className=" p-10">
              <h3 className="text-xl font-bold mb-3 ">{benefit.title}</h3>
              <p className=" mb-4">{benefit.description}</p>
              <ul className="space-y-2">
                {benefit.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm ">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Sponsor Testimonials */}
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Our Sponsors Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SPONSOR_TESTIMONIALS.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-start mb-4">
                <img 
                  src={testimonial.profileImage} 
                  alt={testimonial.author}
                  className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-200"
                />
                <div className="text-4xl">{testimonial.logo}</div>
              </div>
              <blockquote className="text-gray-700 mb-4 italic">"{testimonial.quote}"</blockquote>
              <div className="flex items-center">
                <div>
                  <div className="font-semibold text-gray-800">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.position}</div>
                  <div className="text-sm text-blue-600 font-medium">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* NGO Collaboration Section */}
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-blue-900">NGO & Development Partners</h2>
        <div className="p-8">
          <h3 className="text-2xl font-bold text-blue-600 mb-4">Collaborative Impact</h3>
          <p className="text-gray-700 mb-6">
            Partner with MediLink to amplify your organization's health impact. We collaborate with NGOs, 
            development agencies, and foundations to implement sustainable health solutions at scale.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="text-left">
              <h4 className="font-semibold text-blue-600 mb-2">Partnership Areas:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Program implementation & scaling</li>
                <li>• Technology integration & training</li>
                <li>• Community health worker networks</li>
                <li>• Data sharing & impact measurement</li>
              </ul>
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-blue-600 mb-2">Collaboration Benefits:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Shared resources & expertise</li>
                <li>• Expanded geographic reach</li>
                <li>• Enhanced program sustainability</li>
                <li>• Joint funding opportunities</li>
              </ul>
            </div>
          </div>
          <a 
            href="mailto:ngo@medilink.africa" 
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors inline-block"
          >
            Explore NGO Partnership
          </a>
        </div>
      </div>
    </section>

    {/* Call to Action */}
    <section className="py-16 bg-blue-950 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
        <p className="text-xl mb-8">
          Your sponsorship can transform healthcare delivery for thousands of people across Africa. 
          Let's discuss how we can create meaningful impact together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="mailto:sponsors@medilink.africa?subject=Sponsorship Inquiry" 
            className="bg-white text-blue-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            Start Partnership Discussion
          </a>
          <a 
            href="tel:+254712345678" 
            className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-700 transition-colors"
          >
            Call Us: +254 712 345 678
          </a>
        </div>
        <div className="mt-8 text-center">
          <p className="text-blue-200 mb-2">Or reach out directly:</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <span>📧 sponsors@medilink.africa</span>
            <span>🤝 ngo@medilink.africa</span>
            <span>💬 partnerships@medilink.africa</span>
          </div>
        </div>
      </div>
    </section>

   
  </div>
);


export default Sponsors;
