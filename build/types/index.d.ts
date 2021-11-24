import "reflect-metadata";
export interface Class<T> extends Function {
    new (...args: any[]): T;
}
declare type TypeRepresentation = Class<any>;
export declare function CreateFunction<Type extends (...args: any[]) => any>(f: Type, types: TypeRepresentation[]): Type;
export declare function Function(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    value: any;
    configurable?: boolean | undefined;
    enumerable?: boolean | undefined;
    writable?: boolean | undefined;
    get?(): any;
    set?(v: any): void;
};
export {};
