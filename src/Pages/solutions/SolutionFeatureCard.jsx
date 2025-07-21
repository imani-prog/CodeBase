
const SolutionFeatureCard = ({ icon, title, description }) => (
  <div className="bg-white/80 rounded-2xl shadow-lg border border-blue-200 p-6 flex flex-col items-center text-center space-y-3">
    <div className="text-3xl mb-2">{icon}</div>
    <div className="font-bold text-blue-800 text-lg">{title}</div>
    <div className="text-blue-700 text-sm">{description}</div>
  </div>
);

export default SolutionFeatureCard;
