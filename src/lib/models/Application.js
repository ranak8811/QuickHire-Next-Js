export const ApplicationSchema = {
  job_id: String, // Reference to Job ID
  name: String,
  email: String,
  resume_link: String,
  cover_note: String,
  createdAt: { type: Date, default: Date.now },
};
