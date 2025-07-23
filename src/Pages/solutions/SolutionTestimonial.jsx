
const SolutionTestimonial = ({ quote, name, role, location, avatar }) => (
  <div className="p-6 flex flex-col items-center text-center space-y-3 mt-10">
    <div className="w-32 h-32 flex items-center justify-center mb-2">
      {avatar ? (
        <img src={avatar} alt={name} className="w-28 h-28 rounded-full object-cover" />
      ) : (
        <span className="text-3xl"></span>
      )}
    </div>
    <blockquote className="italic mb-2 text-xl md:text-2xl">"{quote}"</blockquote>
    <div className="font-bold text-blue-800">{name}</div>
    <div className="text-bold text-sm">{role}, {location}</div>
  </div>
);

export default SolutionTestimonial;
