import PropTypes from 'prop-types';
import style from './imageGalleryItem.module.css'

const ImageGalleryItem = ({src, alt, handleClick})=> {
    
    return (
        <li className={style.galleryItem} onClick={handleClick}>
        
              <img
                className={style.image}                
                src={src}
                alt={alt}               
              />
           
      </li>
    )
    
    }
    
    export default ImageGalleryItem;

    ImageGalleryItem.propTypes = {
      handleClick: PropTypes.func.isRequired,
      src:PropTypes.string, 
      alt:PropTypes.string,
    };