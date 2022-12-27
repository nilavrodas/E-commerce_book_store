import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";
import { useNavigate } from 'react-router-dom';

function Cart() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    if (!localStorage.getItem('auth_token')) {
        navigate('/home');
        swal("Warning", "Login in is required", "error");
    }
    useEffect(() => {

        axios.post(``).then(res => {
            if (res.data.status === 200) {
                setCart(res.data.cart);
                setLoading(false);
            } else if (res.data.status === 401) {

                navigate("/home");
                swal("Warning", res.data.message, "error");
            }

        });

    }, [navigate]);

    const deleteCartBook = (e, cartItemIsbn) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Removing";

        axios.delete('').then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                thisClicked.closest("tr").remove();
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                thisClicked.innerText = "Remove";

            }
        });
    }
    if (loading) {
        return <h4>Loading Single Book</h4>;
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
                                <th>Image</th>
                                <th>Book Name</th>

                                <th>Price</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => {
                                <tr key={item.isbn}>
                                    <td><img src={`http://127.0.0.1:8000/${item.image}`} width="50px" alt="Image" /></td>
                                    <td>{item.book_name}</td>

                                    <td>{item.selling_price}</td>
                                    <td>
                                        <Link to={`edit_book/${item.isbn}`}>Edit</Link>
                                    </td>
                                    <td><button type="button" className="btn btn-danger btn-sm">Remove</button></td>
                                </tr>
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default Cart;