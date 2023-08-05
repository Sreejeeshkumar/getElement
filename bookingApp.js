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

  for (var user of userDetails) {
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
  axios.delete(`https://crudcrud.com/api/5a9b4139ddfe4545a0d2a5fe33d085dd/appointmentData/${userId}`)
    .then((response) => {
      console.log(response);
      displayUserDetails(response.data); 
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
