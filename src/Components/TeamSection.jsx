const TeamSection = ({ title, members }) => {
  return (
    <section className="mb-6 w-full bg-blue-50 text-left">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {members.map((member, index) => (
          <div key={index} className="p-4 flex flex-col items-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-12 h-12 mb-2 rounded-full object-cover border"
            />
            <span className="font-bold text-blue-900 text-sm text-center">
              {member.name} – {member.title}
            </span>
            <p className="text-center text-xs mt-1 text-gray-700">
              {member.desc}
            </p>
            <button className="mt-2 px-3 py-1 bg-blue-700 text-white rounded text-xs font-semibold shadow hover:bg-blue-800 transition">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
