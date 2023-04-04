import s from "./Header.module.css";
import logo from "../../logo.svg";

function Header() {
  return (
    <header className={s.header}>
      <img src={logo} className={`${s.logo}`} alt="logo" />
      <p className={s.name}>Coincap</p>
    </header>
  );
}

export default Header;
