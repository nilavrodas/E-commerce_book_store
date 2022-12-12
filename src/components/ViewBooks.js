import React from "react";
import { Link } from "react-router-dom";

function ViewBooks() {
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
                                <th>Author Name</th>
                                <th>ISBN No.</th>
                                <th>Image</th>
                                <th>No. of Coppies</th>
                                <th>Description </th>
                                <th>Selling price</th>

                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>

    );
};

export default ViewBooks;