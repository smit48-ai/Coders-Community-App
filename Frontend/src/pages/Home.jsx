import React from "react";
import Navbar from "../components/Navbar";
import Intro from "../components/Intro";
import Carousel from "../components/Carousel";

function Home(props) {
  return (
    <div className="w-full bg-gray-950">
      <Navbar />
      <Intro />

      <div
        className="bg-white grid grid-cols-2 max-sm:grid-cols-1"
        // style={{ gridAutoRows: "600px" }}
      >
        <Carousel />
        <div className="bg-white text-center flex items-center justify-center">
          <div>
            <h1 className="font-Poppins text-3xl z-10 my-2">Our Features</h1>
            <div className="font-Poppins max-md:mb-10">
              Discover the outstanding features that empower our coding
              community! From innovative tools to seamless integrations, our
              platform is designed to elevate your coding experience. Explore a
              world of possibilities and unlock your full potential with our
              cutting-edge features. Join us today and be part of a community
              that thrives on excellence!
            </div>
          </div>
        </div>
      </div>
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl align-middle flex flex-col items-center justify-center">
          <span className="text-3xl text-white">Shaper</span>
          <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 font-Poppins text-white sm:text-2xl sm:leading-9">
              <p>
                “This platform is a fruitful resource for individuals looking to
                learn and share their knowledge in one convenient location,
                reducing the clutter and making information easily accessible.”
              </p>
            </blockquote>
            <figcaption className="mt-10">
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold text-white font-Poppins">
                  Smit Prajapati | Developer
                </div>
                <svg
                  viewBox="0 0 2 2"
                  width={3}
                  height={3}
                  aria-hidden="true"
                  className="fill-gray-900"
                >
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <div className="text-gray-600"></div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
    </div>
  );
}

export default Home;
