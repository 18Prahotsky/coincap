import s from "./Modal.module.css";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { useEffect } from "react";
import PropTypes from "prop-types";

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
          <h3 className={`${s.title} text text_type_main-large`}>
            {description}
          </h3>
          <button className={s.button}>
            <CloseIcon type="primary" onClick={onClose} />
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

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
  description: PropTypes.string,
};
