import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axiosInstance from '../../utils/axios.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '500px',
    margin: '0 auto',
    marginTop: '16px',
  },
  textField: {
    marginBottom: '8px',
    borderRadius: '25px',
    width: '500px',
    borderColor: 'white',
  },
}));

const BookForm = ({ data }) => {
  const { id } = useParams();
  const classes = useStyles();
  const [selectedBook, setSelectedBook] = useState({});
  const [formData, setFormData] = useState({
    author: '',
    book_name: '',
    img: '',
    description: '',
    price: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    (async function getProduct() {
      try {
        let { data: book } = await axiosInstance.get(`/books/${id}`);
        if (book) {
          setFormData({
            author: book?.author,
            book_name: book?.book_name,
            img: book?.img,
            description: book?.description,
            price: book?.price,
          });

          setSelectedBook(book);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasUser = false;
    let newBook = formData;
    newBook.id = new Date();
    if (data === 'create') {
      try {
        let { data: book } = await axiosInstance.post('/books', newBook);
        if (book) {
          toast.success('Book create succesfully', {
            pauseOnHover: true,
          });
          setTimeout(() => {
            navigate('/dashboard/books');
          }, 3000);
        }
      } catch (error) {
        toast.error(error.message);
      }
      console.log(formData);
    } else {
      let editBook = formData;
      editBook.id = id;
      try {
        let { data: edited } = await axiosInstance.put(
          `/books/${id}`,
          editBook
        );
        if (edited) {
          toast.success('Book edit succesfully', {
            pauseOnHover: true,
          });
          setTimeout(() => {
            navigate('/dashboard/books');
          }, 3000);
        }
      } catch (error) {
        toast.error(error.message);
      }
      console.log(formData);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        className={classes.textField}
        label="Author"
        name="author"
        value={formData.author}
        onChange={handleChange}
        variant="filled"
        required
      />
      <TextField
        className={classes.textField}
        label="Book Name"
        name="book_name"
        value={formData.book_name}
        onChange={handleChange}
        variant="filled"
        required
      />
      <TextField
        className={classes.textField}
        label="Image"
        name="img"
        type="link"
        placeholder="Enter image url"
        value={formData.img}
        onChange={handleChange}
        variant="filled"
        required
      />
      <TextField
        className={classes.textField}
        label="Description"
        name="description"
        placeholder="Give information about book"
        value={formData.description}
        onChange={handleChange}
        variant="filled"
        required
      />
      <TextField
        className={classes.textField}
        label="Price"
        name="price"
        value={formData.price}
        onChange={handleChange}
        variant="filled"
        required
      />
      <Button type="submit" variant="contained" color="primary">
        {data === 'edit' ? 'Edit' : 'Create'}
      </Button>
    </form>
  );
};

export default BookForm;
