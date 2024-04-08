import classes from './Navigation.module.css';

const NavigationWrapper = ({ children }) => {
  return (
    <div className={`${classes.navbar}`}>
      {children}
    </div>
  );
};

export default NavigationWrapper;
