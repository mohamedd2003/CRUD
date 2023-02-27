// iNPUTS
var employeeNameInput = document.getElementById("employeeName");
var employeeAgeInput = document.getElementById("employeeAge");
var employeeCityInput = document.getElementById("employeeCity");
var employeeEmailInput = document.getElementById("employeeEmail");
var employeeNumberInput = document.getElementById("employeeNumber");
var employeeInputs = document.getElementsByTagName("input");
var currentIndex = '';

var employees = [];
//check if localStorage null or not
if (JSON.parse(localStorage.getItem("employeesDetails")) != null) {
  employees = JSON.parse(localStorage.getItem("employeesDetails"));
  displayEmployeeDetails();
}
// Add Employee Button
  addBtn.onclick = function () 
  {
    if (addBtn.innerHTML=='<span> <i class=" me-2 fa-solid fa-user-plus"></i></span>Add Employee')
     {
       
            if(validateName()==true&& ValidateAge() ==true&&  validateEmail()==true&&validateCity()==true&& validateNumber()==true)
                           
       {
        
       addEmployee()
       displayEmployeeDetails();
      resetForm();
          employeeNameInput.classList.remove("is-valid");
          employeeAgeInput.classList.remove("is-valid");
          employeeCityInput.classList.remove("is-valid");
          employeeEmailInput.classList.remove("is-valid");
          employeeNumberInput.classList.remove("is-valid");

      }
    }
  else
  { 
    
    updateEmployeeDetails()
    employeeNameInput.classList.remove("is-valid");
    employeeAgeInput.classList.remove("is-valid");
    employeeCityInput.classList.remove("is-valid");
    employeeEmailInput.classList.remove("is-valid");
    employeeNumberInput.classList.remove("is-valid");
    addBtn.innerHTML='<span> <i class=" me-2 fa-solid fa-user-plus"></i></span>Add Employee'
    
  }
  
}
// add Employee
function addEmployee() 
{
 
    var employee = {
      name: employeeNameInput.value,
      age:  employeeAgeInput.value,
      city: employeeCityInput.value,
      email:employeeEmailInput.value,
     number:employeeNumberInput.value,
    };
    employees.push(employee);
    displayEmployeeDetails()
    localStorage.setItem("employeesDetails", JSON.stringify(employees));
    
    resetForm()
   
  
  
}
// display rows in table of Employee Details
function displayEmployeeDetails() {
  var dataBase = "";
  for (var i = 0; i < employees.length; i++) {
    dataBase += `
        <tr>
        <td class='text-white fs-4'>${employees[i].name}</td>
        <td class='text-white fs-4'>${employees[i].age}</td>
        <td class='text-white fs-4'>${employees[i].city}</td>
        <td class='text-white fs-4'>${employees[i].email}</td>
        <td class='text-white fs-4'>${employees[i].number}</td>
        <td >
        <button class="btn  btn-outline-info" onclick='getEmployeeDetails(${i})'> <i class="fa-solid fa-user-pen me-1"></i> Update</button>
        </td>
        <td >
        <button class="btn  btn-outline-danger" onclick="deleteEmployee(${i})"><i class="fa-solid fa-user-xmark me-1"></i> Delete</button>
       </td>
        </tr>
        `;
  }
  document.getElementById("tableBody").innerHTML = dataBase;
}
// remove values from inputs after press add button or press reset button
var resetBtn=document.getElementById('reset')
resetBtn.onclick=function(){
  resetForm()
  employeeNameInput.classList.remove("is-valid");
  employeeAgeInput.classList.remove("is-valid");
  employeeCityInput.classList.remove("is-valid");
  employeeEmailInput.classList.remove("is-valid");
  employeeNumberInput.classList.remove("is-valid");
  employeeNameInput.classList.remove("is-valid");
  employeeAgeInput.classList.remove("is-valid");
  employeeCityInput.classList.remove("is-valid");
  employeeEmailInput.classList.remove("is-valid");
  employeeNumberInput.classList.remove("is-valid");
}
function resetForm() {
  for (var i = 0; i < employeeInputs.length; i++) {
    employeeInputs[i].value = "";
  }
}
// delete row from table
function deleteEmployee(index) {
  employees.splice(index, 1);
  displayEmployeeDetails();
  localStorage.setItem("employeesDetails", JSON.stringify(employees));
}
// search by name value
function search(searchText) {
  var dataBase = "";
  for (var i = 0; i < employees.length; i++) {
    if (employees[i].name.toLowerCase().includes(searchText.toLowerCase())) {
      dataBase += `
            <tr>
            <td class='text-white fs-4'>${employees[i].name}</td>
            <td class='text-white fs-4'>${employees[i].age}</td>
            <td class='text-white fs-4'>${employees[i].city}</td>
            <td class='text-white fs-4'>${employees[i].email}</td>
            <td class='text-white fs-4'>${employees[i].number}</td>
            <td >
            <button class="btn  btn-outline-info" onclick='getEmployeeDetails(${i})'> <i class="fa-solid fa-user-pen me-1"></i> Update</button>
            </td>
            <td >
            <button class="btn  btn-outline-danger" onclick="deleteEmployee(${i})"><i class="fa-solid fa-user-xmark me-1"></i> Delete</button>
           </td>
            </tr>
            `;
    }
    document.getElementById("tableBody").innerHTML = dataBase;
  }
}
// return values in inputs to edit employee data
function getEmployeeDetails(index)
{
  currentIndex=index
  var currentEmployee=employees[index];
  employeeNameInput.value=currentEmployee.name;
  employeeAgeInput.value=currentEmployee.age;
  employeeCityInput.value=currentEmployee.city;
  employeeEmailInput.value=currentEmployee.email;
  employeeNumberInput.value=currentEmployee.number;
  addBtn.innerHTML = '<i class="fa-solid fa-user-pen me-1"></i> Update';


}
// // edit employee details

function updateEmployeeDetails()
{
 
  var employee = {
    name: employeeNameInput.value,
    age:  employeeAgeInput.value,
    city: employeeCityInput.value,
    email:employeeEmailInput.value,
   number:employeeNumberInput.value,
  };
  employees[currentIndex]=employee
  localStorage.setItem("employeesDetails", JSON.stringify(employees));
  displayEmployeeDetails()
  resetForm()
  
}

// Validation

var nameAlert = document.getElementById("nameAlert");

var nameImportant = document.getElementById("nameImportant");


//Validate Employee Name
function validateName()
{
  var nameRejex = /^[A-Z]+[a-zA-Z+\s]{2,30}$/;
  if (nameRejex.test(employeeNameInput.value) == true) {
     
    employeeNameInput.classList.add("is-valid");
    employeeNameInput.classList.remove("is-invalid");
    nameImportant.classList.add("d-none");
    nameAlert.classList.add("d-none");
    return true;
  } 
  else {
    employeeNameInput.classList.add("is-invalid");
    employeeNameInput.classList.remove("is-valid");
    nameImportant.classList.remove("d-none");
    nameAlert.classList.remove("d-none");
   
    

return false  
}
}
employeeNameInput.onkeydown = function () {
  validateName()
};
//validate Employee Age
var ageAlert=document.getElementById('ageAlert')
var ageImportant = document.getElementById("ageImportant");

function ValidateAge()
{
  var ageRejex = /^((18)|(19)|[2-7][0-9]|(80))$/;
  if (ageRejex.test(employeeAgeInput.value) == true) {
   
    employeeAgeInput.classList.add("is-valid");
    employeeAgeInput.classList.remove("is-invalid");
    ageImportant.classList.add("d-none");
    ageAlert.classList.add("d-none");
    return true;
  }
   else {
    
    employeeAgeInput.classList.add("is-invalid");
    employeeAgeInput.classList.remove("is-valid");
    ageImportant.classList.remove("d-none");
    ageAlert.classList.remove("d-none");
   
    

 return false 
}
}
employeeAgeInput.onkeyup = function () {
  ValidateAge()
};
//validate Employee City
var cityAlert=document.getElementById('cityAlert');
var cityImportant = document.getElementById("cityImportant");

function validateCity()
{
  

  var cityRejex = /^[A-Z][a-z]{3,25}$/;
  if (cityRejex.test(employeeCityInput.value) == true) {
     
    employeeCityInput.classList.add("is-valid");
    employeeCityInput.classList.remove("is-invalid");
    cityImportant.classList.add("d-none");
    cityAlert.classList.add("d-none");
    return true;
  } 
  else {
    
    employeeCityInput.classList.add("is-invalid");
    employeeCityInput.classList.remove("is-valid");
    cityImportant.classList.remove("d-none");
    cityAlert.classList.remove("d-none");
   ;
    
      return false  ;
}
}
employeeCityInput.onkeyup = function () {
  validateCity()
};
//validate Employee Email

var emailAlert=document.getElementById('emailAlert')
var emailImportant = document.getElementById("emailImportant");

function validateEmail()
{

  var emailRejex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailRejex.test(employeeEmailInput.value) == true) {
     
    employeeEmailInput.classList.add("is-valid");
    employeeEmailInput.classList.remove("is-invalid");
    emailImportant.classList.add("d-none");
    emailAlert.classList.add("d-none");
    return true;
  } 
  else {
    
    employeeEmailInput.classList.add("is-invalid");
    employeeEmailInput.classList.remove("is-valid");
    emailImportant.classList.remove("d-none");
    emailAlert.classList.remove("d-none");
   
    
    return false;
  }
}
employeeEmailInput.onkeyup = function () {
  validateEmail()
}
//Validate Employee Number
var numberAlert=document.getElementById('numberAlert')

var numberImportant = document.getElementById("numberImportant");

function validateNumber()
{
  var numberRejex = /^01(0|1|2|5)[0-9]{8}$/;
  if (numberRejex.test(employeeNumberInput.value) == true) {
 
    employeeNumberInput.classList.add("is-valid");
    employeeNumberInput.classList.remove("is-invalid");
    numberImportant.classList.add("d-none");
    numberAlert.classList.add("d-none");
    return true;
  }
   else {
    
    employeeNumberInput.classList.add("is-invalid");
    employeeNumberInput.classList.remove("is-valid");
   numberImportant.classList.remove("d-none");
    numberAlert.classList.remove("d-none");
   
    
    return false;
  }
}

employeeNumberInput.onkeyup = function () {
  validateNumber()
}





