(function () {
  "use strict";

  var header = document.querySelector(".nav-wrap");
  var hero = document.querySelector(".rehaul-hero");

  function syncHeaderBackground() {
    if (!header || !hero) return;
    header.classList.toggle(
      "is-scrolled",
      window.scrollY > hero.offsetHeight - 70,
    );
  }

  window.addEventListener("scroll", syncHeaderBackground, { passive: true });
  window.addEventListener("resize", syncHeaderBackground);
  syncHeaderBackground();

  var controls = Array.prototype.slice.call(
    document.querySelectorAll(".rehaul-control"),
  );

  controls.forEach(function (control) {
    control.addEventListener("toggle", function () {
      if (!control.open) return;
      controls.forEach(function (other) {
        if (other !== control) other.open = false;
      });
    });
  });

  var services = [
    {
      name: "Web app pentesting",
      tests: [
        "Business logic and workflow abuse",
        "Multi-tenant isolation boundaries",
        "Authentication and session handling",
        "Privilege escalation paths",
      ],
      standards: ["OWASP ASVS L2/L3", "OWASP Top 10", "PTES"],
      duration: "2 to 3 weeks",
      deliverable:
        "Signed report with reproduction steps, CVSS scoring, and control mapping.",
      href: "web-app-security.html",
    },
    {
      name: "Mobile app pentesting",
      tests: [
        "Insecure local storage and keychain use",
        "Certificate pinning bypass",
        "Runtime hooking with Frida",
        "Backend API authorization",
      ],
      standards: ["OWASP MASVS L1/L2", "MASTG"],
      duration: "2 to 3 weeks",
      deliverable:
        "Per-platform findings, device logs, and a retest once fixes land.",
      href: "mobile-app-security.html",
    },
    {
      name: "API security testing",
      tests: [
        "Broken object level authorization",
        "Undocumented endpoint discovery",
        "GraphQL introspection and batching abuse",
        "JWT, OAuth, and mTLS review",
      ],
      standards: ["OWASP API Top 10", "ASVS"],
      duration: "1 to 2 weeks",
      deliverable:
        "Endpoint inventory, authorization matrix, and replayable attack chains.",
      href: "api-security.html",
    },
    {
      name: "Cloud security review",
      tests: [
        "IAM privilege graph mapping",
        "Publicly reachable storage and services",
        "Kubernetes RBAC and pod security",
        "CI/CD supply chain exposure",
      ],
      standards: ["CIS Benchmarks", "MITRE ATT&CK Cloud"],
      duration: "2 weeks",
      deliverable:
        "Attack-path diagrams, prioritised remediation, and IaC-level fixes.",
      href: "cloud-security.html",
    },
    {
      name: "Red team engagement",
      tests: [
        "External and assumed-breach scenarios",
        "Phishing and social engineering",
        "Lateral movement and persistence",
        "Detection and response validation",
      ],
      standards: ["MITRE ATT&CK", "TIBER-EU", "DORA TLPT"],
      duration: "4 to 6 weeks",
      deliverable:
        "Objective narrative, TTP timeline, and a purple-team debrief.",
      href: "red-team.html",
    },
    {
      name: "Smart contract audit",
      tests: [
        "Reentrancy and state-update ordering",
        "Access control and proxy upgrade paths",
        "Oracle manipulation and flash loans",
        "Economic and incentive modelling",
      ],
      standards: ["OWASP Smart Contract Top 10", "SWC Registry"],
      duration: "1 to 3 weeks",
      deliverable:
        "Line-referenced findings, PoC exploits, and a public audit report.",
      href: "smart-contract-audits.html",
    },
    {
      name: "Blockchain protocol audit",
      tests: [
        "Cross-chain message verification",
        "Sequencer and validator assumptions",
        "Liquidity and settlement invariants",
        "Governance capture scenarios",
      ],
      standards: ["OWASP Smart Contract Top 10", "Protocol-specific"],
      duration: "3 to 6 weeks",
      deliverable:
        "Threat model, invariant analysis, and a published report.",
      href: "dapp-protocol-security.html",
    },
  ];

  var serviceButtons = Array.prototype.slice.call(
    document.querySelectorAll("[data-rehaul-service]"),
  );
  var serviceName = document.querySelector(".rehaul-service-detail h3");
  var serviceDuration = document.querySelector("[data-service-duration]");
  var serviceTests = document.querySelector("[data-service-tests]");
  var serviceStandards = document.querySelector("[data-service-standards]");
  var serviceDeliverable = document.querySelector(
    "[data-service-deliverable]",
  );
  var serviceLink = document.querySelector("[data-service-link]");

  function renderService(index) {
    var service = services[index];
    if (!service || !serviceName) return;

    serviceButtons.forEach(function (button) {
      button.setAttribute(
        "aria-pressed",
        Number(button.getAttribute("data-rehaul-service")) === index
          ? "true"
          : "false",
      );
    });

    serviceName.textContent = service.name;
    serviceDuration.textContent = service.duration;
    serviceDeliverable.textContent = service.deliverable;
    serviceLink.href = service.href;

    serviceTests.replaceChildren.apply(
      serviceTests,
      service.tests.map(function (item) {
        var element = document.createElement("span");
        element.textContent = item;
        return element;
      }),
    );

    serviceStandards.replaceChildren.apply(
      serviceStandards,
      service.standards.map(function (item) {
        var element = document.createElement("span");
        element.textContent = item;
        return element;
      }),
    );
  }

  serviceButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      renderService(Number(button.getAttribute("data-rehaul-service")));
    });
  });

  var leadForm = document.querySelector("[data-rehaul-lead-form]");
  if (leadForm) {
    leadForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var submitButton = leadForm.querySelector('[type="submit"]');
      var status = leadForm.querySelector(".rehaul-form-status");
      var formData = new FormData(leadForm);
      var fieldMap = {
        name: "firstname",
        email: "email",
        company: "company_name_one",
        role: "jobtitle",
        target: "what_do_you_want_pentested_",
        context: "anything_else_we_should_know_",
      };
      var fields = Object.keys(fieldMap)
        .map(function (fieldName) {
          return {
            objectTypeId: "0-1",
            name: fieldMap[fieldName],
            value: String(formData.get(fieldName) || "").trim(),
          };
        })
        .filter(function (field) {
          return field.value;
        });
      var payload = {
        submittedAt: String(Date.now()),
        fields: fields,
        context: {
          pageUri: window.location.href,
          pageName: document.title,
        },
      };
      var hutk = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);

      if (hutk) payload.context.hutk = decodeURIComponent(hutk[1]);
      status.textContent = "Sending your request…";
      status.dataset.state = "pending";
      submitButton.disabled = true;
      submitButton.textContent = "Sending…";

      fetch(
        "https://api.hsforms.com/submissions/v3/integration/submit/24889894/a8b5382a-0e7f-42e1-a040-b1c853ecc52f",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      )
        .then(function (response) {
          if (!response.ok) {
            throw new Error("HubSpot returned " + response.status);
          }
          return response.json().catch(function () {
            return {};
          });
        })
        .then(function () {
          leadForm.reset();
          leadForm.classList.add("is-success");
          status.dataset.state = "success";
          status.innerHTML =
            "<strong>Form submitted</strong>Thank you, we'll be in touch soon.";
        })
        .catch(function () {
          status.textContent =
            "We could not submit the form just now. Please try again, or book a demo instead.";
          status.dataset.state = "error";
        })
        .finally(function () {
          submitButton.disabled = false;
          submitButton.textContent = "Send request →";
        });
    });
  }
})();
