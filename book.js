function submitForm(event) {
  event.preventDefault();

  var date = document.getElementById('date').value;
  var email = document.getElementById('email').value;
  var time = document.getElementById('time').value;
  var phone = document.getElementById('phone').value;
  var name = document.getElementById('name').value;

  // // Store data in local storage individually
  // localStorage.setItem('userDate', date);
  // localStorage.setItem('userEmail', email);
  // localStorage.setItem('userTime', time);
  // localStorage.setItem('userPhone', phone);
  // localStorage.setItem('userName', name);
 // Create an object to store user details
 var storedUserDetailsJSON = localStorage.getItem('userDetails');
 var userDetails = {};
 if (storedUserDetailsJSON) {
  
  userDetails = JSON.parse(storedUserDetailsJSON);
}
userDetails[name] = {
  date: date,
  email: email,
  time: time,
  phone: phone,
};

var updatedUserDetailsJSON = JSON.stringify(userDetails);

localStorage.setItem('userDetails', updatedUserDetailsJSON);
document.getElementById('myForm').reset();

displayUserDetails(userDetails);


console.log('Submitted Data:');
    console.log('Date:', date);
    console.log('Email:', email);
    console.log('Time:', time);
    console.log('Phone:', phone);
    console.log('Name:', name);
  
    // Retrieve and use the updated user details from local storage
    var updatedUserDetails = JSON.parse(updatedUserDetailsJSON);
    console.log('Retrieved Data:');
    console.log('Date:', updatedUserDetails[name].date);
    console.log('Email:', updatedUserDetails[name].email);
    console.log('Time:', updatedUserDetails[name].time);
    console.log('Phone:', updatedUserDetails[name].phone);
    console.log('Name:', name);

}
function displayUserDetails(userDetails) {
  var userDetailsSection = document.getElementById('userDetailsSection');

  // Clear existing content
  userDetailsSection.innerHTML = '';

  for (var userName in userDetails) {
    var userDetail = userDetails[userName];

    var userDetailsLine = 'Name: ' + userName + ', ';
    userDetailsLine += 'Date: ' + userDetail.date + ', ';
    userDetailsLine += 'Email: ' + userDetail.email + ', ';
    userDetailsLine += 'Time: ' + userDetail.time + ', ';
    userDetailsLine += 'Phone: ' + userDetail.phone;

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', (function (user) {
      return function () {
        deleteUser(user);
      };
    })(userName));
    var editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', (function (user) {
      return function () {
        editUser(user);
      };
    })(userName));
    userDetailsSection.appendChild(document.createTextNode(userDetailsLine));
    userDetailsSection.appendChild(deleteButton);
    userDetailsSection.appendChild(editButton);
    userDetailsSection.appendChild(document.createElement('br'));
  }
}

function deleteUser(userName) {
  // Retrieve existing user details from local storage
  var storedUserDetailsJSON = localStorage.getItem('userDetails');
  var userDetails = {};

  if (storedUserDetailsJSON) {
    // Parse the stored user details JSON string back to an object or array
    userDetails = JSON.parse(storedUserDetailsJSON);
  }

  // Remove the user from the userDetails object
  delete userDetails[userName];

  // Convert the updated userDetails object to a JSON string
  var updatedUserDetailsJSON = JSON.stringify(userDetails);

  // Store the updated userDetails JSON string in local storage
  localStorage.setItem('userDetails', updatedUserDetailsJSON);

  // Update the UI after removing the user
  displayUserDetails(userDetails);
}
function editUser(userName) {
  // Retrieve existing user details from local storage
  var storedUserDetailsJSON = localStorage.getItem('userDetails');
  var userDetails = {};

  if (storedUserDetailsJSON) {
    // Parse the stored user details JSON string back to an object or array
    userDetails = JSON.parse(storedUserDetailsJSON);
  }

  var userDetail = userDetails[userName];

  // Populate the form with the user's existing details
  document.getElementById('date').value = userDetail.date;
  document.getElementById('email').value = userDetail.email;
  document.getElementById('time').value = userDetail.time;
  document.getElementById('phone').value = userDetail.phone;
  document.getElementById('name').value = userName;

  // Remove the user from the userDetails object temporarily while editing
  delete userDetails[userName];

  // Convert the updated userDetails object to a JSON string (without the current user)
  var updatedUserDetailsJSON = JSON.stringify(userDetails);

  // Store the updated userDetails JSON string in local storage
  localStorage.setItem('userDetails', updatedUserDetailsJSON);
}





