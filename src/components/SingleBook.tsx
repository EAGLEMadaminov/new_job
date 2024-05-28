import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import axiosInstance from '../utils/axios.js';
import { toast } from 'react-toastify';
const Books = ({ data }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname);

  
  return (
    <div
      className="single_book"
      onClick={() => navigate(`/dashboard/books/view/${data.id}`)}
    >
      <img src={data?.img} alt="Book image" />
      <h1>{data?.book_name}</h1>
      <h2>
        <span style={{ fontSize: '14px', color: 'rgba(0,0,0,0.4)' }}>
          Author:
        </span>{' '}
        {data?.author}
      </h2>

      <p>
        {' '}
        <span style={{ fontSize: '14px', color: 'rgba(0,0,0,0.4)' }}>
          Price:
        </span>{' '}
        {data?.price} so&apos;m
      </p>
    </div>
  );
};

export default Books;
