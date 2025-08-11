const DevelopersAPI = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="text-center px-4 py-8 max-w-2xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold text-blue-800 mb-6 font-serif">
          Coming Soon
        </h1>
        <p className="text-xl md:text-2xl text-blue-600 mb-4 leading-relaxed">
          API Documentation & Developer Resources
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          We're building comprehensive API documentation, integration guides, 
          SDK downloads, and developer tools to help you integrate with MediLink.
        </p>
        <div className="mt-8 inline-flex items-center px-6 py-3 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
          Under Development
        </div>
      </div>
    </div>
  );
};

export default DevelopersAPI;
