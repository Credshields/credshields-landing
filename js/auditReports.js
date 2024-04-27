const owner = "Credshields";
const repo = "audit-reports";
const auditFilesList = [];

const auditTableContainer = document.querySelector(".audit_table");
const pagination = document.getElementById("pagination");
const pagesContainer = document.getElementById("pages");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let totalPages = 1;
let currentPage = 1;

const auditData = [
  {
    imageSrc: "images/juno.svg",
    imageAlt: "a",
    name: "Juno Finance",
    type: "Web Application Audit",
    date: "23 Feb 2023",
    buttonText: "Report",
    downloadUrl:
      "https://raw.githubusercontent.com/Credshields/audit-reports/master/Juno%20Web%20Application%20Audit%20Final%20Report.pdf",
  },
  {
    imageSrc: "images/arcana.svg",
    imageAlt: "a",
    name: "Arcana Network",
    type: "Smart Contract Audit",
    date: "15 Apr 2024",
    buttonText: "Report",
    downloadUrl:
      "https://raw.githubusercontent.com/Credshields/audit-reports/master/Arcana_Staking_Contract_Final_Audit_Report.pdf",
  },
  {
    imageSrc: "images/lync.svg",
    imageAlt: "a",
    name: "Lync World",
    type: "Smart Contract Audit",
    date: "17 July 2023",
    buttonText: "Report",
    downloadUrl:
      "https://raw.githubusercontent.com/Credshields/audit-reports/master/Lync%20Final%20Audit%20Report.pdf",
  },
  {
    imageSrc: "images/capx.svg",
    imageAlt: "a",
    name: "CapX Global",
    type: "Smart Contract Audit",
    date: "21 Oct 2022",
    buttonText: "Report",
    downloadUrl:
      "https://raw.githubusercontent.com/Credshields/audit-reports/master/Capx%20Smart%20Contract%20Audit.pdf",
  },
  {
    imageSrc: "images/wasset.svg",
    imageAlt: "a",
    name: "Wasset",
    type: "Smart Contract Audit",
    date: "15 Feb 2024",
    buttonText: "Report",
    downloadUrl:
      "https://raw.githubusercontent.com/Credshields/audit-reports/master/Wasset_Final_Audit_Report.pdf",
  },
  {
    imageSrc: "images/inovatyv.svg",
    imageAlt: "a",
    name: "Inovatyv",
    type: "Smart Contract Audit",
    date: "08 Nov 2022",
    buttonText: "Report",
    downloadUrl:
      "https://raw.githubusercontent.com/Credshields/audit-reports/master/FoundersLabFinalReport.pdf",
  },
];

fillAuditTable(auditData);
updatePagination();

// fetch(`https://api.github.com/repos/${owner}/${repo}/contents`)
//   .then((response) => response.json())
//   .then((data) => {
//     data.forEach((file) => {
//       const fileObj = {
//         imageSrc: "images/solidity_scan.png",
//         imageAlt: "a",
//         name: file.name,
//         type: "Web Security Audit",
//         date: "26 Feb 2024",
//         buttonText: "Report",
//         downloadUrl: file.download_url,
//       };
//       console.log(file.download_url);
//       auditFilesList.push(fileObj);
//     });
//     totalPages = Math.ceil(auditFilesList.length / 6);
//     fillAuditTable(auditFilesList.slice(0, 6));
//     updatePagination();
//   })
//   .catch((error) => console.error("Error fetching files:", error));

function fillAuditTable(data) {
  const auditRows = document.querySelectorAll(".audit_row");
  auditRows.forEach((row) => {
    row.remove();
  });

  data.forEach((obj) => {
    fillAuditRow(obj);
  });
}

function fillAuditRow(data) {
  AOS.refresh();
  const auditRowContainer = document.createElement("div");
  auditRowContainer.classList.add("audit_row");
  // Create elements for each column
  const imgCol = document.createElement("div");
  imgCol.classList.add("audit_col_one");
  imgCol.setAttribute("data-aos", "fade-zoom-in");
  imgCol.setAttribute("data-aos-duration", "1000");
  const img = document.createElement("img");
  img.src = data.imageSrc;
  img.alt = data.imageAlt;
  img.classList.add("img-fluid");
  imgCol.appendChild(img);

  const nameCol = document.createElement("div");
  nameCol.classList.add("audit_col_two");
  nameCol.setAttribute("data-aos", "fade-zoom-in");
  nameCol.setAttribute("data-aos-duration", "1000");
  nameCol.textContent = data.name;

  const typeDateCol = document.createElement("div");
  typeDateCol.classList.add("audit_col_tf");

  const typeCol = document.createElement("div");
  typeCol.classList.add("audit_col_three");
  typeCol.setAttribute("data-aos", "fade-zoom-in");
  typeCol.setAttribute("data-aos-duration", "1000");
  typeCol.textContent = data.type;

  const dateCol = document.createElement("div");
  dateCol.classList.add("audit_col_four");
  dateCol.setAttribute("data-aos", "fade-zoom-in");
  dateCol.setAttribute("data-aos-duration", "1000");
  dateCol.textContent = data.date;

  typeDateCol.append(typeCol);
  typeDateCol.append(dateCol);

  const buttonCol = document.createElement("div");
  buttonCol.classList.add("audit_col_five");
  buttonCol.classList.add("aos-init");
  buttonCol.classList.add("aos-animate");
  buttonCol.setAttribute("data-aos", "fade-zoom-in");
  buttonCol.setAttribute("data-aos-duration", "1000");

  const link = document.createElement("a");
  const url = data.downloadUrl;
  link.href = url;
  link.download = url.substring(url.lastIndexOf("/") + 1);
  link.textContent = `${data.buttonText} `;

  const downArrow = document.createElement("span");
  downArrow.classList.add("down-arrow");
  downArrow.textContent = ` ↓`;

  link.appendChild(downArrow);
  buttonCol.appendChild(link);
  buttonCol.appendChild(link);

  // Append columns to the row
  auditRowContainer.appendChild(imgCol);
  auditRowContainer.appendChild(nameCol);
  auditRowContainer.appendChild(typeDateCol);
  auditRowContainer.appendChild(buttonCol);

  auditTableContainer.appendChild(auditRowContainer);
  AOS.init();
}

// Function to generate page buttons
function generatePageButtons() {
  // Clear existing buttons
  pagesContainer.innerHTML = "";

  // Calculate start and end page numbers to display
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, startPage + 2);

  // Ensure that at least 3 pages are visible
  if (endPage - startPage < 2) {
    startPage = Math.max(1, endPage - 2);
  }

  // Generate page buttons
  for (let i = startPage; i <= endPage; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.classList.add("pagination_page");
    if (i === currentPage) {
      pageButton.classList.add("active");
    }
    // pageButton.addEventListener("click", () => {
    //   currentPage = i;
    //   console.log(i);
    //   const startIndex = (i - 1) * 6;
    //   fillAuditTable(auditFilesList.slice(startIndex, startIndex + 6));
    //   updatePagination();
    // });
    pagesContainer.appendChild(pageButton);
  }

  // Disable previous button if on first page
  prevButton.disabled = currentPage === 1;

  // Disable next button if on last page
  nextButton.disabled = currentPage === totalPages;
}

// Function to update pagination
function updatePagination() {
  generatePageButtons();
}

// Previous button click event
prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    const startIndex = (currentPage - 2) * 6;
    fillAuditTable(auditFilesList.slice(startIndex, startIndex + 6));
    currentPage--;
    updatePagination();
  }
});

// Next button click event
nextButton.addEventListener("click", () => {
  if (currentPage < totalPages) {
    const startIndex = currentPage * 6;
    fillAuditTable(auditFilesList.slice(startIndex, startIndex + 6));

    currentPage++;
    updatePagination();
  }
});
