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

    renderReports(endpoint, ul) {
        Api().getRequest(`http://localhost:8080/api/${endpoint}`, (responseCollection) => {
            responseCollection.forEach((report) => {
                const div = Html().create('div').addClass('receiving__report-list');
                const reportNumField = Html().create('li').addClass('receiving__report-list-item').text("Report #:");
                const link = Html().create('a').addClass('receiving__report-list-item').addAttribute('href', `/endpoint/${report.id}`).text(report.id)
                    .click((event) => {
                        event.preventDefault();
                        //need to render single page
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