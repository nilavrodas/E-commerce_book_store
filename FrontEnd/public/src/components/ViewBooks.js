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
                    <td>{item.book_name}</td>
                    <td>{item.isbn}</td>
                    <td><img src={`http://127.0.0.1:8000/${item.image}`} width="50px" alt="Image" /></td>
                    <td>{item.coppies}</td>
                    <td>{item.selling_price}</td>
                    <td>
                        <Link to={`edit_book/${item.isbn}`}>Edit</Link>
                    </td>
                    <td><button type="button" onClick={(e) => deleteBook(e, item.isbn)} className="btn btn-danger btn-sm">Delete</button></td>
                </tr>
            );
        });
    }
    return (
        <div className="card px-4 mt-3">
            <div className="card-header">
                <h4>View Books</h4>
                <Link to="admin/addbooks" className="btn btn-primary btn-sm float-end"> Add Book</Link>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Book Name</th>
                                <th>ISBN No.</th>
                                <th>Image</th>
                                <th>No. of Coppies</th>
                                <th>Selling price</th>
                                <th>Edit</th>
                                <th>Delete</th>
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