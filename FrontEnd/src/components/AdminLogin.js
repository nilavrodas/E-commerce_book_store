import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';


const AdminLogin = () => {
    const navigate = useNavigate();
    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],
    });
    const handleInput = (e) => {
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    }
    const loginSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/login', data).then(res => {
                if (res.data.status === 200) {
                    console.log(res.data)
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', data.email);
                    swal("Success", res.data.message, "success");
                    navigate("/home")
                } else if (res.data.status === 401) {
                    swal("Warning", res.data.message, "warning");

                } else {
                    setLogin({ ...loginInput, error_list: res.data.validation_errors })
                }
            });
        });
    }

    return (
        <div className="container h-100 ">
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col-10 col-md-8 col-lg-4">

                    <form onSubmit={loginSubmit} className="form-example" action="" method="post">
                        <h1 className="text-center">Admin Login</h1>


                        <div className="form-group ">
                            <label for="email">Email:</label>
                            <input onChange={handleInput} type="email" className="form-control " id="email" placeholder="Email Address" name="email" />
                            <span>{loginInput.error_list.email}</span>
                        </div>
                        <div className="form-group">
                            <label for="password">Password:</label>
                            <input onChange={handleInput} type="password" className="form-control " id="password" placeholder="Password" name="password" />
                            <span>{loginInput.error_list.password}</span>
                        </div>
                        <button type="submit" className="mt-3 btn btn-success">Login</button>


                    </form>

                </div>

            </div>
        </div>
    );
};

export default AdminLogin;