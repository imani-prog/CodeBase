const TeamSection = ({ title, members }) => {
  return (
    <section className="mb-4 sm:mb-5 md:mb-6 w-full bg-blue-50 text-left">
      <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-blue-800 font-serif mb-3 sm:mb-4 px-2">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {members.map((member, index) => (
          <div key={index} className="p-3 sm:p-4 flex flex-col items-center bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md hover:shadow-lg transition-shadow">
            <img
              src={member.image}
              alt={member.name}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-2 sm:mb-3 rounded-full object-cover border-2 border-blue-200"
              
            />
            <span className="font-bold text-blue-900 text-xs sm:text-sm text-center leading-tight mb-1">
              {member.name}
            </span>
            <span className="text-blue-600 text-xs sm:text-xs text-center font-medium mb-2">
              {member.title}
            </span>
            <p className="text-center text-xs sm:text-xs mt-1 text-gray-700 leading-relaxed">
              {member.desc}
            </p>
            <button className="mt-2 sm:mt-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-700 text-white rounded sm:rounded-lg text-xs font-semibold shadow hover:bg-blue-800 transition-all hover:scale-105">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
