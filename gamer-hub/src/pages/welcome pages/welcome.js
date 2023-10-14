import React from 'react';

const Welcome = () => {
    return(
        <div>       
           <section class="vh-100 gradient-custom">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card bg-dark text-white">
                    <div class="card-body p-5 text-center">

                        <div class="mb-md-5 mt-md-4 pb-8">

                        <h2 class="fw-bold mb-2 text-uppercase">Welcome to Gamer Hub</h2>
                        <p class="text-white-50 mb-5"></p>

                       
                        <a href="/login">
                          <button class="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                        </a> 

                        <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="/login"></a></p>

                        <a href="/signup">
                            <button class="btn btn-outline-light btn-lg" style={{ width: '150px' }} type="submit">Sign Up</button>
                       </a>

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


export default Welcome;