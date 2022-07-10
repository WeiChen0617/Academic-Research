import React, {useState} from "react";
import {List, Avatar, Tag, Button} from 'antd';
import SETAF from "../../../structure/model_SETAF/SETAF";
import SETGDG from "../../../structure/model_games/SETGDG";
import {Argument} from "../../../structure/model_SETAF/Argument";

interface IProps {
    SETAF: SETAF,
    SETGDG: SETGDG,
    state: any,
    dispatch: Function,
    Tags: any,
    setTags: Function,
    result: any,
    setResult: Function,
}

interface Players {
    name: string,
    description: string,
}

const GroudedChatList: React.FunctionComponent<IProps> = (props) => {
    const {SETAF, SETGDG, state, dispatch, Tags, setTags,result, setResult} = props;
    const availableArguments: Argument[] = [];
    SETAF.getListOfArguments().forEach((i) => {
        i.forEach((j) => {
            availableArguments.push(j)
        })
    });

    const Concede = () => {
        const sequence = SETGDG.getMovesSequence();
        const lastArgs = sequence[sequence.length - 1];
        const curArgs = SETGDG.Concede() || undefined;
        dispatch({type: 'CONCEDE', Arg: lastArgs});
        // game over
        if (!curArgs) {
            setResult('Arg(\u007B' + [...lastArgs].map((j) => (j.getDescription())) + '\u007d)'
                + ' is justified, PRO wins.');
            setTags([]);
            return
        }

        const curArgsAttacker = SETGDG.findAttackers(curArgs);
        //  if has other attacker and do a CB move
        const arg = curArgsAttacker.values().next().value;
        if (curArgsAttacker.size > 0 && !SETGDG.isLabellingOut(arg) && !SETGDG.isLabellingIn(arg)) {
            //  do a CB move
            CB(arg)
        } else {
            //  do a retract move
            Retract()
        }
    };
    const Retract = () => {
        const sequence = SETGDG.getMovesSequence()
        const lastArgs = sequence[sequence.length - 1];
        const curArgs = SETGDG.Retract() || undefined;
        // game over
        if (!curArgs) {
            setResult('Arg(\u007B' + [...lastArgs].map((j) => (j.getDescription())) + '\u007d)'
                + ' is justified, PRO wins.');
            setTags([]);
            return
        }
        dispatch({type: 'RETRACT', Arg: lastArgs});
        const curArgsAttacker = new Set();
        curArgs && curArgs.forEach((i) => {
            i.getAttackers().forEach((j) => {
                if (lastArgs !== j) {
                    curArgsAttacker.add(j)
                }
            })
        });
        //  do a CB move
        if (curArgsAttacker.size > 0) {
            const arg = curArgsAttacker.values().next().value;
            CB(arg);

        } else {
            //  do a concede move
            Concede();
        }
    };

    const CB = (Arg: Set<Argument>) => {
        SETGDG.CB(Arg);
        dispatch({type: 'CB', Arg: Arg});
        const tags = Array.from(SETGDG.findAttackers(Arg));
        if (tags.length === 0 && SETGDG.getListOfUndo().length > 0) {
            CB(SETGDG.getListOfUndo()[0])
        } else if (tags.length === 0 && SETGDG.getListOfUndo().length <= 0) {
            setResult('No more steps, PRO lose this game.')
            setTags([])
        } else {
            setTags(tags)
        }
    };

    const HTB = (Arg: Set<Argument>) => {
        SETGDG.HTB(Arg);
        dispatch({type: 'HTB', Arg: Arg});
    };


    const onClickTag = (Args: Set<Argument>) => {
        if (SETGDG.isLabelled(Args)) {
            setTags([]);
            HTB(Args);
            setResult('There is a HTB-CB repeat, PRO lose this game.')
            return
        }
        HTB(Args);
        const attackers = [...Args][0].getAttackers();
        if (attackers.size > 0) {
            const [attackerToCB, otherAttackers] = [...attackers].splice(0)
            // save undecidede arg set
            if (otherAttackers && otherAttackers.size > 0) {
                //Do a save undo move
                SETGDG.saveUndoArgs(otherAttackers)
            }
            //  Do a CB move
            CB(attackerToCB)
        } else {
            // focal arg do a concede move
            Concede()
        }
    };
    const {Player} = state;
    return (
        Player.length === 0 ? <div>
                <h2>Choose one of these arguments</h2>
                <List
                    itemLayout="horizontal"
                    dataSource={availableArguments}
                    renderItem={item => (
                        <List.Item key={item.getDescription().toString()}>
                            <Button
                                onClick={() => onClickTag(new Set<Argument>().add(item))}
                                style={{width: '100%', textAlign: 'left'}}
                                type="text">{item.getDescription()}</Button>
                        </List.Item>
                    )}
                /></div>
            : <List
                itemLayout="horizontal"
                bordered={true}
                dataSource={Player}
                renderItem={(item: Players, index) => (
                    <div>
                        <List.Item key={item.name.toString()}>
                            <List.Item.Meta
                                style={item.name === 'OPP' ? {direction: 'rtl', textAlign: 'right'} : {}}
                                avatar={<Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                title={item.name}
                                description={item.description}
                            />
                        </List.Item>
                        {index !== 0 && index === Player.length - 1 && Tags && Tags.length !== 0 &&
                        <div>
                            <p style={{
                                marginTop: 10,
                                marginLeft: 10,
                                marginRight: 10,
                                alignItems: 'center',
                                display: 'flex'
                            }}>Try to choose one defender</p>
                            {Tags.map((item: any, idx: any) => (
                                <Tag key={idx}>
                                    <Button type="text" onClick={() => onClickTag(item)}>
                                        {'Arg(\u007B' + [...item].map((j) => (j.getDescription())) + '\u007d)'}
                                    </Button>
                                </Tag>
                            ))}
                        </div>}
                        {index === Player.length - 1 && result && <p style={{
                            marginTop: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex'
                        }}>{result}</p>}
                    </div>
                )}
            />
    )
};
export default GroudedChatList
