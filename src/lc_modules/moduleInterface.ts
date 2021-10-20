export interface ModuleInterface {
    name: string;
    description: string;
    version: string;
    settings: Record<string, string>;
    trigger: Array<string>;

    // moduleInvalid(name: string, message: string): void;

    createResultList(): string;

    submit(): ReturnObjectInterface;

    query(query: string): ReturnObjectInterface;
}