import React, { useEffect, useState } from "react";
import classes from "./AuthHomePage.module.css";
import { Link } from "react-router-dom";
import { NavHashLink, HashLink } from "react-router-hash-link";
import Hero from "../../assets/images/hero.svg";
import FeatureOne from "../../assets/images/feature_1.svg";
import FeatureTwo from "../../assets/images/feature_2.svg";
import FeatureThree from "../../assets/images/feature_3.png";
import FeatureFour from "../../assets/images/feature_4.svg";
import Flat_content from "../../assets/images/flat_content.svg";
import Flat_tribe from "../../assets/images/flat_tribe.svg";
import Flat_influence from "../../assets/images/flat_influence.svg";
import Flat_analytics from "../../assets/images/flat_analytics.svg";
import Main_content from "../../assets/images/main_content.jpg";
import Main_tribe from "../../assets/images/main_tribe.jpg";
import Main_influence from "../../assets/images/main_influence.jpg";
import Main_analytics from "../../assets/images/main_analytics.jpg";
import DPM1 from "../../assets/images/dpM1.jpg";
import DPM2 from "../../assets/images/dpM2.jpg";
import DPM3 from "../../assets/images/dpM3.jpg";
import DPM4 from "../../assets/images/dpM4.jpg";
import DPM5 from "../../assets/images/dpM5.jpg";
import DPF1 from "../../assets/images/dpF1.jpg";
import DPF2 from "../../assets/images/dpF2.jpg";
import { motion, AnimatePresence } from "framer-motion";

const AuthHomePage = () => {
  const Links = [
    {
      id: "Feature",
      url: "/auth/",
      name: "Features",
      icon: "",
    },
    {
      id: "Discover",
      url: "/auth#discover",
      name: "Discover",
      icon: "",
    },
    {
      id: "Stories",
      url: "/auth#stories",
      name: "Stories",
      icon: "",
    },
    {
      id: "Community",
      url: "/auth#community",
      name: "Top Community",
      icon: "",
    },
    {
      id: "Blog",
      url: "/auth#blog",
      name: "What's Update",
      icon: "",
    },
  ];

  const discoveries = [
    {
      id: 0,
      header: "Stand Out, Shine Bright",
      desc: "Create captivating and distinctive content that's distinctly yours",
      main_img: Main_content,
      flat_img: Flat_content,
    },
    {
      id: 1,
      header: "Uncover Your Tribe",
      desc: "Explore diverse communities, uncover new passions, and connect with like-minded individuals",
      main_img: Main_tribe,
      flat_img: Flat_tribe,
    },
    {
      id: 2,
      header: "Influence, Inspire, Impact",
      desc: "Build your personal brand, cultivate authentic connections, and become an influential voice",
      main_img: Main_influence,
      flat_img: Flat_influence,
    },
    {
      id: 3,
      header: "Data-Driven Success",
      desc: "Gain valuable insights with advanced analytics for data-driven growth and optimization",
      main_img: Main_analytics,
      flat_img: Flat_analytics,
    },
  ];

  const stories = [
    {
      id: 0,
      name: "John Doe",
      username: "geedoe00",
      avatar: DPM1,
      testimony:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet et massa venenatis molestie. Pellentesque facilisis lacinia nunc id suscipit. Curabitur laoreet, lorem sit amet facilisis dignissim, magna lacus tristique orci, ullamcorper vehicula est sem at leo. Phasellus id dapibus sapien.",
    },
    {
      id: 1,
      name: "John Doe",
      username: "geedoe00",
      avatar: DPM2,
      testimony:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet et massa venenatis molestie. Pellentesque facilisis lacinia nunc id suscipit. Curabitur laoreet, lorem sit amet facilisis dignissim, magna lacus tristique orci, ullamcorper vehicula est sem at leo. Phasellus id dapibus sapien.",
    },
    {
      id: 2,
      name: "Jane Doe",
      username: "baddiejane00",
      avatar: DPF1,
      testimony:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet et massa venenatis molestie. Pellentesque facilisis lacinia nunc id suscipit. Curabitur laoreet, lorem sit amet facilisis dignissim, magna lacus tristique orci, ullamcorper vehicula est sem at leo. Phasellus id dapibus sapien.",
    },
    {
      id: 3,
      name: "John Doe",
      username: "geedoe00",
      avatar: DPM3,
      testimony:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet et massa venenatis molestie. Pellentesque facilisis lacinia nunc id suscipit. Curabitur laoreet, lorem sit amet facilisis dignissim, magna lacus tristique orci, ullamcorper vehicula est sem at leo. Phasellus id dapibus sapien.",
    },
    {
      id: 4,
      name: "Jane Doe",
      username: "baddiejane00",
      avatar: DPF2,
      testimony:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet et massa venenatis molestie. Pellentesque facilisis lacinia nunc id suscipit. Curabitur laoreet, lorem sit amet facilisis dignissim, magna lacus tristique orci, ullamcorper vehicula est sem at leo. Phasellus id dapibus sapien.",
    },
    {
      id: 5,
      name: "John Doe",
      username: "geedoe00",
      avatar: DPM4,
      testimony:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet et massa venenatis molestie. Pellentesque facilisis lacinia nunc id suscipit. Curabitur laoreet, lorem sit amet facilisis dignissim, magna lacus tristique orci, ullamcorper vehicula est sem at leo. Phasellus id dapibus sapien.",
    },
    {
      id: 6,
      name: "John Doe",
      username: "geedoe00",
      avatar: DPM5,
      testimony:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet et massa venenatis molestie. Pellentesque facilisis lacinia nunc id suscipit. Curabitur laoreet, lorem sit amet facilisis dignissim, magna lacus tristique orci, ullamcorper vehicula est sem at leo. Phasellus id dapibus sapien.",
    },
  ];

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const [activeId, setActiveId] = useState(3);
  const [newStories, setNewStories] = useState([]);

  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    if (page === 3 && newDirection === 1) {
      setPage([0, newDirection]);
    } else if (page === 0 && newDirection === -1) {
      setPage([3, newDirection]);
    } else {
      setPage([page + newDirection, newDirection]);
    }
  };

  useEffect(() => {
    const activeStoryIndex = stories.findIndex(
      (story) => story.id === activeId
    );
    const remainingStoryIndexes = stories.filter(
      (story) => story.id !== activeId
    );
    const reorderedStories = [
      ...remainingStoryIndexes.slice(0, 3),
      stories[activeStoryIndex],
      ...remainingStoryIndexes.slice(3)
    ];
    setNewStories(reorderedStories);
  }, [activeId]);

  return (
    <main className={classes["main"]}>
      <section className={`${classes["section"]} ${classes["home"]}`}>
        <div className={classes["header"]}>
          <div className={classes["texts"]}>
            <header>Bringing you closer to the people.</header>
            <p>
              Nam sollicitud nunc, cursus eros vulputate sedd. Vestibulum
              lobortis.
            </p>
            <NavHashLink className={classes["action"]} to={"/auth#footer"}>
              Continue
            </NavHashLink>
          </div>
          <img src={Hero} alt="hero image" />
        </div>

        {/* <div>
          <button>
            <h3>Business Solution</h3>
            <p>Interdam et malesih ac ante..</p>
          </button>
          <button>
            <h3>Free project quote</h3>
            <p>Interdam et malesih ac ante..</p>
          </button>
          <button>
            <h3>Lunda heee tha pro thing</h3>
            <p>Interdam et malesih ac ante..</p>
          </button>
        </div> */}
      </section>

      <section
        className={`${classes["section"]} ${classes["features"]}`}
        id="features"
      >
        <h1>Features</h1>
        <main>
          <div className={classes["feature"]}>
            <img src={FeatureOne} alt="feature_illustration" />
            <div className={classes["texts"]}>
              <h2>Elegance at Your Fingertips</h2>
              <p>
                Intuitive design meets captivating visuals for a seamless
                experience across devices.
              </p>
            </div>
          </div>
          <div className={classes["feature"]}>
            <img src={FeatureTwo} alt="feature_illustration" />
            <div className={classes["texts"]}>
              <h2>Connecting Worlds, Building Bonds</h2>
              <p>
                Real-time messaging, effortless multimedia sharing, and robust
                communication tools to bridge the digital divide.
              </p>
            </div>
          </div>
          <div className={classes["feature"]}>
            <img src={FeatureThree} alt="feature_illustration" />
            <div className={classes["texts"]}>
              <h2>Your Digital Sanctuary, Fortified</h2>
              <p>
                End-to-end encryption, user verification, and customizable
                privacy settings to safeguard your sensitive information.
              </p>
            </div>
          </div>
          <div className={classes["feature"]}>
            <img src={FeatureFour} alt="feature_illustration" />
            <div className={classes["texts"]}>
              <h2>Where Connections Thrive, Relationships Bloom</h2>
              <p>
                Personalized user profiles, friend discovery, content sharing,
                and interactive features to cultivate meaningful connections.
              </p>
            </div>
          </div>
        </main>
      </section>

      <section
        className={`${classes["section"]} ${classes["discover"]}`}
        id="discover"
      >
        <h1>Discover</h1>

        <div className={classes["slideshow"]}>
          <AnimatePresence initial={false} custom={direction}>
            {discoveries.map((item) => (
              <motion.div
                key={item.header}
                className={`${classes["slide"]} ${
                  page === item.id && classes.active
                } ${page === item.id - 1 && classes.leftActive} ${
                  page === item.id + 1 && classes.rightActive
                }`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                //exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
              >
                <motion.img
                  className={classes["main-img"]}
                  src={item.main_img}
                  alt="main-img"
                />
                <motion.img
                  className={classes["flat-img"]}
                  src={item.flat_img}
                  alt="flat-img"
                />
                <motion.article>
                  <h3>{item.header}</h3>
                  <p>{item.desc}</p>
                </motion.article>
              </motion.div>
            ))}
            <div className={classes["next"]} onClick={() => paginate(1)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                x="0px"
                y="0px"
                width="40px"
                height="40px"
                viewBox="0 0 100 125"
                style={{ enableBackground: "new 0 0 100 100" }}
              >
                <switch>
                  <g>
                    <path
                      fill="var(--text-1)"
                      d="M97.5,50C97.5,23.8,76.2,2.5,50,2.5S2.5,23.8,2.5,50c0,26.2,21.3,47.5,47.5,47.5S97.5,76.2,97.5,50z M50.2,68.7L36.1,54.5    c-1.2-1.2-1.9-2.9-1.9-4.5c0-1.6,0.6-3.3,1.9-4.5l14.2-14.2c2.5-2.5,6.5-2.5,9,0c2.5,2.5,2.5,6.5,0,9L49.6,50l9.7,9.7    c2.5,2.5,2.5,6.5,0,9C56.8,71.2,52.7,71.2,50.2,68.7z"
                    />
                  </g>
                </switch>
              </svg>
            </div>
            <div className={classes["prev"]} onClick={() => paginate(-1)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                x="0px"
                y="0px"
                width="40px"
                height="40px"
                viewBox="0 0 100 125"
                style={{ enableBackground: "new 0 0 100 100" }}
              >
                <switch>
                  <g>
                    <path
                      fill="var(--text-1)"
                      d="M97.5,50C97.5,23.8,76.2,2.5,50,2.5S2.5,23.8,2.5,50c0,26.2,21.3,47.5,47.5,47.5S97.5,76.2,97.5,50z M50.2,68.7L36.1,54.5    c-1.2-1.2-1.9-2.9-1.9-4.5c0-1.6,0.6-3.3,1.9-4.5l14.2-14.2c2.5-2.5,6.5-2.5,9,0c2.5,2.5,2.5,6.5,0,9L49.6,50l9.7,9.7    c2.5,2.5,2.5,6.5,0,9C56.8,71.2,52.7,71.2,50.2,68.7z"
                    />
                  </g>
                </switch>
              </svg>
            </div>
          </AnimatePresence>
        </div>
        <div className={classes["navigation"]}>
          {discoveries.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setPage([item.id, 0]);
              }}
              className={`${page === item.id && classes.active}`}
            ></button>
          ))}
        </div>
      </section>

      <section
        className={`${classes["section"]} ${classes["stories"]}`}
        id="stories"
      >
        <h1>Stories</h1>
        <div className={classes["avatars"]}>
          {newStories.map((elem) => (
            <img
              onClick={() => {
                setActiveId(elem.id);
              }}
              className={`${activeId === elem.id && classes["active"]}`}
              src={elem.avatar}
              alt={`user${elem.id}avatar`}
            />
          ))}
        </div>

        <article>
          <span className={classes["names"]}>
            <p>{stories[activeId].name}</p>
            <p>•</p>
            <p>@{stories[activeId].username}</p>
          </span>
          <span className={classes["testimony"]}>
            {stories[activeId].testimony}
          </span>
        </article>
      </section>

      <section
        className={`${classes["section"]} ${classes["community"]}`}
        id="community"
      >
        <h1>Top Community</h1>
        <div className={classes["relative"]}>
          <div className={classes["forum"]}>
            <span className={classes["dp"]}>
              <img src="" alt="" />
            </span>
            <span className={classes["members"]}>
              <img src="" alt="" />
              <img src="" alt="" />
              <img src="" alt="" />
              <img src="" alt="" />
              <img src="" alt="" />
              <span className={classes["count"]}>100+</span>
            </span>
            <p></p>
          </div>
          <button>EXPLORE ALL COMMUNITIES</button>
        </div>
      </section>

      <section className={`${classes["section"]} ${classes["blog"]}`} id="blog">
        <h1>What's Update</h1>
        <p>Read the latest blog below</p>
        <div className={classes["blogs"]}>
          <div className={classes["blog-box"]}>
            <img src="" alt="" />
            <p className={classes["headline"]}></p>
            <p className={classes["briefing"]}></p>
            <button>Read more...</button>
          </div>
        </div>
      </section>

      <section
        className={`${classes["section"]} ${classes["footer"]}`}
        id="footer"
      >
        <p>What are you waiting for? Sign up today!</p>
        <button>Sign Up</button>
      </section>
    </main>
  );
};

export default AuthHomePage;
