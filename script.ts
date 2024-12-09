// get references to the form and display area
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;



// handle form submission
form.addEventListener('submit' ,(event: Event)=> {
    event.preventDefault();

    // collect input values
    const usernam=(document.getElementById('username') as HTMLInputElement).value;
    const name=(document.getElementById('name') as HTMLInputElement).value;

    const email=(document.getElementById('email') as HTMLInputElement).value;
    const phone=(document.getElementById('phone') as HTMLInputElement).value;
    const education=(document.getElementById('education') as HTMLTextAreaElement).value;
    const experience=(document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills=(document.getElementById('skills') as HTMLTextAreaElement).value;

    // save form data in localstorage with the username as a key
    const resumeData = {
        name,
        email,
        phone,
        education,
        experience,
        skills
    };
    localStorage.setItem(usernam, JSON.stringify(resumeData));










    // generate the resume content dynamically
    const resumeHTML =`
    <h2><br> Editable Resume</br></h2>
    <h3>Personal Information</h3>
    <p><b>Name:</b><span contenteditable="true">${name}</span></p>
        <p><b>Phone:</b><span contenteditable="true">${phone}</span></p>
            <p><b>Email:</b><span contenteditable="true">${email}</span></p>

            <h3>Education</h3>
            <p contenteditable="true">${education}</p>

                        <h3>Experience</h3>
            <p contenteditable="true">${experience}</p>

                        <h3>Skills</h3>
            <p contenteditable="true">${skills}</p>
            `;

            // display the generated resume
            resumeDisplayElement.innerHTML = resumeHTML;

            // Generate a sharable URL with username only
            const shareableURL =
            `${window.location.origin}?username=${encodeURIComponent(usernam)}`;

            // display the sharable link
            shareableLinkContainer.style.display = 'block';
            shareableLinkElement.href = shareableURL;
            shareableLinkElement.textContent = shareableURL;
});

// handle pdf download
downloadPdfButton.addEventListener('click', ()=> {
    window.print();
});

// prefill the form based on username in url
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    if(username) {
        // autofill form if data is found in local storage
        const savedResumeData = localStorage.getItem(username);
        
        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);
            (document.getElementById('username') as HTMLInputElement).value = username;
            (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
            (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education;
            (document.getElementById('experience') as HTMLTextAreaElement).value = resumeData.experience;
            (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills;
        }
    }
});