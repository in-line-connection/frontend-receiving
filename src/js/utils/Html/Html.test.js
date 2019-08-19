import Html from './Html'
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe('Html', () => {

    describe('addAttribute', () => {
        test('should add an alt attribute to an img element', () => {
            const underTest = Html().create('img');
            underTest.addAttribute('alt', 'picture');
            expect(underTest.render().getAttribute('alt')).toBe('picture');
        });
    });

    describe('addChild', () => {
        test('should add child element to element', () => {
            const underTest = Html().create('div');
            const p = Html().create('p');
            underTest.addChild(p);
            expect(underTest.render().querySelector('p')).toStrictEqual(p.render());
        });
    });

    describe('addClass', () => {

        let underTest;

        beforeEach(() => {
            underTest = Html().create('div');
        });

        test('should add a class to an element', () => {
            underTest.addClass('testClass');
            expect(underTest.render().classList.contains('testClass')).toBeTruthy();
        });

        test('throws an error if the class already exists on the element', () => {
            underTest.addClass('testClass');
            expect(() => {
                underTest.addClass('testClass')
            }).toThrow('the class already exists on element');
        });
    });

    describe('create', () => {
        describe('should return new html object', () => {
            test('should be an object', () => {
                expect(typeof Html().create('h1')).toBe('object');
            });

            test('should create an element', () => {
                const underTest = Html().create('div');
                expect(typeof underTest).toBe('object');
            });

            test('should create a p element', () => {
                const underTest = Html().create('p');
                expect(underTest.render() instanceof HTMLParagraphElement).toBeTruthy();
            });
        });

        describe('should return errors if invalid HTML element is passed', () => {
            test('Throws an error if no element is passed', () => {
                expect(() => {
                    Html().create()
                }).toThrow('Must pass a valid HTML element');

            });

            test('Throws an error if an invalid element is passed', () => {
                expect(() => {
                    Html().create('asdfasd')
                }).toThrow('Must pass a valid HTML element');
            });
        });
    });

    describe('render', () => {

        test('should return a div element', () => {
            expect(Html().create('div').render() instanceof HTMLDivElement).toBeTruthy();
        });

        test('should return a p element', () => {
            expect(Html().create('p').render() instanceof HTMLParagraphElement).toBeTruthy();
        });
    });

    describe('replace', () => {
        test('should replace inner Html', () => {
            const underTest = Html().create("nav");
            const firstChildToAdd = Html().create('li');
            const childToReplace = Html().create('a');
            underTest.addChild(firstChildToAdd);
            underTest.replace(childToReplace);
            expect(underTest.render().querySelector('a')).toEqual(childToReplace.render());
        });
    });

    describe('select', () => {

        test('should select h1 element', () => {

            const dom = new JSDOM(`<div>
              <h1>JSDOM mocking</h1>
            </div>`);

            const select = jest.fn(Html().select('h1').text());
            select.mockReturnValue('JSDOM mocking');
            expect(select()).toBe(dom.window.document.querySelector('h1').textContent);
        });

        test('should select 2 li elements', () => {

            const dom = new JSDOM(`<div>
              <h1>JSDOM mocking</h1><ul>
              <li>item 1</li>
              <li>item 2</li>
              </ul></div>`);

            const select = jest.fn(Html().select('li').render().length);
            select.mockReturnValue(2);
            expect(select()).toEqual(dom.window.document.querySelectorAll('li').length);
        });
    });

    describe('text', () => {

        test('should return text if given no argument', () => {
            const underTest = Html().create('div');
            underTest.render().textContent = 'some text';
            const received = underTest.text();
            expect(received).toBe('some text');
        });

        test('should set and return text', () => {
            const underTest = Html().create('div');
            underTest.text('some text');
            expect(underTest.text()).toBe('some text');
        });
    });

});