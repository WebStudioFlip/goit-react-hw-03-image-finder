import style from './button.module.css'
import PropTypes from 'prop-types';

const Button = ({loadMore})=> {

    return (
        <button className={style.button} onClick={loadMore}>Load more</button>
    )
    
    }
    
    export default Button;

    Button.propTypes = {
        loadMore: PropTypes.func.isRequired,
      };