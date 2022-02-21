import PropTypes from "prop-types";
import style from "./notification.module.css";

const Notification = (props) => {
    const {message} = props;
return (
    <p className={style.text}>{message}</p>
)
}

Notification.propTypes = {       
        message: PropTypes.string.isRequired   
}

export default Notification;