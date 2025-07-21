
const SolutionTestimonial = ({ quote, name, role, location, avatar }) => (
  <div className="rounded-2xl shadow-lg border border-blue-200 p-6 flex flex-col items-center text-center space-y-3 mt-10">
    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2">
      {avatar ? (
        <img src={avatar} alt={name} className="w-14 h-14 rounded-full object-cover" />
      ) : (
        <span className="text-3xl"></span>
      )}
    </div>
    <blockquote className="italic mb-2">"{quote}"</blockquote>
    <div className="font-bold text-blue-800">{name}</div>
    <div className="text-bold text-sm">{role}, {location}</div>
  </div>
);

export default SolutionTestimonial;
