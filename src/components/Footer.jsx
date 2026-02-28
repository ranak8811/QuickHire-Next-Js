import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#202430] text-white pt-16 pb-8 px-4 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Company Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="font-bold text-white text-sm">Q</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">QuickHire</span>
          </div>
          <p className="text-[#D6DDEB] text-base leading-relaxed max-w-xs">
            Great platform for the job seeker that searching for new career
            heights and passionate about startups.
          </p>
        </div>

        {/* About Links */}
        <div>
          <h4 className="text-xl font-bold mb-6">About</h4>
          <ul className="space-y-4 text-[#D6DDEB]">
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Companies
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Terms
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Advice
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources Links */}
        <div>
          <h4 className="text-xl font-bold mb-6">Resources</h4>
          <ul className="space-y-4 text-[#D6DDEB]">
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Help Docs
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Guide
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Updates
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-6">
          <h4 className="text-xl font-bold">Get job notifications</h4>
          <p className="text-[#D6DDEB] text-base">
            The latest job news, articles, sent to your inbox weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Write email"
              className="bg-white px-4 py-3 text-[#202430] outline-none flex-1 min-w-0"
            />
            <button className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[#D6DDEB]/50 text-sm">
          2026 @ QuickHire. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link
            href="#"
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all text-[#D6DDEB] hover:text-white"
          >
            <FaFacebookF size={14} />
          </Link>
          <Link
            href="#"
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all text-[#D6DDEB] hover:text-white"
          >
            <FaInstagram size={14} />
          </Link>
          <Link
            href="#"
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all text-[#D6DDEB] hover:text-white"
          >
            <FaTwitter size={14} />
          </Link>
          <Link
            href="#"
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all text-[#D6DDEB] hover:text-white"
          >
            <FaLinkedinIn size={14} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
