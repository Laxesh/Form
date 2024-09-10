let arr = [];
let userHobbies = ["Reading", "Travelling", "Playing", "Movie"];

function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getData(key) {
  return JSON.parse(localStorage.getItem(key));
}

function displayData() {
  const anotherHobbies = document.getElementById("addHobbies");

  // setData("userHobbies", userHobbies);

  const userHobbiesdata = getData("userHobbies") ? getData("userHobbies") : [];
  userHobbies = userHobbiesdata.length > 0 ? userHobbiesdata : userHobbies;

  anotherHobbies.innerHTML = "";
  userHobbies.map((element) => {
    anotherHobbies.innerHTML += `<div class="form-check">
    <input class="form-check-input" type="checkbox" value="${element}" name="Hobbies" id="${element}">
    <label class="form-check-label text-capitalize" for="${element}">
    ${element}
    </label>
    </div>`;
  });

  const data = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : [];
  arr = data;

  const showData = document.querySelector("#tbody");
  showData.innerHTML = "";
  arr.map((user) => {
    const usersinputHobbies = user.hobbies
      .map(
        (hobby) =>
          `<div>${hobby}<button class="delete-hobby" onclick="deleteHobby(${user.id},'${hobby}') ">&times;</button></div>`
      )
      .join("");
    // console.log(usersinputHobbies);
    showData.innerHTML += `   
        <tr >
        <td>${arr.indexOf(user) + 1}</td>
        <td>${user.name}</td>
        <td>${user.city}</td>
        <td>${user.age}</td>
        <td>${user.gender}</td>
        
        <td>${usersinputHobbies}</td>
        <td><button id="delete"  onclick="deleteRecord(${
          user.id
        })" class="bg-transparent border-0 text-danger"><i class="fi fi-br-cross"></i></button>
       <button onclick="moveRecord(${
         user.id
       },'up')" class="bg-transparent border-0 text-success"><i class="fi fi-rr-arrow-small-up"></i></button>
        <button onclick="moveRecord(${
          user.id
        } ,'down')"  class="bg-transparent border-0 text-info"><i class="fi fi-rr-arrow-small-down" ></i></button></td>
      </tr>
      `;
  });

  const addHobbiesCount = document.querySelector("#addHobbiesCount");
  addHobbiesCount.innerHTML = "";

  const hobbyCount = {};

  for (let user of arr) {
    const { hobbies } = user;
    for (let hobby of hobbies) {
      if (hobby in hobbyCount) {
        hobbyCount[hobby] += 1;
      } else {
        hobbyCount[hobby] = 1;
      }
      // console.log(hobby);
    }
    // console.log(hobbyCount);
  }

  Object.keys(hobbyCount).map((hobby) => {
    addHobbiesCount.innerHTML += `  
    <div class="box card m-2" style="width: 150px">
    <div class="box-1 p-2">
    <h5>${hobby} :</h5>
    <span id="${hobby}">${hobbyCount[hobby]}</span>
    </div>
    </div>`;
  });

  // const newHobbiesCount = document.getElementById("addHobbiesCount");

  const maleCount = document.getElementById("Male");
  const femaleCount = document.getElementById("Female");

  const male = arr.filter((element) => element.gender === "male");
  const female = arr.filter((element) => element.gender === "female");

  maleCount.innerHTML = male.length;
  femaleCount.innerHTML = female.length;
  // console.log(arr);
  // console.log(userHobbies);
}
displayData();

function deleteRecord(id) {
  arr = arr.filter((element) => element.id !== id);
  setData("user", arr);
  displayData();
}

function deleteHobby(userId, hobbyTobeDeleted) {
  const userIndex = arr.findIndex((user) => {
    return user.id === userId;
  });

  const user = arr[userIndex];
  const hobbiesAfterDeletion = user.hobbies.filter((hobby) => hobby !== hobbyTobeDeleted);
  arr[userIndex].hobbies = hobbiesAfterDeletion;

  setData("user", arr);
  displayData();
}

function submit() {
  const name = document.getElementById("FirstName").value;
  const city = document.getElementById("city").value;
  const age = document.getElementById("Age").value;
  const gender = document.querySelector("input[name='gender']:checked").value;
  const hobbies = document.querySelectorAll("input[name='Hobbies']:checked");
  const newHobbies = document.getElementById("new-hobbies").value;

  const inputHobbies = [];
  hobbies.forEach((element) => {
    inputHobbies.push(element.value);
  });

  if (newHobbies.trim() !== "") {
    inputHobbies.push(newHobbies);
    userHobbies.push(newHobbies);
    setData("userHobbies", userHobbies);
  }

  const user = {
    id: Date.now(),
    name: name,
    city: city,
    age: age,
    gender: gender,
    hobbies: inputHobbies,
  };

  arr.push(user);

  localStorage.setItem("user", JSON.stringify(arr));

  document.querySelector("form").reset();

  alert("Record added successfully");
  displayData();
}

function deleteRecord(id) {
  if (confirm("Are you sure to delete the record?")) {
    const index = arr.findIndex((element) => element.id === id);
    if (index !== -1) {
      arr.splice(index, 1);
      localStorage.setItem("user", JSON.stringify(arr));
    }
    displayData();
  }
}

function moveRecord(id, direction) {
  const index = arr.findIndex((element) => element.id === id);

  if (index === -1) return;

  if (direction === "up" && index > 0) {
    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
  } else if (direction === "down" && index < arr.length - 1) {
    [arr[index + 1], arr[index]] = [arr[index], arr[index + 1]];
  }

  localStorage.setItem("user", JSON.stringify(arr));
  displayData();
}
