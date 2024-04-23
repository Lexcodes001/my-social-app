import React from "react";
import classes from './Footer.module.css';

const Footer = () => {
  return (
    <>
      <footer>
        <div className={classes["content"]}>
          <div className={classes["top"]}>
            <div className={classes["logo-details"]}>
              <i className={classes["fab fa-slack"]}></i>
              <span className={classes["logo_name"]}>CodingLab</span>
            </div>
            <div className={classes["media-icons"]}>
              <a href="#">
                <i className={classes["fab fa-facebook-f"]}></i>
              </a>
              <a href="#">
                <i className={classes["fab fa-twitter"]}></i>
              </a>
              <a href="#">
                <i className={classes["fab fa-instagram"]}></i>
              </a>
              <a href="#">
                <i className={classes["fab fa-linkedin-in"]}></i>
              </a>
              <a href="#">
                <i className={classes["fab fa-youtube"]}></i>
              </a>
            </div>
          </div>
          <div className={classes["link-boxes"]}>
            <ul className={classes["box"]}>
              <li className={classes["link_name"]}>Company</li>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Contact us</a>
              </li>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">Get started</a>
              </li>
            </ul>
            <ul className={classes["box"]}>
              <li className={classes["link_name"]}>Services</li>
              <li>
                <a href="#">App design</a>
              </li>
              <li>
                <a href="#">Web design</a>
              </li>
              <li>
                <a href="#">Logo design</a>
              </li>
              <li>
                <a href="#">Banner design</a>
              </li>
            </ul>
            <ul className={classes["box"]}>
              <li className={classes["link_name"]}>Account</li>
              <li>
                <a href="#">Profile</a>
              </li>
              <li>
                <a href="#">My account</a>
              </li>
              <li>
                <a href="#">Prefrences</a>
              </li>
              <li>
                <a href="#">Purchase</a>
              </li>
            </ul>
            <ul className={classes["box"]}>
              <li className={classes["link_name"]}>Courses</li>
              <li>
                <a href="#">HTML & CSS</a>
              </li>
              <li>
                <a href="#">JavaScript</a>
              </li>
              <li>
                <a href="#">Photography</a>
              </li>
              <li>
                <a href="#">Photoshop</a>
              </li>
            </ul>
            <ul className={classes["box input-box"]}>
              <li className={classes["link_name"]}>Subscribe</li>
              <li>
                <input type="text" placeholder="Enter your email" />
              </li>
              <li>
                <input type="button" value="Subscribe" />
              </li>
            </ul>
          </div>
        </div>
        <div className={classes["bottom-details"]}>
          <div className={classes["bottom_text"]}>
            <span className={classes["copyright_text"]}>
              Copyright © 2021 <a href="#">CodingLab.</a>All rights reserved
            </span>
            <span className={classes["policy_terms"]}>
              <a href="#">Privacy policy</a>
              <a href="#">Terms & condition</a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
