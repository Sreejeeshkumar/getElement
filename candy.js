document.addEventListener('DOMContentLoaded', function () {
    axios.get("https://crudcrud.com/api/21ce26e5d1314d94b0a007f9d7c2a261/candyData")
      .then((response) => {
        var candyDetails = response.data;
        CanddisplayyDetails(candyDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  function submitForm(event) {
    event.preventDefault();
    var candyname = document.getElementById('candyname').value;
    var description = document.getElementById('description').value;
    var price = document.getElementById('price').value;
    var quantity = document.getElementById('quantity').value;
    var candyDetails = {
      candyname: candyname,
      description: description,
      price: price,
      quantity: quantity,
    };
  
    axios
      .post("https://crudcrud.com/api/21ce26e5d1314d94b0a007f9d7c2a261/candyData", candyDetails)
      .then((response) => {
        console.log(response);
        CanddisplayyDetails(response.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    document.getElementById('myForm').reset();
    console.log('Submitted Data:');
    console.log('Candy Name:', candyname);
    console.log('Description:', description);
    console.log('Price:', price);
    console.log('Quantity:', quantity);
  }
  
  function CanddisplayyDetails(candyDetails) {
    axios
      .get("https://crudcrud.com/api/21ce26e5d1314d94b0a007f9d7c2a261/candyData")
      .then((response) => {
        var candyDetailsSection = document.getElementById('candyDetailsSection');
        candyDetailsSection.innerHTML = '';
        var candyArray =  Object.values(candyDetails);
        for (var candy of candyArray) {
          var candyDetailsLine = 'Candy Name: ' + candy.candyname + ',';
          candyDetailsLine += 'Description: ' + candy.description + ',';
          candyDetailsLine += 'Price: ' + candy.price + ',';
          candyDetailsLine += 'Quantity: ' + candy.quantity;
  
          var buyone = document.createElement('button');
          buyone.textContent = 'Buy One';
          buyone.addEventListener('click', function () {
            buyOne(candy);
          });
  
          var buytwo = document.createElement('button');
          buytwo.textContent = 'Buy Two';
          buytwo.addEventListener('click', function () {
            buyTwo(candy);
          });
  
          var buythree = document.createElement('button');
          buythree.textContent = 'Buy Three';
          buythree.addEventListener('click', function () {
            buyThree(candy);
          });
  
          var div = document.createElement('div');
          div.appendChild(document.createTextNode(candyDetailsLine));
          div.appendChild(document.createElement('br'));
          div.appendChild(buyone);
          div.appendChild(buytwo);
          div.appendChild(buythree);
          div.appendChild(document.createElement('hr'));
  
          candyDetailsSection.appendChild(div);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  function buyOne(candy) {
    if (candy.quantity >= 1) {
      candy.quantity -= 1;
      updateQuantityOnServer(candy);
    }
  }
  
  function buyTwo(candy) {
    if (candy.quantity >= 2) {
      candy.quantity -= 2;
      updateQuantityOnServer(candy);
    }
  }
  
  function buyThree(candy) {
    if (candy.quantity >= 3) {
      candy.quantity -= 3;
      updateQuantityOnServer(candy);
    }
  }
  
  function updateQuantityOnServer(candy) {
    var url="https://crudcrud.com/api/bd1d4c0beb4445a98bb5baf2c687f7f1/candyData"
    axios.put(url, candy)
      .then((response) => {
        console.log(response);
        CanddisplayyDetails(response.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  