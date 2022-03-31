import {Component} from "react";
import {createPortal} from "react-dom";
import PropTypes from 'prop-types';
import style from './modal.module.css'

const modalRoot = document.getElementById("modal-root")

class Modal extends Component {

    close = (e)=> {    
        if(e.code === "Escape") {
            return this.props.handleClose();
        }
        if(e.target === e.currentTarget) {
            this.props.handleClose()
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.close)
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.close)
    }

    render() {   
        return createPortal((
            <div onClick={this.close} className={style.overlay}>
                <div className={style.content}>
                    <span onClick={this.close} className={style.close}>X</span>
                    {this.props.children}
                </div>
            </div>
          ), modalRoot)   
    }
} 
    
    export default Modal;

    Modal.propTypes = {
        handleClose: PropTypes.func.isRequired,
      };