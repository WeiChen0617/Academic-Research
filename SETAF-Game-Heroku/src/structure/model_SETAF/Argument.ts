export class Argument {
    description: string;
    listOfAttackers: Set<Set<Argument>>;

    constructor(description: string, listOfAttackers: Set<Set<Argument>>) {
        this.description = description;
        this.listOfAttackers = listOfAttackers;
    }

    setAttackers(attackers: Set<Argument>) {
        this.listOfAttackers.add(attackers)
    }

    getDescription() {
        return this.description
    }

    getAttackers() {
        return this.listOfAttackers
    }
}
