"use client";

import { useState } from "react";
import Link from "next/link";
import { FiSearch, FiMapPin, FiBriefcase, FiArrowRight } from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";

const CompaniesList = () => {
  const [search, setSearch] = useState("");

  // Mock data for companies
  const companies = [
    {
      id: 1,
      name: "Stripe",
      location: "San Francisco, US",
      industry: "Fintech",
      jobsCount: 12,
      description: "Stripe is a suite of APIs powers commerce for businesses of all sizes.",
      logo: <FaBuilding className="text-3xl text-primary" />,
      color: "bg-indigo-50"
    },
    {
      id: 2,
      name: "Revolut",
      location: "London, UK",
      industry: "Digital Banking",
      jobsCount: 8,
      description: "Building the world's first truly global financial super app.",
      logo: <FaBuilding className="text-3xl text-primary" />,
      color: "bg-blue-50"
    },
    {
      id: 3,
      name: "Dropbox",
      location: "San Francisco, US",
      industry: "Cloud Storage",
      jobsCount: 5,
      description: "Dropbox is a modern workspace that designed to reduce busywork.",
      logo: <FaBuilding className="text-3xl text-primary" />,
      color: "bg-cyan-50"
    },
    {
      id: 4,
      name: "Canva",
      location: "Sydney, Australia",
      industry: "Design",
      jobsCount: 15,
      description: "Canva is an online design and publishing tool which is easy to use.",
      logo: <FaBuilding className="text-3xl text-primary" />,
      color: "bg-purple-50"
    },
    {
      id: 5,
      name: "Pitch",
      location: "Berlin, Germany",
      industry: "Software",
      jobsCount: 3,
      description: "Pitch is the first complete platform for presentations.",
      logo: <FaBuilding className="text-3xl text-primary" />,
      color: "bg-yellow-50"
    },
    {
      id: 6,
      name: "Maze",
      location: "Paris, France",
      industry: "User Research",
      jobsCount: 6,
      description: "The user research platform that turns insights into action.",
      logo: <FaBuilding className="text-3xl text-primary" />,
      color: "bg-pink-50"
    },
  ];

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(search.toLowerCase()) ||
    company.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="bg-light-gray/30 py-16 px-4 md:px-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-dark-blue">
            Find your dream <span className="text-primary">company</span>
          </h1>
          <p className="text-gray text-lg max-w-2xl mx-auto">
            Find the dream companies you’re looking for and stay updated about their latest job openings.
          </p>
          
          <div className="bg-white shadow-xl rounded-xl p-2 flex flex-col sm:flex-row items-center gap-2 max-w-2xl mx-auto border border-gray/5">
            <div className="flex items-center gap-3 flex-1 w-full px-4 py-2">
              <FiSearch className="text-gray text-xl" />
              <input 
                type="text" 
                placeholder="Company name or industry" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent outline-none text-dark-blue font-medium"
              />
            </div>
            <button className="btn btn-primary w-full sm:w-auto px-8 h-12 rounded-lg font-bold">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 md:px-16 py-16 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-bold text-dark-blue">All Companies</h2>
            <p className="text-gray">Showing {filteredCompanies.length} companies</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCompanies.map((company) => (
            <div 
              key={company.id}
              className="group bg-white border border-gray/10 rounded-2xl p-8 hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${company.color} transition-colors`}>
                  {company.logo}
                </div>
                <span className="px-4 py-1.5 bg-primary/5 text-primary text-xs font-bold rounded-full border border-primary/10">
                  {company.jobsCount} Jobs
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-dark-blue mb-2 group-hover:text-primary transition-colors">
                {company.name}
              </h3>
              
              <div className="flex items-center gap-4 text-sm text-gray mb-4 font-medium">
                <span className="flex items-center gap-1"><FiBriefcase className="text-primary" /> {company.industry}</span>
                <span className="flex items-center gap-1"><FiMapPin className="text-primary" /> {company.location}</span>
              </div>
              
              <p className="text-gray text-sm leading-relaxed mb-8 line-clamp-2">
                {company.description}
              </p>
              
              <Link 
                href={`/find-jobs?search=${company.name}`}
                className="flex items-center justify-center gap-2 w-full py-3 bg-light-gray text-dark-blue font-bold rounded-xl group-hover:bg-primary group-hover:text-white transition-all"
              >
                View Jobs <FiArrowRight />
              </Link>
            </div>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-dark-blue mb-2">No companies found</h3>
            <p className="text-gray">Try adjusting your search criteria.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default CompaniesList;
