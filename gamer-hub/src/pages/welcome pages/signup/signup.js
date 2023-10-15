import React from 'react';
import './signup.css';

const SignUp = () => {
    return(
        <div className = "background-2">
        <section class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                <div class=" text-white green-bg">
                <div class="card-body p-5 text-center">

                    <div class="mb-md-5 mt-md-4 pb-5">

                    <h2 class="fw-bold mb-2 text-uppercase">Sign Up</h2>
                    <p class="text-white-50 mb-5">Create an Account to enter Gamer Hub</p>

                    <div class="form-outline form-white mb-4">
                        <input type="name" id="typeNameX" class="form-control form-control-lg" />
                        <label class="form-label" for="typeNameX">Name</label>
                    </div>

                    <div class="form-outline form-white mb-4">
                        <input type="username" id="typeUserNameX" class="form-control form-control-lg" />
                        <label class="form-label" for="typeUsernameX">Username</label>
                    </div>

                    <div class="form-outline form-white mb-4">
                        <input type="email" id="typeEmailX" class="form-control form-control-lg" />
                        <label class="form-label" for="typeEmailX">Email</label>
                    </div>

                    <div class="form-outline form-white mb-4">
                        <input type="password" id="typePasswordX" class="form-control form-control-lg" />
                        <label class="form-label" for="typePasswordX">Password</label>
                    </div>

                    <div class="form-outline form-white mb-4">
                        <input type="repeatpassword" id="typeRepeatPasswordX" class="form-control form-control-lg" />
                        <label class="form-label" for="typeRepeatPasswordX">Confirm Password</label>
                    </div>


                    <button class="btn btn-outline-light btn-lg px-5" type="submit">Sign Up</button>
                    
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
    );
};


export default SignUp;