import {Argument} from "./model_SETAF/Argument";

export const isSameSet = (set1: Set<Argument>, set2: Set<Argument>) => [...set1].every((o) => set2.has(o)) && [...set2].every((o) => set1.has(o));
export const arrayWithNoRepeatfy = (arr: Array<Set<Argument>>) => {
    let map = new Map();
    let array: any = [];
    arr.forEach((i) => {
        if (map.has(i)) {
            map.set(i, true);
        } else {
            map.set(i, false);
            array.push(i)
        }
    });
    return array
};
export const unique = (arr: Array<Set<Argument>>) => {
    let obj: any = {};
    return arr.filter(function (item, index, arr) {
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
    })
}
