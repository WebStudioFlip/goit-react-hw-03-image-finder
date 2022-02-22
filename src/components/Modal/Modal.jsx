import {useEffect} from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import style from './modal.module.css'



const Modal= ({handleClose, children})=> {
  const modalRoot = document.getElementById("modal-root")

  useEffect(()=> {
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
}, []);

const close = (e)=> {    
    if(e.code === "Escape") {
        return handleClose();
    }
    if(e.target === e.currentTarget) {
        handleClose()
    }
}

return createPortal((
  <div onClick={close} className={style.overlay}>
      <div className={style.content}>
          <span onClick={close} className={style.close}>X</span>
          {children}
      </div>
  </div>
), modalRoot)    
    }
    
    export default Modal;

    Modal.propTypes = {
        handleClose: PropTypes.func.isRequired,
      };