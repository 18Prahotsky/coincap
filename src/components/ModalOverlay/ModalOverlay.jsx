import s from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ onClick }) => {
  return <div className={s.overlay} onClick={onClick}></div>;
};

export default ModalOverlay;

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

