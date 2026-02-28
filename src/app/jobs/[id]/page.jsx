"use client";

import { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { FiMapPin, FiBriefcase, FiClock, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

const JobDetailPage = ({ params }) => {
  const { id } = use(params);
  const { data: session } = useSession();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        const data = await res.json();
        if (res.ok) {
          setJob(data);
        } else {
          toast.error(data.error || "Failed to fetch job details");
        }
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.target);
    const applicationData = {
      job_id: id,
      name: formData.get("name"),
      email: formData.get("email"),
      resume_link: formData.get("resume_link"),
      cover_note: formData.get("cover_note"),
    };

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Application submitted successfully!");
        e.target.reset();
      } else {
        toast.error(data.error || "Failed to submit application");
      }
    } catch (error) {
      toast.error("Something went wrong during submission");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-dark-blue">Job not found</h2>
        <Link href="/find-jobs" className="text-primary hover:underline mt-4 inline-block">
          Back to job listings
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-light-gray min-h-screen py-12 px-4 md:px-16">
      <div className="max-w-4xl mx-auto">
        <Link href="/find-jobs" className="flex items-center gap-2 text-gray hover:text-primary mb-8 font-medium">
          <FiArrowLeft /> Back to Jobs
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-gray/10 pb-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
                <FiBriefcase className="text-4xl text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-dark-blue">{job.title}</h1>
                <p className="text-xl text-gray">{job.company}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg">Full-Time</span>
              <span className="px-4 py-2 bg-yellow-100 text-yellow-700 text-sm font-bold rounded-lg border border-yellow-200">{job.category}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="flex items-center gap-3">
              <FiMapPin className="text-primary text-xl" />
              <div>
                <p className="text-xs text-gray uppercase font-bold tracking-wider">Location</p>
                <p className="font-semibold text-dark-blue">{job.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FiClock className="text-primary text-xl" />
              <div>
                <p className="text-xs text-gray uppercase font-bold tracking-wider">Posted On</p>
                <p className="font-semibold text-dark-blue">{new Date(job.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="prose max-w-none text-gray leading-relaxed">
            <h3 className="text-xl font-bold text-dark-blue mb-4">Job Description</h3>
            <div className="whitespace-pre-wrap">{job.description}</div>
          </div>
        </div>

        {/* Apply Now Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray/10 p-8" id="apply-form">
          <h2 className="text-2xl font-bold text-dark-blue mb-6">Apply Now</h2>
          <form onSubmit={handleApply} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-dark-blue mb-2">Full Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  defaultValue={session?.user?.name || ""}
                  className="w-full px-4 py-3 rounded-lg border border-gray/20 focus:border-primary outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark-blue mb-2">Email Address</label>
                <input
                  name="email"
                  type="email"
                  required
                  defaultValue={session?.user?.email || ""}
                  className="w-full px-4 py-3 rounded-lg border border-gray/20 focus:border-primary outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark-blue mb-2">Resume Link (URL)</label>
              <input
                name="resume_link"
                type="url"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray/20 focus:border-primary outline-none transition-all"
                placeholder="https://example.com/resume.pdf"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark-blue mb-2">Cover Note</label>
              <textarea
                name="cover_note"
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray/20 focus:border-primary outline-none transition-all resize-none"
                placeholder="Explain why you are a good fit for this role..."
              ></textarea>
            </div>
            <button
              disabled={submitting}
              type="submit"
              className="w-full md:w-auto px-12 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              {submitting ? "Submitting Application..." : "Submit Application"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
