const owner = "Credshields";
const repo = "audit-reports";

const auditTableContainer = document.querySelector(".audit_table");
const pagination = document.getElementById("pagination");
const pagesContainer = document.getElementById("pages");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let totalPages = 1;
let currentPage = 1;

const auditFilesList = [];

const popularAudits = [
  {
    company_name: "aUSD",
    logo: "https://raw.githubusercontent.com/Credshields/audit-reports/refs/heads/master/AuditLogos/aUSD Stablejack.svg",
    total_bugs: 33,
    crictal: 3.0,
    high: 2.0,
    medium: 11.0,
    low: 6.0,
    informational: 2.0,
    gas: 9.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/aUSD_SC_Final_Audit_Report.pdf",
    date: "Jun 5th 2024",
    platforms: ["Avlance"],
    language: "Solidity",
  },
  {
    company_name: "Arcana Paymaster",
    logo: "https://raw.githubusercontent.com/Credshields/audit-reports/refs/heads/master/AuditLogos/Arcana.svg",
    total_bugs: 5,
    crictal: 0.0,
    high: 0.0,
    medium: 0.0,
    low: 3.0,
    informational: 0.0,
    gas: 2.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Arcana_PayMaster_Final_Report.pdf",
    date: "Mar 1st 2024",
    platforms: ["ETH"],
    language: "Solidity",
  },
  {
    company_name: "ResearchHub",
    logo: "https://raw.githubusercontent.com/Credshields/audit-reports/refs/heads/master/AuditLogos/ResearchHub.svg",
    total_bugs: 13,
    crictal: 0.0,
    high: 0.0,
    medium: 4.0,
    low: 1.0,
    informational: 4.0,
    gas: 4.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/ResearchHub_SmartContract_Final_Audit_Report.pdf",
    date: "April 4th 2024",
    platforms: ["ETH", "Base"],
    language: "Solidity",
  },
  {
    company_name: "Lync",
    logo: "https://raw.githubusercontent.com/Credshields/audit-reports/refs/heads/master/AuditLogos/Lync Network.svg",
    total_bugs: 26,
    crictal: 1.0,
    high: 0.0,
    medium: 4.0,
    low: 8.0,
    informational: 4.0,
    gas: 9.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Lync%20Final%20Audit%20Report.pdf",
    date: "July 25th 2023",
    platforms: ["ETH"],
    language: "Solidity",
  },
  {
    company_name: "LogX Token",
    logo: "https://raw.githubusercontent.com/Credshields/audit-reports/refs/heads/master/AuditLogos/LogX Token.svg",
    total_bugs: 19,
    crictal: 3.0,
    high: 2.0,
    medium: 2.0,
    low: 4.0,
    informational: 1.0,
    gas: 7.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/LogX_Token_Final_Report.pdf",
    date: "April 15th 2024",
    platforms: ["ETH"],
    language: "Solidity",
  },
  {
    company_name: "Juno AWS",
    logo: "https://raw.githubusercontent.com/Credshields/audit-reports/refs/heads/master/AuditLogos/Juno Finance.svg",
    total_bugs: 42,
    crictal: 1.0,
    high: 8.0,
    medium: 8.0,
    low: 24.0,
    informational: 1.0,
    gas: 0.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Juno_AWS_Audit_final.pdf",
    date: "April 27th 2023",
    platforms: ["AWS"],
    language: "AWS",
  },
];

async function fetchAuditData() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/Credshields/audit-reports/refs/heads/master/audit.json"
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Parse the JSON data
    const data = await response.json();
    const audits = data?.audits || [];

    auditFilesList.push(...audits);

    totalPages = Math.ceil(auditFilesList.length / 6);

    // Fill the audit table and popular audits
    fillAuditTable(auditFilesList.slice(0, 6));
    updatePagination();
  } catch (error) {
    console.error("Failed to fetch audit data:", error);
  }
}

fillPopularAudits();
fetchAuditData();

function fillPopularAudits() {
  popularAudits.forEach((obj) => {
    const container = document.querySelector(".popular-audits");
    fillAuditRow(obj, container);
  });
}

function fillAuditTable(data) {
  const container = document.querySelector(".recent-audits");
  const auditRows = container.querySelectorAll(".audit-card");
  auditRows.forEach((row) => {
    row.remove();
  });

  data.forEach((obj) => {
    fillAuditRow(obj, container);
  });
}

function fillAuditRow(audit, container) {
  const auditCard = document.createElement("div");
  auditCard.classList.add("audit-card");

  // Creating inner HTML using template literals
  auditCard.innerHTML = `
    <div>
      <div class="audit-name-detail">
        <div class="audit_logo">
          <img id="auditImage" src="${
            audit.logo
          }" alt="" onerror="setRandomFallbackImage(this)" />
        </div>
        <div class="audit-name-stack">
          <p>${audit.company_name}</p>
          <p class="audit-type">${audit.type || ""}</p>
        </div>
      </div>

      <div class="audit-details">
        <div class="audit-detail">
          <p>Total Bugs Found</p>
          <p>${audit.total_bugs}</p>
        </div>
        <div class="audit-detail">
          <p>Date Audited</p>
          <p>${audit.date}</p>
        </div>
        <div class="audit-detail">
          <p>Language</p>
          <p>${audit.language || "N/A"}</p>
        </div>
      </div>
    </div>

    <div class="audit-vulnerability">
      <div class="divider"></div>
      <div>
        <div>
          <div class="vuln critical-vuln">
            <p>Critical</p>
            <div class="critical-count">
              <div></div>
              <p>${audit.crictal}</p>
            </div>
          </div>
          <div class="vuln high-vuln">
            <p>High</p>
            <div class="high-count">
              <div></div>
              <p>${audit.high}</p>
            </div>
          </div>
          <div class="vuln medium-vuln">
            <p>Medium</p>
            <div class="medium-count">
              <div></div>
              <p>${audit.medium}</p>
            </div>
          </div>
          <div class="vuln low-vuln">
            <p>Low</p>
            <div class="low-count">
              <div></div>
              <p>${audit.low}</p>
            </div>
          </div>
          <div class="vuln infor-vuln">
            <p>Infor</p>
            <div class="infor-count">
              <div></div>
              <p>${audit.informational}</p>
            </div>
          </div>
          <div class="vuln gas-vuln">
            <p>Gas</p>
            <div class="gas-count">
              <div></div>
              <p>${audit.gas || "N/A"}</p>
            </div>
          </div>
        </div>
        <a class="audit-link" href="${
          audit.report_link
        }" target="_blank">View Audit Report 
          <img class="arrow-icon" src="images/arrow-up-right.svg" alt="link" />
        </a>
      </div>
    </div>
    <div class="audit-mask">
    </div>
  `;

  // Append the new audit card to the container
  container.appendChild(auditCard);
}

function setRandomFallbackImage(imgElement) {
  const fallbackImages = [
    "Default Profile  01.svg",
    "Default Profile  02.svg",
    "Default Profile  03.svg",
    "Default Profile  04.svg",
    "Default Profile  05.svg",
    "Default Profile  06.svg",
    "Default Profile  07.svg",
    "Default Profile  08.svg",
    "Default Profile  09.svg",
    "Default Profile  10.svg",
    "Default Profile  11.svg",
    "Default Profile  12.svg",
    "Default Profile  13.svg",
    "Default Profile  14.svg",
    "Default Profile  15.svg",
    "Default Profile  16.svg",
    "Default Profile  17.svg",
  ];

  const randomIndex = Math.floor(Math.random() * fallbackImages.length);
  const fallbackImage = `https://raw.githubusercontent.com/Credshields/audit-reports/refs/heads/master/AuditLogos/${fallbackImages[randomIndex]}`;

  imgElement.src = fallbackImage;
}

// Function to generate page buttons
function generatePageButtons() {
  pagesContainer.innerHTML = "";

  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, startPage + 2);

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
    pageButton.addEventListener("click", () => {
      currentPage = i;
      const startIndex = (i - 1) * 6;
      fillAuditTable(auditFilesList.slice(startIndex, startIndex + 6));
      updatePagination();
    });
    pagesContainer.appendChild(pageButton);
  }

  prevButton.disabled = currentPage === 1;

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

function openTab(evt, tabName) {
  const tabContents = document.querySelectorAll(".tab-content");
  tabContents.forEach((content) => {
    content.classList.remove("active");
  });

  const tabButtons = document.querySelectorAll(".tab-button");
  tabButtons.forEach((button) => {
    button.classList.remove("active");
  });

  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
}
