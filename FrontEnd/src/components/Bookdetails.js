import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";
import { useNavigate } from 'react-router-dom';

function Bookdetails() {
    const navigate = useNavigate();
    const { isbn } = useParams();

    const [viewBook, setBook] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        axios.get(`api/Show_Single_Book/${isbn}`).then(res => {
            console.log(isbn);
            console.log(res.data);
            if (res.data.status === 200) {
                setBook(res.data.Book);
                setLoading(false);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate("/admin/viewbooks");
            }

        });

    }, [isbn]);

    const submitWishlist = (e) => {
        e.preventDefault();
        //const authemail = localStorage.getItem('auth_name')
        const data = {
            isbn: viewBook.isbn
            // email: authemail
        }
        console.log(data);
        axios.post('/api/Add_to_WishList', data).then(res => {
            console.log(data);
            if (res.data.status === 201) {
                swal("Success", res.data.message, "success");
            } else if (res.data.status === 409) {
                swal("Warning", res.data.message, "warning");
            } else if (res.data.status === 401) {
                swal("Error", res.data.message, "error");
            }
            else if (res.data.status === 404) {
                swal("Warning", res.data.message, "warning");
            }
        });
    }

    const submitAddToCart = (e) => {
        e.preventDefault();
        //const authemail = localStorage.getItem('auth_name')
        const data = {
            isbn: viewBook.isbn,
            // email: authemail
        }
        //console.log(data);
        axios.post('/api/Add_Order', data).then(res => {
            console.log(res);
            if (res.data.status === 201) {
                swal("Success", res.data.message, "success");
            } else if (res.data.status === 409) {
                swal("Warning", res.data.message, "warning");
            } else if (res.data.status === 401) {
                swal("Error", res.data.message, "error");
            }
            else if (res.data.status === 404) {
                swal("Warning", res.data.message, "warning");
            }
        });
    }

    if (loading) {
        return <h4>Loading Single Book</h4>;
    } else {
        var availableCopies = '';
        if (viewBook.coppies > 0) {
            availableCopies = <div>
                <div>
                    <label className="btn btn-success mt-3">In Stock</label>
                </div>
                <div className="col-md-3 mt-3">
                    <button type="button" className="btn btn-primary w-100" onClick={submitAddToCart}>Add to Cart</button>
                </div>
            </div>
        } else {
            availableCopies =
                <div>
                    <label className="btn btn-danger">Out of Stock</label>
                </div>



        }

    }

    return (
        <div>

            <div className="py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 border-end">
                            <img src={`http://127.0.0.1:8000/${viewBook.image}`} alt="Book Cover Image" className="w-100" />
                        </div>
                        <div className="col-md-8">
                            <h4>{viewBook.book_name}</h4>
                            <p>{viewBook.description} </p>
                            <h4 className="mb-1">Tk {viewBook.selling_price}</h4>
                        </div>

                        {availableCopies}
                        <div className="col-md-3 mt-3">
                            <button type="button" className="btn btn-success w-100" onClick={submitWishlist}>Wishlist</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Bookdetails;