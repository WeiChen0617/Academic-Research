import React from "react";
import {List, Avatar, Button, Tag} from 'antd';
import SETAF from "../../../structure/model_SETAF/SETAF";
import SETPDG from "../../../structure/model_games/SETPDG";
import {Argument} from "../../../structure/model_SETAF/Argument";

interface IProps {
    SETAF: SETAF,
    SETPDG: SETPDG,
    state: any,
    dispatch: Function,
    setIsFirstPhase: Function,
    isFirstPhase: boolean,
    setIndexOfFirstPhaseEnd: Function,
    indexOfFirstPhaseEnd: number,
    Tags: any,
    setTags: Function,
    result: any,
    setResult: Function,
}

interface Players {
    name: string,
    description: string,
}

const PreferredChatList: React.FunctionComponent<IProps> = (props) => {
    const {SETAF, SETPDG, state, dispatch, isFirstPhase, setIsFirstPhase, indexOfFirstPhaseEnd, setIndexOfFirstPhaseEnd, Tags, setTags, result, setResult} = props;
    const availableArguments: Argument[] = [];
    SETAF.getListOfArguments().forEach((i) => {
        i.forEach((j) => {
            availableArguments.push(j)
        })
    });
    const WI = (Args: Set<Argument>, name: string) => {
        SETPDG.WI(Args);
        dispatch({type: 'WI', Arg: Args, name: name})
    };
    const CL = (Args: Set<Argument>, name: string, label: string, index: number) => {
        SETPDG.CL(Args, label);
        dispatch({type: 'CL', Arg: Args, name: name, label: label});
        // in first phase.
        const tags = Array.from(SETPDG.findAttackers(Args));
        if (tags.length === 0 && SETPDG.getListOfTodo().length > 0) {
            setTags(SETPDG.getListOfTodo());
        } else if (tags.length === 0 && SETPDG.getListOfTodo().length <= 0) {
            //  start phase two
            const undecArgs = SETPDG.getLabellingUndec();
            if (undecArgs.length>0) {
                setTags(SETPDG.getLabellingUndec());
                setIsFirstPhase(false);
                if (indexOfFirstPhaseEnd < 0) {
                    setIndexOfFirstPhaseEnd(index)
                }
            } else {
                setResult('No more move possibly, PRO won this game.')
            }

        } else {
            setTags(tags)
        }
    };

    const onClickTag = (Args: Set<Argument>, index: number) => {
        if (isFirstPhase) {
            if (SETPDG.isLabelled(Args)) {
                setTags([]);
                setResult('ALREADY DONE');
                return
            }
            WI(Args, 'PRO');
            const attackers = [...Args][0].getAttackers();
            if (attackers.size > 0) {
                const [attacker, otherAttackers] = [...attackers].splice(0);
                if (otherAttackers && otherAttackers.size > 0) {
                    //Do a save undo move
                    SETPDG.saveUndoArgs(otherAttackers)
                }
                CL(Args, 'OPP', 'UNDEC', index);
            } else {
                CL(Args, 'OPP', 'IN', index);
            }
        } else {
            if (state.FocalArgument && state.FocalLabel === 'IN') {
                dispatch({type: 'FOCAL', Arg: Args, label: 'OUT'});
                CL(Args, 'PRO', 'OUT', index);
                if (SETPDG.isLabelledIN(Args)) {
                    setResult('OPP won this discussion game, since' + Args + ' has been labelled as IN');
                    setTags([]);
                }
            } else {
                dispatch({type: 'FOCAL', Arg: Args, label: 'IN'});
                CL(Args, 'PRO', 'IN', index);
            }

            SETPDG.removeUndecArg(Args);

            const attackers = [...Args][0].getAttackers();
            if (attackers.size > 0) {
                const [attacker, otherAttackers] = [...attackers].splice(0);
                // if (otherAttackers && otherAttackers.size > 0) {
                //     //Do a save undo move
                //     SETPDG.saveUndoArgs(otherAttackers)
                // }

                if (SETPDG.isLabelled(attacker)) {
                    setTags([]);
                    setResult('PRO won this game, since it has made at least one legal move.')
                } else {
                    WI(attacker, 'OPP');
                    setTags([attacker]);
                }
            } else {
                // const availableUndec = SETPDG.getAvailableUndecArg();
                // if (availableUndec) {
                //     WI(availableUndec, 'OPP');
                //     setTags([availableUndec]);
                // }
            }
        }


    };
    const Player = state.Player;
    return (
        Player.length === 0 ? <div>
                <h2>Choose one of these arguments</h2>
                <List
                    itemLayout="horizontal"
                    dataSource={availableArguments}
                    renderItem={(item, index) => (
                        <List.Item key={item.getDescription().toString()}>
                            <Button
                                onClick={() => onClickTag(new Set<Argument>().add(item), index)}
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
                        {index === 0 && <p style={{marginLeft: 10, marginTop: 10}}>Phase One:</p>}
                        {index === (indexOfFirstPhaseEnd + 3) && !isFirstPhase &&
                        <p style={{marginLeft: 10}}>Phase Two:</p>}
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
                            }}>Try to choose one another argument.</p>
                            {Tags.map((item: any, idx: any) => (
                                <Tag key={idx}>
                                    <Button type="text" onClick={() => {
                                        onClickTag(item, index)
                                    }}>
                                        {'Arg(\u007B' + [...item].map((j) => (j.getDescription())) + '\u007d)'}
                                    </Button>
                                </Tag>
                            ))}
                        </div>}
                        {index === Player.length - 1 && result &&
                        <p style={{
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
export default PreferredChatList

