import React, {useState} from 'react';
import './signup.css';
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'
import Valid from './signupValidation';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const[values, setValues] = useState({
        name: "",
        username:"",
        email: "",
        password: "",
        repass:""
    })

    const navigate = useNavigate();
    const [errors, setErrors] = useState({})

    const handleInput = (event) =>{
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
        console.log(event.target.name, event.target.value);

    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        setErrors(Valid(values));
        if(errors.name === "" && errors.username === "" && errors.email==="" && errors.password===""){
            axios.post('http://localhost:8080/signup', values)
            .then(res => console.log(res), 
            navigate('/login'))
           
            .catch(err => console.log(err));
        }

        console.log(values.name,values.username,values.email,values.password,values.repass);

    }
   


    return(
        <>

        <div className = "background-2">
        <section class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                <div class=" bg-dark text-white green-bg">
                <div class="card-body p-5 text-center">

                    <div class="mb-md-5 mt-md-4 pb-5">

                    <h2 class="fw-bold mb-2 text-uppercase">Sign Up</h2>
                    <p class="text-white-50 mb-5">Create an Account to enter Gamer Hub</p>

                <form action="" onSubmit={handleSubmit}>

                    <div class="form-outline form-white mb-4">
                    {errors.name && <span className = "text=danger" >{errors.name}</span>}

                        <input 
                        name= "name"
                        type="text" 
                        id="typeNameX" 
                        class="form-control form-control-lg" 
                        placeholder='Name' 
                        onChange={handleInput}
    
                        />
                        
                    </div>

                    <div class="form-outline form-white mb-4">
                    {errors.username && <span className = "text=danger" >{errors.username}</span>}

                        
                        <img src= {user_icon} alt="" />
                        <input 
                        name= "username"
                        type="text" 
                        id="typeUserNameX" 
                        class="form-control 
                        form-control-lg" 
                        placeholder='Username' 
                        onChange={handleInput}
                        />
            
                    </div>

                    <div class="form-outline form-white mb-4">
                    {errors.email && <span className = "text=danger" >{errors.email}</span>}


                        <img src= {email_icon} alt="" />
                        <input 
                        name= "email"
                        type="email" 
                        id="typeEmailX" 
                        class="form-control form-control-lg" 
                        placeholder='Email id'
                        onChange={handleInput}
                        />

                    </div>

                    <div class="form-outline form-white mb-4">
                    {errors.password && <span className = "text=danger" >{errors.password}</span>}


                        <img src= {password_icon} alt="" />
                        
                        <input 
                        name= "password"
                        type="password" 
                        id="typePasswordX"
                        class="form-control form-control-lg" 
                        placeholder='Password'
                        onChange={handleInput} 
                        />
                    </div>

                    <div class="form-outline form-white mb-4">
                    {errors.repass && <span className = "text=danger" >{errors.repass}</span>}


                        <input 
                        name= "repass"
                        type="password" 
                        id="typeRepeatPasswordX"
                        class="form-control form-control-lg" 
                        placeholder='Confirm Password' 
                        onChange={handleInput}
                        />

                    </div>


                    <button class="btn btn-outline-light btn-lg px-5" type="submit">Sign Up</button>
                </form>
                    
                    </div>

                    <p class="mb-0">Already Have an Account? <a href="/login" class="text-white-50 fw-bold">Login</a>
                    </p>
                  

                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        </div>
        </>
    );
};


export default SignUp;