function Valid(values){

    let error ={};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;


    if(values.name ==="" | values.name[0] ===""){
        error.name = "Name Should Not Be Empty"
    }
    else{
        error.name = ""
    }


    if(values.username ==="" | values.username[0] ===""){

        error.username = "Username Should Not Be Empty"
    }
    else{
        error.username = ""
    }



    if(values.email ==="" | values.email[0] ===""){

        error.email = "Email Should Not Be Empty"
    }
    else if(!email_pattern.test(values.email)){
        error.email = "Invalid Email"
    }
    else{
        error.email = ""
    }

    if(values.password ==="" |values.password[0]==='' ){

        error.password = "Password Should Not Be Empty"
    }
    else if(!password_pattern.test(values.password)){
        error.password = "Invalid Password"
    }
    else{
        error.password = ""
    }


    if(values.repass ==="" |values.repass[0]===''){
        error.repass = "Password Should Not Be Empty"
    }
    else if(values.password[0] != values.repass[0]){

        error.repass = "Passwords Did Not Match"
    }
    else{
        error.repass = ""
    }

    return error;

    }

export default Valid;



