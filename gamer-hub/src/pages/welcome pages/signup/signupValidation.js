function Valid(values){

    let error ={};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if(values.name ===""){
        error.name = "Name Should Not Be Empty"
    }
    else{
        error.name = ""
    }

    if(values.username ===""){
        error.username = "Username Should Not Be Empty"
    }
    else{
        error.username = ""
    }


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
        error.password = "Invalid Password"
    }
    else{
        error.password = ""
    }

    if(!values.repass.length ){
        error.repass = "Password Should Not Be Empty"
    }
    else if(values.password != values.repass){
        error.repass = "Passwords Did Not Match"
    }
    else{
        error.repass = ""
    }

    return error;

    }

export default Valid;



