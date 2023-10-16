function Valid(values){

    let error ={};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if(values.email[0] ==="" | values.email ===""){
        error.email = "Email Should Not Be Empty"
    }
    else if(!email_pattern.test(values.email)){
        error.email = "Invalid Email"
    }
    else{
        error.email = ""
    }

    if(values.password ==="" | values.password[0] ==="" ){
        error.password = "Password Should Not Be Empty"
    }
    else if(!password_pattern.test(values.password)){
        error.password = "Invalid Password"
    }
    else{
        error.password = ""
    }

    return error;

    }

export default Valid;



