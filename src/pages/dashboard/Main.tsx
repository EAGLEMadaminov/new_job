import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axios.js';
import Books from '../../components/SingleBook.js';
import { useSelector } from 'react-redux';

const Main = () => {
  const [allBooks, setAllBooks] = useState([]);
  const searchValue = useSelector((store) => store.book.searchValue);

  useEffect(() => {
    (async function getAllBooks() {
      let { data } = await axiosInstance.get(`/books/?q=${searchValue}`);
      if (data) {
        setAllBooks(data);
      }
    })();
  }, [searchValue]);
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '40px' }}>Books Store </h1>
      <div className="books_container">
        {allBooks.map((item) => {
          return <Books key={item.id} data={item} />;
        })}
      </div>
    </div>
  );
};

export default Main;
