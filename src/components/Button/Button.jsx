import style from './button.module.css'
import PropTypes from 'prop-types';

const Button = ({loadMore, label})=> {

    return (
        <button className={style.button} onClick={loadMore}>{label}</button>
    )
    
    }
    
    export default Button;

    Button.propTypes = {
        loadMore: PropTypes.func.isRequired,
        label: PropTypes.string.isRequired,
      };