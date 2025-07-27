import { ChevronDown, ChevronUp, CreditCard, Heart, HelpCircle, Mail, MessageCircle, Phone, Search, Settings, Shield, Users } from 'lucide-react';
import {  useState } from 'react';

const FAQs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [activeCategory, setActiveCategory] = useState('all');
  

  const faqData = [
    {
      category: 'about',
      icon: <HelpCircle className="w-5 h-5" />,
      question: "What is MediLink?",
      answer: "MediLink is a comprehensive digital health platform designed to bridge the gap between patients, clinics, hospitals, and Community Health Workers (CHWs). Our mission is to make healthcare easier, faster, and more accessible for everyone, regardless of location or background. With MediLink, you can seamlessly book appointments, request home-based care, consult with doctors online, and manage your health records all in one place. The platform empowers users to take control of their health journey, offering personalized recommendations, reminders, and support. Whether you are seeking preventive care, emergency assistance, or ongoing medical management, MediLink is your trusted healthcare companion, dedicated to improving outcomes and simplifying the healthcare experience.",
      tags: ['platform', 'healthcare', 'digital']
    },
    {
      category: 'registration',
      icon: <Users className="w-5 h-5" />,
      question: "How do I register for MediLink?",
      answer: "Registering for MediLink is simple and user-friendly. Start by clicking the Register button located at the top-right corner of our website. You will be prompted to select your role—Patient, Community Health Worker (CHW), or Clinic/Hospital Staff—so we can tailor your experience to your needs. The registration process guides you through entering your basic information, verifying your identity, and setting up your account preferences. For users in rural areas or those with limited internet access, we offer alternative registration methods such as USSD codes (coming soon) and in-person assistance from CHWs. Our support team is always available to help you complete your registration and get started on your healthcare journey.",
      tags: ['register', 'account', 'signup']
    },
    {
      category: 'registration',
      icon: <CreditCard className="w-5 h-5" />,
      question: "Is there a registration fee?",
      answer: "No, there is absolutely no registration fee for joining MediLink. We believe that access to healthcare should begin with zero financial barriers, ensuring that everyone can benefit from our services regardless of their economic status. Our platform is committed to inclusivity and equity, so all users—patients, CHWs, and healthcare providers—can register and access essential features without any upfront costs. MediLink is funded through partnerships, donations, and service integrations, allowing us to keep registration free and focus on delivering quality healthcare to all.",
      tags: ['free', 'cost', 'registration']
    },
    {
      category: 'services',
      icon: <Settings className="w-5 h-5" />,
      question: "What services does MediLink offer?",
      answer: "MediLink provides a wide range of healthcare services designed to meet the diverse needs of our users. You can book clinic visits, request home-based care, and access telemedicine consultations with licensed professionals from the comfort of your home. Our platform integrates with major insurance providers like NHIF and SHA, making payments and claims seamless. Community Health Workers benefit from specialized tools for visit tracking, patient management, and reporting. We also offer emergency ambulance dispatch, digital health records management, prescription ordering and delivery, and personalized health tips. MediLink is constantly evolving, adding new features and services to ensure comprehensive, high-quality healthcare for all.",
      tags: ['services', 'features', 'healthcare']
    },
    {
      category: 'services',
      icon: <Heart className="w-5 h-5" />,
      question: "Can I use MediLink without visiting a clinic?",
      answer: "Absolutely! MediLink is designed to support remote healthcare, allowing you to access essential services without the need to physically visit a clinic or hospital. You can request home visits from qualified CHWs, schedule telemedicine consultations with doctors, receive personalized health tips and reminders, and order prescriptions for home delivery. In case of emergencies, our platform enables rapid ambulance dispatch and support. This flexibility is especially valuable for users with mobility challenges, those in rural areas, or anyone seeking convenient, on-demand healthcare from their own home.",
      tags: ['home visits', 'telemedicine', 'remote']
    },
    {
      category: 'payments',
      icon: <CreditCard className="w-5 h-5" />,
      question: "How do I pay for services on MediLink?",
      answer: "Paying for services on MediLink is secure, flexible, and convenient. We support multiple payment options including M-Pesa STK Push for mobile payments, debit and credit cards processed through trusted gateways like Stripe and Flutterwave, and direct insurance integration with NHIF and SHA. For users who qualify, we also offer donations and subsidies to help cover costs. All transactions are encrypted and protected by advanced security protocols, ensuring your financial information remains safe. Our platform provides clear payment instructions, receipts, and support for any billing questions you may have.",
      tags: ['payment', 'mpesa', 'insurance', 'billing']
    },
    {
      category: 'payments',
      icon: <CreditCard className="w-5 h-5" />,
      question: "Can I split payments or pay partially?",
      answer: "Yes, MediLink offers flexible payment solutions to accommodate different financial situations. You can split payments or pay partially using insurance coverage, donor support, or installment plans, depending on your eligibility and the type of service. Emergency payment assistance is also available for those in urgent need. Our system is designed to make healthcare affordable and accessible, so you can focus on your health without worrying about financial constraints. If you need help with payment arrangements, our support team is ready to assist you in finding the best option.",
      tags: ['partial payment', 'installments', 'financial assistance']
    },
    {
      category: 'privacy',
      icon: <Shield className="w-5 h-5" />,
      question: "Is my personal health information safe?",
      answer: "Absolutely. MediLink takes your privacy and data security extremely seriously. We are fully compliant with GDPR and the Kenya Data Protection Act 2019, ensuring that your personal health information is protected by the highest standards. All health records are encrypted using bank-level security, regularly audited for vulnerabilities, and only accessible to authorized healthcare personnel with your explicit consent. We employ multi-factor authentication, secure data centers, and continuous monitoring to safeguard your information. Your trust is our top priority, and we are committed to maintaining transparency and accountability in all our data practices.",
      tags: ['security', 'privacy', 'gdpr', 'data protection']
    },
    {
      category: 'privacy',
      icon: <Shield className="w-5 h-5" />,
      question: "Will my data be shared with third parties?",
      answer: "Never. MediLink will never sell, share, or misuse your personal data. Your information is used solely for healthcare delivery and service improvement within our secure ecosystem. Any data usage is fully transparent, and you retain complete control over your consent. We do not share data with third parties unless required by law or with your explicit permission for specific healthcare purposes. Our commitment to privacy means you can use MediLink with confidence, knowing your data is protected and respected at all times.",
      tags: ['data sharing', 'privacy', 'consent']
    },
    {
      category: 'support',
      icon: <MessageCircle className="w-5 h-5" />,
      question: "What if I face issues with registration or payment?",
      answer: "If you encounter any issues with registration, payment, or using MediLink's features, our dedicated 24/7 Support Desk is here to help. You can reach us through in-app support tickets, live chat, phone support, or email. For users who need in-person assistance, Community Health Workers are available to provide technical help and guidance. We strive to resolve all issues quickly and efficiently, ensuring you have a smooth experience on our platform. Our support team is knowledgeable, friendly, and committed to helping you every step of the way.",
      tags: ['support', 'help', 'technical issues']
    },
    {
      category: 'support',
      icon: <Phone className="w-5 h-5" />,
      question: "How long does support take?",
      answer: "Support response times vary depending on the nature of your issue. Most common problems, such as registration or payment queries, are resolved within 2-4 hours. Emergency situations, like ambulance dispatch, are prioritized and handled immediately. For more complex technical issues, resolution may take up to 24 hours, but we keep you informed throughout the process with regular updates. Our goal is to provide timely, effective support so you can continue using MediLink without interruption. Your satisfaction and safety are our highest priorities.",
      tags: ['response time', 'emergency', 'support']
    },
    {
      category: 'partnerships',
      icon: <Users className="w-5 h-5" />,
      question: "Can my clinic or hospital join MediLink?",
      answer: "Yes! MediLink welcomes clinics, hospitals, and healthcare providers who are interested in digitizing and expanding their services. We offer a comprehensive onboarding process, including staff training, system integration, and ongoing technical support. By joining MediLink, your facility can benefit from increased visibility, streamlined patient management, and access to innovative healthcare tools. Our Partners page provides detailed information on how to apply, and our team is available to guide you through every step of the partnership process. We are committed to helping healthcare providers deliver better care and reach more patients through technology.",
      tags: ['clinic partnership', 'hospital', 'healthcare providers']
    },
    {
      category: 'partnerships',
      icon: <Heart className="w-5 h-5" />,
      question: "Do you work with NGOs or donors?",
      answer: "Absolutely. MediLink actively collaborates with NGOs, international donors, government agencies, and community organizations to fund outreach programs, support CHW initiatives, and improve community health access in underserved areas. These partnerships enable us to deliver targeted interventions, provide financial assistance to vulnerable populations, and drive innovation in healthcare delivery. We value the contributions of our partners and work closely with them to achieve shared goals in public health, capacity building, and community empowerment. If you represent an organization interested in partnering with MediLink, please reach out to us for more information on how we can work together to make a positive impact.",
      tags: ['ngo', 'donors', 'partnerships', 'community health']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'about', name: 'About MediLink', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'registration', name: 'Registration', icon: <Users className="w-4 h-4" /> },
    { id: 'services', name: 'Services', icon: <Settings className="w-4 h-4" /> },
    { id: 'payments', name: 'Payments', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'privacy', name: 'Privacy', icon: <Shield className="w-4 h-4" /> },
    { id: 'support', name: 'Support', icon: <MessageCircle className="w-4 h-4" /> },
    { id: 'partnerships', name: 'Partnerships', icon: <Heart className="w-4 h-4" /> }
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (index) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const expandAll = () => {
    setExpandedItems(new Set(filteredFAQs.map((_, index) => index)));
  };

  const collapseAll = () => {
    setExpandedItems(new Set());
  };

 

  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Hero Section */}
      <div className="relative ">
        
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="text-center">
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-blue-800">
              Frequently Asked
              <span className="block bg-clip-text">
                Questions
              </span>
            </h1>
            <p className="text-xl  mb-8 max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about MediLink. Can't find what you're looking for? 
              <a href="/contact" className="underline hover:text-blue-600 transition-colors ml-1">
                Contact our support team
              </a>
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white/95 backdrop-blur-sm border border-blue-200 text-blue-900 placeholder-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-300 transition-all shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Category Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white text-blue-600 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-blue-700">
            <span className="font-semibold">{filteredFAQs.length}</span> question{filteredFAQs.length !== 1 ? 's' : ''} found
          </div>
          <div className="flex gap-3">
            <button
              onClick={expandAll}
              className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">No results found</h3>
              <p className="text-blue-600">Try adjusting your search or browse different categories</p>
            </div>
          ) : (
            filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl shadow-md border border-blue-100 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleExpanded(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full transition-colors">
                      {faq.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-blue-900 group-hover:text-blue-700 transition-colors">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {faq.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1  text-blue-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {expandedItems.has(index) ? (
                      <ChevronUp className="w-5 h-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                </button>
                {expandedItems.has(index) && (
                  <div className="px-8 pb-6 pt-0">
                    <div className="pl-14">
                      <p className="leading-relaxed mb-4">{faq.answer}</p>
                      <div className="flex flex-wrap gap-2">
                        {faq.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 text-blue-600 text-xs rounded-full border border-blue-200"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Contact Section */}
        <div className="mt-16 rounded-3xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex -space-x-2">
              <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <h2 className="text-2xl text-blue-600 font-bold mb-3">Still have questions?</h2>
          <p className="mb-6">Our support team is here to help you 24/7</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-400 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="/support"
              className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-400 transition-colors"
            >
              Open Ticket
            </a>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default FAQs;