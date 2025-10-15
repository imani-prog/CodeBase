const AdvisoryBoard = () => {
  return (
    <section className="mb-0 w-full bg-blue-50 text-left">
      <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold font-serif text-blue-800 mb-3 sm:mb-4 text-center px-2">
        Advisory Board
      </h2>
      <p className="mb-3 sm:mb-4 text-center text-sm sm:text-base md:text-lg px-2 leading-relaxed">
        MediLink is advised by a diverse group of experts and organizations,
        ensuring our platform is innovative, secure, and impactful.
      </p>
      <div className="w-full flex justify-center px-2">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl text-center">
          {[
            "Ministry of Health (Kenya)",
            "NHIF/SHA Representatives",
            "Red Cross Kenya",
            "AMREF / KMTC",
            "African Digital Health Network",
            "Oracle",
            "Microsoft",
            "Google Health",
            "IBM Watson Health",
            "Other leading tech companies",
            "Kenya Medical Research Institute (KEMRI)",
            "World Health Organization (WHO)"
          ].map((name, index) => (
            <li
              key={index}
              className="bg-white rounded-md sm:rounded-lg shadow-sm sm:shadow-md hover:shadow-lg p-2 sm:p-3 font-semibold text-blue-900 text-xs sm:text-sm transition-shadow"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 sm:mt-5 md:mt-6 text-center text-xs sm:text-sm md:text-base px-2 leading-relaxed">
        Their mentorship and partnership ensure MediLink is aligned with global
        standards, real-world impact, and future-ready technology.
      </p>
    </section>
  );
};

export default AdvisoryBoard;
