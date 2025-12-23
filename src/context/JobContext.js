import React, { createContext, useState, useEffect } from 'react';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [jobs, setJobs] = useState([]); 
  const [applications, setApplications] = useState([]);
  
  const addJob = (job) => {
    setJobs([...jobs, { ...job, id: Date.now().toString(), status: 'pending', applications: [] }]);
  };

  const updateJobStatus = (jobId, newStatus) => {
    setJobs(prevJobs => 
      prevJobs.map(job => 
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );
  };

  // --- UPDATED FUNCTION ---
  const applyForJob = (jobId, studentName) => {
    setJobs(prevJobs => 
      prevJobs.map(job => {
        if (job.id === jobId) {
          const newApplication = {
            studentName: studentName,
            status: 'Applied',
            appliedAt: new Date().toISOString(),
          };
          return {
            ...job,
            applications: job.applications ? [...job.applications, newApplication] : [newApplication]
          };
        }
        return job;
      })
    );
  };

  return (
    <JobContext.Provider value={{ 
      currentUser, 
      setCurrentUser, 
      jobs, 
      applications, 
      addJob, 
      applyForJob,
      updateJobStatus 
    }}>
      {children}
    </JobContext.Provider>
  );
};