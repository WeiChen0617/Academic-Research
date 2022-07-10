import {Argument} from "./Argument";
import {Relation} from "./Relation";

export default class SETAF {
     listOfArguments = new Set<Set<Argument>>();
     listOfRelations = new Set<Relation>();

    addArgument(arg: Set<Argument>) {
        this.listOfArguments.add(arg);
    }

    addRelation(rel: Relation) {
        if (rel === undefined) {
            console.log('Illegal Relation');
            return;
        }
        this.listOfRelations.add(rel);
        this.listOfArguments.add(rel.getTarget());
        return this;
    }

    getListOfArguments() {
        return this.listOfArguments
    }

    getListOfRelations() {
        return this.listOfRelations
    }

    getArgumentsByName(name: string): any {
        for (const a of this.listOfArguments) {
            for (const i of a) {
                if (i.getDescription() === name) {
                    return a
                }
            }
        }
    }

    getArgumentByName(name: string): any {
        for (const a of this.listOfArguments) {
            for (const i of a) {
                if (i.getDescription() === name) {
                    return i
                }
            }
        }
    }
}
