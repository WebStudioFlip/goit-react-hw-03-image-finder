import { Component } from 'react';
import { searchGallery } from '../../shared/services/gallery';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import Loader from '../Loader';
import Searchbar from '../Searchbar';
import { PER_PAGE } from '../../shared/variables/variables'; 
import Modal from '../Modal';
import style from './gallery.module.css'

class Gallery extends Component {
state = {
  data : {gallery: [],
    totalPages: 1,
    loading: false,
    error: null,} ,
  search:"",
  page:1,
  modal: {
    open: false,
    content: null,
    }
}

componentDidUpdate(prevProps, prevState) {
  const {search, page} =this.state
  if (prevState.search !== search || prevState.page !== page) {
    if (search) {
      this.fetchGallery();
      this.setState(prepState => {
        const {data} = prepState
        return{
        data:{ ...data,
          loading: true,}     
      }});
    }
  }  
}

fetchGallery = async () => {
  const {page, search} = this.state
  try {
    const { hits, totalHits } = await searchGallery(page, search);    
    this.setState(prevState => {
let {page} = prevState;
      if (page===1) { 
        return {data:{
          gallery: [...hits],
          totalPages: Math.max(Math.ceil(totalHits / PER_PAGE), 1),
          loading: false,
          error: null,
        }};
      } 
      else {
        return {data:{
          gallery: [...prevState.data.gallery, ...hits],
          totalPages: Math.max(Math.ceil(totalHits / PER_PAGE), 1),
          loading: false,
          error: null,
        }};
      }
    });
  } catch (error) {
    this.setState(prevState => {
      return {data:{
        ...prevState.data,
        loading: false,
      error: error.message,
      }}
    })    
  }
};  

  changeSearch = ({ search }) => {this.setState(prevState=>{return{search, page:1}})};

  loadMore = () => this.setState(prevState => {return {page: prevState.page + 1}});

  openModal = content => {
    this.setState({modal:{
      open: true,
      content,
    }});
  };

  closeModal = () => {
    this.setState({modal:{
      open: false,
      content: null,
    }});
  };
render () {  
  const { error, gallery, loading, totalPages } = this.state.data;
const {modal, search, page} =this.state
  return (
    <>
      <div id="modal-root"></div>
      <Searchbar onSubmit={this.changeSearch} />
      {error && <p>Ошибка поиска</p>}
      {!gallery.length && search && !loading && !error && (
        <p>Ничего не найдено</p>
      )}
      {loading && <Loader />}
      <ImageGallery openModal={this.openModal} gallery={gallery} />

      {modal.open && (
        <Modal handleClose={this.closeModal}>
          <div className={style.modal}>
            <img className={style.image} src={modal.content.largeImageURL} alt={modal.content.tags} />
          </div>
        </Modal>
      )}
      {Boolean(gallery.length) && totalPages > page && (
        <Button loadMore={this.loadMore} />
      )}
    </>
  );
}
};

export default Gallery;
