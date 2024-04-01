import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddBook = () => {

  const navigate = useNavigate()


  const handleSubmit = (event) => {
    event.preventDefault();
  
    const token = localStorage.getItem('accessToken');
  
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5000/addBook');
    xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
  
    const data = {
      title: formData.title,
      description: formData.description,
      published_year: formData.published_year,
      quantity_available: formData.quantity_available,
      author_id: formData.author_id,
      genre_id: formData.genre_id,
    };
  
    xhr.onload = () => {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
        
      } else {
        console.error(' registering book:', xhr.responseText);
        navigate('/allBooks');
      }
    };
  
    xhr.onerror = () => {
      console.error('Error registering book:', xhr.responseText);
    };
  
    xhr.send(JSON.stringify(data));
  };



  const [formData, setFormData] = useState({
    title: '',
    description: '',
    published_year: '',
    quantity_available: '',
    author_id: '',
    genre_id: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);
  
  //   const token = localStorage.getItem('accessToken');
  
  //   const xhr = new XMLHttpRequest();
  //   xhr.open('POST', 'http://localhost:5000/addBook');
  //   xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
  //   xhr.setRequestHeader('Content-Type', 'application/json');
  
  //   xhr.onload = () => {
  //     if (xhr.status === 200) {
  //       console.log(xhr.responseText);
  //       // Handle response from backend
  //       // history.push('/allBooks');
  //     } else {
  //       console.error('Error registering book:', xhr.responseText);
  //     }
  //   };
  
  //   xhr.onerror = () => {
  //     console.error('Error registering book:', xhr.responseText);
  //   };
  
  //   xhr.send(JSON.stringify(Object.fromEntries(formData)));
  // };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center"> {/* Center the form */}
        <div className="col-md-6"> {/* Limit the width */}
          <h2>Register Book</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="publishedYear" className="form-label">Published Year</label>
              <input type="text" className="form-control" id="publishedYear" name="published_year" value={formData.publishedYear} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="quantityAvailable" className="form-label">Quantity Available</label>
              <input type="number" className="form-control" id="quantityAvailable" name="quantity_available" value={formData.quantityAvailable} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="authorId" className="form-label">Author ID</label>
              <input type="text" className="form-control" id="authorId" name="author_id" value={formData.authorId} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="genreId" className="form-label">Genre ID</label>
              <input type="text" className="form-control" id="genreId" name="genre_id" value={formData.genreId} onChange={handleInputChange} />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        </div>
      </div>
    </div>
  );  
};

export default AddBook;
