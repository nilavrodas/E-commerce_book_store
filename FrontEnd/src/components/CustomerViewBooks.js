import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

function CustomerViewBooks() {

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
    var BookList = '';
    if (loading) {
        return <h4>Loading</h4>;
    } else {

        BookList = viewBook.map((item) => {
            return (
                <div className="col-md-3">
                    <div className="card">
                        <img src={`http://127.0.0.1:8000/${item.image}`} className="w-70
                        " alt="" />
                    </div>
                    <div className="card-body">
                        <Link to={`/books/${item.isbn}`}>
                            <h5>{item.book_name}</h5>
                        </Link>
                    </div>
                </div>
            );
        });
    }

    return (
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Available Books</h6>
                </div>
            </div>
            <div className="py-3">
                <div className="container">
                    <div className="row">
                        {BookList}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CustomerViewBooks;