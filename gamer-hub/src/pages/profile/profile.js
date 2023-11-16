import React from 'react';
import './profile.css';
import { Link } from 'react-router-dom';

const Profile = () => {
  const heroStyle = {
    backgroundImage: 'url("https://i.redd.it/vo9vm1fcqrp71.jpg")',
  };

  return (
    <div className="profile-background">
      <section className="page-top-section set-bg" style={heroStyle}>
        <div className="page-info">
          <h2>Profile</h2>
          <div className="site-breadcrumb">
            <a href="/home">Home</a> /
            <span>Profile</span>
          </div>
        </div>
      </section>

      <section>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle img-fluid" style={{ width: '150px' }} />
                  <h5 className="my-3">John Smith</h5>
                 
                </div>
              </div>
               <div className="d-flex justify-content-center mb-2">
                  <Link to={`/`}>
                      <button type="button" className="btnlogout btn-danger">Log Out</button>  
                  </Link>
                  
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0"></p>
                    </div>
                  </div>
                  {/* ... Other rows and content */}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      {/* ... Card content with inline styles */}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      {/* ... Card content with inline styles */}
                    </div>
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

export default Profile;