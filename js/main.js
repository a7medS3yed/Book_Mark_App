var inputs = document.querySelectorAll('.form-control');
var btnSubmit = document.querySelector('.btn-submit');
var itemsList;

clearForm();

if(localStorage.getItem('itemList') == null)
    itemsList = [];
else{
    itemsList = JSON.parse(localStorage.getItem('itemList'));
    showAllItems();
}


function addItems(){
   if(validationInput(inputs[0]) && validationInput(inputs[1])){
    itmes={
        name: inputs[0].value,
        url: inputs[1].value
    };
    itemsList.push(itmes);
    localStorage.setItem('itemList', JSON.stringify(itemsList));
    console.log(itemsList);
    clearForm();
    clearValidation();
    showLastItem(); 
   }
   else{
    alert("Please fill all inputs");
   }
}

btnSubmit.addEventListener('click', function(){
        addItems();
})



function clearForm(){
    inputs[0].value = null;
    inputs[1].value = null;
}


function showLastItem(){
    var lastIndex = itemsList.length -1;

    var container = `  <tr>
    <th scope="row">${lastIndex+1}</th>
    <td>${itemsList[lastIndex].name}</td>
    <td><a  href="${itemsList[lastIndex].url}" class="btn btn-success"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
    <td><button class="btn btn-danger" onclick="deleteItem(${lastIndex})" ><i class="fa-solid fa-trash-can"></i> Delete</button></td>
  </tr>`
  document.getElementById('tbody').innerHTML += container;
}


function showAllItems(){
    var container = ``;
    for (var i = 0; i < itemsList.length; i++) {
        container += `  <tr>
    <th scope="row">${i+1}</th>
    <td>${itemsList[i].name}</td>
    <td><a  href="${itemsList[i].url}" class="btn btn-success"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
    <td><button class="btn btn-danger" onclick="deleteItem(${i})" ><i class="fa-solid fa-trash-can"></i> Delete</button></td>
  </tr>`
    }
    document.getElementById('tbody').innerHTML = container;
}

function deleteItem(deleleIndex){
    itemsList.splice(deleleIndex, 1);
    localStorage.setItem('itemList',JSON.stringify(itemsList));
    showAllItems();  
}



function validationInput(element){
    var regex={
        itemName:/^[A-Z][a-z]{2,8}$/,
        itemUrl:/^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i
    };

    if(regex[element.id].test(element.value)){
        if(element.classList.contains('is-invalid')){
            element.classList.remove('is-invalid');
        }
           element.classList.add('is-valid');
           return true;
        
    }
    else {
        if(element.classList.contains('is-valid'))
            element.classList.remove('is-valid');
        element.classList.add('is-invalid');
        return false;
        
    }
}

for(var i = 0;i<inputs.length;i++){
    inputs[i].addEventListener('keyup',function(){
        validationInput(this);
    })
}

function clearValidation(){
    for(var i = 0;i<inputs.length;i++){
        inputs[i].classList.remove('is-valid');
    }
}