import axios from "axios";
import React, { useState } from "react";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        First_name: '',
        Last_name: '',
        email: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const signupSubmit = (e) => {
        e.preventDefault();
        const data = {
            First_name: input.First_name,
            Last_name: input.Last_name,
            email: input.email,
            password: input.password,

        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/register', data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.email);
                    swal("Success", res.data.message, "success");
                    navigate("/");
                } else {
                    setInput({ ...input, error_list: res.data.Validation_errors });
                }

            });
        });
    }
    return (
        <div className="container h-100 ">
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col-10 col-md-8 col-lg-4">

                    <form onSubmit={signupSubmit} className="form-example" action="" method="post">
                        <h1 className="text-center">Customer Registration</h1>


                        <div className="form-group my-3 ">

                            <input type="text" className="form-control " onChange={handleInput} value={input.First_name} id="First_name" placeholder="First Name" name="First_name" />
                            <span>{input.error_list.First_name}</span>
                        </div>
                        <div className="form-group  my-3">

                            <input type="text" className="form-control " onChange={handleInput} value={input.Last_name} id="Last_name" placeholder="Last Name" name="Last_name" />
                            <span>{input.error_list.Last_name}</span>
                        </div>
                        <div className="form-group  my-3">


                            <input type="email" className="form-control " onChange={handleInput} value={input.email} id="email" placeholder="Email Address" name="email" />
                            <span>{input.error_list.email}</span>
                        </div>
                        {/* <div className="form-group  my-3">

                            <input type="text" className="form-control " onChange={handleInput} value={input.phone_no} id="phone_no" placeholder="Phone No.:" name="phone_no" />
                        </div>
                        <div className="form-group  my-3">

                            <input type="text" className="form-control " onChange={handleInput} value={input.optional_phone_no} id="optional_phone_no" placeholder="Optional Second Phone No.:" name="optional_phone_no" />
                        </div> */}
                        <div className="form-group my-3">

                            <input type="password" className="form-control " onChange={handleInput} value={input.password} id="password" placeholder="Password" name="password" />
                            <span>{input.error_list.password}</span>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="mt-3 btn btn-success ">Sign up</button>
                        </div>

                    </form>

                </div>
                {/* <button onClick={() => { console.log(input); }}>test</button> */}
            </div>
        </div>
    );
};

export default SignUp;