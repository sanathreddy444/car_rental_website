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

class InventoryClass {
    constructor(brand,model,year,vehicle_type,price) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.vehicle_type = vehicle_type;
        this.price = price;
    }
}

class ProfileClass {
    constructor(first_name,last_name,dob,address,phone_number,email,driving_license) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.dob = dob;
        this.address = address;
        this.phone_number = phone_number;
        this.email = email;
        this.driving_license = driving_license
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
    var response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify(loginData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    var data = await response.json();
    if(data.status==200) {
        localStorage.setItem("username",loginForm["username"].value);
        window.location = "index.html";
    } else {
        alert(data.message);
    }
}

function employeeLogIn() {
    var loginForm = document.forms["employeelogin"];
    var loginData = new LoginClass(loginForm["username"].value,loginForm["password"].value)
    if(loginData.username=="employee" && loginData.password=="employee123") { 
        localStorage.setItem("isCustomer",false);
        window.location = "empindex.html";
    } else {
        alert("Invalid Credentials")
    }
}

async function customerProfiles() {
    var response = await fetch('http://localhost:3000/fetchAllCustomers');
    var data = await response.json();
    if(data.status==200) {
        document.getElementById("profileTable").innerHTML += '<tr>'+
            '<th>First name</th>'+
            '<th>Last name</th>'+
            '<th>Date Of Birth</th>'+
            '<th>Address</th>'+
            '<th>Phone Number</th>'+
            '<th>Email</th>'+
            '<th>License</th>'+
            '</tr>';
        var customers = data.data;
        for (let i = 0; i < customers.length; i++) {
            document.getElementById("profileTable").innerHTML += '<tr>'+
            '<td>'+customers[i].first_name+'</td>'+
            '<td>'+customers[i].last_name+'</td>'+
            '<td>'+customers[i].dob+'</td>'+
            '<td>'+customers[i].address+'</td>'+
            '<td>'+customers[i].phone_number+'</td>'+
            '<td>'+customers[i].email+'</td>'+
            '<td>'+customers[i].driving_license+'</td>'+
            '</tr>';
        }
    } else {
        alert(data.message);
    }
}

var inventoryData;

async function getEmployeeInventory() {
    var filterForm = document.forms["filterForm"];
    var filters = {
        vehicle_type:filterForm["vehicle_type"].value,
        year:filterForm["year"].value,
        brand:filterForm["brand"].value
    }
    var response = await fetch('http://localhost:3000/fecthAvailableinventory',{
        method: 'POST',
        body: JSON.stringify(filters),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    var data = await response.json();
    if(data.status==200) {
       inventoryData = data.data;
        document.getElementById("inventory").innerHTML = ''
        for (let i = 0; i < inventoryData.length; i++) {
            document.getElementById("inventory").innerHTML += '<div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">'+
            '<div class="r-best-offer-single">'+
              '<div class="r-best-offer-in">'+
                '<div class="r-offer-img">'+
                  '<a class="d-inline-block" href="#"><img src="D:/CarRental/git/Web/Web/images/car-1.png" class="img-fluid d-block m-auto" alt=""></a>'+
                  '<div class="r-offer-img-over">'+
                    '<i class="fa fa-search"></i>'+
                  '</div>'+
                '</div>'+
                '<div class="r-best-offer-content">'+
                  '<a href="#"><b>'+inventoryData[i].brand+'</b> </a>'+
                  '<p>Start at <b>'+inventoryData[i].price+'$m</b> per day</p>'+
                  '<ul class="pl-0 mb-0">'+
                    '<li><i class="fa fa-car"></i><span>'+inventoryData[i].year+'</span></li>'+
                    '<li><i class="fa fa-cogs"></i><span>'+inventoryData[i].model+'</span></li>'+
                    '<li><i class="fa fa-beer"></i><span>'+inventoryData[i].vehicle_type+'</span></li>'+
            
                  '</ul>'+
                '</div>'+
                '<div class="r-offer-rewst-this" onclick="deleteInventory('+i+')">'+
                  '<span class="text-uppercase"><a>Delete</a></span>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'
        }
    } else {
        alert(data.message);
    }
}

async function fetchReturns() {
    var response = await fetch('http://localhost:3000/fetchReturnedCars');
    var data = await response.json();
    if(data.status==200) {
       inventoryData = data.data;
        document.getElementById("inventory").innerHTML = ''
        for (let i = 0; i < inventoryData.length; i++) {
            document.getElementById("inventory").innerHTML += '<div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">'+
            '<div class="r-best-offer-single">'+
              '<div class="r-best-offer-in">'+
                '<div class="r-offer-img">'+
                  '<a class="d-inline-block" href="#"><img src="D:/CarRental/git/Web/Web/images/car-1.png" class="img-fluid d-block m-auto" alt=""></a>'+
                  '<div class="r-offer-img-over">'+
                    '<i class="fa fa-search"></i>'+
                  '</div>'+
                '</div>'+
                '<div class="r-best-offer-content">'+
                  '<a href="#"><b>'+inventoryData[i].brand+'</b> </a>'+
                  '<p>Start at <b>'+inventoryData[i].price+'$m</b> per day</p>'+
                  '<ul class="pl-0 mb-0">'+
                    '<li><i class="fa fa-car"></i><span>'+inventoryData[i].year+'</span></li>'+
                    '<li><i class="fa fa-cogs"></i><span>'+inventoryData[i].model+'</span></li>'+
                    '<li><i class="fa fa-beer"></i><span>'+inventoryData[i].vehicle_type+'</span></li>'+
            
                  '</ul>'+
                '</div>'+
                '<div class="r-offer-rewst-this" onclick="confirmReturn('+i+')">'+
                  '<span class="text-uppercase"><a>Confirm Return</a></span>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'
        }
    }
}

async function createInventory() {
    var inventoryForm = document.forms["inventorycreate"];
    var newInventoryData = new InventoryClass(inventoryForm["brand"].value,inventoryForm["model"].value,inventoryForm["year"].value,inventoryForm["vehicle_type"].value,inventoryForm["price"].value)
    
    var response = await fetch('http://localhost:3000/addInventory', {
        method: 'POST',
        body: JSON.stringify(newInventoryData), 
        headers: {
            'Content-Type': 'application/json'
        }
    });
    var data = await response.json();
    if(data.status==200) {
        alert(data.message);
        document.forms.inventorycreate.reset();
    } else {
        alert(data.message);
    }
}

async function deleteInventory(index) {
    var response = await fetch('http://localhost:3000/deleteInventory/'+inventoryData[index].id+'');
    var data = await response.json();
    if(data.status==200) {
        alert(data.message);
        getEmployeeInventory();
    } else {
        alert(data.message);
    }
}

async function confirmReturn(index) {
    var response = await fetch('http://localhost:3000/confirmReturn/'+inventoryData[index].id);
    var data = await response.json();
    if(data.status==200) {
        alert(data.message);
        fetchReturns();
    } else {
        alert(data.message);
    }
}

async function customerProfile() {
    var response = await fetch('http://localhost:3000/customerProfile/'+localStorage.getItem('username'));
    var data = await response.json();
    console.log(data);
    if(data.status==200) {
        var profileData = data.data;
        var profileForm = document.forms["profile"];
        profileForm["first_name"].value = profileData["first_name"];
        profileForm["last_name"].value = profileData["last_name"];
        profileForm["dob"].value = profileData["dob"];
        profileForm["address"].value = profileData["address"];
        profileForm["phone_number"].value = profileData["phone_number"];
        profileForm["email"].value = profileData["email"];
        profileForm["driving_license"].value = profileData["driving_license"];
    } else {
        alert(data.message);
    }
}

async function updateProfile() {
    var profileForm = document.forms["profile"];
    var updatedProfile = new ProfileClass(profileForm["first_name"].value,profileForm["last_name"].value,profileForm["dob"].value,profileForm["address"].value,profileForm["phone_number"].value,profileForm["email"].value,profileForm["driving_license"].value)
    
    var response = await fetch('http://localhost:3000/updateProfile', {
        method: 'POST',
        body: JSON.stringify(updatedProfile), 
        headers: {
            'Content-Type': 'application/json'
        }
    });
    var data = await response.json();
    if(data.status==200) {
        alert(data.message);
    } else {
        alert(data.message);
    }
}

function loadCustomerFilter() {
    document.getElementById("filter").innerHTML = '<div class="inventory-filter">'+
        '<form class="inlineform" name="filterForm">'+
            '<label for="vehicle_type">Type:</label>'+
            '<select id="vehicle_type" name="vehicle_type">'+
                '<option value="All">All</option>'+
                '<option value="Economy">Economy</option>'+
                '<option value="SUV">SUV</option>'+
                '<option value="Luxury">Luxury</option>'+
            '</select>'+
            '<label for="year">Year:</label>'+
            '<select id="year" name="year">'+
                '<option value="All">All</option>'+
                '<option value="2017">2017</option>'+
                '<option value="2018">2018</option>'+
                '<option value="2019">2019</option>'+
                '<option value="2020">2020</option>'+
            '</select>'+
            '<label for="brand">Brand:</label>'+
            '<select id="brand" name="brand">'+
                '<option value="All">All</option>'+
                '<option value="Tata">Tata</option>'+
                '<option value="Mahindra">Mahindra</option>'+
                '<option value="Honda">Honda</option>'+
                '<option value="BMW">BMW</option>'+
                '<option value="Ford">Ford</option>'+
                '<option value="Audi">Audi</option>'+
            '</select>'+
            '<button type="button" style="float: right;" onclick="getCustomerInventory()">&nbsp;&nbsp;Filter&nbsp;&nbsp;</button>'+
        '</form>'+
    '</div>'
    getCustomerInventory();
}

async function getCustomerInventory() {
    var filterForm = document.forms["filterForm"];
    var filters = {
        vehicle_type:filterForm["vehicle_type"].value,
        year:filterForm["year"].value,
        brand:filterForm["brand"].value
    }
    var response = await fetch('http://localhost:3000/fecthAvailableinventory',{
        method: 'POST',
        body: JSON.stringify(filters),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    var data = await response.json();
    if(data.status==200) {
       inventoryData = data.data;
        document.getElementById("inventory").innerHTML = ''
        for (let i = 0; i < inventoryData.length; i++) {
            document.getElementById("inventory").innerHTML += '<div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">'+
            '<div class="r-best-offer-single">'+
              '<div class="r-best-offer-in">'+
                '<div class="r-offer-img">'+
                  '<a class="d-inline-block" href="#"><img src="D:/CarRental/git/Web/Web/images/car-1.png" class="img-fluid d-block m-auto" alt=""></a>'+
                  '<div class="r-offer-img-over">'+
                    '<i class="fa fa-search"></i>'+
                  '</div>'+
                '</div>'+
                '<div class="r-best-offer-content">'+
                  '<a href="#"><b>'+inventoryData[i].brand+'</b> </a>'+
                  '<p>Start at <b>'+inventoryData[i].price+'$m</b> per day</p>'+
                  '<ul class="pl-0 mb-0">'+
                    '<li><i class="fa fa-car"></i><span>'+inventoryData[i].year+'</span></li>'+
                    '<li><i class="fa fa-cogs"></i><span>'+inventoryData[i].model+'</span></li>'+
                    '<li><i class="fa fa-beer"></i><span>'+inventoryData[i].vehicle_type+'</span></li>'+
            
                  '</ul>'+
                '</div>'+
                '<div class="r-offer-rewst-this" onclick="bookCar('+i+')">'+
                    '<span class="text-uppercase"> <a>Book Car</a></span>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'
        }
    }
}

async function bookCar(index) {
    document.getElementById("filter").innerHTML = '';
    document.getElementById("inventory").innerHTML = '<div class="col-md-3"></div>'+
        '<div class="row mx-1">'+
            '<div class="col-md-6 mb-2">'+
                '<label for="brand">Brand:</label>'+
                '<input type="text" class="form-control" placeholder="enter" value="'+inventoryData[index].brand+'" name="brand" disabled>'+
            '</div>'+
            '<div class="col-md-6 mb-2">'+
                '<label>Model:</label>'+
                '<input type="text" class="form-control" value="'+inventoryData[index].model+'" placeholder="enter " name="model" disabled>'+
            '</div>'+
            '<div class="col-md-6 mb-2">'+
                '<label for="year">Year:</label>'+
                '<input type="text" class="form-control" value="'+inventoryData[index].year+'" placeholder="enter " name="year" disabled>'+
            '</div>'+
            '<div class="col-md-6 mb-2">'+
                '<label for="vehicle_type">Type:</label>'+
                '<input type="text" class="form-control" value="'+inventoryData[index].vehicle_type+'" placeholder="enter " name="vehicle_type" disabled>'+
            '</div>'+
            '<div class="col-md-6 mb-2">'+
                '<label for="price">Price:</label>'+
                '<input type="text" class="form-control" value="'+inventoryData[index].price+'" placeholder="enter " name="price" disabled>'+
            '</div>'+
            '<div class="col-md-6 mb-2">'+
                '<label for="start_date">Start Date:</label>'+
                '<input type="date" class="form-control" placeholder="enter " name="start_date">'+
            '</div>'+
            '<div class="col-md-6 mb-2">'+
                '<label for="end_date">End Date:</label>'+
                '<input type="date" class="form-control" placeholder="enter " name="end_date">'+
            '</div>'+
            '<div class="col-md-12">'+
                '<a class="btn signbtn btn-block" id="button" onclick="confirmBooking('+index+')">Book now</a>'+
            '</div>'+
        '</div>'
}

async function confirmBooking(index) {
    
    var response = await fetch('http://localhost:3000/confirmBooking/'+inventoryData[index].id+'/'+localStorage.getItem('username'));
    var data = await response.json();
    if(data.status==200) {
        alert(data.message);
        loadCustomerFilter()
    } else {
        alert(data.message);
    }
}

async function fetchBookedCars() {
    var response = await fetch('http://localhost:3000/fetchBookedCars/',{
        method: 'POST',
        body: JSON.stringify({username:localStorage.getItem('username')}),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    var data = await response.json();
    if(data.status==200) {
       inventoryData = data.data;
    document.getElementById("inventory").innerHTML = ''
    for (let i = 0; i < inventoryData.length; i++) {
        document.getElementById("inventory").innerHTML += '<div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">'+
        '<div class="r-best-offer-single">'+
          '<div class="r-best-offer-in">'+
            '<div class="r-offer-img">'+
              '<a class="d-inline-block" href="#"><img src="D:/CarRental/git/Web/Web/images/car-1.png" class="img-fluid d-block m-auto" alt=""></a>'+
              '<div class="r-offer-img-over">'+
                '<i class="fa fa-search"></i>'+
              '</div>'+
            '</div>'+
            '<div class="r-best-offer-content">'+
              '<a href="#"><b>'+inventoryData[i].brand+'</b> </a>'+
              '<p>Start at <b>'+inventoryData[i].price+'$m</b> per day</p>'+
              '<ul class="pl-0 mb-0">'+
                '<li><i class="fa fa-car"></i><span>'+inventoryData[i].year+'</span></li>'+
                '<li><i class="fa fa-cogs"></i><span>'+inventoryData[i].model+'</span></li>'+
                '<li><i class="fa fa-beer"></i><span>'+inventoryData[i].vehicle_type+'</span></li>'+
        
              '</ul>'+
            '</div>'+
            '<div class="r-offer-rewst-this" onclick="returnCar('+i+')">'+
              '<span class="text-uppercase"><a>Return Car</a></span>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>'
    }
}
}

async function returnCar(index) {
    var response = await fetch('http://localhost:3000/returnCar/'+inventoryData[index].id);
    var data = await response.json();
    if(data.status==200) {
        alert(data.message);
        fetchBookedCars()
    } else {
        alert(data.message);
    }
}

function logout() {
    localStorage.setItem("username","");
    window.location = "emplogin.html";
}
