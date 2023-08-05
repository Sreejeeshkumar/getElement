function submitForm(event) {
  event.preventDefault();
  var date = document.getElementById('date').value;
  var email = document.getElementById('email').value;
  var time = document.getElementById('time').value;
  var phone = document.getElementById('phone').value;
  var name = document.getElementById('name').value;
  var userDetails = {
    date: date,
    email: email,
    time: time,
    phone: phone,
    name: name
  };

  axios.post("https://crudcrud.com/api/5a9b4139ddfe4545a0d2a5fe33d085dd/appointmentData", userDetails)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });

  var userDetailsSection = document.getElementById('userDetailsSection');
  var userDetailsLine = 'Name: ' + name + ', ';
  userDetailsLine += 'Date: ' + date + ', ';
  userDetailsLine += 'Email: ' + email + ', ';
  userDetailsLine += 'Time: ' + time + ', ';
  userDetailsLine += 'Phone: ' + phone;

  var deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function () {
    deleteUser(name);
  });

  var editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', function () {
    editUser(name);
  });

  userDetailsSection.appendChild(document.createTextNode(userDetailsLine));
  userDetailsSection.appendChild(deleteButton);
  userDetailsSection.appendChild(editButton);
  userDetailsSection.appendChild(document.createElement('br'));

  document.getElementById('myForm').reset();
  console.log('Submitted Data:');
  console.log('Date:', date);
  console.log('Email:', email);
  console.log('Time:', time);
  console.log('Phone:', phone);
  console.log('Name:', name);
}

function displayUserDetails(userDetails) {
  var userDetailsSection = document.getElementById('userDetailsSection');
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
  var storedUserDetailsJSON = localStorage.getItem('userDetails');
  var userDetails = {};

  if (storedUserDetailsJSON) {
    userDetails = JSON.parse(storedUserDetailsJSON);
  }

  var userDetail = userDetails[userName];

  document.getElementById('date').value = userDetail.date;
  document.getElementById('email').value = userDetail.email;
  document.getElementById('time').value = userDetail.time;
  document.getElementById('phone').value = userDetail.phone;
  document.getElementById('name').value = userName;
}

// On page load, fetch and display user details
document.addEventListener('DOMContentLoaded', function () {
  axios.get("https://crudcrud.com/api/5a9b4139ddfe4545a0d2a5fe33d085dd/appointmentData")
    .then((response) => {
      var userDetails = response.data;
      displayUserDetails(userDetails);
    })
    .catch((err) => {
      console.log(err);
    });
});
