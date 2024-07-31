import "./Header.scss";
import appIcon from '../../assets/appIcon.png'

export const Header = () => {
  return (
    <div className="header">
      <img src={appIcon}/><h1>My Dog App</h1>
    </div>
  );
};
