import {Argument} from "./Argument";

export class Relation {

    private readonly Origin: Set<Argument>;
    private readonly Target: Set<Argument>;

    constructor(Origin: Set<Argument>, Target: Set<Argument>) {
        this.Origin = Origin;
        this.Target = Target;
    }

    getOrigin(): Set<Argument> {
        return this.Origin
    }

    getTarget(): Set<Argument> {
        return this.Target
    }
}
