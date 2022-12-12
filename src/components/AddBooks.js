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


    });
    const [picture, setPicture] = useState([]);
    const handleInput = (e) => {
        setBook({ ...bookInput, [e.target.name]: e.target.value });
    }
    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] });
    }
    const submitBook = (e) => {
        e.preventdefault();
        const formData = new FormData;
        formData.append('image', picture.image);
        formData.append('book_name', bookInput.book_name);
        formData.append('author_name', bookInput.author_name);
        formData.append('isbn', bookInput.isbn);
        formData.append('description', bookInput.description);
        formData.append('selling_price', bookInput.selling_price);
        formData.append('coppies', bookInput.coppies);

        axios.post('/api/books', formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message)
            }
        })
    }

    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Add Books</h4>
                    <Link to="/admin/viewproducts" className="btn btn-primary btn-sm float-end">View Books</Link>
                </div>
                <div className="card-body">
                    <form onSubmit={submitBook} encType="multitype/form-data">
                        {/* <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Book details and Information</button>
                            </li>

                        </ul> */}
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                                <div className="form-group mb-3 mt-3 ms-3">
                                    <label className="mb-1">Book Name</label>
                                    <input type="text" name="book_name" className="form-control" onChange={handleInput} value={bookInput.book_name} />
                                </div>
                                <div className="form-group mb-3 mt-3 ms-3">
                                    <label className="mb-1">Author Name</label>
                                    <input type="text" name="author_name" className="form-control" onChange={handleInput} value={bookInput.author_name} />
                                </div>
                                <div className="form-group mb-3 mt-3 ms-3">
                                    <label className="mb-1">ISBN No.</label>
                                    <input type="text" name="isbn" className="form-control" onChange={handleInput} value={bookInput.isbn} />
                                </div>
                                <div className="form-group mb-3 mt-3 ms-3">
                                    <label className="mb-1">Description</label>
                                    <textarea name="description" className="form-control" onChange={handleInput} value={bookInput.description}></textarea>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 form-group mb-3">
                                        <label className="mb-1">Selling Price</label>
                                        <input type="text" name="selling_price" className="form-control" onChange={handleInput} value={bookInput.selling_price} />
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label className="mb-1">Image</label>
                                        <input type="file" name="image" className="form-control" onChange={handleImage} />
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label className="mb-1">No. of Coppies</label>
                                        <input type="text" name="coppies" className="form-control" onChange={handleInput} value={bookInput.coppies} />
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