import React from "react";
import classes from "./AuthHomepage.module.css";
import { Link } from "react-router-dom";

const AuthHomePage = () => {
  return (
    <main className={classes["main"]}>
      <section>
        <img src="" alt="" />
        <div>
          <h1>Lorem Ipsum sdi efh efj efih ifh hfi hqg ehqh</h1>
          <p>
            Nam sollicitud nunc, cursus eros vulputate sedd. Vestibulum
            lobortis.
          </p>
          <span className={classes["links"]}>
            <Link>
              <img src="" alt="" />
            </Link>
            <Link>
              <img src="" alt="" />
            </Link>
          </span>
        </div>
      </section>
      <section>
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
      </section>
      <section>
        <h1>Features</h1>
        <div>
          <img src="" alt="" />
          <div>
            <h2>Free project quote</h2>
            <p>
              Interdam et malesih ac ante. Interdam et malesih ac ante. Interdam
              et malesih ac ante..
            </p>
          </div>
        </div>
        <div>
          <img src="" alt="" />
          <div>
            <h2>Free project quote</h2>
            <p>
              Interdam et malesih ac ante. Interdam et malesih ac ante. Interdam
              et malesih ac ante..
            </p>
          </div>
        </div>
        <div>
          <img src="" alt="" />
          <div>
            <h2>Free project quote</h2>
            <p>
              Interdam et malesih ac ante. Interdam et malesih ac ante. Interdam
              et malesih ac ante..
            </p>
          </div>
        </div>
      </section>
      <section>
        <h1>Discover</h1>
        <div className={classes["slideshow"]}>
          <div className={classes["slide"]}>
            <img className={["slide-img"]} src="" alt="" />
            <div>
              <img className={["slide-illustration"]} src="" alt="" />
              <div>
                <h3>Stand Out</h3>
                <p>Build influence and create compelling content that's distinctly yours</p>
              </div>
            </div>
          </div>
          <div className={classes["slide"]}>
            <img className={["slide-img"]} src="" alt="" />
            <div>
              <img className={["slide-illustration"]} src="" alt="" />
              <div>
                <h3>Stand Out</h3>
                <p>Build influence and create compelling content that's distinctly yours</p>
              </div>
            </div>
          </div>
          <div className={classes["slide"]}>
            <img className={["slide-img"]} src="" alt="" />
            <div>
              <img className={["slide-illustration"]} src="" alt="" />
              <div>
                <h3>Stand Out</h3>
                <p>Build influence and create compelling content that's distinctly yours</p>
              </div>
            </div>
          </div>
        </div>
        <div className={classes["navigation"]}>
            <button></button>
            <button></button>
            <button></button>
        </div>
      </section>
      <section></section>
      <section></section>
      <section></section>
      <section></section>
      <section></section>
    </main>
  );
};

export default AuthHomePage;
