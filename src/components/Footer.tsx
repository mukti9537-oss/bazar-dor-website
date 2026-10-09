import React from 'react';

const Footer = () => {
    return (
<footer className=" bg-[#FAFCFA] w-full ">
  <div className="footer sm:footer-horizontal text-[#1D271F] items-center max-w-7xl mx-auto py-2 px-4">
  <aside className="grid-flow-col items-center">
  
    <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
  </aside>
  <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
    <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>

  </nav>
  </div>
</footer>
    );
};

export default Footer;