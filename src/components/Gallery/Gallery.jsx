import { useState, useEffect } from 'react';
import { searchGallery } from '../../shared/services/gallery';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import Loader from '../Loader';
import Searchbar from '../Searchbar';
import { PER_PAGE } from '../../shared/variables/variables'; 
import Modal from '../Modal';
import style from './gallery.module.css'

const Gallery = () => {
  const [data, setData] = useState({
    gallery: [],
    totalPages: 1,
    loading: false,
    error: null,
  });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState({
    open: false,
    content: null,
  });

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { hits, totalHits } = await searchGallery(page, search);

        setData(prevState => {
          if (page===1) { 
            return {
              gallery: [...hits],
              totalPages: Math.max(Math.ceil(totalHits / PER_PAGE), 1),
              loading: false,
              error: null,
            };
          } 
          else {
            return {
              gallery: [...prevState.gallery, ...hits],
              totalPages: Math.max(Math.ceil(totalHits / PER_PAGE), 1),
              loading: false,
              error: null,
            };
          }
        });
      } catch (error) {
        setData({
          ...data,
          loading: false,
          error: error.message,
        });
      }
    };

    if (search) {
      fetchGallery();
      setData({
        ...data,
        loading: true,
      });
    }
  }, [search, page]);

  const changeSearch = ({ search }) => {setSearch(search)
    setPage(1)};

  const loadMore = () => setPage(prevState => prevState + 1);

  const openModal = content => {
    setModal({
      open: true,
      content,
    });
  };

  const closeModal = () => {
    setModal({
      open: false,
      content: null,
    });
  };

  const { error, gallery, loading, totalPages } = data;

  return (
    <>
      <div id="modal-root"></div>
      <Searchbar onSubmit={changeSearch} />
      {error && <p>Ошибка поиска</p>}
      {!gallery.length && search && !loading && !error && (
        <p>Ничего не найдено</p>
      )}
      {loading && <Loader />}
      <ImageGallery openModal={openModal} gallery={gallery} />

      {modal.open && (
        <Modal handleClose={closeModal}>
          <div className={style.modal}>
            <img className={style.image} src={modal.content.largeImageURL} alt={modal.content.tags} />
          </div>
        </Modal>
      )}
      {Boolean(gallery.length) && totalPages > page && (
        <Button loadMore={loadMore} />
      )}
    </>
  );
};

export default Gallery;
