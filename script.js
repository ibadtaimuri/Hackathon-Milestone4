// Grabbing DOM elements
var resumeForm = document.getElementById('resume-form');
var educationContainer = document.getElementById('education-container');
var workContainer = document.getElementById('work-container');
var personalInfo = document.getElementById('personalInfo');
var educationInfo = document.getElementById('educationInfo');
var workExperienceInfo = document.getElementById('workExperienceInfo');
var skillsInfo = document.getElementById('skillsInfo');
// Counter for dynamically added fields
var educationCount = 0;
var workCount = 0;
// Function to add new education fields
function addEducation() {
    educationCount++;
    var educationDiv = document.createElement('div');
    educationDiv.className = 'education-entry';
    educationDiv.innerHTML = "\n        <label>Degree: <input type=\"text\" id=\"degree-".concat(educationCount, "\" required></label>\n        <label>Institution: <input type=\"text\" id=\"institution-").concat(educationCount, "\" required></label>\n        <label>Year: <input type=\"text\" id=\"year-").concat(educationCount, "\" required></label>\n    ");
    educationContainer.appendChild(educationDiv);
}
// Function to add new work experience fields
function addWorkExperience() {
    workCount++;
    var workDiv = document.createElement('div');
    workDiv.className = 'work-entry';
    workDiv.innerHTML = "\n        <label>Position: <input type=\"text\" id=\"position-".concat(workCount, "\" required></label>\n        <label>Company: <input type=\"text\" id=\"company-").concat(workCount, "\" required></label>\n        <label>Years Worked: <input type=\"text\" id=\"years-").concat(workCount, "\" required></label>\n        <label>Details: <textarea id=\"details-").concat(workCount, "\" required></textarea></label>\n    ");
    workContainer.appendChild(workDiv);
}
// Function to generate the resume
function generateResume() {
    // Extracting Personal Information
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var profilePic = document.getElementById('profilePic').value;
    var skills = document.getElementById('skills').value;
    // Populating the Personal Information Section
    personalInfo.innerHTML = "\n        <h2>Personal Information</h2>\n        <p><strong>Name:</strong> <span contenteditable=\"true\">".concat(name, "</span></p>\n        <p><strong>Email:</strong> <span contenteditable=\"true\">").concat(email, "</span></p>\n        ").concat(profilePic ? "<img src=\"".concat(profilePic, "\" alt=\"").concat(name, "\" width=\"100\" height=\"100\">") : '', "\n    ");
    // Populating the Education Section
    educationInfo.innerHTML = "<h2>Education</h2>";
    for (var i = 1; i <= educationCount; i++) {
        var degree = document.getElementById("degree-".concat(i)).value;
        var institution = document.getElementById("institution-".concat(i)).value;
        var year = document.getElementById("year-".concat(i)).value;
        if (degree && institution && year) {
            educationInfo.innerHTML += "\n                <p><strong>".concat(degree, "</strong>, <span contenteditable=\"true\">").concat(institution, "</span> (<span contenteditable=\"true\">").concat(year, "</span>)</p>\n            ");
        }
    }
    // Populating the Work Experience Section
    workExperienceInfo.innerHTML = "<h2>Work Experience</h2>";
    for (var i = 1; i <= workCount; i++) {
        var position = document.getElementById("position-".concat(i)).value;
        var company = document.getElementById("company-".concat(i)).value;
        var years = document.getElementById("years-".concat(i)).value;
        var details = document.getElementById("details-".concat(i)).value;
        if (position && company && years && details) {
            workExperienceInfo.innerHTML += "\n                <p><strong>".concat(position, "</strong> at <span contenteditable=\"true\">").concat(company, "</span> (<span contenteditable=\"true\">").concat(years, "</span>)</p>\n                <p contenteditable=\"true\">").concat(details, "</p>\n            ");
        }
    }
    // Populating the Skills Section
    skillsInfo.innerHTML = "<h2>Skills</h2><p>".concat(skills.split(',').map(function (skill) { return "<span contenteditable=\"true\">".concat(skill.trim(), "</span>"); }).join(', '), "</p>");
    // Make resume sections editable
    makeSectionsEditable([personalInfo, educationInfo, workExperienceInfo, skillsInfo]);
}
// Function to make sections editable and save changes
function makeSectionsEditable(sections) {
    sections.forEach(function (section) {
        section.addEventListener('click', function () {
            section.setAttribute('contenteditable', 'true');
        });
        section.addEventListener('blur', function () {
            section.setAttribute('contenteditable', 'false');
        });
    });
}
// Adding an event listener for form submission
resumeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    generateResume();
});
