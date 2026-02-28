"use client";

import { useState, useEffect } from "react";
import Banner from "@/components/Banner";
import Link from "next/link";
import { FiArrowRight, FiBriefcase, FiMapPin } from "react-icons/fi";
import { 
  MdOutlineDesignServices, 
  MdOutlineCampaign, 
  MdOutlineAccountBalance, 
  MdOutlineCode, 
  MdOutlineBusinessCenter, 
  MdOutlineGroups 
} from "react-icons/md";
import { HiOutlineLightBulb } from "react-icons/hi";
import { IoStatsChartOutline } from "react-icons/io5";

const HomePage = () => {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { name: "Design", count: "235 jobs available", icon: <MdOutlineDesignServices className="text-3xl" />, color: "bg-blue-50 text-blue-600" },
    { name: "Sales", count: "756 jobs available", icon: <IoStatsChartOutline className="text-3xl" />, color: "bg-indigo-50 text-indigo-600" },
    { name: "Marketing", count: "140 jobs available", icon: <MdOutlineCampaign className="text-3xl" />, color: "bg-purple-50 text-purple-600" },
    { name: "Finance", count: "325 jobs available", icon: <MdOutlineAccountBalance className="text-3xl" />, color: "bg-cyan-50 text-cyan-600" },
    { name: "Technology", count: "436 jobs available", icon: <HiOutlineLightBulb className="text-3xl" />, color: "bg-blue-50 text-blue-600" },
    { name: "Engineering", count: "542 jobs available", icon: <MdOutlineCode className="text-3xl" />, color: "bg-indigo-50 text-indigo-600" },
    { name: "Business", count: "211 jobs available", icon: <MdOutlineBusinessCenter className="text-3xl" />, color: "bg-purple-50 text-purple-600" },
    { name: "Human Resource", count: "346 jobs available", icon: <MdOutlineGroups className="text-3xl" />, color: "bg-cyan-50 text-cyan-600" },
  ];

  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        setFeaturedJobs(data.slice(0, 8));
      } catch (error) {
        console.error("Error fetching featured jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedJobs();
  }, []);

  return (
    <main className="bg-white overflow-hidden">
      <Banner />

      {/* Explore by Category */}
      <section className="px-4 md:px-16 py-16 md:py-24">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-dark-blue leading-tight">
            Explore by <span className="text-[#26A4FF]">category</span>
          </h2>
          <Link href="/find-jobs" className="flex items-center gap-2 text-primary font-bold hover:underline mb-2">
            Show all jobs <FiArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <Link 
              href={`/find-jobs?category=${cat.name}`} 
              key={idx}
              className="group p-8 border border-gray/10 rounded-xl hover:bg-primary transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-white/20 group-hover:text-white transition-colors ${cat.color}`}>
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold text-dark-blue group-hover:text-white mb-2">{cat.name}</h3>
              <p className="text-gray group-hover:text-white/80 flex items-center justify-between">
                {cat.count}
                <FiArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Start posting jobs today CTA */}
      <section className="px-4 md:px-16 pb-16">
        <div className="bg-primary rounded-none p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-white overflow-hidden relative min-h-[400px]">
          {/* Decorative Corner Designs */}
          {/* Top Left Pattern */}
          <div className="absolute top-0 left-0 w-48 h-48 opacity-20">
             <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="10" fill="white" />
                <circle cx="60" cy="20" r="10" fill="white" />
                <circle cx="100" cy="20" r="10" fill="white" />
                <circle cx="20" cy="60" r="10" fill="white" />
                <circle cx="60" cy="60" r="10" fill="white" />
                <circle cx="20" cy="100" r="10" fill="white" />
             </svg>
          </div>
          {/* Bottom Right Pattern - Wave/Slant */}
          <div className="absolute bottom-0 right-0 w-64 h-64 opacity-20">
             <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M200 0L200 200L0 200C100 200 200 100 200 0Z" fill="white"/>
             </svg>
          </div>

          <div className="flex-1 space-y-6 z-10">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Start posting <br /> jobs today
            </h2>
            <p className="text-white/80 text-xl max-w-md">
              Start posting jobs today and find your best candidate from our 1M+ active job seekers.
            </p>
            <button className="bg-white text-primary hover:bg-white/90 px-10 py-4 font-bold text-lg mt-2 transition-all">
              Sign Up For Free
            </button>
          </div>

          <div className="flex-1 relative z-10 flex justify-center md:justify-end">
             <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-lg shadow-2xl max-w-sm w-full">
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-12 h-12 bg-white/20 rounded-md"></div>
                   <div className="space-y-2">
                      <div className="h-3 w-32 bg-white/40 rounded"></div>
                      <div className="h-2 w-20 bg-white/20 rounded"></div>
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="h-2 w-full bg-white/20 rounded"></div>
                   <div className="h-2 w-full bg-white/20 rounded"></div>
                   <div className="h-2 w-2/3 bg-white/20 rounded"></div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                   <div className="h-3 w-24 bg-white/30 rounded"></div>
                   <div className="h-8 w-24 bg-white/20 rounded"></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="px-4 md:px-16 py-16 md:py-24 bg-light-gray/30">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-dark-blue leading-tight">
            Featured <span className="text-[#26A4FF]">jobs</span>
          </h2>
          <Link href="/find-jobs" className="flex items-center gap-2 text-primary font-bold hover:underline mb-2">
            Show all jobs <FiArrowRight />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredJobs.length > 0 ? (
              featuredJobs.map((job) => (
                <Link 
                  href={`/jobs/${job._id}`} 
                  key={job._id}
                  className="group bg-white p-6 border border-gray/10 rounded-none hover:border-primary transition-all shadow-sm flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-light-gray flex items-center justify-center">
                      <FiBriefcase className="text-2xl text-primary" />
                    </div>
                    <span className="px-3 py-1 border border-primary text-primary text-xs font-bold">
                      Full Time
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-dark-blue mb-1 group-hover:text-primary transition-colors line-clamp-1">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray mb-4">{job.company} • {job.location}</p>
                  <p className="text-sm text-gray line-clamp-2 mb-6 h-10 flex-grow">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-1.5 bg-[#56CDAD]/10 text-[#56CDAD] text-xs font-bold rounded-full border border-[#56CDAD]/20">
                      {job.category}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray text-lg">No jobs posted yet. Check back soon!</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Latest jobs open */}
      <section className="px-4 md:px-16 py-16 md:py-24">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-dark-blue leading-tight">
            Latest <span className="text-[#26A4FF]">jobs open</span>
          </h2>
          <Link href="/find-jobs" className="flex items-center gap-2 text-primary font-bold hover:underline mb-2">
            Show all jobs <FiArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredJobs.slice(0, 8).map((job) => (
            <Link 
              href={`/jobs/${job._id}`} 
              key={job._id}
              className="flex items-start gap-6 p-6 border border-gray/10 hover:bg-light-gray/20 transition-all group"
            >
              <div className="w-16 h-16 bg-light-gray flex-shrink-0 flex items-center justify-center">
                <FiBriefcase className="text-3xl text-primary" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-start">
                   <h3 className="text-xl font-bold text-dark-blue group-hover:text-primary transition-colors">{job.title}</h3>
                   <span className="px-3 py-1 bg-primary/5 text-primary text-xs font-bold border border-primary/10">Full Time</span>
                </div>
                <p className="text-gray text-base">{job.company} • <FiMapPin className="inline mb-1" /> {job.location}</p>
                <div className="flex flex-wrap gap-2">
                   <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">Engineering</span>
                   <span className="px-3 py-1 bg-yellow-50 text-yellow-600 text-xs font-bold rounded-full">Operations</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
