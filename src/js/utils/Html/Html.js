export default function () {
    return new Html();
}

class Html {
    addAttribute(attributeToSet, attributeValue) {
        this.element.setAttribute(attributeToSet, attributeValue);

        return this;
    }

    addChild(elementToAdd) {
        this.element.append(elementToAdd.render());

        return this;
    }

    addClass(classToAdd) {
        if (this.element.classList.contains(classToAdd)) {
            throw new Error("the class already exists on element");
        }
        this.element.classList.add(classToAdd);

        return this;
    }

    click(callback) {
        this.element.addEventListener("click", callback);

        return this;
    }

    create(elementType) {
        if (!elementType) {
            throw new Error("Must pass a valid HTML element");
        }
        this.element = document.createElement(elementType);
        if (this.element instanceof HTMLUnknownElement) {
            throw new Error("Must pass a valid HTML element");
        }

        return this;
    }

    html(contentToAdd) {
        if (contentToAdd === undefined) {
            return this.element.innerHTML;
        }
        this.element.innerHTML = contentToAdd;

        return this;
    }

    render() {
        return this.element;
    }

    replace(replaceChild) {
        this.element.innerHTML = "";
        this.addChild(replaceChild);

        return this;
    }

    select(query) {
        const selection = document.querySelectorAll(query);
        if (selection.length === 1) {
            this.element = selection[0];
        } else {
            this.element = selection;
        }

        return this;
    }

    text(textToAdd) {
        if (textToAdd === undefined) {
            return this.element.textContent;
        }
        this.element.textContent = textToAdd;

        return this;
    }
}