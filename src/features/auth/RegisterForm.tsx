import React, { useState, ChangeEvent, FormEvent } from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axiosInstance from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useStyles = makeStyles(() => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '700px',
    margin: '0 auto',
    marginTop: '16px',
  },
  textField: {
    marginBottom: '8px',
    borderRadius: '25px',
    width: '350px',
    borderColor: 'white',
  },
}));

interface FormData {
  name: string;
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = new Date();
    const data = { ...formData, id: date };
    try {
      const { data: register } = await axiosInstance.post('/users', data);
      if (register) {
        toast.success('You signed up successfully', {
          pauseOnHover: true,
        });
        setTimeout(() => {
          navigate('/dashboard/books');
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        className={classes.textField}
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        variant="filled"
        required
      />
      <TextField
        className={classes.textField}
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        variant="filled"
        required
      />
      <TextField
        className={classes.textField}
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        variant="filled"
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Sign Up
      </Button>
    </form>
  );
};

export default RegisterForm;
