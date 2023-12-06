import React from 'react';
import './welcome.css';

const Welcome = () => {
  return (
    <div className="background-1">
      <section className="vh-100 gradient-custom">
        <div className="py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="bg-dark text-white green-bg">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-8">
                    <h2 className="fw-bold mb-2 text">Welcome to GamerHub</h2>
                    <p className="text-white-50 mb-5"></p>

                    <a href="/login">
                      <button className="btn btn-outline-light btn-lg px-5" type="submit"
                       style={{ width: '150px' }}  // Adjust the width as needed
                     
                       >
                        Login
                      </button>
                    </a>

                    <p className="small mb-5 pb-lg-2">
                      <a className="text-white-50" href="/login"></a>
                    </p>

                    <a href="/signup">
                      <button
                        className="btn btn-outline-light btn-lg"  // Make sure both buttons have the same class
                        style={{ width: '150px' }}  // Adjust the width as needed
                        type="submit"
                      >
                        Sign Up
                      </button>
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