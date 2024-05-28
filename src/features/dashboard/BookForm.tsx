import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axiosInstance from '../../utils/axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

interface Book {
  id: string;
  author: string;
  book_name: string;
  img: string;
  description: string;
  price: string;
}

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

interface Props {
  data: 'create' | 'edit';
}

const BookForm: React.FC<Props> = ({ data }) => {
  const { id } = useParams<{ id: string }>();
  const classes = useStyles();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState<Book>({
    id: '',
    author: '',
    book_name: '',
    img: '',
    description: '',
    price: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data: book } = await axiosInstance.get<Book>(`/books/${id}`);
        if (book) {
          setFormData({
            ...book,
          });
          setSelectedBook(book);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (data === 'edit') {
      getProduct();
    }
  }, [data, id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data === 'create') {
      try {
        const { data: book } = await axiosInstance.post<Book>(
          '/books',
          formData
        );
        if (book) {
          toast.success('Book created successfully', {
            pauseOnHover: true,
          });
          setTimeout(() => {
            navigate('/dashboard/books');
          }, 3000);
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      try {
        const { data: edited } = await axiosInstance.put<Book>(
          `/books/${id}`,
          formData
        );
        if (edited) {
          toast.success('Book edited successfully', {
            pauseOnHover: true,
          });
          setTimeout(() => {
            navigate('/dashboard/books');
          }, 3000);
        }
      } catch (error) {
        toast.error(error.message);
      }
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
