export {};

declare global {
    interface String {
        equalsIgnoreCase(compared: string): boolean;
    }
}

String.prototype.equalsIgnoreCase = function (comprared: string): boolean {
    return typeof this === 'string' && typeof comprared === 'string'
        ? this.localeCompare(comprared, undefined, { sensitivity: 'accent' }) === 0
        : this === comprared;
}