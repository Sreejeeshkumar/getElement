var url='https://crudcrud.com/api/0465ebce2ff1469ca54785cf4be39bf6/candyData'
function submitForm(event){
  event.preventDefault();
  
  var candyname=document.getElementById('candyname').value
  var description=document.getElementById('description').value
  var price=document.getElementById('price').value
  var quantity=document.getElementById('quantity').value
  
var obj={
  candyname,
  description,
  price,
  quantity
}
axios.post(url,obj)
.then((response)=>{
  displayCandyDetails(response.data)
  window.location.reload();
  console.log(response)
})
.catch((err) => {
  console.log(err);
});


}
window.addEventListener("DOMContentLoaded", ()=>{
  axios.get(url)
.then((response)=>{
  for (var i=0;i<response.data.length;i++){
    displayCandyDetails(response.data[i])
  }
 
  console.log(response)
})
.catch((err) => {
  console.log(err);
});
  
})

function displayCandyDetails(obj){
  var parentElement=document.getElementById("candyDetailsSection");
  var childElement=document.createElement('li')
  childElement.textContent=obj.candyname+' '+obj.description+' '+obj.price+' '+obj.quantity
  
  var buyOneButton = createBuyButton('Buy One',  ()=>buyCandy(obj, 1));
  var buyTwoButton = createBuyButton('Buy Two',  ()=>buyCandy(obj, 2));
  var buyThreeButton = createBuyButton('Buy Three', ()=> buyCandy(obj, 3));

  
  // var buyOneButton = document.createElement('input');
  // buyOneButton.type = "button";
  // buyOneButton.value = 'Buy One';
  // buyOneButton.addEventListener('click', function () {
  //   buyOneCandy(obj);
  // });
  // var buyTwoButton = document.createElement('input');
  // buyTwoButton.type = "button";
  // buyTwoButton.value = 'Buy Two';
  // buyTwoButton.addEventListener('click', function () {
  //   buyTwoCandy(obj);
  // });
  // var buyThreeButton = document.createElement('input');
  // buyThreeButton.type = "button";
  // buyThreeButton.value = 'Buy Three';
  // buyThreeButton.addEventListener('click', function () {
  //   buyThreeCandy(obj);
  // });
 



  
  childElement.appendChild(buyOneButton)
  childElement.appendChild(buyTwoButton)
  childElement.appendChild(buyThreeButton)
  parentElement.appendChild(childElement)


}

// function buyOneCandy(obj) {
//   if (obj.quantity > 0) {
//     axios.put(`${url}/${obj._id}`, { candyname:obj.candyname, description:obj.description, price:obj.price, quantity: obj.quantity - 1 })
//       .then((response) => {
//         //obj.quantity = response.data.quantity;
//         displayCandyDetails(obj);
//         window.location.reload();
//         console.log(response);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }
// function buyTwoCandy(obj) {
//   if (obj.quantity > 0) {
//     axios.put(`${url}/${obj._id}`, { candyname:obj.candyname, description:obj.description, price:obj.price, quantity: obj.quantity - 2 })
//       .then((response) => {
//        // obj.quantity = response.data.quantity;
//         displayCandyDetails(obj);
//         window.location.reload();
//         console.log(response);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }
// function buyThreeCandy(obj) {
//   if (obj.quantity > 0) {
//     axios.put(`${url}/${obj._id}`, { candyname:obj.candyname, description:obj.description, price:obj.price, quantity: obj.quantity - 3 })
//       .then((response) => {
//         //obj.quantity = response.data.quantity;
//         displayCandyDetails(obj);
//         window.location.reload();
//         console.log(response);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }
function buyCandy(obj, quantityToBuy) {
  if (obj.quantity >= quantityToBuy) {
    axios.put(`${url}/${obj._id}`, { candyname:obj.candyname, description:obj.description, price:obj.price, quantity: obj.quantity - quantityToBuy })
      .then((response) => {
        obj.quantity = response.data.quantity;
        displayCandyDetails(obj);
        window.location.reload();
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
function createBuyButton(text, eventHandler) {
  var button = document.createElement('input');
  button.type = 'button';
  button.value = text;
  button.addEventListener('click', eventHandler);
  return button;
}


