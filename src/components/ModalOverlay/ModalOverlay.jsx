import s from "./ModalOverlay.module.scss";

const ModalOverlay = ({ onClick }) => {
  return <div className={s.overlay} onClick={onClick}></div>;
};

export default ModalOverlay;
