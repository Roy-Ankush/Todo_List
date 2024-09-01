$(document).ready(function () {
    // Handle edit button click
    $(document).on('click', '.edit', function () {
      $(this).hide(); // Hide the edit button
      $(this).siblings('.done_edit').show(); // Show the Done button
      $(this).siblings(".tasks").prop("contenteditable", true);
      $(this).siblings(".tasks").focus();
    });
  
    // Handle done_edit button click
    $(document).on('click', '.done_edit', function () {
      $(this).hide(); // Hide the done_edit button
      $(this).siblings('.edit').show(); // Show the edit button
      $(this).siblings(".tasks").prop("contenteditable", false);
      $(this).siblings(".tasks").blur(); // Remove focus
      updateLocalStorage(); // Update the Local Storage
    });
  
    // Handle done checkbox click
    $(document).on('click', '.done', function () {
      if ($(this).is(":checked")) {
        $(this).siblings(".delete").show();
        $(this).siblings(".edit").hide();
        $(this).siblings(".done_edit").hide(); // Hide done_edit button
      } else {
        $(this).siblings(".delete").hide();
        $(this).siblings(".edit").show();
        $(this).siblings(".done_edit").hide(); // Hide done_edit button
      }
    });
  
    // Handle delete button click
    $(document).on('click', '.delete', function (event) {
      event.preventDefault();
      var taskContent = $(this).siblings(".tasks").text();
      $(this).closest(".content").remove();
      removeFromLocal(taskContent);// Remove selected Task from Local Storage
    });
  
    // Function to update local storage
    function updateLocalStorage() {
      let tasks = [];
      $(".tasks").each(function () {
        tasks.push($(this).text());
      });
      localStorage.setItem('tasks', JSON.stringify([...new Set(tasks)]));
      alert("your task get updated")
    }
  
    // Function to remove task from local storage
    function removeFromLocal(task) {
      let tasksArray = JSON.parse(localStorage.getItem("tasks") || "[]");
      let index = tasksArray.indexOf(task);
      if (index >= 0) {
        tasksArray.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasksArray));
      }
    }
  
    // Function to add tasks to local storage
    function addToLocal() {
      let values = $("#inpt").val();
      let newTasks = [...new Set([...newtaskv, values])];
      localStorage.setItem('tasks', JSON.stringify(newTasks));
    }
  
    // Function to load tasks from local storage
    function loadTasks() {
      newtaskv = JSON.parse(localStorage.getItem('tasks') || "[]");
      newtaskv.forEach(addDynamicValue);
    }
  
    // Function to add a new task dynamically
    function addDynamicValue(task) {
      if (task.trim() === "") return; // Skip empty tasks
      var checkbox = $("<input type='checkbox' class='done'>");
      var taskDiv = $(`<div class='tasks penwork'>${task}</div>`);
      var deleteButton = $("<button class='btn delete'>Delete</button>");
      var editButton = $("<button class='btn edit'>Edit</button>");
      var doneEditButton = $("<button class='btn done_edit' style='display:none;'>Done</button>");
      var newContent = $("<div class='content'></div>");
      newContent.append(checkbox);
      newContent.append(taskDiv);
      newContent.append(deleteButton);
      newContent.append(editButton);
      newContent.append(doneEditButton);
      $("#right").append(newContent);
    }
  
    // Show tasks on page load
    loadTasks();
  
    // Handle form submission to add new tasks
    $("#myForm").submit(function (event) {
      event.preventDefault();
      var t = $("#inpt").val();
      if (t === "") {
        alert("Please enter some task to add");
        return;
      }
      addToLocal();
      addDynamicValue(t);
      $("#inpt").val("");
    });
  
    // Update time and day
    function updateTime() {
      const d = new Date();
      let hour = d.getHours();
      let minutes = d.getMinutes();
      const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let day = weekday[d.getDay()];
      let seconds = d.getSeconds();
      $(".top").empty().append(day, " <br> ", hour + ":", minutes.toString().padStart(2, '0'));
    }
  
    updateTime();
    setInterval(updateTime, 1000);
  });
  