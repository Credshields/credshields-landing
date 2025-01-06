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
    company_name: "HoldPlatform",
    logo: "holdplatform",
    total_bugs: 7,
    crictal: 0.0,
    high: 0.0,
    medium: 3.0,
    low: 1.0,
    informational: 1.0,
    gas: 2.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/HoldPlatform_Final_Audit_Report.pdf",
    date: "Nov 12th 2024",
    platform: "",
    language: "",
  },
  {
    company_name: "UniCoinX",
    logo: "unicoinx",
    total_bugs: 2,
    crictal: 0.0,
    high: 0.0,
    medium: 0.0,
    low: 2.0,
    informational: 0.0,
    gas: 0.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/UniCoinX_Final_Audit_Report.pdf",
    date: "Nov 6th 2024",
    platform: "",
    language: "",
  },
  {
    company_name: "SPE Smart Contract",
    logo: "spe",
    total_bugs: 29,
    crictal: 2.0,
    high: 1.0,
    medium: 2.0,
    low: 4.0,
    informational: 3.0,
    gas: 17.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/SPE_Smart_Contract_Final_Audit_Report.pdf",
    date: "Oct 30th 2024",
    platform: "",
    language: "",
  },
  {
    company_name: "Lara Liquid Staking",
    logo: "lara",
    total_bugs: 13,
    crictal: 0.0,
    high: 0.0,
    medium: 5.0,
    low: 4.0,
    informational: 0.0,
    gas: 4.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Lara_Liquid_Staking_Final_Audit_Report.pdf",
    date: "Oct 16th 2024",
    platform: "",
    language: "",
  },
  {
    company_name: "Protop Token",
    logo: "protop",
    total_bugs: 2,
    crictal: 0.0,
    high: 0.0,
    medium: 0.0,
    low: 2.0,
    informational: 0.0,
    gas: 0.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Protop_Token_Contract_Final%20Report.pdf",
    date: "Aug 27th 2024",
    platform: "",
    language: "",
  },
  {
    company_name: "SAN",
    logo: "san",
    total_bugs: 22,
    crictal: 0.0,
    high: 1.0,
    medium: 4.0,
    low: 6.0,
    informational: 3.0,
    gas: 8.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/SAN_Final_Report.pdf",
    date: "Aug 20th 2024",
    platform: "",
    language: "",
  },
  {
    company_name: "Plutope",
    logo: "plutope",
    total_bugs: 12,
    crictal: 2.0,
    high: 0.0,
    medium: 5.0,
    low: 1.0,
    informational: 2.0,
    gas: 2.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Plutope_Final_Audit_Report.pdf",
    date: "Aug 13th 2024",
    platform: "",
    language: "",
  },
  {
    company_name: "Kaku Smart Contract",
    logo: "kaku",
    total_bugs: 5,
    crictal: 0.0,
    high: 0.0,
    medium: 0.0,
    low: 3.0,
    informational: 0.0,
    gas: 2.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Kaku_SmartContract_Final_Report.pdf",
    date: "Aug 5th 2024",
    platform: "",
    language: "",
  },
  {
    company_name: "Kresus",
    logo: "kresus",
    total_bugs: 12,
    crictal: 1.0,
    high: 1.0,
    medium: 1.0,
    low: 3.0,
    informational: 0.0,
    gas: 6.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Kresus_Final_Audit_Report.pdf",
    date: "July 19th 2024",
    platform: "",
    language: "",
  },
  {
    company_name: "Moby",
    logo: "moby",
    total_bugs: 1,
    crictal: 0.0,
    high: 0.0,
    medium: 0.0,
    low: 0.0,
    informational: 1.0,
    gas: 0.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Moby_Smart_Contract_Final_Report.pdf",
    date: "June 28th 2024",
    platform: "",
    language: "",
  },
  {
    company_name: "Asset Chain",
    logo: "asset",
    total_bugs: 1,
    crictal: 0.0,
    high: 0.0,
    medium: 0.0,
    low: 1.0,
    informational: 0.0,
    gas: 0.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Asset_Chain_Final_Audit_Report.pdf",
    date: "June 12th 2024",
    platform: "",
    language: "",
  },
  {
    company_name: "aUSD",
    logo: "ausd",
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
    platform: "",
    language: "",
  },
  {
    company_name: "Rex Exchange",
    logo: "rex",
    total_bugs: 25,
    crictal: 1.0,
    high: 5.0,
    medium: 4.0,
    low: 5.0,
    informational: 3.0,
    gas: 7.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Rex_Exchange_Final_Audit_Report.pdf",
    date: "June 4th 2024",
    platform: "",
    language: "",
  },
  {
    company_name: "Compad Coin",
    logo: "compad",
    total_bugs: 2,
    crictal: 0.0,
    high: 0.0,
    medium: 0.0,
    low: 1.0,
    informational: 0.0,
    gas: 1.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Compad_Coin_Final_Audit_Report.pdf",
    date: "May 9th 2024",
    platform: "",
    language: "",
  },
  {
    company_name: "LogX Token",
    logo: "logx",
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
    platform: "",
    language: "",
  },
  {
    company_name: "Tribal Token",
    logo: "tribal",
    total_bugs: 4,
    crictal: 0.0,
    high: 0.0,
    medium: 0.0,
    low: 4.0,
    informational: 0.0,
    gas: 0.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Tribal_Token_Final_Report.pdf",
    date: "April 15th 2024",
    platform: "",
    language: "",
  },
  {
    company_name: "Tribally Games",
    logo: "tribally",
    total_bugs: 6,
    crictal: 0.0,
    high: 1.0,
    medium: 0.0,
    low: 4.0,
    informational: 0.0,
    gas: 1.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Tribally_Games_Final_Report.pdf",
    date: "April 15th 2024",
    platform: "",
    language: "",
  },
  {
    company_name: "Vouch Contract",
    logo: "vouch",
    total_bugs: 12,
    crictal: 0.0,
    high: 1.0,
    medium: 1.0,
    low: 5.0,
    informational: 1.0,
    gas: 4.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Vouch_Contract_Final_Audit_Report.pdf",
    date: "April 15th 2024",
    platform: "",
    language: "",
  },
  {
    company_name: "Factiiv Token",
    logo: "factiiv",
    total_bugs: 2,
    crictal: 0.0,
    high: 0.0,
    medium: 0.0,
    low: 1.0,
    informational: 0.0,
    gas: 1.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Factiiv_Token_Final_Audit_Report.pdf",
    date: "April 6th 2024",
    platform: "",
    language: "",
  },
  {
    company_name: "ResearchHub",
    logo: "researchhub",
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
    platform: "",
    language: "",
  },
  {
    company_name: "Wasset",
    logo: "wasset",
    total_bugs: 17,
    crictal: 2.0,
    high: 0.0,
    medium: 3.0,
    low: 5.0,
    informational: 3.0,
    gas: 4.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Wasset_Final_Audit_Report.pdf",
    date: "Feb 19th 2024",
    platform: "",
    language: "",
  },
  {
    company_name: "Numa",
    logo: "numa",
    total_bugs: 5,
    crictal: 0.0,
    high: 0.0,
    medium: 1.0,
    low: 1.0,
    informational: 2.0,
    gas: 1.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Numa_Final_Audit_Report.pdf",
    date: "Jan 30th 2024",
    platform: "",
    language: "",
  },
  {
    company_name: "RDGX",
    logo: "rdgx",
    total_bugs: 3,
    crictal: 0.0,
    high: 0.0,
    medium: 0.0,
    low: 1.0,
    informational: 2.0,
    gas: 0.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/RDGX_Final_Audit_report.pdf",
    date: "Dec 4th 2023",
    platform: "",
    language: "",
  },
  {
    company_name: "Ideology",
    logo: "ideology",
    total_bugs: 3,
    crictal: 0.0,
    high: 0.0,
    medium: 0.0,
    low: 1.0,
    informational: 1.0,
    gas: 1.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Ideology%20Final%20Audit%20Report.pdf",
    date: "Nov 15th 2023",
    platform: "",
    language: "",
  },
  {
    company_name: "9mm",
    logo: "9mm",
    total_bugs: 10,
    crictal: 0.0,
    high: 0.0,
    medium: 0.0,
    low: 2.0,
    informational: 2.0,
    gas: 6.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/9mm_audit_report.pdf",
    date: "Oct 15th 2023",
    platform: "",
    language: "",
  },
  {
    company_name: "Arcana Sendit",
    logo: "arcana",
    total_bugs: 8,
    crictal: 0.0,
    high: 2.0,
    medium: 0.0,
    low: 2.0,
    informational: 1.0,
    gas: 3.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Arcana_Sendit_SC_Final_Audit_report.pdf",
    date: "Oct 13th 2023",
    platform: "",
    language: "",
  },
  {
    company_name: "Archethic Bridge",
    logo: "archethic",
    total_bugs: 10,
    crictal: 0.0,
    high: 1.0,
    medium: 0.0,
    low: 3.0,
    informational: 3.0,
    gas: 3.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Archethic_Bridge_Contracts_SC_Final_Report.pdf",
    date: "Oct 12th 2023",
    platform: "",
    language: "",
  },
  {
    company_name: "StationX Claim",
    logo: "stationx",
    total_bugs: 11,
    crictal: 0.0,
    high: 1.0,
    medium: 1.0,
    low: 4.0,
    informational: 1.0,
    gas: 4.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/StationX_Claim_Contract_Final_Audit_Report.pdf",
    date: "Oct 9th 2023",
    platform: "",
    language: "",
  },
  {
    company_name: "Solace",
    logo: "solace",
    total_bugs: 9,
    crictal: 0.0,
    high: 0.0,
    medium: 1.0,
    low: 2.0,
    informational: 3.0,
    gas: 3.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Solace%20Final%20Audit%20Report.pdf",
    date: "Aug 30th 2023",
    platform: "",
    language: "",
  },
  {
    company_name: "DaiKoKu",
    logo: "daikoku",
    total_bugs: 5,
    crictal: 0.0,
    high: 0.0,
    medium: 1.0,
    low: 1.0,
    informational: 2.0,
    gas: 1.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/DaiKoKu_SC_Audit_final.pdf",
    date: "Aug 8th 2023",
    platform: "",
    language: "",
  },
  {
    company_name: "TRICE",
    logo: "trice",
    total_bugs: 9,
    crictal: 0.0,
    high: 0.0,
    medium: 1.0,
    low: 3.0,
    informational: 3.0,
    gas: 2.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/TRICE_SC-Audit.pdf",
    date: "Aug 6th 2023",
    platform: "",
    language: "",
  },
  {
    company_name: "Lync",
    logo: "lync",
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
    platform: "",
    language: "",
  },
  {
    company_name: "JayDeriv",
    logo: "jayderiv",
    total_bugs: 12,
    crictal: 0.0,
    high: 0.0,
    medium: 0.0,
    low: 3.0,
    informational: 2.0,
    gas: 7.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/JayDeriv_SC_Audit_report.pdf",
    date: "July 19th 2023",
    platform: "",
    language: "",
  },
  {
    company_name: "Juno AWS",
    logo: "juno",
    total_bugs: 42,
    crictal: 1.0,
    high: 8.0,
    medium: 8.0,
    low: 24.0,
    informational: 1.0,
    gas: null,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Juno_AWS_Audit_final.pdf",
    date: "April 27th 2023",
    platform: "",
    language: "",
  },
  {
    company_name: "Uniscrow",
    logo: "uniscrow",
    total_bugs: 6,
    crictal: 0.0,
    high: 0.0,
    medium: 1.0,
    low: 2.0,
    informational: 2.0,
    gas: 1.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Uniscrow%20Final%20Audit%20Report.pdf",
    date: "April 27th 2023",
    platform: "",
    language: "",
  },
  {
    company_name: "Arcana - Staking",
    logo: "arcana",
    total_bugs: 11,
    crictal: 0.0,
    high: 1.0,
    medium: 0.0,
    low: 3.0,
    informational: 2.0,
    gas: 5.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Arcana_Staking_Contract_Final_Audit_Report.pdf",
    date: "April 15th 2023",
    platform: "",
    language: "",
  },
  {
    company_name: "JayPeggers",
    logo: "jaypeggers",
    total_bugs: 13,
    crictal: 0.0,
    high: 0.0,
    medium: 2.0,
    low: 5.0,
    informational: 4.0,
    gas: 2.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/JayPeggers%20Final%20Audit%20Report.pdf",
    date: "Mar 24th 2023",
    platform: "",
    language: "",
  },
  {
    company_name: "Obius",
    logo: "obius",
    total_bugs: 10,
    crictal: 0.0,
    high: 1.0,
    medium: 1.0,
    low: 3.0,
    informational: 1.0,
    gas: 4.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Obius_SmartContract_audit.pdf",
    date: "Feb 7th 2023",
    platform: "",
    language: "",
  },
  {
    company_name: "Zenland",
    logo: "zenland",
    total_bugs: 15,
    crictal: 0.0,
    high: 2.0,
    medium: 1.0,
    low: 4.0,
    informational: 2.0,
    gas: 6.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Zenland_SmartContract_Audit.pdf",
    date: "Feb 7th 2023",
    platform: "",
    language: "",
  },
  {
    company_name: "CoinGabbar",
    logo: "coingabbar",
    total_bugs: 6,
    crictal: 0.0,
    high: 0.0,
    medium: 0.0,
    low: 1.0,
    informational: 3.0,
    gas: 2.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/CoinGabbarAudit.pdf",
    date: "Jan 12th 2023",
    platform: "",
    language: "",
  },
  {
    company_name: "DeVo Token",
    logo: "devo",
    total_bugs: 5,
    crictal: 0.0,
    high: 0.0,
    medium: 1.0,
    low: 1.0,
    informational: 2.0,
    gas: 1.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/DeVoTokenFinalReport.pdf",
    date: "Nov 10th 2022",
    platform: "",
    language: "",
  },
  {
    company_name: "Devo Whitelist",
    logo: "devo",
    total_bugs: 6,
    crictal: 0.0,
    high: 0.0,
    medium: 1.0,
    low: 2.0,
    informational: 1.0,
    gas: 2.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/DevoWhiteListFinalReport.pdf",
    date: "Nov 10th 2022",
    platform: "",
    language: "",
  },
  {
    company_name: "FoundersLab",
    logo: "founderslab",
    total_bugs: 12,
    crictal: 2.0,
    high: 2.0,
    medium: 0.0,
    low: 3.0,
    informational: 3.0,
    gas: 2.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/FoundersLabFinalReport.pdf",
    date: "Nov 10th 2022",
    platform: "",
    language: "",
  },
  {
    company_name: "BuscemiBeats-NFT",
    logo: "buscemibeats-nft",
    total_bugs: 12,
    crictal: 0.0,
    high: 0.0,
    medium: 1.0,
    low: 2.0,
    informational: 3.0,
    gas: 6.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/BuscemiBeats-NFT.docx.pdf",
    date: "Oct 30th 2022",
    platform: "",
    language: "",
  },
  {
    company_name: "Capx",
    logo: "capx",
    total_bugs: 0,
    crictal: 0.0,
    high: 0.0,
    medium: 0.0,
    low: 0.0,
    informational: 0.0,
    gas: 0.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Capx%20Smart%20Contract%20Audit.pdf",
    date: "Oct 25th 2022",
    platform: "",
    language: "",
  },
  {
    company_name: "AssetMantle-WEB",
    logo: "assetmantle-web",
    total_bugs: 15,
    crictal: 1.0,
    high: 3.0,
    medium: 5.0,
    low: 6.0,
    informational: 0.0,
    gas: null,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/AssetMantleWEB.pdf",
    date: "Oct 18th 2022",
    platform: "",
    language: "",
  },
  {
    company_name: "Comdex",
    logo: "comdex",
    total_bugs: 6,
    crictal: 0.0,
    high: 2.0,
    medium: 0.0,
    low: 3.0,
    informational: 1.0,
    gas: 0.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Comdex%20Audit.docx.pdf",
    date: "Aug 15th 2022",
    platform: "",
    language: "",
  },
  {
    company_name: "Noft Game",
    logo: "noft",
    total_bugs: 11,
    crictal: 1.0,
    high: 3.0,
    medium: 4.0,
    low: 3.0,
    informational: 0.0,
    gas: null,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Noft%20Game%20Audit%20Report.pdf",
    date: "Aug 5th 2022",
    platform: "",
    language: "",
  },
  {
    company_name: "pStake Smart Contract",
    logo: "pstake_finance",
    total_bugs: 13,
    crictal: 0.0,
    high: 0.0,
    medium: 0.0,
    low: 5.0,
    informational: 5.0,
    gas: 3.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Final%20Report%20pStake%20Smart%20Contract%20Audit.pdf",
    date: "June 20th 2022",
    platform: "",
    language: "",
  },
  {
    company_name: "pStake Bridge",
    logo: "pstake_finance",
    total_bugs: 6,
    crictal: 0.0,
    high: 0.0,
    medium: 1.0,
    low: 2.0,
    informational: 3.0,
    gas: null,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/pStake%20Bridge%20Audit.docx.pdf",
    date: "June 20th 2022",
    platform: "",
    language: "",
  },
  {
    company_name: "Arcana Paymaster",
    logo: "arcana",
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
    platform: "",
    language: "",
  },
  {
    company_name: "Caliburland",
    logo: "caliburland",
    total_bugs: 0,
    crictal: null,
    high: null,
    medium: null,
    low: null,
    informational: null,
    gas: null,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Caliburland-SmartContractAudit.pdf",
    date: null,
    platform: "",
    language: "",
  },
  {
    company_name: "Capital Rock",
    logo: "capital",
    total_bugs: 5,
    crictal: 0.0,
    high: 0.0,
    medium: 0.0,
    low: 0.0,
    informational: 2.0,
    gas: 3.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Capital_Rock_Final_Audit_report.pdf",
    date: "Sept 11th 2023",
    platform: "",
    language: "",
  },
  {
    company_name: "CryptoFootball",
    logo: "cryptofootball",
    total_bugs: 0,
    crictal: null,
    high: null,
    medium: null,
    low: null,
    informational: null,
    gas: null,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/CryptoFootball%20Security%20Report%20for%20Developer.pdf",
    date: null,
    platform: "",
    language: "",
  },
  {
    company_name: "JustFarming",
    logo: "justfarming",
    total_bugs: 10,
    crictal: 0.0,
    high: 0.0,
    medium: 0.0,
    low: 1.0,
    informational: 3.0,
    gas: 6.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/JustFarming_Final_audit_report.pdf",
    date: "Sept 21st 2023",
    platform: "",
    language: "",
  },
  {
    company_name: "PePay",
    logo: "pepay",
    total_bugs: 7,
    crictal: 0.0,
    high: 0.0,
    medium: 0.0,
    low: 2.0,
    informational: 3.0,
    gas: 2.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/PePay_SmartContract_Audit.pdf",
    date: "June 21st 2023",
    platform: "",
    language: "",
  },
  {
    company_name: "Protop Vesting",
    logo: "protop",
    total_bugs: 8,
    crictal: 1.0,
    high: 0.0,
    medium: 0.0,
    low: 3.0,
    informational: 0.0,
    gas: 4.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Protop_Vesting_Contracts_Final_Report.pdf",
    date: "Sept 6th 2024",
    platform: "",
    language: "",
  },
  {
    company_name: "DappRadar Quest ",
    logo: "dappradar",
    total_bugs: 9,
    crictal: 0.0,
    high: 0.0,
    medium: 2.0,
    low: 1.0,
    informational: 2.0,
    gas: 4.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Quest_Contract_final_audit_report.pdf",
    date: "Nov 23rd 2023",
    platform: "",
    language: "",
  },
  {
    company_name: "Nordek Rove Token",
    logo: "nordek",
    total_bugs: 8,
    crictal: 0.0,
    high: 1.0,
    medium: 1.0,
    low: 1.0,
    informational: 2.0,
    gas: 3.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Rove_Token_Final_Audit_Report.pdf",
    date: "Sept 18th 2023",
    platform: "",
    language: "",
  },
  {
    company_name: "SWYP",
    logo: "swyp",
    total_bugs: 7,
    crictal: 0.0,
    high: 0.0,
    medium: 0.0,
    low: 3.0,
    informational: 3.0,
    gas: 1.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/SWYP_Final_Audit_Report.pdf",
    date: "Sept 21st 2023",
    platform: "",
    language: "",
  },
  {
    company_name: "Styleo Coin",
    logo: "styleo",
    total_bugs: 3,
    crictal: 0.0,
    high: 0.0,
    medium: 0.0,
    low: 2.0,
    informational: 0.0,
    gas: 1.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Styleo%20Coin%20Final%20Audit%20Report.pdf",
    date: "July 22nd 2024",
    platform: "",
    language: "",
  },
  {
    company_name: "Wahed Token",
    logo: "wahed",
    total_bugs: 9,
    crictal: 0.0,
    high: 0.0,
    medium: 0.0,
    low: 4.0,
    informational: 1.0,
    gas: 4.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Wahed%20Token%20Final%20Report.pdf",
    date: "Sept 24th 2022",
    platform: "",
    language: "",
  },
  {
    company_name: "Pstake - Web",
    logo: "pstake",
    total_bugs: 0,
    crictal: null,
    high: null,
    medium: null,
    low: null,
    informational: null,
    gas: null,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Webapp%20Audit.pdf",
    date: null,
    platform: "",
    language: "",
  },
  {
    company_name: "ZHDCoin",
    logo: "zhdcoin",
    total_bugs: 4,
    crictal: 0.0,
    high: 0.0,
    medium: 1.0,
    low: 2.0,
    informational: 0.0,
    gas: 1.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/ZHDCoin_Final_Audit_Report.pdf",
    date: "Sept 22nd 2023",
    platform: "",
    language: "",
  },
  {
    company_name: "ZetaSwap",
    logo: "zetaswap",
    total_bugs: 3,
    crictal: 1.0,
    high: 0.0,
    medium: 1.0,
    low: 1.0,
    informational: 0.0,
    gas: 0.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/ZetaSwap_Final_Audit-Report.pdf",
    date: "Sept 14th 2023",
    platform: "",
    language: "",
  },
];

const popularAudits = [
  {
    company_name: "Arcana Paymaster",
    logo: "arcana",
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
    platform: "",
    language: "",
  },
  {
    company_name: "Obius",
    logo: "obius",
    total_bugs: 10,
    crictal: 0.0,
    high: 1.0,
    medium: 1.0,
    low: 3.0,
    informational: 1.0,
    gas: 4.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Obius_SmartContract_audit.pdf",
    date: "Feb 7th 2023",
    platform: "",
    language: "",
  },
  {
    company_name: "Archethic Bridge",
    logo: "archethic",
    total_bugs: 10,
    crictal: 0.0,
    high: 1.0,
    medium: 0.0,
    low: 3.0,
    informational: 3.0,
    gas: 3.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Archethic_Bridge_Contracts_SC_Final_Report.pdf",
    date: "Oct 12th 2023",
    platform: "",
    language: "",
  },
  {
    company_name: "Solace",
    logo: "solace",
    total_bugs: 9,
    crictal: 0.0,
    high: 0.0,
    medium: 1.0,
    low: 2.0,
    informational: 3.0,
    gas: 3.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Solace%20Final%20Audit%20Report.pdf",
    date: "Aug 30th 2023",
    platform: "",
    language: "",
  },
  {
    company_name: "Uniscrow",
    logo: "uniscrow",
    total_bugs: 6,
    crictal: 0.0,
    high: 0.0,
    medium: 1.0,
    low: 2.0,
    informational: 2.0,
    gas: 1.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/Uniscrow%20Final%20Audit%20Report.pdf",
    date: "April 27th 2023",
    platform: "",
    language: "",
  },
  {
    company_name: "PePay",
    logo: "pepay",
    total_bugs: 7,
    crictal: 0.0,
    high: 0.0,
    medium: 0.0,
    low: 2.0,
    informational: 3.0,
    gas: 2.0,
    report_link:
      "https://github.com/Credshields/audit-reports/blob/master/PePay_SmartContract_Audit.pdf",
    date: "June 21st 2023",
    platform: "",
    language: "",
  },
];

totalPages = Math.ceil(auditFilesList.length / 6);

fillAuditTable(auditFilesList.slice(0, 6));
fillPopularAudits();
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

function fillPopularAudits() {
  popularAudits.forEach((obj) => {
    const container = document.querySelector(".popular-audits");
    fillAuditRow(obj, container);
  });
}

function fillAuditTable(data) {
  const auditRows = document.querySelectorAll(".audit-card");
  auditRows.forEach((row) => {
    row.remove();
  });

  data.forEach((obj) => {
    const container = document.querySelector(".recent-audits");
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
          <img id="auditImage" src="https://web-assets.solidityscan.com/web-assets/solidity_scan_assets/images/audits/${
            audit.logo
          }.svg" alt="" onerror="setRandomFallbackImage(this)" />
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
    "default1.svg",
    "default2.svg",
    "default3.svg",
    "default4.svg",
    "default5.svg",
    "default6.svg",
    "default7.svg",
    "default8.svg",
    "default9.svg",
    "default10.svg",
    "default11.svg",
    "default12.svg",
    "default13.svg",
    "default14.svg",
    "default15.svg",
    "default16.svg",
    "default17.svg",
  ];

  const randomIndex = Math.floor(Math.random() * fallbackImages.length);
  const fallbackImage = `https://web-assets.solidityscan.com/web-assets/solidity_scan_assets/images/audits/${fallbackImages[randomIndex]}`;

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
