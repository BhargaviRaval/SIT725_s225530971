function login() {
  const role = document.getElementById("role").value;

  if (role === "teacher") {
    window.location.href = "teacher-dashboard.html";
  } 
  else if (role === "student") {
    window.location.href = "student-dashboard.html";
  } 
  else {
    alert("Please select a role");
  }
}
function markAttendance() {
  alert("Attendance marked successfully!");
}

function logout() {
  window.location.href = "index.html";
}
