"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiSearch, FiMapPin, FiBriefcase } from "react-icons/fi";

const FindJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const categories = [
    "Design", "Sales", "Marketing", "Finance", 
    "Technology", "Engineering", "Business", "Human Resource"
  ];

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        search,
        category,
        location
      }).toString();
      const res = await fetch(`/api/jobs?${query}`);
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [category, location]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-16 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 space-y-8">
          <div>
            <h3 className="text-lg font-bold text-dark-blue mb-4">Category</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="category" 
                  checked={category === ""} 
                  onChange={() => setCategory("")}
                  className="radio radio-primary radio-sm" 
                />
                <span className="text-gray">All Categories</span>
              </label>
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="category" 
                    checked={category === cat} 
                    onChange={() => setCategory(cat)}
                    className="radio radio-primary radio-sm" 
                  />
                  <span className="text-gray">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-dark-blue mb-4">Location</h3>
            <select 
              value={location} 
              onChange={(e) => setLocation(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">All Locations</option>
              <option value="San Francisco, US">San Francisco, US</option>
              <option value="New York, US">New York, US</option>
              <option value="London, UK">London, UK</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-8">
          <div className="flex flex-col md:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray" />
              <input
                type="text"
                placeholder="Search job title or keyword"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray/20 focus:border-primary outline-none"
              />
              <button type="submit" className="hidden">Search</button>
            </form>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-dark-blue">All Jobs</h2>
              <p className="text-gray">Showing {jobs.length} results</p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <Link 
                    href={`/jobs/${job._id}`} 
                    key={job._id}
                    className="group flex flex-col md:flex-row items-center justify-between p-6 bg-white border border-gray/10 rounded-xl hover:border-primary transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-6 w-full md:w-auto">
                      <div className="w-16 h-16 bg-light-gray rounded-lg flex items-center justify-center">
                        <FiBriefcase className="text-2xl text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-dark-blue group-hover:text-primary transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-gray">{job.company} • {job.location}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                            Full-Time
                          </span>
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full border border-yellow-200">
                            {job.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 w-full md:w-auto">
                      <button className="btn btn-primary w-full md:w-auto">Apply Now</button>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray text-lg">No jobs found matching your criteria.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default FindJobs;
