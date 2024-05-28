import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { changeSearchValue, Book } from '../../redux/slices/book'; // Assuming you have a Book type defined
import axiosInstance from '../../utils/axios';

const Header: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Assuming id is a string
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteBtn = async () => {
    try {
      let { data: deletedBook } = await axiosInstance.delete<Book>(
        `/books/${id}`
      );
      if (deletedBook) {
        toast.success('Book deleted successfully');
        setTimeout(() => {
          navigate('/dashboard/books');
        }, 3000);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSearch = (value: string) => {
    dispatch(changeSearchValue(value));
  };

  return (
    <div className="header">
      <h1 onClick={() => navigate('/dashboard/books')}>Books</h1>
      <input
        type="search"
        placeholder="Search books"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Button onClick={() => navigate('/dashboard/books/create')}>
        Create
      </Button>
      {pathname.includes('view') ? (
        <Button onClick={handleDeleteBtn}>Delete</Button>
      ) : (
        ''
      )}
    </div>
  );
};

export default Header;
