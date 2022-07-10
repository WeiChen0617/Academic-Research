import SETAF from "./model_SETAF/SETAF";
import {Relation} from "./model_SETAF/Relation";
import {Argument} from "./model_SETAF/Argument";

const Parser = (file: string) => {
    const setaf = new SETAF();
    const regexarg = /arg\(\s*([a-z,0-9,^a-z]+)\s*\)/g
    const regexatt = /att\(\s*([a-z,0-9,^a-z]+)\s*,\s*([a-z,0-9,A-Z]+)\s*\)/g
    const regexmem = /mem\(\s*([a-z,0-9,^a-z]+)\s*,\s*([a-z,0-9,A-Z]+)\s*\)/g
    const argSet = new Set(file.matchAll(regexarg));
    const attSet = new Set(file.matchAll(regexatt));
    const memSet = new Set(file.matchAll(regexmem));
    const AttackBuilder = new Map<string, any>();
    const Relations = new Map<string, any>();

    for (const i of argSet) {
        setaf.addArgument(new Set<Argument>().add(new Argument(i[1].toString(), new Set(new Set()))
        ))
    }
    for (const i of attSet) {
        if (!AttackBuilder.has(i[1])) {
            AttackBuilder.set(i[1], new Set())
        }
        Relations.set(i[1], i[2])
    }
    for (const i of memSet) {
        if (AttackBuilder.has(i[1])) {
            AttackBuilder.get(i[1]).add(i[2])
        }
    }
    for (const i of AttackBuilder.keys()) {
        const s = new Set<Argument>();
        for (const k of AttackBuilder.get(i)) {
            s.add(setaf.getArgumentByName(k))
        }
        const target = setaf.getArgumentsByName(Relations.get(i))
        target.values().next().value.setAttackers(s);
        setaf.addRelation(new Relation(s, target))
    }
    return setaf
};


export default Parser;
