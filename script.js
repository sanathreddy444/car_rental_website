class RegistrationClass {
    constructor(first_name,last_name,dob,address,phone_number,email,password,driving_license) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.dob = dob;
        this.address = address;
        this.phone_number = phone_number;
        this.email = email;
        this.password = password;
        this.driving_license = driving_license
    }
}

class LoginClass {
    constructor(username,password) {
        this.username = username
        this.password = password
    }
}

async function register() {
    var registrationForm = document.forms["registration"];
    var registrationData = new RegistrationClass(registrationForm["first_name"].value,registrationForm["last_name"].value,registrationForm["dob"].value,registrationForm["address"].value,registrationForm["phone_number"].value,registrationForm["email"].value,registrationForm["password"].value,registrationForm["driving_license"].value)
    
    var response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        body: JSON.stringify(registrationData), 
        headers: {
            'Content-Type': 'application/json'
        }
    });
    var data = await response.json();
    if(data.status==200) {
        window.location = "login.html";
        alert(data.message);
    } else {
        alert(data.message);
    }
}

async function logIn() {
    var loginForm = document.forms["login"];
    var loginData = new LoginClass(loginForm["username"].value,loginForm["password"].value)
    if(loginData.username=="employee" && loginData.password=="employee123") { 
        window.location = "index.html";
    } else if(loginData.username=="employee" && loginData.password!="employee123") {
        alert("Invalid Credentials")
    } else {
        var response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        var data = await response.json();
        if(data.status==200) {
            window.location = "index.html";
        } else {
            alert(data.message);
        }
    }
}
