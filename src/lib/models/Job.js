export const JobSchema = {
  title: String,
  company: String,
  location: String,
  category: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
};
