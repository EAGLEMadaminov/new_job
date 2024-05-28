import React, { HtmlHTMLAttributes, useState } from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axiosInstance from '../../utils/axios.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
    width: '300px',
    borderColor: 'white',
  },
}));

const LoginForm = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasUser = false;
    try {
      let { data: users } = await axiosInstance.get('users');
      if (users) {
        users.forEach((item) => {
          if (
            item.email == formData.email &&
            item.password === formData.password
          ) {
            hasUser = true;
          }
        });
        if (hasUser) {
          toast.success('You Sign In successfully', {
            pauseOnHover: true,
          });
          setTimeout(() => {
            navigate('/dashboard/books');
          }, 3000);
        } else {
          toast.error('Please enter correct information');
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
    console.log(formData);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
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
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
