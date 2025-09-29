import TrainingPath from '../../Components/TrainingPath.jsx';
import WhyChooseTraining from '../../Components/WhyChooseTraining.jsx';
import { Users, TrendingUp, Star, Award } from 'lucide-react';
import TrainingMethodology from '../../Components/TrainingMethodology.jsx';
import TrainingPartner from '../../Components/TrainingPartner.jsx';
import TrainingTestimony from '../../Components/TrainingTestimony.jsx';
import TrainingCourses from '../../Components/TrainingCourses.jsx';

const Training = () => {

  const stats = [
    { number: '500+', label: 'Trained Professionals' },
    { number: '15+', label: 'Training Programs' },
    { number: '98%', label: 'Completion Rate' },
    { number: '95%', label: 'Job Placement Rate' }
  ];



  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
      {/* Hero Section */}
      <section className="">
        <div className="absolute inset-0"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-serif sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-900 mb-3 sm:mb-4 lg:mb-6 leading-tight text-center">
              Professional Healthcare Training
            </h1>
            <p className="text-sm sm:text-base md:text-lg w-full text-center sm:text-left leading-relaxed mb-10 max-w-4xl mx-auto text-blue-600 font-bold">
              Empowering healthcare professionals with cutting-edge skills and internationally recognized certifications
            </p>
            <p className="text-lg mb-8 max-w-4xl mx-auto">
              Advance your healthcare career with MediLink Training programs offering expert-designed courses that combine theory, practical skills, and hands-on experience. Trusted by 500+ professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors">
                Browse Courses
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            {stats.map((stat, index) => {
              const icons = [Users, TrendingUp, Star, Award];
              const IconComponent = icons[index];
              return (
                <div key={index} className="bg-yellow-300 rounded-xl shadow-lg shadow-gray-500/50 px-4 sm:px-6 py-8 flex items-center">
                  <IconComponent className="w-4 h-4 mr-2 text-black" />
                  <span className="text-base sm:text-lg text-black font-serif font-bold">
                    {stat.number} {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Pathways Section */}
      <section className="py-16 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-4 font-serif">
              Structured Learning Pathways
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Follow our carefully designed career progression paths tailored to different healthcare roles and experience levels
            </p>
          </div>
          <TrainingPath />
        </div>
      </section>


      {/* Features Section */}
      <section className="py-16 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-4 font-serif">
              Why Choose MediLink Training?
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto">
              We provide comprehensive, practical training that prepares you for real-world healthcare challenges with cutting-edge methodologies and expert instruction
            </p>
          </div>
          <WhyChooseTraining />

        </div>
      </section>

      <TrainingCourses />
      <TrainingMethodology />
      <TrainingPartner />
      <TrainingTestimony />

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-blue-900">
            Ready to Transform Your Healthcare Career?
          </h2>
          <p className="text-xl mb-6 max-w-3xl mx-auto">
            Join over 500+ healthcare professionals who have enhanced their skills, advanced their careers, 
            and improved patient outcomes through MediLink Training programs
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto text-white">
            <div className="bg-blue-700 bg-opacity-50 p-4 rounded-lg">
              <div className="text-2xl font-bold">95%</div>
              <div className="text-sm opacity-90">Job Placement Rate</div>
            </div>
            <div className="bg-blue-700 bg-opacity-50 p-4 rounded-lg">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm opacity-90">Learning Support</div>
            </div>
            <div className="bg-blue-700 bg-opacity-50 p-4 rounded-lg">
              <div className="text-2xl font-bold">15+</div>
              <div className="text-sm opacity-90">Clinical Partners</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg border border-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-colors">
              Start Your Journey Today
            </button>
            <button className="bg-blue-600 border-2 border-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
               Schedule Free Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Training;
