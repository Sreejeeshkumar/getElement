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
  
  // Get the name of the last added user (newly submitted user)
  var lastAddedUserName = Object.keys(userDetails).pop();

  // Generate the string for the last added user details
  var userDetailsString = 'Name: ' + lastAddedUserName + ', ';
  userDetailsString += 'Date: ' + userDetails[lastAddedUserName].date + ', ';
  userDetailsString += 'Email: ' + userDetails[lastAddedUserName].email + ', ';
  userDetailsString += 'Time: ' + userDetails[lastAddedUserName].time + ', ';
  userDetailsString += 'Phone: ' + userDetails[lastAddedUserName].phone;

  // Update the userDetailsSection with the user details string
  userDetailsSection.textContent = userDetailsString;
}