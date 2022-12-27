import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function ViewBooks() {
    const [viewBook, setBook] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get('/api/Show_Book').then(res => {
            if (res.data.status === 200) {
                //console.log(res.data.Book);
                setBook(res.data.Books)
                setLoading(false);
            }
        });
    }, []);
    const deleteBook = (e, isbn) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";
        axios.delete(`/api/Delete_Book/${isbn}`).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success")
                thisClicked.closest("tr").remove();
            } else if (res.data.message === 404) {
                swal("Success", res.data.message, "success")
                thisClicked.innerText = "Deleting";
            }
        });

    }
    let display_book_data = "";
    if (loading) {
        return <h4>Loading</h4>;
    } else {
        display_book_data = viewBook.map((item) => {
            return (
                <tr key={item.isbn}>
                    <td style={{ color: 'white' }}>{item.book_name}</td>
                    <td style={{ color: 'white' }}>{item.isbn}</td>
                    <td ><img src={`http://127.0.0.1:8000/${item.image}`} width="50px" alt="Image" /></td>
                    <td style={{ color: 'white' }}>{item.coppies}</td>
                    <td style={{ color: 'white' }}>Tk {item.selling_price}</td>
                    <td>
                        <Link to={`edit_book/${item.isbn}`}>Edit</Link>
                    </td>
                    <td><button type="button" onClick={(e) => deleteBook(e, item.isbn)} className="btn btn-danger btn-sm">Delete</button></td>
                </tr>
            );
        });
    }
    return (
        <div className="card px-4 mt-3" style={{ backgroundColor: '#ffc107' }}>
            <div >
                <h4>View Books</h4>

            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th style={{ color: 'white' }}>Book Name</th>
                                <th style={{ color: 'white' }}>ISBN No.</th>
                                <th style={{ color: 'white' }}>Image</th>
                                <th style={{ color: 'white' }}>No. of Coppies</th>
                                <th style={{ color: 'white' }}>Price</th>
                                <th style={{ color: 'white' }}>Edit</th>
                                <th style={{ color: 'white' }}>Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {display_book_data}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
};

export default ViewBooks;