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
 var userDetails = {
  date: date,
  email: email,
  time: time,
  phone: phone,
  name: name,
};

// Convert the userDetails object to a JSON string
var userDetailsJSON = JSON.stringify(userDetails);

// Store the userDetails JSON string in local storage
localStorage.setItem('userDetails', userDetailsJSON);
 


  console.log('Submitted Data:');
  console.log('Date:', date);
  console.log('Email:', email);
  console.log('Time:', time);
  console.log('Phone:', phone);
  console.log('Name:', name);
}
