import clickElement from 'src/support/action/clickElement';

let clickMock;
let doubleClickMock;

describe('clickElement', () => {
    let expectToHaveLengthOf;
    let expectToHaveLengthOfAtLeast;

    beforeEach(() => {
        global.$$ = jest.fn(() => ['1'])
            .mockImplementationOnce(() => []);

        clickMock = jest.fn();
        doubleClickMock = jest.fn();
        global.$ = jest.fn().mockReturnValue({
            click: clickMock,
            doubleClick: doubleClickMock,
        });

        expectToHaveLengthOf = jest.fn();
        expectToHaveLengthOfAtLeast = jest.fn();

        global.expect = jest.fn(() => ({
            to: {
                have: {
                    length: {
                        of: {
                            at: {
                                least: expectToHaveLengthOfAtLeast,
                            },
                        },
                    },
                    lengthOf: expectToHaveLengthOf,
                },
            },
        }));
    });

    it('should fail if the given element does not exist', () => {
        clickElement('click', 'element', 'element0');

        _expect(global.$).toHaveBeenCalledWith('element0');
        _expect(clickMock).toHaveBeenCalled();

        _expect(expectToHaveLengthOfAtLeast).toHaveBeenCalledTimes(1);
        _expect(expectToHaveLengthOfAtLeast).toHaveBeenCalledWith(
            1,
            'Element with selector "element0" should exist on the page'
        );
    });

    it('should call click on the browser', () => {
        clickElement('click', 'element', 'element1');

        _expect(global.$).toHaveBeenCalledWith('element1');
        _expect(clickMock).toHaveBeenCalled();

        _expect(expectToHaveLengthOfAtLeast).toHaveBeenCalledTimes(1);
        _expect(expectToHaveLengthOfAtLeast).toHaveBeenCalledWith(
            1,
            'Element with selector "element1" should exist on the page'
        );
    });

    it('should call doubleClick on the browser', () => {
        clickElement('doubleClick', 'element', 'element2');

        _expect(global.$).toHaveBeenCalledWith('element2');
        _expect(doubleClickMock).toHaveBeenCalled();

        _expect(expectToHaveLengthOfAtLeast).toHaveBeenCalledTimes(1);
        _expect(expectToHaveLengthOfAtLeast).toHaveBeenCalledWith(
            1,
            'Element with selector "element2" should exist on the page'
        );
    });

    it('should click a link when type is `link`', () => {
        clickElement('click', 'link', 'element3');

        _expect(global.$).toHaveBeenCalledWith('=element3');
        _expect(clickMock).toHaveBeenCalled();

        _expect(expectToHaveLengthOfAtLeast).toHaveBeenCalledTimes(1);
        _expect(expectToHaveLengthOfAtLeast).toHaveBeenCalledWith(
            1,
            'Element with selector "=element3" should exist on the page'
        );
    });
});
