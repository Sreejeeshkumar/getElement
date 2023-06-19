var items=document.getElementsByClassName("list-group-item")
console.log(items)
items[2].style.backgroundColor="green"
for (var i=0; i<=items.length-1; i++){
    items[i].style.fontWeight="bold"
}