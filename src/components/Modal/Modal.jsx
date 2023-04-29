import s from "./Modal.module.scss";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { useEffect } from "react";
import closeIcon from "../../images/iconClose.svg";

const modalRoot = document.getElementById("modals");

const Modal = ({ description, onClose, children }) => {
  useEffect(() => {
    const handlEsc = (e) => {
      e.key === "Escape" && onClose();
    };
    document.addEventListener("keydown", handlEsc);
    return () => {
      document.removeEventListener("keydown", handlEsc);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <div className={s.modal}>
        <div className={s.header}>
          <h3 className={s.title}>{description}</h3>
          <button className={s.button} onClick={onClose}>
            <img src={closeIcon} alt="close" className={s.closeIcon} />
          </button>
        </div>
        <div className={s.content}>{children}</div>
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalRoot
  );
};

export default Modal;
