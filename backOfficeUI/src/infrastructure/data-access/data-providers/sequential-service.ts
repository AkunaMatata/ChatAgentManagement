import { Injectable } from '@angular/core';

@Injectable()
/**
 * Service to generate sequential ids.
 */
export class SequentialService implements IterableIterator<number> {

    private static MaxValue = Number.MAX_VALUE - 1;
    private sequentialId = 0;

    /**
     * Basic iterator implementation
     */
    public [Symbol.iterator](): IterableIterator<number> {
        return this;
    }

    /**
     * Return current sequential value and generate next one.
     * @returns
     */
    public next(): IteratorResult<number> {

        if (this.sequentialId === SequentialService.MaxValue) {
            this.reset();
        }

        return {
            done: false,
            value: this.sequentialId++
        };
    }

    /**
     * Return current sequential value and complete execution.
     * @returns
     */
    public return(): IteratorResult<number> {
        return { done: true, value: this.sequentialId };
    }

    /**
     * Immediately throw error and interrupt generation.
     * @returns
     */
    public throw(e: any): IteratorResult<number> {
        throw e;
    }

    /**
     * Reset current sequence to the initial value.
     * @returns
     */
    public reset(): void {
        this.sequentialId = 0;
    }
}