import SETAF from "../model_SETAF/SETAF";
import {Argument} from "../model_SETAF/Argument";
import {isSameSet, unique} from "../Functions";

export default class SETPDG {
    private setaf = new SETAF();
    private listOfIn = new Array<Set<Argument>>();
    private listOfOut = new Array<Set<Argument>>();
    private listOfUndec = new Array<Set<Argument>>();
    private listOfTodo = new Array<Set<Argument>>();

    setSETAF(setaf: SETAF) {
        this.setaf = setaf;
    }

    reset() {
        this.listOfIn = new Array<Set<Argument>>();
        this.listOfOut = new Array<Set<Argument>>();
        this.listOfUndec = new Array<Set<Argument>>();
        this.listOfTodo = new Array<Set<Argument>>();
    }

    getListOfTodo() {
        return this.listOfTodo
    }

    getLabellingOut() {
        return this.listOfOut
    }

    getLabellingIn() {
        return this.listOfIn
    }

    getLabellingUndec() {
        return this.listOfUndec
    }

    getAvailableUndecArg() {
        return this.listOfUndec.reverse().pop()
    }
    isLabelledUndec (args: Set<Argument>) {
        let flag = false;
        this.listOfUndec.forEach((i) => {
            if (isSameSet(i, args)) {
                flag = true
            }
        });
        return flag
    }
    isLabelledIN(args: Set<Argument>) {
        let flag = false;
        this.listOfIn.forEach((i) => {
            if (isSameSet(i, args)) {
                flag = true
            }
        });
        return flag
    }

    saveUndoArgs(Args: Set<Argument>) {
        this.listOfTodo.push(Args)
    }

    WI(args: Set<Argument>) {

        if (this.listOfTodo.includes(args)) {
            this.listOfTodo.splice(this.listOfTodo.indexOf(args), 1)
        }
    }

    CL(args: Set<Argument>, label: string) {
        const [attacker, otherAttackers] = [...this.findAttackers(args)].splice(0);
        if (otherAttackers) {
            this.listOfTodo.push(otherAttackers);
        }
        switch (label) {
            case 'IN':
                this.listOfIn.push(args);
                break;
            case 'OUT':
                this.listOfOut.push(args);
                break;
            case 'UNDEC':
                this.listOfUndec.push(args);
                break;
            default:
                console.log('Illegal label.')
        }
    }

    removeUndecArg(args: Set<Argument>) {
        this.listOfUndec.forEach(i => {
            if (isSameSet(i, args)) {
                this.listOfUndec.splice(this.listOfUndec.indexOf(i),1)
            }
        })
    }

    isLabelled(args: Set<Argument>) {
        let flag = false;
        this.listOfIn.forEach((i) => {
            if (isSameSet(i, args)) {
                flag = true
            }
        });
        this.listOfOut.forEach((i) => {
            console.log('listOfHTB  ', i, 'isSameSet', isSameSet(i, args))
            if (isSameSet(i, args)) {
                flag = true
            }
        });
        return flag
    }

    findAttackers(args: Set<Argument>) {
        const relations = this.setaf.getListOfRelations();
        const attackerArguments = new Set<Set<Argument>>();
        for (const i of relations) {
            args.forEach((j) => {
                if (j.getDescription() === i.getTarget().values().next().value.getDescription()) {
                    attackerArguments.add(i.getOrigin())
                }
            });
        }
        const result = new Set(unique([...attackerArguments]));
        // const result = attackerArguments;
        this.getLabellingOut().forEach((i) => {
            result.forEach((j) => {
                if (isSameSet(i, j)) {
                    result.delete(j)
                }
            })
        });
        this.getLabellingIn().forEach((i) => {
            result.forEach((j) => {
                if (isSameSet(i, j)) {
                    result.delete(j)
                }
            })
        });
        this.getLabellingUndec().forEach((i) => {
            result.forEach((j) => {
                if (isSameSet(i, j)) {
                    result.delete(j)
                }
            })
        });
        return result
    }


}
