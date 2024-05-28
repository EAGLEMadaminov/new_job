import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axios.js';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ViewBook = () => {
  const [book, setBook] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async function getSingBook() {
      setLoading(true);
      try {
        let { data } = await axiosInstance.get(`/books/${id}`);
        if (data) {
          setBook(data);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, []);

  const handleEditBtn = async () => {
    navigate(`/dashboard/books/edit/${book.id}`);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30px',
      }}
    >
      <div className="">
        <img
          src={book?.img}
          alt="Book image"
          style={{ width: '500px', height: '600px', objectFit: 'cover' }}
        />
      </div>
      <div className="view_book_info">
        <h1>{book?.book_name}</h1>
        <h4>
          <span style={{ fontSize: '14px' }}>Author:</span> {book?.author}
        </h4>

        <p>
          {' '}
          <span
            style={{
              fontSize: '14px',
              fontWeight: 'bolder',
            }}
          >
            Price:
          </span>{' '}
          {book?.price} so&apos;m
        </p>

        <div>
          <p style={{ textAlign: 'left' }}>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 'bolder',
              }}
            >
              Description:
            </span>{' '}
            {book?.description}
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '20px',
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleEditBtn}
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
