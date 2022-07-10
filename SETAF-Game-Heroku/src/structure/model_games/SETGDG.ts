import {Argument} from "../model_SETAF/Argument";
import SETAF from "../model_SETAF/SETAF";
import {isSameSet, unique} from "../Functions";

export default class SETGDG {
    private setaf = new SETAF();
    private sequenceOfMoves = new Array<Set<Argument>>();
    private listOfLabelIn = new Array<Set<Argument>>();
    private listOfLabelOut = new Array<Set<Argument>>();
    private listOfHTB = new Array<Set<Argument>>();
    private listOfCB = new Array<Set<Argument>>();
    private listOfUndo = new Array<Set<Argument>>();

    reset() {
        this.sequenceOfMoves = new Array<Set<Argument>>();
        this.listOfLabelIn = new Array<Set<Argument>>();
        this.listOfLabelOut = new Array<Set<Argument>>();
        this.listOfHTB = new Array<Set<Argument>>();
        this.listOfCB = new Array<Set<Argument>>();
        this.listOfUndo = new Array<Set<Argument>>();
    }

    setSETAF(setaf: SETAF) {
        this.setaf = setaf;
    }

    HTB(args: Set<Argument>) {
        this.sequenceOfMoves.push(args);
        this.listOfHTB.push(args);
    }


    CB(args: Set<Argument>) {
        this.sequenceOfMoves.push(args);
        this.listOfCB.push(args);
    }

    Concede() {
        if (this.sequenceOfMoves.length === 0) {
            return
        }
        const curArg = this.sequenceOfMoves[this.sequenceOfMoves.length - 1];
        if (curArg && this.listOfHTB.includes(curArg) && !this.listOfLabelOut.includes(curArg)) {
            this.listOfLabelIn.push(curArg);
            this.sequenceOfMoves.pop();
            return this.sequenceOfMoves[this.sequenceOfMoves.length - 1];
        } else {
            console.log('Illegal Concede Moves')
        }
    }

    Retract() {
        if (this.sequenceOfMoves.length === 0) {
            return
        }
        const curArg = this.sequenceOfMoves[this.sequenceOfMoves.length - 1];
        if (curArg && this.listOfCB.includes(curArg) && !this.listOfLabelIn.includes(curArg)) {
            this.listOfLabelOut.push(curArg);
            this.sequenceOfMoves.pop();
            return this.sequenceOfMoves[this.sequenceOfMoves.length - 1];
        } else {
            console.log('Illegal Retract Moves')
        }
    }

    saveUndoArgs(Args: Set<Argument>) {
        this.listOfUndo.push(Args)
    }

    getMovesSequence() {
        return this.sequenceOfMoves
    }

    isLabellingIn(args: Set<Argument>) {
        return this.listOfLabelIn.includes(args)
    }

    isLabellingOut(args: Set<Argument>) {
        return this.listOfLabelOut.includes(args)
    }

    getListOfUndo() {
        return this.listOfUndo
    }

    isLabelled(args: Set<Argument>) {
        let flag = false;
        this.listOfCB.forEach((i) => {
            if (isSameSet(i, args)) {
                flag = true
            }
        });
        this.listOfHTB.forEach((i) => {
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
        const result = new Set(unique([...attackerArguments]))
        this.listOfLabelOut.forEach((i) => {
            result.forEach((j) => {
                if (isSameSet(i, j)) {
                    result.delete(j)
                }
            })
        });
        this.listOfLabelIn.forEach((i) => {
            result.forEach((j) => {
                if (isSameSet(i, j)) {
                    result.delete(j)
                }
            })
        });
        return result
    }
}
