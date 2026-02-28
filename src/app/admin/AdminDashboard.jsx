"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { FiPlus, FiTrash2, FiBriefcase, FiMapPin, FiTag } from "react-icons/fi";

const AdminDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    "Design", "Sales", "Marketing", "Finance", 
    "Technology", "Engineering", "Business", "Human Resource"
  ];

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/admin");
    } else if (status === "authenticated") {
      if (session.user.role !== "admin") {
        toast.error("Access denied. Admins only.");
        router.push("/");
      } else {
        fetchJobs();
      }
    }
  }, [status, session, router]);

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4640DE",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
        if (res.ok) {
          Swal.fire({
            title: "Deleted!",
            text: "Your job listing has been deleted.",
            icon: "success",
            confirmButtonColor: "#4640DE",
          });
          setJobs(jobs.filter(job => job._id !== id));
        } else {
          const data = await res.json();
          toast.error(data.error || "Failed to delete job");
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.target);
    const jobData = {
      title: formData.get("title"),
      company: formData.get("company"),
      location: formData.get("location"),
      category: formData.get("category"),
      description: formData.get("description"),
    };

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });

      if (res.ok) {
        toast.success("Job posted successfully!");
        e.target.reset();
        fetchJobs();
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to post job");
      }
      } catch (error) {
      toast.error("Something went wrong");
      } finally {
      setSubmitting(false);
      }
      };

      if (status === "loading" || loading) {
      return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
      );
      }

      if (session?.user?.role !== "admin") {
      return null;
      }


  return (
    <div className="bg-light-gray min-h-screen py-12 px-4 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-dark-blue">Admin Dashboard</h1>
            <p className="text-gray">Manage your job listings and applications</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border border-gray/10 shadow-sm">
            <span className="text-sm text-gray font-medium">Logged in as: </span>
            <span className="text-sm font-bold text-primary">{session?.user?.email}</span>
            <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded uppercase">
              {session?.user?.role}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Job Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-6 sticky top-8">
              <h2 className="text-xl font-bold text-dark-blue mb-6 flex items-center gap-2">
                <FiPlus className="text-primary" /> Post New Job
              </h2>
              <form onSubmit={handleAddJob} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-dark-blue mb-1">Job Title</label>
                  <input name="title" type="text" required placeholder="e.g. Software Engineer" className="w-full px-4 py-2 rounded-lg border border-gray/20 focus:border-primary outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark-blue mb-1">Company</label>
                  <input name="company" type="text" required placeholder="e.g. Google" className="w-full px-4 py-2 rounded-lg border border-gray/20 focus:border-primary outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark-blue mb-1">Location</label>
                  <input name="location" type="text" required placeholder="e.g. Remote" className="w-full px-4 py-2 rounded-lg border border-gray/20 focus:border-primary outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark-blue mb-1">Category</label>
                  <select name="category" required className="select select-bordered select-sm w-full">
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark-blue mb-1">Description</label>
                  <textarea name="description" required rows={4} placeholder="Job requirements..." className="w-full px-4 py-2 rounded-lg border border-gray/20 focus:border-primary outline-none text-sm resize-none"></textarea>
                </div>
                <button disabled={submitting} type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50">
                  {submitting ? "Posting..." : "Post Job"}
                </button>
              </form>
            </div>
          </div>

          {/* Job List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray/10 overflow-hidden">
              <div className="p-6 border-b border-gray/10">
                <h2 className="text-xl font-bold text-dark-blue">Active Job Listings</h2>
              </div>
              <div className="divide-y divide-gray/10">
                {jobs.length > 0 ? (
                  jobs.map((job) => (
                    <div key={job._id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-light-gray/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FiBriefcase className="text-xl text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-dark-blue">{job.title}</h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray">
                            <span className="flex items-center gap-1"><FiMapPin size={14} /> {job.location}</span>
                            <span className="flex items-center gap-1"><FiTag size={14} /> {job.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 w-full md:w-auto">
                        <button 
                          onClick={() => handleDelete(job._id)}
                          className="btn btn-ghost btn-sm text-red-500 hover:bg-red-50 flex-1 md:flex-none"
                        >
                          <FiTrash2 /> Delete
                        </button>
                        <button 
                          onClick={() => router.push(`/jobs/${job._id}`)}
                          className="btn btn-outline btn-sm btn-primary flex-1 md:flex-none"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center text-gray">
                    <p>No jobs found. Start by posting one!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
