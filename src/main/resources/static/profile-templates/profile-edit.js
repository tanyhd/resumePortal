const token = localStorage.getItem("token");
const email = localStorage.getItem("email"); // Replace with the user's email

let jobCount = 1; // Keep track of the number of job input sets
let educationCount = 1; // Keep track of the number of education input sets
let projectCount = 1; // Keep track of the number of project input sets

let responsibilityCount = 0;
let responsibilityCountArray = [0];

fetch(`/user/edit?email=${email}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((userProfile) => {
    const profileHeader = document.getElementById("profile-header");
    profileHeader.textContent = `${userProfile.email}'s Profile`;

    // Populate form fields with userProfile values
    const form = document.getElementById("profile-form");
    form.elements.email.value = userProfile.email;
    form.elements.firstName.value = userProfile.firstName;
    form.elements.lastName.value = userProfile.lastName;
    form.elements.theme.value = userProfile.theme;
    form.elements.designation.value = userProfile.designation;
    form.elements.phoneNumber.value = userProfile.phoneNumber;
    form.elements.summary.value = userProfile.summary;
    form.elements.linkedIn.value = userProfile.linkedIn;
    form.elements.gitHub.value = userProfile.gitHub;
    // Populate more fields here as needed

    // Populate jobs fields
    if (userProfile.jobs) {
      for (let i = 0; i < userProfile.jobs.length; i++) {
        const job = userProfile.jobs[i];

        // Create a new row for the job
        const jobRow = document.createElement("tr");
        jobsTable.appendChild(jobRow);

        // Add input field for company parameter
        const companyLabel = document.createElement("label");
        companyLabel.setAttribute("for", `job-${jobCount}-company`);
        companyLabel.textContent = "Company:";
        const companyInput = document.createElement("input");
        companyInput.setAttribute("type", "text");
        companyInput.setAttribute("id", `job-${jobCount}-company`);
        companyInput.setAttribute("name", `job-${jobCount}-company`);
        const companyCell = document.createElement("td");
        companyInput.value = job.company;
        companyCell.appendChild(companyInput);
        jobRow.appendChild(companyCell);

        // Add input field for designation parameter
        const designationLabel = document.createElement("label");
        designationLabel.setAttribute("for", `job-${jobCount}-designation`);
        designationLabel.textContent = "Designation:";
        const designationInput = document.createElement("input");
        designationInput.setAttribute("type", "text");
        designationInput.setAttribute("id", `job-${jobCount}-designation`);
        designationInput.setAttribute("name", `job-${jobCount}-designation`);
        const designationCell = document.createElement("td");
        designationInput.value = job.designation;
        designationCell.appendChild(designationInput);
        jobRow.appendChild(designationCell);

        // Add input field for designation parameter
        const startDateLabel = document.createElement("label");
        startDateLabel.setAttribute("for", `job-${jobCount}-startDate`);
        startDateLabel.textContent = "Start Date:";
        const startDateInput = document.createElement("input");
        startDateInput.setAttribute("type", "date");
        startDateInput.setAttribute("id", `job-${jobCount}-startDate`);
        startDateInput.setAttribute("name", `job-${jobCount}-startDate`);
        const startDateCell = document.createElement("td");
        startDateInput.value = job.startDate;
        startDateCell.appendChild(startDateInput);
        jobRow.appendChild(startDateCell);

        // Add input field for designation parameter
        const endDateLabel = document.createElement("label");
        endDateLabel.setAttribute("for", `job-${jobCount}-endDate`);
        endDateLabel.textContent = "End Date:";
        const endDateInput = document.createElement("input");
        endDateInput.setAttribute("type", "date");
        endDateInput.setAttribute("id", `job-${jobCount}-endDate`);
        endDateInput.setAttribute("name", `job-${jobCount}-endDate`);
        const endDateCell = document.createElement("td");
        endDateInput.value = job.endDate;
        endDateCell.appendChild(endDateInput);
        jobRow.appendChild(endDateCell);

        // Add input field for responsibilities parameter
        let responsibilityCount = 1;
        let resJobCount = jobCount;
        const responsibilitiesList = document.createElement("ul");

        for (let j = 0; j < job.responsibilities.length; j++) {
          const responsibility = job.responsibilities[j];
          const responsibilityItem = document.createElement("li");
          const responsibilityInput = document.createElement("input");
          responsibilityInput.setAttribute("type", "text");
          responsibilityInput.setAttribute(
            "name",
            `job-${resJobCount}-responsibility-${j + 1}`
          );
          responsibilityInput.value = responsibility;
          responsibilityItem.style.listStyle = "none"; // hide bullet point
          responsibilityItem.appendChild(responsibilityInput);
          responsibilitiesList.appendChild(responsibilityItem);
        }
        responsibilityCountArray.push(job.responsibilities.length);
        const responsibilitiesCell = document.createElement("td");
        responsibilitiesCell.textContent = "";
        responsibilitiesCell.appendChild(responsibilitiesList);
        jobRow.appendChild(responsibilitiesCell);

        // Create the add and remove responsibility buttons
        const addResponsibilityButton = document.createElement("button");
        addResponsibilityButton.textContent = "+";
        addResponsibilityButton.setAttribute("class", "btn btn-primary");
        const removeResponsibilityButton = document.createElement("button");
        removeResponsibilityButton.textContent = "-";
        removeResponsibilityButton.setAttribute("class", "btn btn-danger");

        const addLength = job.responsibilities.length - 1;
        addResponsibilityButton.addEventListener("click", (event) => {
          event.preventDefault();
          responsibilityCount++;
          const newResponsibility = document.createElement("li");
          const newResponsibilityInput = document.createElement("input");
          newResponsibilityInput.setAttribute("type", "text");
          newResponsibilityInput.setAttribute(
            "name",
            `job-${resJobCount}-responsibility-${responsibilityCount + addLength}`
          );
          newResponsibility.style.listStyle = "none"; // hide bullet point
          newResponsibility.appendChild(newResponsibilityInput);
          responsibilitiesList.appendChild(newResponsibility);
          responsibilityCountArray[resJobCount] = responsibilityCount + addLength;
        });

        removeResponsibilityButton.addEventListener("click", (event) => {
          event.preventDefault();
          if ((responsibilityCount + addLength) > 0) {
            responsibilitiesList.removeChild(
              responsibilitiesList.childNodes[responsibilityCount + addLength - 1]
            );
            responsibilityCount--;
            responsibilityCountArray[resJobCount] = responsibilityCount + addLength;
          }
        });


        const addResponsibilityCell = document.createElement("td");
        addResponsibilityCell.appendChild(addResponsibilityButton);
        const removeResponsibilityCell = document.createElement("td");
        removeResponsibilityCell.appendChild(removeResponsibilityButton);

        jobRow.appendChild(addResponsibilityCell);
        jobRow.appendChild(removeResponsibilityCell);

        // Append job parameter input elements to the job fields div
        jobsFields.appendChild(jobRow);

        jobCount++;
      }
    }

    // Populate Educations fields
    if (userProfile.educations) {
      for (let i = 0; i < userProfile.educations.length; i++) {
        const education = userProfile.educations[i];

        // Create a new row for the education
        const educationRow = document.createElement("tr");
        educationsTable.appendChild(educationRow);

        // Add input field for university parameter
        const universityLabel = document.createElement("label");
        universityLabel.setAttribute("for", `education-${educationCount}-university`);
        universityLabel.textContent = "University:";
        const universityInput = document.createElement("input");
        universityInput.setAttribute("type", "text");
        universityInput.setAttribute("id", `education-${educationCount}-university`);
        universityInput.setAttribute("name", `education-${educationCount}-university`);
        const universityCell = document.createElement("td");
        universityInput.value = education.university;
        universityCell.appendChild(universityInput);
        educationRow.appendChild(universityCell);

        // Add input field for qualification parameter
        const qualificationLabel = document.createElement("label");
        qualificationLabel.setAttribute("for", `education-${educationCount}-qualification`);
        qualificationLabel.textContent = "Qualification:";
        const qualificationInput = document.createElement("input");
        qualificationInput.setAttribute("type", "text");
        qualificationInput.setAttribute("id", `education-${educationCount}-qualification`);
        qualificationInput.setAttribute("name", `education-${educationCount}-qualification`);
        const qualificationCell = document.createElement("td");
        qualificationInput.value = education.qualification;
        qualificationCell.appendChild(qualificationInput);
        educationRow.appendChild(qualificationCell);

        // Add input field for startDate parameter
        const startDateLabel = document.createElement("label");
        startDateLabel.setAttribute("for", `education-${educationCount}-startDate`);
        startDateLabel.textContent = "Start Date:";
        const startDateInput = document.createElement("input");
        startDateInput.setAttribute("type", "date");
        startDateInput.setAttribute("id", `education-${educationCount}-startDate`);
        startDateInput.setAttribute("name", `education-${educationCount}-startDate`);
        const startDateCell = document.createElement("td");
        startDateInput.value = education.startDate;
        startDateCell.appendChild(startDateInput);
        educationRow.appendChild(startDateCell);

        // Add input field for endDate parameter
        const endDateLabel = document.createElement("label");
        endDateLabel.setAttribute("for", `education-${educationCount}-endDate`);
        endDateLabel.textContent = "End Date:";
        const endDateInput = document.createElement("input");
        endDateInput.setAttribute("type", "date");
        endDateInput.setAttribute("id", `education-${educationCount}-endDate`);
        endDateInput.setAttribute("name", `education-${educationCount}-endDate`);
        const endDateCell = document.createElement("td");
        endDateInput.value = education.endDate;
        endDateCell.appendChild(endDateInput);
        educationRow.appendChild(endDateCell);

        // Append job parameter input elements to the job fields div
        educationsFields.appendChild(educationRow);

        educationCount++;
      }
    }
 
    // Populate Projects fields
    if (userProfile.projects) {
      for (let i = 0; i < userProfile.projects.length; i++) {
        const project = userProfile.projects[i];
        
        // Create a new row for the project
        const projectRow = document.createElement("tr");
        projectsTable.appendChild(projectRow);
    
        // Add input field for title parameter
        const titleLabel = document.createElement("label");
        titleLabel.setAttribute("for", `project-${educationCount}-title`);
        titleLabel.textContent = "Title:";
        const titleInput = document.createElement("input");
        titleInput.setAttribute("type", "text");
        titleInput.setAttribute("id", `project-${projectCount}-title`);
        titleInput.setAttribute("name", `project-${projectCount}-title`);
        const titleCell = document.createElement("td");
        titleInput.value = project.title;
        titleCell.appendChild(titleInput);
        projectRow.appendChild(titleCell);
    
        // Add input field for description parameter
        const descriptionLabel = document.createElement("label");
        descriptionLabel.setAttribute("for", `project-${projectCount}-description`);
        descriptionLabel.textContent = "Description:";
        const descriptionInput = document.createElement("input");
        descriptionInput.setAttribute("type", "text");
        descriptionInput.setAttribute("id", `project-${projectCount}-description`);
        descriptionInput.setAttribute("name", `project-${projectCount}-description`);
        const descriptionCell = document.createElement("td");
        descriptionInput.value = project.description;
        descriptionCell.appendChild(descriptionInput);
        projectRow.appendChild(descriptionCell);

        // Add input field for description parameter
        const technologyUsedLabel = document.createElement("label");
        technologyUsedLabel.setAttribute("for", `project-${projectCount}-technologyUsed`);
        technologyUsedLabel.textContent = "Technology:";
        const technologyUsedInput = document.createElement("input");
        technologyUsedInput.setAttribute("type", "text");
        technologyUsedInput.setAttribute("id", `project-${projectCount}-technologyUsed`);
        technologyUsedInput.setAttribute("name", `project-${projectCount}-technologyUsed`);
        const technologyUsedCell = document.createElement("td");
        technologyUsedInput.value = project.technologyUsed;
        technologyUsedCell.appendChild(technologyUsedInput);
        projectRow.appendChild(technologyUsedCell);

        // Add input field for linkToProject parameter
        const linkToProjectLabel = document.createElement("label");
        linkToProjectLabel.setAttribute("for", `project-${projectCount}-linkToProject`);
        linkToProjectLabel.textContent = "Link:";
        const linkToProjectInput = document.createElement("input");
        linkToProjectInput.setAttribute("type", "text");
        linkToProjectInput.setAttribute("id", `project-${projectCount}-linkToProject`);
        linkToProjectInput.setAttribute("name", `project-${projectCount}-linkToProject`);
        const linkToProjectCell = document.createElement("td");
        linkToProjectInput.value = project.linkToProject;
        linkToProjectCell.appendChild(linkToProjectInput);
        projectRow.appendChild(linkToProjectCell);
        
        // Append job parameter input elements to the job fields div
        projectsFields.appendChild(projectRow);
    
        projectCount++;
      }
    }

  })
  .catch((error) => {
    console.error(error);
    window.location.href = "/home/login-error"; // Replace with the URL of your error page
  });


// jobs button
const addJobButton = document.getElementById("add-job");
const jobsFields = document.getElementById("jobs-fields");
const jobsTable = document.getElementById("jobs-table");

// educations button
const addEducationButton = document.getElementById("add-education");
const educationsFields = document.getElementById("educations-fields");
const educationsTable = document.getElementById("educations-table");

// projects button
const addProjectButton = document.getElementById("add-project");
const projectsFields = document.getElementById("projects-fields");
const projectsTable = document.getElementById("projects-table");

// Add jobs button event
addJobButton.addEventListener("click", (event) => {
  event.preventDefault();

  // Create a new row for the job
  const jobRow = document.createElement("tr");
  jobsTable.appendChild(jobRow);

  // Add input field for company parameter
  const companyInput = document.createElement("input");
  companyInput.setAttribute("type", "text");
  companyInput.setAttribute("id", `job-${jobCount}-company`);
  companyInput.setAttribute("name", `job-${jobCount}-company`);
  const companyCell = document.createElement("td");
  companyCell.textContent = "";
  companyCell.appendChild(companyInput);
  jobRow.appendChild(companyCell);

  // Add input field for designation parameter
  const designationInput = document.createElement("input");
  designationInput.setAttribute("type", "text");
  designationInput.setAttribute("id", `job-${jobCount}-designation`);
  designationInput.setAttribute("name", `job-${jobCount}-designation`);
  const designationCell = document.createElement("td");
  designationCell.textContent = "";
  designationCell.appendChild(designationInput);
  jobRow.appendChild(designationCell);

  // Add input field for startDate parameter
  const startDateInput = document.createElement("input");
  startDateInput.setAttribute("type", "date");
  startDateInput.setAttribute("id", `job-${jobCount}-startDate`);
  startDateInput.setAttribute("name", `job-${jobCount}-startDate`);
  const startDateCell = document.createElement("td");
  startDateCell.textContent = "";
  startDateCell.appendChild(startDateInput);
  jobRow.appendChild(startDateCell);

  // Add input field for endDate parameter
  const endDateInput = document.createElement("input");
  endDateInput.setAttribute("type", "date");
  endDateInput.setAttribute("id", `job-${jobCount}-endDate`);
  endDateInput.setAttribute("name", `job-${jobCount}-endDate`);
  const endDateCell = document.createElement("td");
  endDateCell.textContent = "";
  endDateCell.appendChild(endDateInput);
  jobRow.appendChild(endDateCell);

  // Add input field for responsibilities parameter
  let responsibilityCount = 1;
  const responsibilitiesList = document.createElement("ul");
  let resJobCount = jobCount;

  const newResponsibility = document.createElement("li");
  const newResponsibilityInput = document.createElement("input");
  newResponsibilityInput.setAttribute("type", "text");
  newResponsibilityInput.setAttribute(
    "name",
    `job-${resJobCount}-responsibility-${responsibilityCount}`
  );
  newResponsibility.style.listStyle = "none"; // hide bullet point
  newResponsibility.appendChild(newResponsibilityInput);
  responsibilitiesList.appendChild(newResponsibility);
  responsibilityCountArray[resJobCount] = responsibilityCount;

  const responsibilitiesCell = document.createElement("td");
  responsibilitiesCell.textContent = "";
  responsibilitiesCell.appendChild(responsibilitiesList);
  jobRow.appendChild(responsibilitiesCell);

  // Create the add and remove responsibility buttons
  const addResponsibilityButton = document.createElement("button");
  addResponsibilityButton.textContent = "+";
  addResponsibilityButton.setAttribute("class", "btn btn-primary");
  const removeResponsibilityButton = document.createElement("button");
  removeResponsibilityButton.textContent = "-";
  removeResponsibilityButton.setAttribute("class", "btn btn-danger");

  addResponsibilityButton.addEventListener("click", (event) => {
    event.preventDefault();
    responsibilityCount++;
    const newResponsibility = document.createElement("li");
    const newResponsibilityInput = document.createElement("input");
    newResponsibilityInput.setAttribute("type", "text");
    newResponsibilityInput.setAttribute(
      "name",
      `job-${resJobCount}-responsibility-${responsibilityCount}`
    );
    newResponsibility.style.listStyle = "none"; // hide bullet point
    newResponsibility.appendChild(newResponsibilityInput);
    responsibilitiesList.appendChild(newResponsibility);
    responsibilityCountArray[resJobCount] = responsibilityCount;
  });

  removeResponsibilityButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (responsibilityCount > 0) {
      responsibilitiesList.removeChild(
        responsibilitiesList.childNodes[responsibilityCount - 1]
      );
      responsibilityCount--;
    }
  });

  const addResponsibilityCell = document.createElement("td");
  addResponsibilityCell.appendChild(addResponsibilityButton);
  const removeResponsibilityCell = document.createElement("td");
  removeResponsibilityCell.appendChild(removeResponsibilityButton);

  jobRow.appendChild(addResponsibilityCell);
  jobRow.appendChild(removeResponsibilityCell);

  // Append the new job row to the table
  jobsFields.appendChild(jobRow);

  jobCount++;
});

// Add educations button event
addEducationButton.addEventListener("click", (event) => {
  event.preventDefault();

  // Create a new row for the education
  const educationRow = document.createElement("tr");
  educationsTable.appendChild(educationRow);

  // Add input field for university parameter
  const universityInput = document.createElement("input");
  universityInput.setAttribute("type", "text");
  universityInput.setAttribute("id", `education-${educationCount}-university`);
  universityInput.setAttribute("name", `education-${educationCount}-university`);
  const universityCell = document.createElement("td");
  universityCell.textContent = "";
  universityCell.appendChild(universityInput);
  educationRow.appendChild(universityCell);

  // Add input field for qualification parameter
  const qualificationInput = document.createElement("input");
  qualificationInput.setAttribute("type", "text");
  qualificationInput.setAttribute("id", `education-${educationCount}-qualification`);
  qualificationInput.setAttribute("name", `education-${educationCount}-qualification`);
  const qualificationCell = document.createElement("td");
  qualificationCell.textContent = "";
  qualificationCell.appendChild(qualificationInput);
  educationRow.appendChild(qualificationCell);

  // Add input field for startDate parameter
  const startDateInput = document.createElement("input");
  startDateInput.setAttribute("type", "date");
  startDateInput.setAttribute("id", `education-${educationCount}-startDate`);
  startDateInput.setAttribute("name", `education-${educationCount}-startDate`);
  const startDateCell = document.createElement("td");
  startDateCell.textContent = "";
  startDateCell.appendChild(startDateInput);
  educationRow.appendChild(startDateCell);

  // Add input field for endDate parameter
  const endDateInput = document.createElement("input");
  endDateInput.setAttribute("type", "date");
  endDateInput.setAttribute("id", `education-${educationCount}-endDate`);
  endDateInput.setAttribute("name", `education-${educationCount}-endDate`);
  const endDateCell = document.createElement("td");
  endDateCell.textContent = "";
  endDateCell.appendChild(endDateInput);
  educationRow.appendChild(endDateCell);

  // Append the new job row to the table
  educationsFields.appendChild(educationRow);

  educationCount++;
});

// Add projects button event
addProjectButton.addEventListener("click", (event) => {
  event.preventDefault();

  // Create a new row for the project
  const projectRow = document.createElement("tr");
  projectsTable.appendChild(projectRow);

  // Add input field for title parameter
  const titleInput = document.createElement("input");
  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("id", `project-${projectCount}-title`);
  titleInput.setAttribute("name", `project-${projectCount}-title`);
  const titleCell = document.createElement("td");
  titleCell.textContent = "";
  titleCell.appendChild(titleInput);
  projectRow.appendChild(titleCell);

  // Add input field for description parameter
  const descriptionInput = document.createElement("input");
  descriptionInput.setAttribute("type", "text");
  descriptionInput.setAttribute("id", `project-${projectCount}-description`);
  descriptionInput.setAttribute("name", `project-${projectCount}-description`);
  const descriptionCell = document.createElement("td");
  descriptionCell.textContent = "";
  descriptionCell.appendChild(descriptionInput);
  projectRow.appendChild(descriptionCell);

  // Add input field for technologyUsed parameter
  const technologyUsedInput = document.createElement("input");
  technologyUsedInput.setAttribute("type", "text");
  technologyUsedInput.setAttribute("id", `project-${projectCount}-technologyUsed`);
  technologyUsedInput.setAttribute("name", `project-${projectCount}-technologyUsed`);
  const technologyUsedCell = document.createElement("td");
  technologyUsedCell.textContent = "";
  technologyUsedCell.appendChild(technologyUsedInput);
  projectRow.appendChild(technologyUsedCell);
  
  // Add input field for linkToProject parameter
  const linkToProjectInput = document.createElement("input");
  linkToProjectInput.setAttribute("type", "text");
  linkToProjectInput.setAttribute("id", `project-${projectCount}-linkToProject`);
  linkToProjectInput.setAttribute("name", `project-${projectCount}-linkToProject`);
  const linkToProjectCell = document.createElement("td");
  linkToProjectCell.textContent = "";
  linkToProjectCell.appendChild(linkToProjectInput);
  projectRow.appendChild(linkToProjectCell);

  // Append the new project row to the table
  projectsFields.appendChild(projectRow);

  projectCount++;
});

// Remove jobs button event
const removeJobButton = document.getElementById("remove-job");
removeJobButton.addEventListener("click", function() {
  const jobsTable = document.getElementById("jobs-fields");
  if (jobsTable.rows.length > 0) {
    jobsTable.deleteRow(-1);
    jobCount--;
  }
});

// Remove educations button event
const removeEducationButton = document.getElementById("remove-education");
removeEducationButton.addEventListener("click", function() {
  const educationsTable = document.getElementById("educations-fields");
  if (educationsTable.rows.length > 0) {
    educationsTable.deleteRow(-1);
    educationCount--;
  }
});

// Remove projects button event
const removeProjectButton = document.getElementById("remove-project");
removeProjectButton.addEventListener("click", function() {
  const projectsTable = document.getElementById("projects-fields");
  if (projectsTable.rows.length > 0) {
    projectsTable.deleteRow(-1);
    projectCount--;
  }
});


const form = document.getElementById("profile-form");
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  const formData = new FormData(form); // Get the form data
  const userProfile = Object.fromEntries(formData.entries()); // Convert the form data to an object

  // Create an array to hold the job objects
  userProfile.jobs = [];
  // Create an array to hold the education objects
  userProfile.educations = [];
  // Create an array to hold the project objects
  userProfile.projects = [];

  // Loop over the job fields and add each job to the array
  for (let i = 1; i < jobCount; i++) {
    const jobStartDateString = form.elements[`job-${i}-startDate`].value;
    const jobStartDate = new Date(jobStartDateString);
    const jobEndDateString = form.elements[`job-${i}-endDate`].value;
    const jobEndDate = new Date(jobEndDateString);

    // Define an empty array to store responsibilities
    const responsibilities = [];
    // Loop through each responsibility input and add its value to the array
    for (let j = 1; j <= responsibilityCountArray[i]; j++) {
      const responsibilityInput = form.elements[`job-${i}-responsibility-${j}`];
      if (responsibilityInput.value) {
        responsibilities.push(responsibilityInput.value);
      }
    }

    const job = {
      company: form.elements[`job-${i}-company`].value,
      designation: form.elements[`job-${i}-designation`].value,
      startDate: jobStartDate,
      endDate: jobEndDate,
      responsibilities: responsibilities,
      // Add more job properties here as needed
    };
    userProfile.jobs.push(job);
  }

  // Lopp over the educations fields and add each education to the array
  for (let i = 1; i < educationCount; i++) {
    const educationStartDateString = form.elements[`education-${i}-startDate`].value;
    const educationStartDate = new Date(educationStartDateString);
    const educationEndDateString = form.elements[`education-${i}-endDate`].value;
    const educationEndDate = new Date(educationEndDateString);

    const education = {
      university: form.elements[`education-${i}-university`].value,
      qualification: form.elements[`education-${i}-qualification`].value,
      startDate: educationStartDate,
      endDate: educationEndDate,
      // Add more education properties here as needed
    };
    userProfile.educations.push(education);
  }

  // Lopp over the projects fields and add each project to the array
  for (let i = 1; i < projectCount; i++) {

    const project = {
      title: form.elements[`project-${i}-title`].value,
      description: form.elements[`project-${i}-description`].value,
      technologyUsed: form.elements[`project-${i}-technologyUsed`].value,
      linkToProject: form.elements[`project-${i}-linkToProject`].value,
      // Add more project properties here as needed
    };
    userProfile.projects.push(project);
  }

  const jsonUserProfile = JSON.stringify(userProfile); // Convert the object to JSON

  fetch("/user/edit", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: jsonUserProfile,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      window.location.replace("/view/" + data.uniqueUserId);
    })
    .catch((error) => {
      console.error(error);
      window.location.href = "/home/login-error"; // Replace with the URL of your error page
    });
});
