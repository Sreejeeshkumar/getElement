var form= document.getElementById('addForm');
var itemList=document.getElementById('items');
var filter=document.getElementById('filter');
//form submit event
form.addEventListener('submit', addItem);
//delete event
itemList.addEventListener('click', removeItem);
//filter event
filter.addEventListener('keyup', filterItems)
//Add item
function addItem(e){
    e.preventDefault();
    //get input value
    var newItem=document.getElementById('item').value;
    var newItemDescription = document.getElementById('itemDescription').value;
    //create a new li element
    var li=document.createElement('li')
    // add class
    li.className='list-group-item';
     // Create item name element
  var itemName = document.createElement('div');
  // Add class
  itemName.className = 'item-name';
  // Add text node with input value
  itemName.appendChild(document.createTextNode(newItemName));
    //add text node withinput value
    li.appendChild(document.createTextNode(newItem));

    // Create item description element
  var itemDescription = document.createElement('div');
  // Add class
  itemDescription.className = 'item-description';
  // Add text node with input value
  itemDescription.appendChild(document.createTextNode(newItemDescription));
  // Append item description to li
  li.appendChild(itemDescription);
    
    //create del button element
    var deleteBtn =document.createElement('button');

    // add classes to del button
    deleteBtn.className='btn btn-danger btn-sm float-right delete';
    //append text node
    deleteBtn.appendChild(document.createTextNode('X'));
    // append button to li
    li.appendChild(deleteBtn);

    // append li to list
    itemList.appendChild(li);
 // Create edit button element
 var editBtn = document.createElement('button');
 //var editBtn = document.createElement('button');
 // Add classes to edit button
 editBtn.className = 'btn btn-primary btn-sm float-right edit';
 //editBtn.className = 'btn btn-primary btn-sm float-right edit';
 // Append text node
 editBtn.appendChild(document.createTextNode('Edit'));
 //editBtn.appendChild(document.createTextNode('Edit'));
 // Append button to li
 li.appendChild(editBtn);
   console.log(1)
 //li.appendChild(editBtn);
  // console.log(1)
   // Clear the input fields
   document.getElementById('item').value = '';
   document.getElementById('itemDescription').value = '';S
 
}

// remove item
function removeItem(e){
    if(e.target.classList.contains('delete')){
        if (confirm('Are you sure?')){
            var li=e.target.parentElement;
            itemList.removeChild(li);
        }
    }
}


// filter items
function filterItems(e){
    //convert text to lowercase
    var text=e.target.value.toLowerCase();
    //get list
    var items=itemList.getElementsByTagName('li');
    //covert to an array
    Array.from(items).forEach(function(item){
        var itemName=item.firstChild.textContent;
        var itemText = item.textContent.toLowerCase();
        if (itemText.includes(text)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
        }
    })

}