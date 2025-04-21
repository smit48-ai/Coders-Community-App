import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 font-sans text-white">
      <div className="container px-6 py-12 mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex gap-4 hover:cursor-pointer w-full justify-center">
            <img
              src="https://www.svgrepo.com/show/303115/twitter-3-logo.svg"
              width={30}
              height={30}
              alt="tw"
              onClick={() => {
                window.open("https://x.com/SmitPrajapati99", "_blank");
              }}
              href="https://x.com/SmitPrajapati99"
            />
            <img
              src="https://www.svgrepo.com/show/303145/instagram-2-1-logo.svg"
              width={30}
              height={30}
              alt="inst"
              onClick={() => {
                window.open(
                  "https://www.instagram.com/smit_prajapati24/",
                  "_blank"
                );
              }}
              link="https://www.instagram.com/smit_prajapati24/"
            />
            <img
              src="https://www.svgrepo.com/show/94698/github.svg"
              className=""
              width={30}
              height={30}
              alt="gt"
              onClick={() => {
                window.open("https://github.com/smit48-ai", "_blank");
              }}
              link="https://github.com/smit48-ai"
            />
            <img
              src="https://www.svgrepo.com/show/28145/linkedin.svg"
              width={30}
              height={30}
              alt="in"
              onClick={() => {
                window.open(
                  "https://www.linkedin.com/in/smit-prajapati-15b0b8210/",
                  "_blank"
                );
              }}
              link="https://www.linkedin.com/in/smit-prajapati-15b0b8210/"
            />
          </div>
        </div>
        <p className="font-sans p-8 text-center md:text-center md:text-lg md:p-4">
          © 2024 Transfer. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
