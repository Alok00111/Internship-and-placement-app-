import React, { createContext, useState } from 'react';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  // 1. Mock Data for Jobs
  const [jobs, setJobs] = useState([
    {
      id: '1',
      title: "Flutter Developer Intern",
      description: "Build mobile apps using Flutter.",
      duration: "6 Months",
      stipend: "15000",
      eligibility: "BCA/B.Tech",
      company: "TechCorp",
      status: "Verified",
      applications: [],
    },
    {
      id: '2',
      title: "Data Analyst",
      description: "Analyze python scripts.",
      duration: "3 Months",
      stipend: "10000",
      eligibility: "B.Sc Stats",
      company: "DataBiz",
      status: "Published",
      applications: [],
    },
  ]);

  // 2. Mock Data for Companies
  const [companies, setCompanies] = useState([
    {
      id: 'c1',
      name: "My Company",
      email: "hr@techcorp.com",
      status: "Pending",
      documentUrl: null,
    }
  ]);

  // 3. Current User State
  const [currentUser, setCurrentUser] = useState({
    name: "Alok",
    role: "",
  });

  // 4. Current Company State (Initialize correctly!)
  const [currentCompany, setCurrentCompany] = useState({
    name: "My Company",
    email: "hr@techcorp.com",
    status: "Pending",
    documentUrl: null,
  });

  // Helper to add a job
  const addJob = (newJob) => {
    const jobWithId = { 
      ...newJob, 
      id: Date.now().toString(), 
      applications: [],
      status: 'Pending' 
    };
    setJobs([...jobs, jobWithId]);
  };

  return (
    <JobContext.Provider value={{ 
      jobs, 
      setJobs, 
      addJob, 
      companies, 
      setCompanies,
      currentUser, 
      setCurrentUser,
      currentCompany,    // Make sure this is passed
      setCurrentCompany  // Make sure this is passed
    }}>
      {children}
    </JobContext.Provider>
  );
};