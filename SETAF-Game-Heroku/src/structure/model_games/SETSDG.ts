import SETAF from "../model_SETAF/SETAF";
import {Argument} from "../model_SETAF/Argument";
import {isSameSet} from "../Functions";

export default class SETSDG {
    private setaf = new SETAF();

    private listOfLabelIn = new Array<Set<Argument>>();
    private listOfLabelOut = new Array<Set<Argument>>();
    private listOfLabelQuestion = new Array<Set<Argument>>();

    setSETAF(setaf: SETAF) {
        this.setaf = setaf;
        if (this.listOfLabelQuestion.length === 0 && this.listOfLabelIn.length === 0 && this.listOfLabelOut.length === 0) {
            this.setaf.getListOfArguments().forEach(i => {
                this.listOfLabelQuestion.push(i)
            });

            this.setaf.getListOfRelations().forEach(i => {
                if (i.getOrigin().size >= 2) {
                    this.listOfLabelQuestion.push(i.getOrigin())
                }
            });
        }
    }

    isWonByPro(args: Set<Argument>) {
        let flag = false;
        this.listOfLabelOut.forEach(i => {
            if (isSameSet(i, args)) {
                flag = true
            }
        });
        return flag
    }

    reset() {
        this.listOfLabelIn = new Array<Set<Argument>>();
        this.listOfLabelOut = new Array<Set<Argument>>();
        this.listOfLabelQuestion = new Array<Set<Argument>>();
    }

    isLabelled(args: Set<Argument>) {
        let flag = false;
        this.listOfLabelIn.forEach((i) => {
            if (isSameSet(i, args)) {
                flag = true
            }
        });
        this.listOfLabelOut.forEach((i) => {
            if (isSameSet(i, args)) {
                flag = true
            }
        });

        return flag
    }

    In(args: Set<Argument>) {
        if (!this.isLabelled(args)) {
            this.listOfLabelQuestion.forEach((i, j) => {
                if (isSameSet(args, i)) {
                    this.listOfLabelQuestion.splice(j, 1)
                }
            });


            this.listOfLabelIn.push(args);
        }
    }

    Out(args: Set<Argument>) {
        if (!this.isLabelled(args)) {
            this.listOfLabelQuestion.forEach((i, j) => {
                if (isSameSet(args, i)) {
                    this.listOfLabelQuestion.splice(j, 1)
                }
            });
            this.listOfLabelOut.push(args);
        }
    }

    Question(args: Set<Argument>) {
        this.listOfLabelQuestion.forEach((i, j) => {
            if (isSameSet(args, i)) {
                this.listOfLabelQuestion.splice(j, 1)
            }
        });

    }

    getQuestionList() {
        return this.listOfLabelQuestion
    }

    getAvailableQuestionArg() {
        return this.listOfLabelQuestion.pop();
    }


    findTarget(args: Set<Argument>, findUnlabelled: boolean = false) {
        const relations = this.setaf.getListOfRelations();
        const targetArguments = new Set<Set<Argument>>();
        for (const i of relations) {
            if (isSameSet(i.getOrigin(), args)) {
                targetArguments.add(i.getTarget())
            }
        }
        if (findUnlabelled) {
            this.listOfLabelOut.forEach((i) => {
                targetArguments.forEach((j) => {
                    if (isSameSet(i, j)) {
                        targetArguments.delete(j)
                    }
                })
            });
            this.listOfLabelIn.forEach((i) => {
                targetArguments.forEach((j) => {
                    if (isSameSet(i, j)) {
                        targetArguments.delete(j)
                    }
                })
            });
        }
        return targetArguments
    }
}
