import React from 'react';


const Login = () => {
    return(
        <div className="d-flex justify-context-center align-items-center">
        <div className="p-3 bg-white w-25">
            <form action="">
                <div className="mb-3">
                    <label htmlFor="username">Username</label>
                    <input type="username" placeholder="Enter Username" className="form-control"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter Password" className="form-control"/>
                </div>

                <button className="btn btn-success">Login</button>
                <button className="btn btn-success">SignUp</button>


            </form>

        </div>
          
    </div>
    );
};


export default Login;