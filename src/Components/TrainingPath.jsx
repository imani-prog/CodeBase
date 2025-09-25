// TrainingPath.jsx
import React from "react";

const trainingPaths = [
  {
    title: "Clinical Care Path",
    courses: [
      "Mental Health First Aid",
      "Community Health Worker Certification",
      "Maternal & Child Health Specialist",
      "Healthcare Quality Improvement",
    ],
  },
  {
    title: "Digital Health Path",
    courses: [
      "Digital Health Technology Training",
      "Telemedicine & Remote Care",
      "Healthcare Data Analytics",
      "Advanced Digital Health Leadership",
    ],
  },
  {
    title: "Management Path",
    courses: [
      "Community Health Worker Certification",
      "Healthcare Quality Improvement",
      "Healthcare Data Analytics",
      "Healthcare System Administration",
    ],
  },
];

const TrainingPath = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {trainingPaths.map((path, idx) => (
        <div
          key={idx}
          className="bg-blue-100 p-6 rounded-lg border-l-4 border-blue-500"
        >
          <h3 className="text-xl font-semibold mb-4 text-blue-800">
            {path.title}
          </h3>
          <div className="space-y-3">
            {path.courses.map((course, index) => (
              <div key={index} className="flex items-center">
                <span className="w-8 h-8 bg-blue-200 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                  {index + 1}
                </span>
                <span>{course}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrainingPath;
