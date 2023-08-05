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

  axios.post("https://crudcrud.com/api/1138ab070ca74bec87778377037b8220/appointmentData", userDetails)
    .then((response) => {
      console.log(response);
      displayUserDetails(response.data); // Refresh the user details after successful save
    })
    .catch((err) => {
      console.log(err);
    });

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
  var usersArray = Object.values(userDetails)
  for (var user of usersArray) {
    var userDetailsLine = 'Name: ' + user.name + ', ';
    userDetailsLine += 'Date: ' + user.date + ', ';
    userDetailsLine += 'Email: ' + user.email + ', ';
    userDetailsLine += 'Time: ' + user.time + ', ';
    userDetailsLine += 'Phone: ' + user.phone;

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
      deleteUser(user._id);
    });

    var editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function () {
      editUser(user);
    });

    userDetailsSection.appendChild(document.createTextNode(userDetailsLine));
    userDetailsSection.appendChild(deleteButton);
    userDetailsSection.appendChild(editButton);
    userDetailsSection.appendChild(document.createElement('br'));
  }
}

function deleteUser(userId) {
  axios.delete(`https://crudcrud.com/api/1138ab070ca74bec87778377037b8220/appointmentData/${userId}`)
    .then((response) => {
      console.log(response);
      displayUserDetails(response.data); // Refresh the user details after successful deletion
    })
    .catch((err) => {
      console.log(err);
    });
}

function editUser(user) {
  document.getElementById('date').value = user.date;
  document.getElementById('email').value = user.email;
  document.getElementById('time').value = user.time;
  document.getElementById('phone').value = user.phone;
  document.getElementById('name').value = user.name;

  var updateButton = document.createElement('button');
  updateButton.textContent = 'Update';
  updateButton.addEventListener('click', function () {
    updateUser(user._id);
  });

  var userDetailsSection = document.getElementById('userDetailsSection');
  userDetailsSection.appendChild(updateButton);
}

function updateUser(userId) {
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

  axios.put(`https://crudcrud.com/api/1138ab070ca74bec87778377037b8220/appointmentData/${userId}`, userDetails)
    .then((response) => {
      console.log(response);
      displayUserDetails(response.data); // Refresh the user details after successful update
    })
    .catch((err) => {
      console.log(err);
    });

  document.getElementById('myForm').reset();
  console.log('Updated Data:');
  console.log('Date:', date);
  console.log('Email:', email);
  console.log('Time:', time);
  console.log('Phone:', phone);
  console.log('Name:', name);
}

// On page load, fetch and display user details
document.addEventListener('DOMContentLoaded', function () {
  axios.get("https://crudcrud.com/api/1138ab070ca74bec87778377037b8220/appointmentData")
    .then((response) => {
      var userDetails = response.data;
      displayUserDetails(userDetails);
    })
    .catch((err) => {
      console.log(err);
    });
});
