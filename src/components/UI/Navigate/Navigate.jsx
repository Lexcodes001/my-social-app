import React, { useContext } from 'react';
import classes from './Navigate.module.css';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../context/ThemeContext';

const Navigate = ({action}) => {
    const navigate = useNavigate();
    const {theme}  = useContext(ThemeContext);

  return (
    <>
      <button className={classes["navigate"]} onClick={() => navigate(action === 'forward' ? 1 : -1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="15"
          viewBox="0 -960 960 960"
          width="15"
        >
          <path
            fill={
              theme === "light" || theme === "grape"
                ? "var(--text-2)"
                : "var(--text-2)"
            }
            d="m142-480 294 294q15 15 14.5 35T435-116q-15 15-35 15t-35-15L57-423q-12-12-18-27t-6-30q0-15 6-30t18-27l308-308q15-15 35.5-14.5T436-844q15 15 15 35t-15 35L142-480Z"
          />
        </svg>
      </button>
    </>
  );
}

export default Navigate;