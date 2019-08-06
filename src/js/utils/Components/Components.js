import Html from "../Html/Html"
import Api from "../Api/Api"

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

    renderMainContent() {
        const mainContent = Html().create('main');
        const container = Html().create('div').addClass('container');
        const ul = Html().create('ul').addClass('receiving__report');
        this.renderReports("trauma-reports", ul);
        this.renderReports("medical-reports", ul);
        this.renderReports("cardiac-reports", ul);
        container.addChild(ul);
        mainContent.addChild(container);
        return mainContent;
    };


    renderReportSingle(endpoint, id) {
        // const reportSing = this.getAppContext()
        const mainContent = Html().create('main');
        const container = Html().create('div').addClass('container');
        Api().getRequest(`http://localhost:8080/api/${endpoint}/${id}`, (singleReport) => {

            const div = Html().create('div').addClass('receiving');
            const title = Html().create('h1').addClass('receiving__title').text('Receiving Report')
            const section = Html().create('section').addClass('receiving__report')
            const genInfoTitle = Html().create('h2').addClass('receiving__report__title').text('General Info')
            const genInfoUL = Html().create('ul').addClass('receiving__report-list')
            const reportLi = Html().create('li').addClass('receiving__report-list-item').text("Report ID #:")
            const reportField = Html().create('li').addClass('receiving__report-list-item').text(singleReport.id);
            const medicNumLI = Html().create('li').addClass('receiving__report-list-item').text("Medic #:")
            const medicNumbField = Html().create('li').addClass('receiving__report-list-item').text(singleReport.medicNum);
            const chiefComLI = Html().create('li').addClass('receiving__report-list-item').text("Chief Complaint:")
            const chiefComField = Html().create('li').addClass('receiving__report-list-item').text(singleReport.chiefComplaint);
            const dateLI = Html().create('li').addClass('receiving__report-list-item').text("Date:")
            const dateField = Html().create('li').addClass('receiving__report-list-item').text(singleReport.date);

            const vitalsTitle = Html().create('h2').addClass('receiving__report__title').text('Vitals')
            const vitalsUL = Html().create('ul').addClass('receiving__report-list')
            const sexLI = Html().create('li').addClass('receiving__report-list-item').text("Sex:")
            const sexField = Html().create('li').addClass('receiving__report-list-item').text(singleReport.sex);
            const ageLI = Html().create('li').addClass('receiving__report-list-item').text("Age:")
            const ageField = Html().create('li').addClass('receiving__report-list-item').text(singleReport.age);
            const heartRateLI = Html().create('li').addClass('receiving__report-list-item').text("Heart Rate:")
            const heartRateField = Html().create('li').addClass('receiving__report-list-item').text(singleReport.heartRate);
            const bloodPressureLi = Html().create('li').addClass('receiving__report-list-item').text("Blood Pressure")
            const bloodPressureField = Html().create('li').addClass('receiving__report-list-item').text(singleReport.bloodPressure);
            const bloodOxyLi = Html().create('li').addClass('receiving__report-list-item').text("Blood Oxygen Level:")
            const bloodOxyField = Html().create('li').addClass('receiving__report-list-item').text(singleReport.spO2);
            const respitoryLI = Html().create('li').addClass('receiving__report-list-item').text("Respitory:")
            const respitoryField = Html().create('li').addClass('receiving__report-list-item').text(singleReport.respiratoryRate);
            const gcsLI = Html().create('li').addClass('receiving__report-list-item').text("Gross Motor Skills:")
            const gcsField = Html().create('li').addClass('receiving__report-list-item').text(singleReport.gcs);
            const sugarLI = Html().create('li').addClass('receiving__report-list-item').text("Glucose Level:")
            const sugarField = Html().create('li').addClass('receiving__report-list-item').text(singleReport.bloodSugar);

            const narSection = Html().create('section')
            const narTitle = Html().create('h4').text('Narrative')
            const narrField = Html().create("p").text(singleReport.narrative)

            narSection.addChild(narTitle)
            narSection.addChild(narrField)

            vitalsUL.addChild(heartRateLI)
            vitalsUL.addChild(heartRateField)
            vitalsUL.addChild(bloodPressureLi)
            vitalsUL.addChild(bloodPressureField)
            vitalsUL.addChild(bloodOxyLi)
            vitalsUL.addChild(bloodOxyField)
            vitalsUL.addChild(respitoryLI)
            vitalsUL.addChild(respitoryField)
            vitalsUL.addChild(gcsLI)
            vitalsUL.addChild(gcsField)
            vitalsUL.addChild(sugarLI)
            vitalsUL.addChild(sugarField)
            genInfoUL.addChild(reportLi)
            genInfoUL.addChild(reportField)
            genInfoUL.addChild(dateLI)
            genInfoUL.addChild(dateField)
            genInfoUL.addChild(medicNumLI)
            genInfoUL.addChild(medicNumbField)
            genInfoUL.addChild(chiefComLI)
            genInfoUL.addChild(chiefComField)
            genInfoUL.addChild(sexLI)
            genInfoUL.addChild(sexField)
            genInfoUL.addChild(ageLI)
            genInfoUL.addChild(ageField)
            section.addChild(genInfoTitle)
            section.addChild(genInfoUL)
            section.addChild(vitalsTitle)
            section.addChild(vitalsUL)
            section.addChild(narSection)
            div.addChild(title)
            div.addChild(section)
            container.addChild(div)

            // mainContent.addChild(container);
            // reportSing.addChild(mainContent)

            // mainContent.replace reportSing;


        })
        mainContent.replace(container)

    }

    renderReports(endpoint, ul) {
        Api().getRequest(`http://localhost:8080/api/${endpoint}`, (responseCollection) => {
            responseCollection.forEach((report) => {
                const div = Html().create('div').addClass('receiving__report-list');
                const reportNumField = Html().create('li').addClass('receiving__report-list-item').text("Report #:");
                const link = Html().create('a').addClass('receiving__report-list-item').addAttribute('href', `/endpoint/${report.id}`).text(report.id)
                    .click((event) => {
                        event.preventDefault();
                        //need to render single page
                        this.renderReportSingle(endpoint, report.id);



                    })

                const aContainer = Html().create('a').addAttribute('href', '#')
                const reportNum = (Html().create('li').addClass('receiving__report-list-item').text(report.id));
                aContainer.addChild(reportNum);
                const chiefComplaintField = Html().create('li').addClass('receiving__report-list-item').text('Chief Complaint:');
                const chiefComplaint = Html().create('li').addClass('receiving__report-list-item').text(report.chiefComplaint);
                const dateField = Html().create('li').addClass('receiving__report-list-item').text('Date:');
                const date = Html().create('li').addClass('receiving__report-list-item').text(report.date);
                div.addChild(reportNumField);
                div.addChild(link);
                div.addChild(chiefComplaintField);
                div.addChild(chiefComplaint);
                div.addChild(dateField);
                div.addChild(date);
                ul.addChild(div);
                ul.addChild(Html().create('hr'));
            });
        });
    };

    renderMainFooter() {
        const mainFooter = Html().create('footer').addClass('footer');
        const footerText = Html().create('small').addClass('footer__copy').html("&copy; 2019 In-Line Connect");
        mainFooter.addChild(footerText);
        return mainFooter;
    }

    renderMainHeader() {
        const mainHeader = Html().create("header").addClass("main-header");
        const mainHeaderTitle = Html().create("h1")
            .addClass("main-header__title")
            .text("In-Line Connect")
        mainHeader.addChild(mainHeaderTitle);
        return mainHeader;
    }

    renderPageHome() {
        const app = this.getAppContext();
        const wrapperDiv = this.getwrapperDiv();
        const mainHeader = this.renderMainHeader();
        const mainContent = this.renderMainContent()
        const mainFooter = this.renderMainFooter();
        wrapperDiv.addChild(mainHeader);
        wrapperDiv.addChild(mainContent);
        wrapperDiv.addChild(mainFooter);
        app.addChild(wrapperDiv);
    }

}