const token = localStorage.getItem("token");
const email = localStorage.getItem("email"); // Replace with the user's email
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
    // Populate more fields here as needed

    // Populate job fields
    if (userProfile.jobs) {
      for (let i = 0; i < userProfile.jobs.length; i++) {
        const job = userProfile.jobs[i];

        // Create a new set of job parameter input elements
        const jobSet = document.createElement("div");

        // Add input field for company parameter
        const companyLabel = document.createElement("label");
        companyLabel.setAttribute("for", `job-${jobCount}-company`);
        companyLabel.textContent = "Company:";
        const companyInput = document.createElement("input");
        companyInput.setAttribute("type", "text");
        companyInput.setAttribute("id", `job-${jobCount}-company`);
        companyInput.setAttribute("name", `job-${jobCount}-company`);
        companyInput.value = job.company;
        jobSet.appendChild(companyLabel);
        jobSet.appendChild(companyInput);

        // Add input field for designation parameter
        const designationLabel = document.createElement("label");
        designationLabel.setAttribute("for", `job-${jobCount}-designation`);
        designationLabel.textContent = "Designation:";
        const designationInput = document.createElement("input");
        designationInput.setAttribute("type", "text");
        designationInput.setAttribute("id", `job-${jobCount}-designation`);
        designationInput.setAttribute("name", `job-${jobCount}-designation`);
        designationInput.value = job.designation;
        jobSet.appendChild(designationLabel);
        jobSet.appendChild(designationInput);

        // Add input field for designation parameter
        const startDateLabel = document.createElement("label");
        startDateLabel.setAttribute("for", `job-${jobCount}-startDate`);
        startDateLabel.textContent = "Start Date:";
        const startDateInput = document.createElement("input");
        startDateInput.setAttribute("type", "date");
        startDateInput.setAttribute("id", `job-${jobCount}-startDate`);
        startDateInput.setAttribute("name", `job-${jobCount}-startDate`);
        startDateInput.value = job.startDate;
        jobSet.appendChild(startDateLabel);
        jobSet.appendChild(startDateInput);

        // Add input field for designation parameter
        const endDateLabel = document.createElement("label");
        endDateLabel.setAttribute("for", `job-${jobCount}-endDate`);
        endDateLabel.textContent = "End Date:";
        const endDateInput = document.createElement("input");
        endDateInput.setAttribute("type", "date");
        endDateInput.setAttribute("id", `job-${jobCount}-endDate`);
        endDateInput.setAttribute("name", `job-${jobCount}-endDate`);
        endDateInput.value = job.endDate;
        jobSet.appendChild(endDateLabel);
        jobSet.appendChild(endDateInput);

        // Append job parameter input elements to the job fields div
        jobsFields.appendChild(jobSet);

        jobCount++;
      }
    }
  })
  .catch((error) => {
    console.error(error);
    window.location.href = "/home/login-error"; // Replace with the URL of your error page
  });

const addJobButton = document.getElementById("add-job");
const jobsFields = document.getElementById("jobs-fields");
let jobCount = 1; // Keep track of the number of job input sets
let responsibilityCount = 0;
let responsibilityCountArray = [0];

addJobButton.addEventListener("click", (event) => {
    event.preventDefault();
  // Create a new set of job parameter input elements
  const jobSet = document.createElement("div");

  // Add input field for company parameter
  const companyLabel = document.createElement("label");
  companyLabel.setAttribute("for", `job-${jobCount}-company`);
  companyLabel.textContent = "Company:";
  const companyInput = document.createElement("input");
  companyInput.setAttribute("type", "text");
  companyInput.setAttribute("id", `job-${jobCount}-company`);
  companyInput.setAttribute("name", `job-${jobCount}-company`);
  jobSet.appendChild(companyLabel);
  jobSet.appendChild(companyInput);

  // Add input field for designation parameter
  const designationLabel = document.createElement("label");
  designationLabel.setAttribute("for", `job-${jobCount}-designation`);
  designationLabel.textContent = "Designation:";
  const designationInput = document.createElement("input");
  designationInput.setAttribute("type", "text");
  designationInput.setAttribute("id", `job-${jobCount}-designation`);
  designationInput.setAttribute("name", `job-${jobCount}-designation`);
  jobSet.appendChild(designationLabel);
  jobSet.appendChild(designationInput);

  // Add input field for startDate parameter
  const startDateLabel = document.createElement("label");
  startDateLabel.setAttribute("for", `job-${jobCount}-startDate`);
  startDateLabel.textContent = "Start Date:";
  const startDateInput = document.createElement("input");
  startDateInput.setAttribute("type", "date");
  startDateInput.setAttribute("id", `job-${jobCount}-startDate`);
  startDateInput.setAttribute("name", `job-${jobCount}-startDate`);
  jobSet.appendChild(startDateLabel);
  jobSet.appendChild(startDateInput);

  // Add input field for startDate parameter
  const endDateLabel = document.createElement("label");
  endDateLabel.setAttribute("for", `job-${jobCount}-endDate`);
  endDateLabel.textContent = "End Date:";
  const endDateInput = document.createElement("input");
  endDateInput.setAttribute("type", "date");
  endDateInput.setAttribute("id", `job-${jobCount}-endDate`);
  endDateInput.setAttribute("name", `job-${jobCount}-endDate`);
  jobSet.appendChild(endDateLabel);
  jobSet.appendChild(endDateInput);

  // Add input field for responsibilities parameter
  responsibilityCount = 0;
  const responsibilitiesLabel = document.createElement("label");
  responsibilitiesLabel.setAttribute("for", `job-${jobCount}-responsibilities`);
  responsibilitiesLabel.textContent = "Responsibilities:";
  const responsibilitiesInput = document.createElement("div");
  const responsibilitiesList = document.createElement("ul");
  const addResponsibilityButton = document.createElement("button");
  addResponsibilityButton.textContent = "+";
  let resJobCount = jobCount;

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
    newResponsibility.appendChild(newResponsibilityInput);
    responsibilitiesList.appendChild(newResponsibility);
    responsibilityCountArray[resJobCount] = responsibilityCount;
  }) 
  responsibilitiesInput.appendChild(addResponsibilityButton);
  responsibilitiesInput.appendChild(responsibilitiesList);
  jobSet.appendChild(responsibilitiesLabel);
  jobSet.appendChild(responsibilitiesInput);
  
  // Append job parameter input elements to the job fields div
  jobsFields.appendChild(jobSet);

  jobCount++;
});

const form = document.getElementById("profile-form");
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  const formData = new FormData(form); // Get the form data
  const userProfile = Object.fromEntries(formData.entries()); // Convert the form data to an object

  // Create an array to hold the job objects
  userProfile.jobs = [];

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
