"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiBriefcase, FiMapPin, FiCalendar } from "react-icons/fi";
import Link from "next/link";

const MyApplicationsList = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/my-applications");
    } else if (status === "authenticated") {
      fetchApplications();
    }
  }, [status, router]);

  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/applications/user");
      const data = await res.json();
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="bg-light-gray min-h-screen py-12 px-4 md:px-16">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-dark-blue">My Applications</h1>
          <p className="text-gray mt-2">
            Track all your submitted job applications in one place.
          </p>
        </div>

        {applications.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray/5 hover:border-primary/30 transition-all group"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex gap-6">
                    <div className="w-16 h-16 bg-primary/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                      <FiBriefcase className="text-3xl text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-xl font-bold text-dark-blue group-hover:text-primary transition-colors">
                        {app.jobDetails?.title}
                      </h2>
                      <p className="text-gray font-medium">
                        {app.jobDetails?.company}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray/70">
                        <span className="flex items-center gap-1.5">
                          <FiMapPin size={16} /> {app.jobDetails?.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FiCalendar size={16} /> Applied on:{" "}
                          {new Date(app.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-end gap-4">
                    <span className="px-4 py-1.5 bg-[#56CDAD]/10 text-[#56CDAD] text-xs font-bold rounded-full border border-[#56CDAD]/20 uppercase tracking-wider">
                      Submitted
                    </span>
                    <Link
                      href={`/jobs/${app.jobDetails?._id}`}
                      className="text-primary font-bold text-sm hover:underline flex items-center gap-1"
                    >
                      View Job Details
                    </Link>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray/5">
                  <h3 className="text-sm font-bold text-dark-blue mb-2">
                    Your Cover Note:
                  </h3>
                  <p className="text-gray text-sm line-clamp-2 italic bg-light-gray/30 p-4 rounded-lg">
                    {app.cover_note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-16 text-center border border-dashed border-gray/20">
            <div className="w-20 h-20 bg-light-gray rounded-full flex items-center justify-center mx-auto mb-6">
              <FiBriefcase className="text-4xl text-gray/40" />
            </div>
            <h2 className="text-2xl font-bold text-dark-blue mb-2">
              No Applications Yet
            </h2>
            <p className="text-gray max-w-sm mx-auto mb-8">
              You haven&apos;t applied to any jobs yet. Start your journey
              today!
            </p>
            <Link href="/find-jobs" className="btn btn-primary px-8">
              Explore Jobs
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplicationsList;
