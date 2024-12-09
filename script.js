// get references to the form and display area
var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
// handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault();
    // collect input values
    var usernam = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    // save form data in localstorage with the username as a key
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills
    };
    localStorage.setItem(usernam, JSON.stringify(resumeData));
    // generate the resume content dynamically
    var resumeHTML = "\n    <h2><br> Editable Resume</br></h2>\n    <h3>Personal Information</h3>\n    <p><b>Name:</b><span contenteditable=\"true\">".concat(name, "</span></p>\n        <p><b>Phone:</b><span contenteditable=\"true\">").concat(phone, "</span></p>\n            <p><b>Email:</b><span contenteditable=\"true\">").concat(email, "</span></p>\n\n            <h3>Education</h3>\n            <p contenteditable=\"true\">").concat(education, "</p>\n\n                        <h3>Experience</h3>\n            <p contenteditable=\"true\">").concat(experience, "</p>\n\n                        <h3>Skills</h3>\n            <p contenteditable=\"true\">").concat(skills, "</p>\n            ");
    // display the generated resume
    resumeDisplayElement.innerHTML = resumeHTML;
    // Generate a sharable URL with username only
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(usernam));
    // display the sharable link
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
// handle pdf download
downloadPdfButton.addEventListener('click', function () {
    window.print();
});
// prefill the form based on username in url
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        // autofill form if data is found in local storage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
        }
    }
});
