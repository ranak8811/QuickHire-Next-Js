import Image from 'next/image';

const Banner = () => {
  return (
    <div className="bg-white">
      <section className="px-4 md:px-16 py-12 md:py-24 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none hidden md:block">
           <svg viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M400 0L0 600H400V0Z" fill="#4640DE"/>
           </svg>
        </div>

        <div className="flex-1 space-y-8 z-10">
          <h1 className="text-5xl md:text-[72px] font-bold text-dark-blue leading-[1.1]">
            Discover <br className="hidden md:block" />
            more than <br className="hidden md:block" />
            <span className="text-[#26A4FF] relative">
              5000+ Jobs
              <svg className="absolute -bottom-4 left-0 w-full" height="16" viewBox="0 0 320 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 12C60 2 120 2 180 12C240 2 300 2 318 12" stroke="#26A4FF" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          
          <p className="text-gray text-lg md:text-xl md:max-w-lg leading-relaxed">
            Great platform for the job seeker that searching for new career heights and passionate about startups.
          </p>

          <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-lg p-3 md:p-4 flex flex-col md:flex-row items-center gap-2 max-w-4xl border border-gray/10">
            <div className="flex items-center gap-3 flex-1 w-full border-b md:border-b-0 md:border-r border-gray/10 px-4 py-3 md:py-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-dark-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Job title or keyword" className="bg-transparent outline-none text-dark-blue w-full font-medium" />
            </div>
            
            <div className="flex items-center gap-3 flex-[0.8] w-full px-4 py-3 md:py-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-dark-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <select className="bg-transparent outline-none text-dark-blue w-full appearance-none font-medium">
                <option>Florence, Italy</option>
                <option>Remote</option>
                <option>New York, USA</option>
              </select>
            </div>
            
            <button className="btn bg-primary text-white hover:bg-primary/90 w-full md:w-auto px-10 h-14 md:h-16 rounded-lg text-lg font-bold border-none">
              Search my job
            </button>
          </div>

          <p className="text-gray text-lg">
            <span className="font-semibold text-dark-blue opacity-70">Popular:</span> <span className="font-medium">UI Designer, UX Researcher, Android, Admin</span>
          </p>
        </div>

        <div className="flex-1 relative hidden md:block z-10">
          <Image src="/assets/banner.png" alt="Discover Jobs Banner" width={700} height={700} priority className="object-contain" />
        </div>
      </section>

      {/* Companies section */}
      <div className="px-4 md:px-16 pb-16">
        <p className="text-gray text-lg mb-8 opacity-70">Companies we helped grow</p>
        <div className="flex flex-wrap items-center justify-between gap-8 opacity-40 grayscale">
          <span className="text-2xl font-bold">vodafone</span>
          <span className="text-2xl font-bold">intel.</span>
          <span className="text-2xl font-bold">TESLA</span>
          <span className="text-2xl font-bold">AMD</span>
          <span className="text-2xl font-bold">Talkit</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
