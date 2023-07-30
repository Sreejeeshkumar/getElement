function submitForm(e) {
  e.preventDefault();

  var field=document.getElementById('field').value;
  var Description=document.getElementById('Description').value;
  var expenseAmount=document.getElementById('expenseamount').value;
  
 var storedUserDetailsJSON = localStorage.getItem('userDetails');
 var userDetails = {};
 if (storedUserDetailsJSON) {
  
  userDetails = JSON.parse(storedUserDetailsJSON);
}
userDetails[expenseAmount] = {
  field : field,
  Description:Description
};

var updatedUserDetailsJSON = JSON.stringify(userDetails);

localStorage.setItem('userDetails', updatedUserDetailsJSON);
document.getElementById('myForm').reset();

displayUserDetails(userDetails);


console.log('Submitted Data:');
    console.log('field:', field);
    console.log('Description', Description);
    console.log('expenseAmount:', expenseAmount);
  
    // Retrieve and use the updated user details from local storage
    var updatedUserDetails = JSON.parse(updatedUserDetailsJSON);
    console.log('Retrieved Data:');
    console.log('field:', updatedUserDetails[expenseAmount].date);
    console.log('Description:', updatedUserDetails[expenseAmount].email);
    console.log('expenseAmount', expenseAmount);

}
function displayUserDetails(userDetails) {
  var userDetailsSection = document.getElementById('userDetailsSection');

  // Clear existing content
  userDetailsSection.innerHTML = '';

  for (var userExpenseAmount in userDetails) {
    var userDetail = userDetails[userExpenseAmount];

    var userDetailsLine = 'expenseAmount:= ' + userExpenseAmount + ', ';
    userDetailsLine += 'field:= ' + userDetail.field + ', ';
    userDetailsLine += 'Description:= ' + userDetail.Description + ', ';

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', (function (user) {
      return function () {
        deleteUser(user);
      };
    })(userExpenseAmount));
    var editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', (function (user) {
      return function () {
        editUser(user);
      };
    })(userExpenseAmount));
    userDetailsSection.appendChild(document.createTextNode(userDetailsLine));
    userDetailsSection.appendChild(deleteButton);
    userDetailsSection.appendChild(editButton);
    userDetailsSection.appendChild(document.createElement('br'));
  }
}

function deleteUser(userExpenseAmount) {
  // Retrieve existing user details from local storage
  var storedUserDetailsJSON = localStorage.getItem('userDetails');
  var userDetails = {};

  if (storedUserDetailsJSON) {
    // Parse the stored user details JSON string back to an object or array
    userDetails = JSON.parse(storedUserDetailsJSON);
  }

  // Remove the user from the userDetails object
  delete userDetails[userExpenseAmount];

  // Convert the updated userDetails object to a JSON string
  var updatedUserDetailsJSON = JSON.stringify(userDetails);

  // Store the updated userDetails JSON string in local storage
  localStorage.setItem('userDetails', updatedUserDetailsJSON);

  // Update the UI after removing the user
  displayUserDetails(userDetails);
}


function editUser(userExpenseAmount) {
  // Retrieve existing user details from local storage
  var storedUserDetailsJSON = localStorage.getItem('userDetails');
  var userDetails = {};

  if (storedUserDetailsJSON) {
    // Parse the stored user details JSON string back to an object or array
    userDetails = JSON.parse(storedUserDetailsJSON);
  }

  var userDetail = userDetails[userExpenseAmount];

  // Populate the form with the user's existing details
  document.getElementById('field').value = userDetail.field;
  document.getElementById('Description').value = userDetail.Description;
  document.getElementById('expenseamount').value = userExpenseAmount;

  // Remove the user from the userDetails object temporarily while editing
  delete userDetails[userExpenseAmount];

  // Convert the updated userDetails object to a JSON string (without the current user)
  var updatedUserDetailsJSON = JSON.stringify(userDetails);

  // Store the updated userDetails JSON string in local storage
  localStorage.setItem('userDetails', updatedUserDetailsJSON);
 }





