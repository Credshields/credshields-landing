const owner = "Credshields";
const repo = "audit-reports";

const auditTableContainer = document.querySelector(".audit_table");
const pagination = document.getElementById("pagination");
const pagesContainer = document.getElementById("pages");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let totalPages = 1;
let currentPage = 1;

const auditFilesList = [
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
  {
    imageSrc: "images/capitalrock.svg",
    imageAlt: "Capital Rock",
    name: "Capital Rock",
    type: "Smart Contract Audit",
    date: "11 Sep 2023",
    buttonText: "Report",
    downloadUrl:
      "https://raw.githubusercontent.com/Credshields/audit-reports/master/Capital_Rock_Final_Audit_report.pdf",
  },
  {
    imageSrc: "images/coin-gabbar.svg",
    imageAlt: "Coin Gabbar",
    name: "Coin Gabbar",
    type: "Smart Contract Audit",
    date: "12 Jan 2023",
    buttonText: "Report",
    downloadUrl:
      "https://raw.githubusercontent.com/Credshields/audit-reports/master/CoinGabbarAudit.pdf",
  },
  {
    imageSrc: "images/archethic.svg",
    imageAlt: "Archethic Foundation",
    name: "Archethic Foundation",
    type: "Smart Contract Audit",
    date: "16 Oct 2023",
    buttonText: "Report",
    downloadUrl:
      "https://raw.githubusercontent.com/Credshields/audit-reports/master/Archethic_Bridge_Contracts_SC_Final_Report.pdf",
  },
  {
    imageSrc: "images/9mm.svg",
    imageAlt: "9mm",
    name: "9mm",
    type: "Smart Contract Audit",
    date: "15 Oct 2023",
    buttonText: "Report",
    downloadUrl:
      "https://raw.githubusercontent.com/Credshields/audit-reports/master/9mm_audit_report.pdf",
  },
  {
    imageSrc: "images/devo.svg",
    imageAlt: "DEVO Protocol",
    name: "DEVO Protocol",
    type: "Smart Contract Audit",
    date: "10 Nov 2022",
    buttonText: "Report",
    downloadUrl:
      "https://raw.githubusercontent.com/Credshields/audit-reports/master/DeVoTokenFinalReport.pdf",
  },
  {
    imageSrc: "images/spstake.svg",
    imageAlt: "PStake Finance",
    name: "PStake Finance",
    type: "Smart Contract Audit",
    date: "20 June 2022",
    buttonText: "Report",
    downloadUrl:
      "https://raw.githubusercontent.com/Credshields/audit-reports/master/Final%20Report%20pStake%20Smart%20Contract%20Audit.pdf",
  },
  {
    imageSrc: "images/obius.svg",
    imageAlt: "Obius",
    name: "Obius",
    type: "Smart Contract Audit",
    date: "07 Feb 2023",
    buttonText: "Report",
    downloadUrl:
      "https://raw.githubusercontent.com/Credshields/audit-reports/master/Obius_SmartContract_audit.pdf",
  },
  {
    imageSrc: "images/jaypeggers.svg",
    imageAlt: "JayPeggers",
    name: "JayPeggers",
    type: "Smart Contract Audit",
    date: "24 Mar 2023",
    buttonText: "Report",
    downloadUrl:
      "https://raw.githubusercontent.com/Credshields/audit-reports/master/JayPeggers%20Final%20Audit%20Report.pdf",
  },
  {
    imageSrc: "images/pepay.svg",
    imageAlt: "PePay",
    name: "PePay",
    type: "Smart Contract Audit",
    date: "21 June 2023",
    buttonText: "Report",
    downloadUrl:
      "https://raw.githubusercontent.com/Credshields/audit-reports/master/PePay_SmartContract_Audit.pdf",
  },
  {
    imageSrc: "images/rdgx.svg",
    imageAlt: "RDGX Token",
    name: "RDGX Token",
    type: "Smart Contract Audit",
    date: "04 Dec 2023",
    buttonText: "Report",
    downloadUrl:
      "https://raw.githubusercontent.com/Credshields/audit-reports/master/RDGX_Final_Audit_report.pdf",
  },
  {
    imageSrc: "images/swyp.svg",
    imageAlt: "SWYP Foundation",
    name: "SWYP Foundation",
    type: "Smart Contract Audit",
    date: "21 Sep 2023",
    buttonText: "Report",
    downloadUrl:
      "https://raw.githubusercontent.com/Credshields/audit-reports/master/SWYP_Final_Audit_Report.pdf",
  },
  {
    imageSrc: "images/solace.svg",
    imageAlt: "Solace Protocol",
    name: "Solace Protocol",
    type: "Smart Contract Audit",
    date: "30 Aug 2023",
    buttonText: "Report",
    downloadUrl:
      "https://raw.githubusercontent.com/Credshields/audit-reports/master/Solace%20Final%20Audit%20Report.pdf",
  },
  {
    imageSrc: "images/stationx.svg",
    imageAlt: "StationX",
    name: "StationX",
    type: "Smart Contract Audit",
    date: "09 Oct 2023",
    buttonText: "Report",
    downloadUrl:
      "https://raw.githubusercontent.com/Credshields/audit-reports/master/StationX_Claim_Contract_Final_Audit_Report.pdf",
  },
  {
    imageSrc: "images/uniscrow.svg",
    imageAlt: "Uniscrow",
    name: "Uniscrow",
    type: "Smart Contract Audit",
    date: "27 Apr 2023",
    buttonText: "Report",
    downloadUrl:
      "https://raw.githubusercontent.com/Credshields/audit-reports/master/Uniscrow%20Final%20Audit%20Report.pdf",
  },
  {
    imageSrc: "images/wahed.svg",
    imageAlt: "Wahed Project",
    name: "Wahed Project",
    type: "Smart Contract Audit",
    date: "24 Sep 2022",
    buttonText: "Report",
    downloadUrl:
      "https://raw.githubusercontent.com/Credshields/audit-reports/master/Wahed%20Token%20Final%20Report.pdf",
  },
  {
    imageSrc: "images/zdh.svg",
    imageAlt: "ZHD Coin",
    name: "ZHD Coin",
    type: "Smart Contract Audit",
    date: "22 Sep 2023",
    buttonText: "Report",
    downloadUrl:
      "https://raw.githubusercontent.com/Credshields/audit-reports/master/ZHDCoin_Final_Audit_Report.pdf",
  },
  {
    imageSrc: "images/zenland.svg",
    imageAlt: "Zenland",
    name: "Zenland",
    type: "Smart Contract Audit",
    date: "07 Feb 2023",
    buttonText: "Report",
    downloadUrl:
      "https://raw.githubusercontent.com/Credshields/audit-reports/master/Zenland_SmartContract_Audit.pdf",
  },
  {
    imageSrc: "images/zetachain.svg",
    imageAlt: "Zetachain",
    name: "Zetachain",
    type: "Smart Contract Audit",
    date: "14 Feb 2023",
    buttonText: "Report",
    downloadUrl:
      "https://raw.githubusercontent.com/Credshields/audit-reports/master/ZetaSwap_Final_Audit-Report.pdf",
  },
  {
    imageSrc: "images/dapp.svg",
    imageAlt: "DappRadar",
    name: "DappRadar",
    type: "Smart Contract Audit",
    date: "23 Nov 2023",
    buttonText: "Report",
    downloadUrl:
      "https://raw.githubusercontent.com/Credshields/audit-reports/master/Quest_Contract_final_audit_report.pdf",
  },
  {
    imageSrc: "images/numa.svg",
    imageAlt: "Numa Money",
    name: "Numa Money",
    type: "Smart Contract Audit",
    date: "30 Jan 2024",
    buttonText: "Report",
    downloadUrl:
      "https://raw.githubusercontent.com/Credshields/audit-reports/master/Numa_Final_Audit_Report.pdf",
  },
  {
    imageSrc: "images/noft.svg",
    imageAlt: "Noft Games",
    name: "Noft Games",
    type: "Smart Contract Audit",
    date: "05 Aug 2022",
    buttonText: "Report",
    downloadUrl:
      "https://raw.githubusercontent.com/Credshields/audit-reports/master/Noft%20Game%20Audit%20Report.pdf",
  },
  {
    imageSrc: "images/daikoku.svg",
    imageAlt: "Daikoku",
    name: "Daikoku",
    type: "Smart Contract Audit",
    date: "08 Aug 2023",
    buttonText: "Report",
    downloadUrl:
      "https://raw.githubusercontent.com/Credshields/audit-reports/master/DaiKoKu_SC_Audit_final.pdf",
  },
  {
    imageSrc: "images/bb.svg",
    imageAlt: "Buscemi Beast NFT",
    name: "Buscemi Beast NFT",
    type: "Smart Contract Audit",
    date: "31 Oct 2022",
    buttonText: "Report",
    downloadUrl:
      "https://raw.githubusercontent.com/Credshields/audit-reports/master/BuscemiBeats-NFT.docx.pdf",
  },
];
totalPages = Math.ceil(auditFilesList.length / 6);

fillAuditTable(auditFilesList.slice(0, 6));
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
