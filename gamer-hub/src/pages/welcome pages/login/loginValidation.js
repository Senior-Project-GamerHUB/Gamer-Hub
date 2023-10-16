function Valid(values){

    let error ={};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if(values.email ===""){
        error.email = "Email Should Not Be Empty"
    }
    else if(!email_pattern.test(values.email)){
        error.email = "Invalid Email"
    }
    else{
        error.email = ""
    }

    if(!values.password.length ){
        error.password = "Password Should Not Be Empty"
    }
    else if(!password_pattern.test(values.password)){
        error.password = "Password Did Not Match"
    }
    else{
        error.password = ""
    }

    return error;

    }

export default Valid;



