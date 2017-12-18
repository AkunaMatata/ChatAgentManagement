export abstract class RequestPolicy {
    private readonly policyType: string;

    constructor(type: string) {
        this.policyType = type;
    }

    public get type(): string {
        return this.policyType;
    }
}