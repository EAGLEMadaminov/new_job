import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axiosInstance from '../../utils/axios.js';
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

const RegisterForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let date = new Date();
    let data = formData;
    data.id = date;
    try {
      let { data: register } = await axiosInstance.post('/users', data);
      if (register) {
        toast.success('You Sign Up successfully', {
          pauseOnHover: true,
        });
        setTimeout(() => {
          navigate('/dashboard/books');
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
    // console.log(data);
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
