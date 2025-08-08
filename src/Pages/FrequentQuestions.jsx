import React, { useState,} from 'react';
import { ChevronDown, ChevronUp, Search, MessageCircle, Phone, Mail, HelpCircle, Shield, CreditCard, Users, Settings, Heart, Star } from 'lucide-react';

const FAQs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [activeCategory, setActiveCategory] = useState('all');
  

  const faqData = [
    {
      category: 'about',
      icon: <HelpCircle className="w-5 h-5" />,
      question: "What is MediLink?",
      answer: "MediLink is a digital health platform that connects patients, clinics/hospitals, and Community Health Workers (CHWs) to make healthcare easier, faster, and more accessible. Whether you need to book an appointment, request home-based care, or consult a doctor online—MediLink is your healthcare companion. ",
      tags: ['platform', 'healthcare', 'digital']
    },
    {
      category: 'registration',
      icon: <Users className="w-5 h-5" />,
      question: "How do I register for MediLink?",
      answer: "You can register online using the Register button on the top-right of the site. Choose your role: Patient, Community Health Worker (CHW), or Clinic/Hospital Staff. Rural users can also register using USSD codes (coming soon) or with assistance from CHWs.",
      tags: ['register', 'account', 'signup']
    },
    {
      category: 'registration',
      icon: <CreditCard className="w-5 h-5" />,
      question: "Is there a registration fee?",
      answer: "No. Registration is completely free for all users. MediLink believes healthcare access should start with zero barriers.",
      tags: ['free', 'cost', 'registration']
    },
    {
      category: 'services',
      icon: <Settings className="w-5 h-5" />,
      question: "What services does MediLink offer?",
      answer: "MediLink offers comprehensive healthcare services including: booking clinic visits and home-based care, telemedicine consultations, insurance integration (NHIF, SHA), CHW tools for visit tracking and patient care, emergency ambulance services, health records management, and prescription delivery.",
      tags: ['services', 'features', 'healthcare']
    },
    {
      category: 'services',
      icon: <Heart className="w-5 h-5" />,
      question: "Can I use MediLink without visiting a clinic?",
      answer: "Absolutely! You can request home visits, access telemedicine consultations, receive health tips and reminders, order prescriptions for delivery, and get emergency support—all without physically visiting a facility.",
      tags: ['home visits', 'telemedicine', 'remote']
    },
    {
      category: 'payments',
      icon: <CreditCard className="w-5 h-5" />,
      question: "How do I pay for services on MediLink?",
      answer: "You can securely pay using multiple methods: M-Pesa STK Push, Debit/Credit Card (via Stripe or Flutterwave), NHIF/SHA Insurance, or through donations and subsidies for supported cases. All transactions are encrypted and secure.",
      tags: ['payment', 'mpesa', 'insurance', 'billing']
    },
    {
      category: 'payments',
      icon: <CreditCard className="w-5 h-5" />,
      question: "Can I split payments or pay partially?",
      answer: "Yes. MediLink supports flexible payment options including partial payments through insurance coverage, donor support, installment plans, and emergency payment assistance depending on your service and eligibility.",
      tags: ['partial payment', 'installments', 'financial assistance']
    },
    {
      category: 'privacy',
      icon: <Shield className="w-5 h-5" />,
      question: "Is my personal health information safe?",
      answer: "Absolutely. MediLink is fully GDPR and Kenya Data Protection Act 2019 compliant. All health records are encrypted with bank-level security, regularly audited, and only accessible by authorized healthcare personnel with your explicit consent.",
      tags: ['security', 'privacy', 'gdpr', 'data protection']
    },
    {
      category: 'privacy',
      icon: <Shield className="w-5 h-5" />,
      question: "Will my data be shared with third parties?",
      answer: "Never. Your data will never be sold, shared without consent, or misused. It is only used for healthcare delivery and service improvement within MediLink's secure ecosystem, with full transparency about any data usage.",
      tags: ['data sharing', 'privacy', 'consent']
    },
    {
      category: 'support',
      icon: <MessageCircle className="w-5 h-5" />,
      question: "What if I face issues with registration or payment?",
      answer: "Our 24/7 Support Desk is available through multiple channels: in-app support tickets, live chat, phone support, and email. We also have CHW assistance for users who need in-person help with technical issues.",
      tags: ['support', 'help', 'technical issues']
    },
    {
      category: 'support',
      icon: <Phone className="w-5 h-5" />,
      question: "How long does support take?",
      answer: "Most issues are resolved within 2-4 hours. Emergency matters like ambulance dispatch are handled immediately. Complex technical issues may take up to 24 hours, and we keep you updated throughout the process.",
      tags: ['response time', 'emergency', 'support']
    },
    {
      category: 'partnerships',
      icon: <Users className="w-5 h-5" />,
      question: "Can my clinic or hospital join MediLink?",
      answer: "Yes! We welcome healthcare providers looking to digitize and expand their services. We offer comprehensive onboarding, staff training, integration support, and ongoing technical assistance. Visit our Partners page to start the application process.",
      tags: ['clinic partnership', 'hospital', 'healthcare providers']
    },
    {
      category: 'partnerships',
      icon: <Heart className="w-5 h-5" />,
      question: "Do you work with NGOs or donors?",
      answer: "Absolutely. MediLink actively partners with NGOs, international donors, government agencies, and community organizations to fund outreach programs, support CHW initiatives, and improve community health access in underserved areas.",
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
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
      {/* Hero Section */}
      <div className="relative ">
        
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="text-center">
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif leading-tight text-blue-800">
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
                className="bg-white rounded-2xl shadow-md border border-blue-100 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <button
                  onClick={() => toggleExpanded(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-blue-50 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full  transition-colors">
                      {faq.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-blue-900 font-serif group-hover:text-blue-700 transition-colors">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {faq.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full"
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
                      <p className="text-black leading-relaxed mb-4">{faq.answer}</p>
                      <div className="flex flex-wrap gap-2">
                        {faq.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full border border-blue-200"
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
        <div className="mt-16 p-8 text-center">
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
          <h2 className="text-2xl font-bold mb-3 font-serif">Still have questions?</h2>
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