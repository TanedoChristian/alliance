import React, { useEffect, useState } from "react";
import ContributorsCard from "./contributors-card";
import Charles from "../img/charles.jpg";
import Racuya from "../img/racuya.jpg";

const HomePage = () => {
  const [NavColor, setNavColor] = useState(false);

  const changeNavbarColor = () => {
    if (window.scrollY >= 50) {
      setNavColor(true);
    } else {
      setNavColor(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

  return (
    <div className="block  ">
      <div
        className="w-[100%] p-1 h-screen flex"
        style={{
          backgroundImage:
            "url(https://www.alliance.com.ph/images/manage-casa-bg-low-res.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <header
          className={`flex -ml-2  h-[10vh] overflow-hidden top-0 w-full   justify-around fixed ${
            NavColor ? "bg-gray-800" : ""
          }`}
          style={{ transition: "background-color 0.5s ease" }}
          id="nav"
        >
          <div className="w-[40%] flex items-center">
            <img
              src="https://www.alliance.com.ph/images/asi-logo.svg"
              className="h-15"
            />
          </div>

          <ul className="flex gap-[4rem] items-center w-[30%] text-md font-medium invisible lg:visible text-gray-50">
            <li>
              <a
                href="#"
                className="hover:text-red-500 hover:border-b-4 hover:border-red-500"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-red-500 hover:border-b-4 hover:border-red-500"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="hover:text-red-500 hover:border-b-4 hover:border-red-500"
              >
                Login
              </a>
            </li>
          </ul>
        </header>
        <section className=" w-full mt-[7rem] flex justify-center">
          <div className="w-[90%]  flex justify-center">
            <div className="w-full flex   flex-col p-10 py-20 items-center">
              <h1
                className="lg:text-[3rem] text-white font-semibold text-[2rem]"
                style={{ fontFamily: "Montserrat" }}
              >
                Welcome to Alliance
              </h1>
              <p
                className="text-white text-center text-sm"
                style={{ fontFamily: "Montserrat" }}
              >
                Philippines' largest independent Filipino software development
                and business solutions company.
              </p>
              <div className="flex mt-5">
                <button className="p-3 px-5  bg-red-600 text-white font-medium rounded-lg shadow-xl">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Blog */}
      <section className="bg-white h-[60%]">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2
              className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900"
              style={{ fontFamily: "Montserrat" }}
            >
              News and Events
            </h2>
            <p
              className="font-light text-md text-gray-500 "
              style={{ fontFamily: "Montserrat" }}
            >
              We use an agile approach to test assumptions and connect with the
              needs of your audience early and often.
            </p>
          </div>
          <div className="flex">
            <img
              className="object-cover w-[50%] rounded-t-lg  md:h-50 md:w-50 md:rounded-none md:rounded-l-lg hidden sm:block"
              src="https://www.alliance.com.ph/images/news/img_20210625.jpg"
              alt=""
            />
            <div className="flex items-center">
              <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-xl">
                <div className="flex justify-between items-center mb-5 text-gray-500"></div>
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-700 ">
                  <a href="#">
                    Alliance Software Inc. launches SelfDrvn, perfect for
                    employee engagement
                  </a>
                </h2>
                <div className="flex w-[30%] border-2 border-red-500"></div>
                <p className="font-light text-gray-500 mt-5">
                  Static websites are now used to bootstrap lots of websites and
                  are becoming the basis for a variety of tools that even
                  influence both web designers and developers influence both web
                  designers and developers.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4"></div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white h-[60%]">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2
              className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900"
              style={{ fontFamily: "Montserrat" }}
            >
              Contributors
            </h2>
            <p
              className="font-light text-md text-gray-500 "
              style={{ fontFamily: "Montserrat" }}
            >
              We use an agile approach to test assumptions and connect with the
              needs of your audience early and often.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 gap-y-10 justify-center">
            <ContributorsCard
              name="Christian John Z. Tañedo"
              title="Pancit Canton"
              img="https://i.pinimg.com/originals/d4/33/56/d43356820873342865e5718a7daa2702.png"
              description="Imong kuya"
            />
            <ContributorsCard
              name="Kaye Denise Racuya"
              title="Project Manager"
              img={Racuya}
              description="Nice ka gaw."
            />
            <ContributorsCard
              name="Joniever Enot"
              title="Software Developer"
              img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9iG3zIMhJN_-4lA4LKwFMisKvgM5e737JkzLdU0U-tqbfifGGJBySL_Y2YIFRxGIz01E&usqp=CAU"
              description="Ungart"
            />
            <ContributorsCard
              name="Charles John Cañete"
              title="Software Developer"
              img={Charles}
              description="wa ragud."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
