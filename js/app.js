// Tu código aquí
let currentPerson = null; 
const button = document.getElementById('btn');
const buttonInterview = document.getElementById('btnInterview');
const photo = document.getElementById('photo');
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const country = document.getElementById('country');
const phone = document.getElementById('phone');
const email = document.getElementById('email');

let interval = setInterval(getNewPerson, 5000);

async function getRandomPerson() {
    try {
    const response = await fetch('https://randomuser.me/api/');
        const data = await response.json(); 
        currentPerson = data.results[0]; 
        photo.src = currentPerson.picture.large;
        firstName.textContent = currentPerson.name.first;
        lastName.textContent = currentPerson.name.last;
        country.textContent = currentPerson.location.country;
        phone.textContent = currentPerson.phone;
        email.textContent = currentPerson.email;
        } 
        catch (error) {
            console.error("Error fetching results:", error);
        }
        
        button.style.display = 'none' ;
        buttonInterview.style.display = 'block' ;

        
    }

async function getNewPerson() {
    try {
        await getRandomPerson();
    } catch (error) {
        console.error("Error al obtener persona:", error);
    }
      clearInterval(interval); 

     interval = setInterval(getNewPerson, 5000);
  }
  
  function addNewContact(name, phone) {
    const tableBody = document.querySelector(".mt-3.table tbody"); 
    console.log("Adding new contact to table...");
    const newRow = tableBody.insertRow(); 

    const nameCell = newRow.insertCell(0); 
    const phoneCell = newRow.insertCell(1); 

    nameCell.textContent = name;
    phoneCell.textContent = phone;

    console.log("Contact added:", name, phone);
}


buttonInterview.addEventListener('click', function () {
    if (currentPerson) {
        
        const fullName = `${currentPerson.name.first} ${currentPerson.name.last}`;
        const phoneNumber = currentPerson.phone;

      document.querySelector('table').style.display = 'block' ;
        addNewContact(fullName, phoneNumber);
    }
});