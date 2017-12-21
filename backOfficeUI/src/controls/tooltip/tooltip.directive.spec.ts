import { ElementRef } from '@angular/core';
import { ShowTooltipDirective } from './tooltip.directive';

const expect = chai.expect;
const moduleName = 'TooltipModule';
const directiveName = 'ShowTooltipDirective';

describe(`${moduleName}.${directiveName}`, () => {
    let testTarget,
        elementStub,
        setVisibilityMock;

    beforeEach(() => {
        elementStub = {
            nativeElement: {
                offsetWidth: 0,
                scrollWidth: 0
            }
        } as ElementRef;
        testTarget = new ShowTooltipDirective(elementStub);
        testTarget.showTooltip = { setVisibility: () => {} }; //tslint:disable-line
        setVisibilityMock = sinon.spy(testTarget.showTooltip, 'setVisibility');
    });

    describe('#onMouseEnter ', () => {
        it('should show tooltip if there is ellipsis', () => {

            // Arrange
            let offsetWidth = 0;
            let scrollWidth = offsetWidth + 10; // tslint:disable-line
            testTarget.element.nativeElement = { offsetWidth: offsetWidth, scrollWidth: scrollWidth };

            // Act
            testTarget.onMouseEnter();

            // Assert
            expect(setVisibilityMock.calledWithExactly(true)).to.be.true;

        });

        it('should show tooltip if there is no ellipsis and show only ellipsis is false', () => {

            // Arrange
            const offsetWidth = 20;
            const scrollWidth = offsetWidth - 5; // tslint:disable-line
            testTarget.element.nativeElement = { offsetWidth: offsetWidth, scrollWidth: scrollWidth };
            testTarget.onlyEllipsis = false;

            // Act
            testTarget.onMouseEnter();

            // Assert
            expect(setVisibilityMock.calledWithExactly(true)).to.be.true;

        });
    });
});
