const token = localStorage.getItem("token");
const email = localStorage.getItem("email"); // Replace with the user's email
let jobCount = 1; // Keep track of the number of job input sets
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

    // Populate more fields here as needed

    // Populate job fields
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
        const addResponsibilityButton = document.createElement("button");
        addResponsibilityButton.textContent = "+";
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
      
        const addResponsibilityCell = document.createElement("td");
        addResponsibilityCell.appendChild(addResponsibilityButton);
        jobRow.appendChild(addResponsibilityCell);

        // Append job parameter input elements to the job fields div
        jobsFields.appendChild(jobRow);

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
const jobsTable = document.getElementById("jobs-table");

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

  const addResponsibilityButton = document.createElement("button");
  addResponsibilityButton.textContent = "+";
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

  const addResponsibilityCell = document.createElement("td");
  addResponsibilityCell.appendChild(addResponsibilityButton);
  jobRow.appendChild(addResponsibilityCell);

  // Append the new job row to the table
  jobsFields.appendChild(jobRow);

  jobCount++;
});

const removeJobButton = document.getElementById("remove-job");
removeJobButton.addEventListener("click", function() {
  const jobsTable = document.getElementById("jobs-fields");
  if (jobsTable.rows.length > 0) {
    jobsTable.deleteRow(-1);
    jobCount--;
  }
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
