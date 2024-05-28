import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axios';
import Books from '../../components/SingleBook';
import { useSelector, RootState } from 'react-redux';

interface Book {
  id: string;
  author: string;
  book_name: string;
  description: string;
  img: string;
  price: string;
}

const Main: React.FC = () => {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const searchValue = useSelector((store: RootState) => store.book.searchValue);

  useEffect(() => {
    const getAllBooks = async () => {
      try {
        const { data } = await axiosInstance.get<Book[]>(
          `/books/?q=${searchValue}`
        );
        if (data) {
          setAllBooks(data);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    getAllBooks();

    // Clean-up function
    return () => {
      // Any clean-up code can be placed here
    };
  }, [searchValue]);

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '40px' }}>Books Store</h1>
      <div className="books_container">
        {allBooks.map((item) => (
          <Books key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Main;
