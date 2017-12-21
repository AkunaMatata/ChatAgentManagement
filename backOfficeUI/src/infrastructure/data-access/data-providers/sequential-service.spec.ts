import { SequentialService } from './sequential-service';

const expect = chai.expect;
const moduleName = 'DataAccess';
const componentName = 'SequentialService';

describe(`${moduleName}.${componentName} `, () => {
    let testTarget: SequentialService;

    beforeEach(() => {
        testTarget = new SequentialService();
    });

    describe('#next ', () => {
        it('should generate next sequential id', () => {

            const firstResult = { done: false, value: 0 };
            const secondResult = { done: false, value: 1 };

            // Act
            const first = testTarget.next();
            const second = testTarget.next();

            // Assert
            expect(first).to.be.eql(firstResult);
            expect(second).to.be.eql(secondResult);
        });

        it('should generate first id if overflow was detected', () => {

            // Arrange (set private state to increase tests performance)
            (testTarget as any).sequentialId = Number.MAX_VALUE;
            const firstResult = { done: false, value: 0 };

            // Act
            const first = testTarget.next();

            // Assert
            expect(first).to.be.eql(firstResult);
        });
    });

    describe('#reset ', () => {
        it('should reset sequence to the initial value', () => {

            // Arrange
            const firstResult = { done: false, value: 0 };
            testTarget.next();

            // Act
            testTarget.reset();
            const first = testTarget.next();

            // Assert
            expect(first).to.be.eql(firstResult);
        });
    });

    describe('#return ', () => {
        it('should return current sequence and complete generation', () => {

            // Arrange
            const returnResult = { done: true, value: 1 };
            testTarget.next();

            // Act
            const result = testTarget.return();

            // Assert
            expect(result).to.be.eql(returnResult);
        });
    });

    describe('#throw', () => {
        it('should throw error immediately', () => {

            // Arrange
            const error = new Error('Test');

            // Act
            try {
                testTarget.throw(error);
            } catch (e) {

                // Assert
                expect(e).to.be.eql(error);
            }
        });
    });
});