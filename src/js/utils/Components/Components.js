import Html from "../Html/Html";
import Api from "../Api/Api";

export default () => new Components();

class Components {
  getAppContext() {
    return Html().select("#app");
  }

  getwrapperDiv() {
    return Html()
      .create("div")
      .addClass("wrapper");
  }

  renderAllReports() {
    const container = Html().select(".container");
    const ul = Html()
      .create("ul")
      .addClass("receiving__reports");
    let redAlertDiv = Html().create('div');
    ul.addChild(redAlertDiv);
    this.renderReports("motor-vehicle-crash-reports", ul, redAlertDiv);
    this.renderReports("other-reports", ul, redAlertDiv);
    this.renderReports("gun-shot-wound-reports", ul, redAlertDiv);
    this.renderReports("fall-reports", ul, redAlertDiv);
    container.replace(ul);
  }

  renderMainContent() {
    const mainContent = Html().create("main");
    const container = Html()
      .create("div")
      .addClass("container");
    const ul = Html()
      .create("ul")
      .addClass("receiving__reports");
    let redAlertDiv = Html().create('div');
    this.renderReports("motor-vehicle-crash-reports", ul, redAlertDiv);
    this.renderReports("other-reports", ul, redAlertDiv);
    this.renderReports("gun-shot-wound-reports", ul, redAlertDiv);
    this.renderReports("fall-reports", ul, redAlertDiv);
    container.addChild(redAlertDiv)
    container.addChild(ul);
    mainContent.addChild(container);
    return mainContent;
  }

  renderReportSingle(endpoint, id) {
    const mainContent = Html().select("main");
    const container = Html().select(".container");
    Api().getRequest(
      `http://localhost:8080/api/${endpoint}/${id}`,
      singleReport => {
        let reportTypeArray = endpoint.split("-");
        reportTypeArray.pop();
        const reportType = capitalizeEachWord(reportTypeArray.join(' ') + ' Report');
        const div = Html()
          .create("div")
          .addClass("receiving__report");
        const title = Html()
          .create("h1")
          .addClass("receiving__title")
          .text(reportType);
        const section = Html().create("section");

        const genInfoTitle = Html()
          .create("h2")
          .addClass("receiving__report__title")
          .text("General Info");
        const genInfoUL = Html()
          .create("ul")
          .addClass("receiving__report-list");
        const reportLi = Html()
          .create("li")
          .addClass("receiving__report-list-item")
          .text("Report ID #:");
        const reportField = Html()
          .create("li")
          .addClass("receiving__report-list-item")
          .text(singleReport.id);
        const medicNumLI = Html()
          .create("li")
          .addClass("receiving__report-list-item")
          .text("Medic #:");
        const medicNumbField = Html()
          .create("li")
          .addClass("receiving__report-list-item")
          .text(singleReport.medicNum);
        const dateLI = Html()
          .create("li")
          .addClass("receiving__report-list-item")
          .text("Date:");
        const dateField = Html()
          .create("li")
          .addClass("receiving__report-list-item")
          .text(singleReport.date);
        const timeOfIncidentLi = Html()
          .create("li")
          .addClass("receiving__report-list-item")
          .text("Time of Day:");
        const timeOfIncidentField = Html()
          .create("li")
          .addClass("receiving__report-list-item")
          .text(singleReport.timeOfIncident);
        const vitalsTitle = Html()
          .create("h2")
          .addClass("receiving__report__title")
          .text("Vitals");
        const vitalsUL = Html()
          .create("ul")
          .addClass("receiving__report-list");
        const sexLI = Html()
          .create("li")
          .addClass("receiving__report-list-item")
          .text("Sex:");
        const sexField = Html()
          .create("li")
          .addClass("receiving__report-list-item")
          .text(singleReport.sex);
        const ageLI = Html()
          .create("li")
          .addClass("receiving__report-list-item")
          .text("Age:");
        const ageField = Html()
          .create("li")
          .addClass("receiving__report-list-item")
          .text(singleReport.age);
        const heartRateLI = Html()
          .create("li")
          .addClass("receiving__report-list-item")
          .text("Heart Rate:");
        const heartRateField = Html()
          .create("li")
          .addClass("receiving__report-list-item")
          .text(singleReport.heartRate);
        const bloodPressureLi = Html()
          .create("li")
          .addClass("receiving__report-list-item")
          .text("Blood Pressure");
        const bloodPressureField = Html()
          .create("li")
          .addClass("receiving__report-list-item")
          .text(singleReport.bloodPressure);
        const bloodOxyLi = Html()
          .create("li")
          .addClass("receiving__report-list-item")
          .text("Blood Oxygen Level:");
        const bloodOxyField = Html()
          .create("li")
          .addClass("receiving__report-list-item")
          .text(singleReport.spO2);
        const respitoryLI = Html()
          .create("li")
          .addClass("receiving__report-list-item")
          .text("Respitory:");
        const respitoryField = Html()
          .create("li")
          .addClass("receiving__report-list-item")
          .text(singleReport.respiratoryRate);
        const gcsLI = Html()
          .create("li")
          .addClass("receiving__report-list-item")
          .text("GCS:");
        const gcsField = Html()
          .create("li")
          .addClass("receiving__report-list-item")
          .text(singleReport.gcs);
        const sugarLI = Html()
          .create("li")
          .addClass("receiving__report-list-item")
          .text("Glucose Level:");
        const sugarField = Html()
          .create("li")
          .addClass("receiving__report-list-item")
          .text(singleReport.bloodSugar);

        const reportTypeQuestionsTitie = Html()
          .create("h2")
          .addClass("receiving__report__title")
          .text("Report Specific Questions");
        const reportTYpeQuesiontsUL = Html()
          .create("ul")
          .addClass("receiving__report-list");

        if (endpoint == "other-reports") {
          this.renderOtherReportSingle(singleReport, reportTYpeQuesiontsUL);
        }
        if (endpoint == "motor-vehicle-crash-reports") {
          this.renderMotorVehicleCrashReport(
            singleReport,
            reportTYpeQuesiontsUL
          );
        }
        if (endpoint == "gun-shot-wound-reports") {
          this.renderGunShotWoundReport(singleReport, reportTYpeQuesiontsUL);
        }
        if (endpoint == "fall-reports") {
          const withInjuryLI = Html()
            .create("li")
            .addClass("receiving__report-list-item")
            .text("With Injury:");
          const withInjuryField = Html()
            .create("li")
            .addClass("receiving__report-list-item")
            .text(singleReport.withInjury);
          const lossOfConsciousnessLI = Html()
            .create("li")
            .addClass("receiving__report-list-item")
            .text("With Injury:");
          const lossOfConsciousnessField = Html()
            .create("li")
            .addClass("receiving__report-list-item")
            .text(singleReport.lossOfConsciousness);
          const heightLI = Html()
            .create("li")
            .addClass("receiving__report-list-item")
            .text("Height:");
          const heightField = Html()
            .create("li")
            .addClass("receiving__report-list-item")
            .text(singleReport.height);
          const ambulatoryLI = Html()
            .create("li")
            .addClass("receiving__report-list-item")
            .text("Ambulatory:");
          const ambulatoryField = Html()
            .create("li")
            .addClass("receiving__report-list-item")
            .text(singleReport.ambulatory);
          const immobilizedLI = Html()
            .create("li")
            .addClass("receiving__report-list-item")
            .text("Immobilized:");
          const immobilizedField = Html()
            .create("li")
            .addClass("receiving__report-list-item")
            .text(singleReport.immobilized);
          reportTYpeQuesiontsUL.addChild(withInjuryLI);
          reportTYpeQuesiontsUL.addChild(withInjuryField);
          reportTYpeQuesiontsUL.addChild(lossOfConsciousnessLI);
          reportTYpeQuesiontsUL.addChild(lossOfConsciousnessField);
          reportTYpeQuesiontsUL.addChild(heightLI);
          reportTYpeQuesiontsUL.addChild(heightField);
          reportTYpeQuesiontsUL.addChild(ambulatoryLI);
          reportTYpeQuesiontsUL.addChild(ambulatoryField);
          reportTYpeQuesiontsUL.addChild(immobilizedLI);
          reportTYpeQuesiontsUL.addChild(immobilizedField);
        }

        const narSection = Html().create("section").addClass("receiving__report-list");
        const narTitle = Html()
          .create("h3")
          .text("Narrative");
        const narrField = Html()
          .create("p")
          .addClass("recieving__report-list-item")
          .text(singleReport.narrative);

        narSection.addChild(narTitle);
        narSection.addChild(narrField);

        vitalsUL.addChild(heartRateLI);
        vitalsUL.addChild(heartRateField);
        vitalsUL.addChild(bloodPressureLi);
        vitalsUL.addChild(bloodPressureField);
        vitalsUL.addChild(bloodOxyLi);
        vitalsUL.addChild(bloodOxyField);
        vitalsUL.addChild(respitoryLI);
        vitalsUL.addChild(respitoryField);
        vitalsUL.addChild(gcsLI);
        vitalsUL.addChild(gcsField);
        vitalsUL.addChild(sugarLI);
        vitalsUL.addChild(sugarField);

        genInfoUL.addChild(reportLi);
        genInfoUL.addChild(reportField);
        genInfoUL.addChild(dateLI);
        genInfoUL.addChild(dateField);
        genInfoUL.addChild(timeOfIncidentLi);
        genInfoUL.addChild(timeOfIncidentField);
        genInfoUL.addChild(medicNumLI);
        genInfoUL.addChild(medicNumbField);
        genInfoUL.addChild(sexLI);
        genInfoUL.addChild(sexField);
        genInfoUL.addChild(ageLI);
        genInfoUL.addChild(ageField);
        section.addChild(genInfoTitle);
        section.addChild(genInfoUL);
        section.addChild(vitalsTitle);
        section.addChild(vitalsUL);
        section.addChild(reportTypeQuestionsTitie);
        section.addChild(reportTYpeQuesiontsUL);
        section.addChild(narSection);
        div.addChild(title);
        div.addChild(section);
        container.replace(div);
      }
    );
    mainContent.replace(container);
  }

  renderOtherReportSingle(singleReport, reportTYpeQuesiontsUL) {
    const incidentLI = Html()
      .create("li")
      .addClass("receiving__report-list-item")
      .text("Incident Description:");
    const incidentField = Html()
      .create("li")
      .addClass("receiving__report-list-item")
      .text(singleReport.incident);
    const bluntForceLI = Html()
      .create("li")
      .addClass("receiving__report-list-item")
      .text("Blunt Force Trauma:");
    const bluntForceField = Html()
      .create("li")
      .addClass("receiving__report-list-item")
      .text(singleReport.bluntForceTrauma);
    const penetratingLI = Html()
      .create("li")
      .addClass("receiving__report-list-item")
      .text("Penetrating Trauma:");
    const penetratingField = Html()
      .create("li")
      .addClass("receiving__report-list-item")
      .text(singleReport.penetratingTrauma);

    reportTYpeQuesiontsUL.addChild(incidentLI);
    reportTYpeQuesiontsUL.addChild(incidentField);
    reportTYpeQuesiontsUL.addChild(bluntForceLI);
    reportTYpeQuesiontsUL.addChild(bluntForceField);
    reportTYpeQuesiontsUL.addChild(penetratingLI);
    reportTYpeQuesiontsUL.addChild(penetratingField);
  }

  renderMotorVehicleCrashReport(singleReport, reportTYpeQuesiontsUL) {
    const seatPositionLI = Html()
      .create("li")
      .addClass("receiving__report-list-item")
      .text("Seat Position:");
    const seatPositionField = Html()
      .create("li")
      .addClass("receiving__report-list-item")
      .text(singleReport.seatPosition);
    const speedLI = Html()
      .create("li")
      .addClass("receiving__report-list-item")
      .text("Speed:");
    const speedField = Html()
      .create("li")
      .addClass("receiving__report-list-item")
      .text(singleReport.speed);
    const ambulatoryLI = Html()
      .create("li")
      .addClass("receiving__report-list-item")
      .text("Ambulatory:");
    const ambulatoryField = Html()
      .create("li")
      .addClass("receiving__report-list-item")
      .text(singleReport.ambulatory);
    const prolongedExtricationLI = Html()
      .create("li")
      .addClass("receiving__report-list-item")
      .text("Prolonged Extrication:");
    const prolongedExtricationField = Html()
      .create("li")
      .addClass("receiving__report-list-item")
      .text(singleReport.prolongedExtrication);
    const immobilizedLI = Html()
      .create("li")
      .addClass("receiving__report-list-item")
      .text("Immobilized:");
    const immobilizedField = Html()
      .create("li")
      .addClass("receiving__report-list-item")
      .text(singleReport.immobilized);
    // These are for MVC crash reports
    reportTYpeQuesiontsUL.addChild(seatPositionLI);
    reportTYpeQuesiontsUL.addChild(seatPositionField);
    reportTYpeQuesiontsUL.addChild(speedLI);
    reportTYpeQuesiontsUL.addChild(speedField);
    reportTYpeQuesiontsUL.addChild(ambulatoryLI);
    reportTYpeQuesiontsUL.addChild(ambulatoryField);
    reportTYpeQuesiontsUL.addChild(prolongedExtricationLI);
    reportTYpeQuesiontsUL.addChild(prolongedExtricationField);
    reportTYpeQuesiontsUL.addChild(immobilizedLI);
    reportTYpeQuesiontsUL.addChild(immobilizedField);
  }

  renderGunShotWoundReport(singleReport, reportTYpeQuesiontsUL) {
    const locationLI = Html()
      .create("li")
      .addClass("receiving__report-list-item")
      .text("Wound Location:");
    const locationField = Html()
      .create("li")
      .addClass("receiving__report-list-item")
      .text(singleReport.location);
    const numberOfShotsLI = Html()
      .create("li")
      .addClass("receiving__report-list-item")
      .text("Number Of Shots:");
    const numberOfShotsField = Html()
      .create("li")
      .addClass("receiving__report-list-item")
      .text(singleReport.numberOfShots);
    const exitWoundLI = Html()
      .create("li")
      .addClass("receiving__report-list-item")
      .text("Exit Wound Located:");
    const exitWoundField = Html()
      .create("li")
      .addClass("receiving__report-list-item")
      .text(singleReport.exitWoundLocated);
    const typeOfWeaponLI = Html()
      .create("li")
      .addClass("receiving__report-list-item")
      .text("Type Of Weapon:");
    const typeOfWeaponField = Html()
      .create("li")
      .addClass("receiving__report-list-item")
      .text(singleReport.typeOfWeapon);
    const lossOfConsciousnessLI = Html()
      .create("li")
      .addClass("receiving__report-list-item")
      .text("Loss Of Consciousness:");
    const lossOfConsciousnessField = Html()
      .create("li")
      .addClass("receiving__report-list-item")
      .text(singleReport.exitWoundLocated);
    reportTYpeQuesiontsUL.addChild(locationLI);
    reportTYpeQuesiontsUL.addChild(locationField);
    reportTYpeQuesiontsUL.addChild(numberOfShotsLI);
    reportTYpeQuesiontsUL.addChild(numberOfShotsField);
    reportTYpeQuesiontsUL.addChild(exitWoundLI);
    reportTYpeQuesiontsUL.addChild(exitWoundField);
    reportTYpeQuesiontsUL.addChild(typeOfWeaponLI);
    reportTYpeQuesiontsUL.addChild(typeOfWeaponField);
    reportTYpeQuesiontsUL.addChild(lossOfConsciousnessLI);
    reportTYpeQuesiontsUL.addChild(lossOfConsciousnessField);
  }

  renderReports(endpoint, ul, redAlertDiv) {
    Api().getRequest(
      `http://localhost:8080/api/${endpoint}`,
      responseCollection => {
        responseCollection.forEach(report => {
          let reportTypeArray = endpoint.split("-");
          reportTypeArray.pop();
          const reportType = capitalizeEachWord(reportTypeArray.join(' '));
          const heartRateInt = parseInt(report.heartRate, 10);
          const spO2Int = parseInt(report.spO2, 10);
          const gcsInt = parseInt(report.gcs, 10);

          const div = Html()
            .create("div")
            .addClass("receiving__reports-list");
          if (heartRateInt < 45 || spO2Int < 85 || gcsInt < 8) {
            div.addClass("redAlert");
          }

          const reportNumField = Html()
            .create("li")
            .addClass("receiving__report-list-item")
            .text("Report #:");
          const link = Html()
            .create("a")
            .addClass("receiving__report-list-item")
            .addAttribute("href", `/endpoint/${report.id}`)
            .text(report.id)
            .click(event => {
              event.preventDefault();
              this.renderReportSingle(endpoint, report.id);
            });
          const aContainer = Html()
            .create("a")
            .addAttribute("href", "#");
          const reportNum = Html()
            .create("li")
            .addClass("receiving__report-list-item")
            .text(report.id);
          aContainer.addChild(reportNum);
          const chiefComplaintField = Html()
            .create("li")
            .addClass("receiving__report-list-item")
            .text("Chief Complaint:");
          const chiefComplaint = Html()
            .create("li")
            .addClass("receiving__report-list-item")
            .text(reportType);
          const dateField = Html()
            .create("li")
            .addClass("receiving__report-list-item")
            .text("Date:");
          const date = Html()
            .create("li")
            .addClass("receiving__report-list-item")
            .text(report.date);
          div.addChild(reportNumField);
          div.addChild(link);
          div.addChild(chiefComplaintField);
          div.addChild(chiefComplaint);
          div.addChild(dateField);
          div.addChild(date);
          if (div.render().classList.contains('redAlert')) {
            redAlertDiv.addChild(div);
          } else {
            ul.addChild(div);
          }
        });
      }
    );
  }

  renderMainFooter() {
    const mainFooter = Html()
      .create("footer")
      .addClass("footer");
    const footerText = Html()
      .create("small")
      .addClass("footer__copy")
      .html("&copy; 2019 In-Line Connect");
    mainFooter.addChild(footerText);
    return mainFooter;
  }

  renderMainHeader() {
    const mainHeader = Html()
      .create("header")
      .addClass("main-header");
    const mainHeaderTitle = Html()
      .create("h1")
      .addClass("main-header__title")
      .text("In-Line Connect");
    const nav = this.renderNav();
    mainHeader.addChild(mainHeaderTitle);
    mainHeader.addChild(nav);
    return mainHeader;
  }

  renderNav() {
    const nav = Html()
      .create("nav")
      .addClass("nav");
    const navList = Html()
      .create("ul")
      .addClass("nav__list");
    const navListItemOne = Html()
      .create("li")
      .addClass("nav__list-item")
      .addChild(
        Html()
          .create("a")
          .addAttribute("href", "#")
          .text("All Reports")
          .click(event => {
            event.preventDefault();
            this.renderAllReports();
          })
      );
    navList.addChild(navListItemOne);
    nav.addChild(navList);
    return nav;
  }

  renderPageHome() {
    const app = this.getAppContext();
    const wrapperDiv = this.getwrapperDiv();
    const mainHeader = this.renderMainHeader();
    const mainContent = this.renderMainContent();
    const mainFooter = this.renderMainFooter();
    wrapperDiv.addChild(mainHeader);
    wrapperDiv.addChild(mainContent);
    wrapperDiv.addChild(mainFooter);
    app.addChild(wrapperDiv);
  }
}

function capitalizeEachWord(str) {
  let result = str.toLowerCase().split(' ');
  for (var i = 0; i < result.length; i++) {
    result[i] = result[i].charAt(0).toUpperCase() + result[i].substring(1);
  }
  return result.join(' ');
}