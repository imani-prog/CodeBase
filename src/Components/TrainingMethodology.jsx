import React from 'react';
import { 
  ClipboardList, 
  BookOpen, 
  Stethoscope, 
  Award, 
  Users,
  Target,
  Brain,
  Map,
  Monitor,
  BarChart3,
  Play,
  Gamepad2,
  Mic,
  Download,
  Building2,
  Heart,
  Wrench,
  Database,
  AlertTriangle,
  CheckCircle,
  UserCheck,
  Presentation,
  Calendar,
  Briefcase,
  Network,
  GraduationCap
} from 'lucide-react';

const TrainingMethodology = () => {
  const phases = [
    {
      id: 1,
      title: "Pre-Assessment & Personalization",
      description: "Every trainee undergoes a comprehensive skills assessment to identify knowledge gaps and learning preferences. We create personalized learning paths based on experience level, career goals, and regional healthcare needs.",
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-700",
      cardBg: "bg-white",
      accentColor: "text-blue-600",
      borderColor: "border-blue-200",
      icon: <ClipboardList className="w-8 h-8" />,
      details: [
        { icon: <Target className="w-4 h-4" />, text: "Skills evaluation through practical scenarios" },
        { icon: <Brain className="w-4 h-4" />, text: "Learning style assessment (visual, auditory, kinesthetic)" },
        { icon: <Map className="w-4 h-4" />, text: "Career goal mapping and pathway planning" },
        { icon: <Monitor className="w-4 h-4" />, text: "Technology readiness evaluation" },
        { icon: <BarChart3 className="w-4 h-4" />, text: "Regional healthcare context analysis" }
      ]
    },
    {
      id: 2,
      title: "Interactive Learning Modules",
      description: "Engaging multimedia content delivered through our smart learning platform. Interactive simulations, virtual patient cases, and gamified challenges make learning enjoyable and memorable.",
      bgColor: "bg-gradient-to-br from-indigo-500 to-indigo-700",
      cardBg: "bg-white",
      accentColor: "text-indigo-600",
      borderColor: "border-indigo-200",
      icon: <BookOpen className="w-8 h-8" />,
      details: [
        { icon: <Play className="w-4 h-4" />, text: "3D medical simulations and virtual reality experiences" },
        { icon: <Stethoscope className="w-4 h-4" />, text: "Interactive case studies from real patient scenarios" },
        { icon: <Gamepad2 className="w-4 h-4" />, text: "Gamified progress tracking with achievement badges" },
        { icon: <Mic className="w-4 h-4" />, text: "Voice-enabled learning for hands-free practice" },
        { icon: <Download className="w-4 h-4" />, text: "Offline content download for remote areas" }
      ]
    },
    {
      id: 3,
      title: "Hands-On Practice Sessions",
      description: "Real-world application through supervised practice in clinical settings, community outreach programs, and simulation labs equipped with modern medical equipment and technology.",
      bgColor: "bg-gradient-to-br from-purple-500 to-purple-700",
      cardBg: "bg-white",
      accentColor: "text-purple-600",
      borderColor: "border-purple-200",
      icon: <Stethoscope className="w-8 h-8" />,
      details: [
        { icon: <Building2 className="w-4 h-4" />, text: "Clinical rotations in partner hospitals and clinics" },
        { icon: <Heart className="w-4 h-4" />, text: "Community health screening and outreach events" },
        { icon: <Wrench className="w-4 h-4" />, text: "Medical equipment handling and maintenance training" },
        { icon: <Database className="w-4 h-4" />, text: "Electronic health records practice on live systems" },
        { icon: <AlertTriangle className="w-4 h-4" />, text: "Emergency response drills and scenario-based training" }
      ]
    },
    {
      id: 4,
      title: "Competency Validation",
      description: "Rigorous assessment through multiple evaluation methods including practical demonstrations, peer reviews, patient feedback, and standardized testing to ensure competency mastery.",
      bgColor: "bg-gradient-to-br from-emerald-500 to-emerald-700",
      cardBg: "bg-white",
      accentColor: "text-emerald-600",
      borderColor: "border-emerald-200",
      icon: <Award className="w-8 h-8" />,
      details: [
        { icon: <CheckCircle className="w-4 h-4" />, text: "Practical skill demonstrations with expert evaluators" },
        { icon: <UserCheck className="w-4 h-4" />, text: "Standardized patient interactions and feedback" },
        { icon: <Users className="w-4 h-4" />, text: "Peer assessment and collaborative evaluations" },
        { icon: <Monitor className="w-4 h-4" />, text: "Technology proficiency testing" },
        { icon: <Presentation className="w-4 h-4" />, text: "Portfolio development and case study presentations" }
      ]
    },
    {
      id: 5,
      title: "Continuous Support & Growth",
      description: "Ongoing mentorship, career guidance, and professional development opportunities. Alumni network access, continuing education credits, and advanced certification pathways.",
      bgColor: "bg-gradient-to-br from-rose-500 to-rose-700",
      cardBg: "bg-white",
      accentColor: "text-rose-600",
      borderColor: "border-rose-200",
      icon: <Users className="w-8 h-8" />,
      details: [
        { icon: <Calendar className="w-4 h-4" />, text: "Monthly mentorship sessions with industry experts" },
        { icon: <Briefcase className="w-4 h-4" />, text: "Job placement assistance and interview coaching" },
        { icon: <Network className="w-4 h-4" />, text: "Alumni networking events and professional forums" },
        { icon: <GraduationCap className="w-4 h-4" />, text: "Refresher courses and skill update workshops" },
        { icon: <Award className="w-4 h-4" />, text: "Leadership development and advancement opportunities" }
      ]
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Proven Training Methodology
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience our unique 5-phase training approach that ensures skill mastery and real-world application
          </p>
        </div>
        
        {/* Top Row - Phases 1 & 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {phases.slice(0, 2).map((phase) => (
            <div key={phase.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200">
              {/* Card Header */}
              <div className={`${phase.bgColor} px-6 py-4 relative`}>
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-full shadow-md">
                    <div className={`${phase.accentColor}`}>
                      {phase.icon}
                    </div>
                  </div>
                  <div>
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Phase {phase.id}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">{phase.title}</h3>
                  </div>
                </div>
              </div>
              
              {/* Card Body */}
              <div className="p-6">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {phase.description}
                </p>
                
                {/* Details Section */}
                <div className="space-y-4">
                  <h4 className={`font-semibold ${phase.accentColor} flex items-center gap-2 text-sm uppercase tracking-wider`}>
                    <BarChart3 className="w-4 h-4" />
                    {phase.id === 1 && "What happens during Pre-Assessment"}
                    {phase.id === 2 && "Learning Features Include"}
                  </h4>
                  
                  <div className="space-y-3">
                    {phase.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`${phase.accentColor} mt-0.5 flex-shrink-0`}>
                          {detail.icon}
                        </div>
                        <span className="text-sm text-gray-700">{detail.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom Row - Phases 3 & 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {phases.slice(2, 4).map((phase) => (
            <div key={phase.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200">
              {/* Card Header */}
              <div className={`${phase.bgColor} px-6 py-4 relative`}>
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-full shadow-md">
                    <div className={`${phase.accentColor}`}>
                      {phase.icon}
                    </div>
                  </div>
                  <div>
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Phase {phase.id}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">{phase.title}</h3>
                  </div>
                </div>
              </div>
              
              {/* Card Body */}
              <div className="p-6">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {phase.description}
                </p>
                
                {/* Details Section */}
                <div className="space-y-4">
                  <h4 className={`font-semibold ${phase.accentColor} flex items-center gap-2 text-sm uppercase tracking-wider`}>
                    <BarChart3 className="w-4 h-4" />
                    {phase.id === 3 && "Practice Opportunities"}
                    {phase.id === 4 && "Assessment Methods"}
                  </h4>
                  
                  <div className="space-y-3">
                    {phase.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`${phase.accentColor} mt-0.5 flex-shrink-0`}>
                          {detail.icon}
                        </div>
                        <span className="text-sm text-gray-700">{detail.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Phase 5 - Full Width */}
        <div className="max-w-4xl mx-auto">
          {phases.slice(4, 5).map((phase) => (
            <div key={phase.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200">
              {/* Card Header */}
              <div className={`${phase.bgColor} px-6 py-4 relative`}>
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-full shadow-md">
                    <div className={`${phase.accentColor}`}>
                      {phase.icon}
                    </div>
                  </div>
                  <div>
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Phase {phase.id}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">{phase.title}</h3>
                  </div>
                </div>
              </div>
              
              {/* Card Body */}
              <div className="p-6">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {phase.description}
                </p>
                
                {/* Details Section */}
                <div className="space-y-4">
                  <h4 className={`font-semibold ${phase.accentColor} flex items-center gap-2 text-sm uppercase tracking-wider`}>
                    <BarChart3 className="w-4 h-4" />
                    Ongoing Support Includes
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {phase.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`${phase.accentColor} mt-0.5 flex-shrink-0`}>
                          {detail.icon}
                        </div>
                        <span className="text-sm text-gray-700">{detail.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Progress Indicator */}
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-6">
            {phases.map((phase, index) => (
              <React.Fragment key={phase.id}>
                <div className={`w-16 h-16 rounded-full ${phase.bgColor.replace('bg-gradient-to-br from-', 'bg-').replace(' to-', '').split(' ')[0]} text-white flex items-center justify-center font-bold text-xl shadow-lg border-4 border-white`}>
                  {phase.id}
                </div>
                {index < phases.length - 1 && (
                  <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingMethodology;