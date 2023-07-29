document.addEventListener("DOMContentLoaded", () => {
    var selectedRow = null;
  
    // show Alerts
    function showAlert(message, className) {
      const div = document.createElement("div");
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
  
      const container = document.querySelector(".container");
      const main = document.querySelector(".main");
      container.insertBefore(div, main);
      setTimeout(() => div.remove(), 3000);
    }
  
    // clear all fields
    function clearFields() {
      document.querySelector("#firstName").value = "";
      document.querySelector("#lastName").value = "";
      document.querySelector("#rollno").value = "";
    }
  
    // Function to add a new student to the table
    function addStudent(firstName, lastName, rollno) {
      const list = document.querySelector(".student-list");
      const row = document.createElement("tr");
      const timestamp = new Date().toLocaleString(); // Get current timestamp

      row.innerHTML = `
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${rollno}</td>
        <td>${timestamp}</td>

      `;
  
      list.appendChild(row);
    }
  
    // Function to update a student in the table
    function updateStudent(firstName, lastName, rollno) {
      selectedRow.children[0].textContent = firstName;
      selectedRow.children[1].textContent = lastName;
      selectedRow.children[2].textContent = rollno;
      selectedRow.children[3].textContent = new Date().toLocaleString(); // Update timestamp

    }
  
    // Save data to local storage
  function saveToLocalStorage(data) {
    const studentsData = JSON.parse(localStorage.getItem("studentsData")) || [];
    studentsData.push(data);
    localStorage.setItem("studentsData", JSON.stringify(studentsData));
  }

  // Retrieve data from local storage and populate the table
  function populateTableFromLocalStorage() {
    const studentsData = JSON.parse(localStorage.getItem("studentsData")) || [];
    studentsData.forEach((data) => {
      addStudent(data.firstName, data.lastName, data.rollno, data.time);
    });
  }
  
    // Event listener for the "Submit" button to add or update a student
    document.querySelector("#student-form").addEventListener("submit", (e) => {
      e.preventDefault();
  
      // Get form values
      const firstName = document.querySelector("#firstName").value;
      const lastName = document.querySelector("#lastName").value;
      const rollno = document.querySelector("#rollno").value;
  
      // Validate
      if (firstName == "" || lastName == "" || rollno == "") {
        showAlert("Please fill in all fields", "danger");
      } else {
        if (selectedRow == null) {
          addStudent(firstName, lastName, rollno);
          showAlert("Student Added", "success");
        } else {
          updateStudent(firstName, lastName, rollno);
          showAlert("Student Info Edited", "info");
          selectedRow = null; // Reset selectedRow after updating
        }
  
        clearFields();
      }
    });
  
    });