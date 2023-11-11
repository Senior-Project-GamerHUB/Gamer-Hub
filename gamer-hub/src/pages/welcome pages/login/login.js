import React, {useState} from 'react';
import Valid from './loginValidation.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const[values, setValues] = useState({
        email: "",
        password: ""
    })
   

    const navigate = useNavigate();
    const [errors, setErrors] = useState({})

    const handleInput = (event) =>{
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
        console.log(event.target.name);
        console.log(event.target.value);

    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        setErrors(Valid(values));
        
        axios.post('http://localhost:8080/login', values)
            .then(res => {
                console.log(res.data)
                if(res.data == "Login Successfull"){
                    navigate('/home');
                }
                else{
                    alert("Incorrect Login")
                }
            })
            .catch(err => console.log(err));
    }

    return(
        <div className="background-1">
            <section class="vh-100 gradient-custom">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="bg-dark text-white green-bg">
                    <div class="card-body p-5 text-center">

                        <div class="mb-md-5 mt-md-4 pb-5">
                        <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                        <p class="text-white-50 mb-5">Please enter your login and password!</p>


                     <form action="" onSubmit= {handleSubmit}>
                        <div class="form-outline form-white mb-4">
                        {errors.email && <span className = "text=danger" >{errors.email}</span>}
                            <input 
                            placeholder='Email'
                            type="email" 
                            id="typeEmailX" 
                            class="form-control form-control-lg"
                            onChange={handleInput}
                            name = "email"
                            />
                        </div>

                        <div class="form-outline form-white mb-4">
                        {errors.password && <span className = "text=danger" >{errors.password}</span>}
                            <input 
                            placeholder='Password'
                            type="password" 
                            id="typePasswordX"
                            class="form-control form-control-lg" 
                            onChange={handleInput}
                            name = "password"
                            />
                        </div>

                        <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="/login">Forgot password?</a></p>
                        <button class="btn btn-outline-light btn-lg px-5" type="submit">Login</button>

                    </form>

                        </div>
                        <div>
                        <p class="mb-0">Don't have an account? <a href="/signup" class="text-white-50 fw-bold">Sign Up</a>
                        </p>
                        </div>

                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
        </div>
    );
};


export default Login;