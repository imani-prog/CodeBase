
const SolutionTestimonial = ({ quote, name, role, location, avatar }) => (
  <div className="p-3 sm:p-4 md:p-6 flex flex-col items-center text-center space-y-2 sm:space-y-3 mt-6 sm:mt-8 md:mt-10">
    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center mb-2">
      {avatar ? (
        <img src={avatar} alt={name} className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover" />
      ) : (
        <span className="text-3xl"></span>
      )}
    </div>
    <blockquote className="italic mb-2 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">"{quote}"</blockquote>
    <div className="font-bold text-blue-800 text-sm sm:text-base">{name}</div>
    <div className="text-bold text-xs sm:text-sm">{role}, {location}</div>
  </div>
);

export default SolutionTestimonial;
