import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


const AllBook = () => {
    const [books, setBooks] = useState([]);

    const token = localStorage.getItem('accessToken');

    const navigate = useNavigate()

    const handleClick = (e) => {
        navigate('/addBooks')
    };

    useEffect(() => {
        const fetchBooks = async () => {
          try {
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
    
            const response = await axios.get('http://localhost:5000/allBooks', config);
            console.log(response.data, 'fuck react'); // Log the fetched data
    
            if (response.status === 200) {
              console.log('l : ', response);
              setBooks(response.data.data); // Update the state with the fetched data
            } else {
              console.error('Error fetching books:', response.statusText);
            }
          } catch (error) {
            console.error('Error fetching books:', error);
          }
        };
    
        fetchBooks();
      }, [token]);
























    return (
        <div className="container mt-5">
            <h2>All Books</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Book ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Published Year</th>
                        <th>Quantity Available</th>
                        <th>Author ID</th>
                        <th>Genre ID</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(books) && books.map((book, index) => (
                              <tr key={index}>
                                <td>{book.book_id}</td>
                                <td>{book.title}</td>
                                <td>{book.description}</td>
                                <td>{book.published_year}</td>
                                <td>{book.quantity_available}</td>
                                <td>{book.author_id}</td>
                                <td>{book.genre_id}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <button type='button' onClick={handleClick}>Add Book</button>
        </div>
        
    );
};

export default AllBook;