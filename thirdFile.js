var items=document.getElementsByClassName("list-group-item")
console.log(items)
items[2].style.backgroundColor="green"
for (var i=0; i<=items.length-1; i++){
  items[i].style.fontWeight="bold"
}
var Li=document.getElementsByTagName("li")
console.log(Li)
Li[2].style.backgroundColor="green"
for (var i=0; i<=Li.length-1; i++){
    Li[i].style.fontWeight="bold"
}