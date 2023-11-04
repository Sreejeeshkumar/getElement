var url = 'https://crudcrud.com/api/2fdb9b55ba40496e8126d9d404aaa905/candyData';

async function submitForm(event) {
  event.preventDefault();

  var candyname = document.getElementById('candyname').value;
  var description = document.getElementById('description').value;
  var price = document.getElementById('price').value;
  var quantity = document.getElementById('quantity').value;

  var obj = {
    candyname,
    description,
    price,
    quantity
  };

  try {
    const response = await axios.post(url, obj);
    displayCandyDetails(response.data);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get(url);
    for (var i = 0; i < response.data.length; i++) {
      displayCandyDetails(response.data[i]);
    }
    console.log(response);
  } catch (err) {
    console.log(err);
  }
});

function displayCandyDetails(obj) {
  var parentElement = document.getElementById("candyDetailsSection");
  var childElement = document.createElement('li');
  childElement.id = obj._id;
  childElement.textContent = 'Candyname: '+ obj.candyname + ', ' + 'Description: '+ obj.description + ', ' + 'Price: '+ obj.price + ', ' + 'Quantity: '+ obj.quantity;

  var buyOneButton = createBuyButton('Buy One', async () => await buyCandy(obj, 1));
  var buyTwoButton = createBuyButton('Buy Two', async () => await buyCandy(obj, 2));
  var buyThreeButton = createBuyButton('Buy Three', async () => await buyCandy(obj, 3));

  childElement.appendChild(buyOneButton);
  childElement.appendChild(buyTwoButton);
  childElement.appendChild(buyThreeButton);
  parentElement.appendChild(childElement);
}

async function buyCandy(obj, quantityToBuy) {
  if (obj.quantity >= quantityToBuy) {
    try {
      const response = await axios.put(`${url}/${obj._id}`, {
        candyname: obj.candyname,
        description: obj.description,
        price: obj.price,
        quantity: obj.quantity - quantityToBuy
      });
      obj.quantity = obj.quantity-quantityToBuy;
      var parentElement = document.getElementById("candyDetailsSection");
       var oldChildElement = document.getElementById(obj._id);
       if (oldChildElement) {
         parentElement.removeChild(oldChildElement); 
       }
      displayCandyDetails(obj);
      
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
}
function createBuyButton(text, eventHandler) {
  var button = document.createElement('input');
  button.type = 'button';
  button.value = text;
  button.addEventListener('click', eventHandler);
  return button;
}
