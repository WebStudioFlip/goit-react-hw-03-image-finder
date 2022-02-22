import ImageGalleryItem from '../ImageGalleryItem'
import PropTypes from 'prop-types';
import style from './imageGallery.module.css'

const ImageGallery = ({openModal, gallery})=> {
const elements = gallery.map(el=>{
    const {previewURL, tags, id } = el
    return <ImageGalleryItem key={String(id)} handleClick={()=> openModal(el)} src = {previewURL} alt={tags}/>})
    return (
        <ul className={style.gallery}>
        {elements}
      </ul>
    )
    
    }
    
    export default ImageGallery;

    ImageGallery.defaultProps = {
      gallery:[],
    }

    ImageGallery.propTypes = {
      openModal: PropTypes.func.isRequired,
      gallery:PropTypes.arrayOf(PropTypes.shape({
        previewURL: PropTypes.string.isRequired,
        tags: PropTypes.string,
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number]).isRequired
    }) ), 
      
    };