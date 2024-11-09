// Grabbing DOM elements
const resumeForm = document.getElementById('resume-form') as HTMLFormElement;
const educationContainer = document.getElementById('education-container')!;
const workContainer = document.getElementById('work-container')!;
const personalInfo = document.getElementById('personalInfo')!;
const educationInfo = document.getElementById('educationInfo')!;
const workExperienceInfo = document.getElementById('workExperienceInfo')!;
const skillsInfo = document.getElementById('skillsInfo')!;

// Counter for dynamically added fields
let educationCount = 0;
let workCount = 0;

// Function to add new education fields
function addEducation() {
    educationCount++;
    const educationDiv = document.createElement('div');
    educationDiv.className = 'education-entry';
    educationDiv.innerHTML = `
        <label>Degree: <input type="text" id="degree-${educationCount}" required></label>
        <label>Institution: <input type="text" id="institution-${educationCount}" required></label>
        <label>Year: <input type="text" id="year-${educationCount}" required></label>
    `;
    educationContainer.appendChild(educationDiv);
}

// Function to add new work experience fields
function addWorkExperience() {
    workCount++;
    const workDiv = document.createElement('div');
    workDiv.className = 'work-entry';
    workDiv.innerHTML = `
        <label>Position: <input type="text" id="position-${workCount}" required></label>
        <label>Company: <input type="text" id="company-${workCount}" required></label>
        <label>Years Worked: <input type="text" id="years-${workCount}" required></label>
        <label>Details: <textarea id="details-${workCount}" required></textarea></label>
    `;
    workContainer.appendChild(workDiv);
}

// Function to generate the resume
function generateResume() {
    // Extracting Personal Information
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const profilePic = (document.getElementById('profilePic') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value;

    // Populating the Personal Information Section
    personalInfo.innerHTML = `
        <h2>Personal Information</h2>
        <p><strong>Name:</strong> <span contenteditable="true">${name}</span></p>
        <p><strong>Email:</strong> <span contenteditable="true">${email}</span></p>
        ${profilePic ? `<img src="${profilePic}" alt="${name}" width="100" height="100">` : ''}
    `;

    // Populating the Education Section
    educationInfo.innerHTML = `<h2>Education</h2>`;
    for (let i = 1; i <= educationCount; i++) {
        const degree = (document.getElementById(`degree-${i}`) as HTMLInputElement).value;
        const institution = (document.getElementById(`institution-${i}`) as HTMLInputElement).value;
        const year = (document.getElementById(`year-${i}`) as HTMLInputElement).value;
        if (degree && institution && year) {
            educationInfo.innerHTML += `
                <p><strong>${degree}</strong>, <span contenteditable="true">${institution}</span> (<span contenteditable="true">${year}</span>)</p>
            `;
        }
    }

    // Populating the Work Experience Section
    workExperienceInfo.innerHTML = `<h2>Work Experience</h2>`;
    for (let i = 1; i <= workCount; i++) {
        const position = (document.getElementById(`position-${i}`) as HTMLInputElement).value;
        const company = (document.getElementById(`company-${i}`) as HTMLInputElement).value;
        const years = (document.getElementById(`years-${i}`) as HTMLInputElement).value;
        const details = (document.getElementById(`details-${i}`) as HTMLTextAreaElement).value;
        if (position && company && years && details) {
            workExperienceInfo.innerHTML += `
                <p><strong>${position}</strong> at <span contenteditable="true">${company}</span> (<span contenteditable="true">${years}</span>)</p>
                <p contenteditable="true">${details}</p>
            `;
        }
    }

    // Populating the Skills Section
    skillsInfo.innerHTML = `<h2>Skills</h2><p>${skills.split(',').map(skill => `<span contenteditable="true">${skill.trim()}</span>`).join(', ')}</p>`;

    // Make resume sections editable
    makeSectionsEditable([personalInfo, educationInfo, workExperienceInfo, skillsInfo]);
}

// Function to make sections editable and save changes
function makeSectionsEditable(sections: HTMLElement[]) {
    sections.forEach(section => {
        section.addEventListener('click', () => {
            section.setAttribute('contenteditable', 'true');
        });

        section.addEventListener('blur', () => {
            section.setAttribute('contenteditable', 'false');
        });
    });
}

// Adding an event listener for form submission
resumeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    generateResume();
});