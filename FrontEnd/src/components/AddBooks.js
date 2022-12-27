import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
function AddBooks() {
    const [bookInput, setBook] = useState({
        book_name: '',
        author_name: '',
        isbn: '',
        description: '',
        selling_price: '',
        coppies: '',
        publisher_name: '',


    });
    const [picture, setPicture] = useState([]);
    const [errorlist, setError] = useState([]);
    const handleInput = (e) => {
        console.log(e.target.value)
        setBook({ ...bookInput, [e.target.name]: e.target.value });
    }
    const handleImage = (e) => {
        console.log(e.target.files[0])
        setPicture({ image: e.target.files[0] });
    }
    const submitBook = (e) => {
        e.preventDefault();
        console.log("in")
        const formData = new FormData;
        console.log(bookInput)
        console.log(picture.image)
        formData.append('image', picture.image);
        formData.append('book_name', bookInput.book_name);
        formData.append('author_name', bookInput.author_name);
        formData.append('isbn', bookInput.isbn);
        formData.append('description', bookInput.description);
        formData.append('selling_price', bookInput.selling_price);
        formData.append('coppies', bookInput.coppies);
        formData.append('publisher_name', bookInput.publisher_name);

        console.log(formData)
        axios.post('/api/Add_Book', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            console.log(res.data)
            if (res.data.status === 200) {
                swal("Success", res.data.message)
                setError([]);
            } else if (res.data.status === 422) {
                swal("All fields are mandetory", "", "error");
                setError(res.data.errors);
            }
        })
    }

    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header" style={{ backgroundColor: '#ffc107' }}>
                    <h4>Add Books</h4>

                </div>
                <div className="card-body" style={{ backgroundColor: ' #28282B' }}>
                    <form onSubmit={submitBook} method="POST" encType="multipart/form-data">

                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                                <div className="form-group mb-3 mt-3 ms-3">
                                    <label className="mb-1">Book Name</label>
                                    <input type="text" name="book_name" className="form-control" onChange={handleInput} value={bookInput.book_name} />
                                    <span className="text-danger">{errorlist.book_name}</span>
                                </div>
                                <div className="row">
                                    <div className="col-md-5 form-group mb-3 mt-3 ms-3">
                                        <label className="mb-1">Author Name</label>
                                        <input type="text" name="author_name" className="form-control" onChange={handleInput} value={bookInput.author_name} />
                                        <span className="text-danger">{errorlist.author_name}</span>
                                    </div>
                                    <div className="col-md-5 form-group mb-3 mt-3 ms-3">
                                        <label className="mb-1">Publisher Name</label>
                                        <input type="text" name="publisher_name" className="form-control" onChange={handleInput} value={bookInput.publisher_name} />
                                        <span className="text-danger">{errorlist.publisher_name}</span>
                                    </div>
                                </div>
                                <div className="form-group mb-3 mt-3 ms-3">
                                    <label className="mb-1">ISBN No.</label>
                                    <input type="text" name="isbn" className="form-control" onChange={handleInput} value={bookInput.isbn} />
                                    <span className="text-danger">{errorlist.isbn}</span>
                                </div>
                                <div className="form-group mb-3 mt-3 ms-3">
                                    <label className="mb-1">Description</label>
                                    <textarea name="description" className="form-control" onChange={handleInput} value={bookInput.description}></textarea>
                                    <span className="text-danger">{errorlist.description}</span>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 form-group mb-3">
                                        <label className="mb-1">Selling Price</label>
                                        <input type="text" name="selling_price" className="form-control" onChange={handleInput} value={bookInput.selling_price} />
                                        <span className="text-danger">{errorlist.selling_price}</span>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label className="mb-1">Image</label>
                                        <input type="file" name="image" className="form-control" onChange={handleImage} />
                                        <span className="text-danger">{errorlist.image}</span>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label className="mb-1">No. of Coppies</label>
                                        <input type="text" name="coppies" className="form-control" onChange={handleInput} value={bookInput.coppies} />
                                        <span className="text-danger">{errorlist.coppies}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary px-4 mt-2">Add</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default AddBooks;