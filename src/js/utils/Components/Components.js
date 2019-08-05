import Html from "../Html/Html"
import Api from "../Api/Api"

class Components {
    getAppContext() {
        return Html().select("#app");
    }
    getwrapperDiv() {
        return Html()
            .create("div")
            .addClass("wrapper");
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
        const mainHeader = this.renderMainHeader();
        const app = this.getAppContext();
        const wrapperDiv = this.getwrapperDiv();
        wrapperDiv.addChild(mainHeader);
        app.addChild(wrapperDiv);
    }
}