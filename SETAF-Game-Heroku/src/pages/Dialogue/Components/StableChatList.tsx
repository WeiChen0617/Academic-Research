import React from "react";
import {List, Avatar, Button, Tag} from 'antd';
import SETAF from "../../../structure/model_SETAF/SETAF";
import SETSDG from "../../../structure/model_games/SETSDG";
import {Argument} from "../../../structure/model_SETAF/Argument";

interface IProps {
    SETAF: SETAF,
    SETSDG: SETSDG,
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

const StableChatList: React.FunctionComponent<IProps> = (props) => {
    const {SETAF, SETSDG, state, dispatch, Tags, setTags, result, setResult} = props;
    const availableArguments: Argument[] = [];
    SETAF.getListOfArguments().forEach((i) => {
        i.forEach((j) => {
            availableArguments.push(j)
        })
    });

    const In = (Arg: Set<Argument>) => {
        SETSDG.In(Arg);
        dispatch({type: 'IN', Arg: Arg})
    };

    const Out = (Arg: Set<Argument>) => {
        SETSDG.Out(Arg);
        dispatch({type: 'OUT', Arg: Arg});
        const tags = [...SETSDG.findTarget(Arg, false)];

        if (tags.length === 0 && SETSDG.getQuestionList().length > 0) {
            setTags(SETSDG.getQuestionList())
        } else if (tags.length === 0 && SETSDG.getQuestionList().length <= 0) {
            setResult('No more steps, PRO lose this game.');
            setTags([])
        } else {
            setTags(tags)
        }
    };

    const Question = (Arg: Set<Argument>) => {
        SETSDG.Question(Arg);
        dispatch({type: 'QUESTION', Arg: Arg});
        setTags([Arg])
    };

    const onClickTag = (Args: Set<Argument>) => {
        if (!SETSDG.isLabelled(Args)) {
            In(Args);
            const [target, otherTargets] = [...SETSDG.findTarget(Args, true)].splice(0);
            if (target && target.size > 0) {
                Out(target);
            } else {
                const arg = SETSDG.getAvailableQuestionArg();
                if (arg && arg.size > 0) {
                    Question(arg);
                } else {
                    setResult('No more steps, PRO wins this game.');
                    setTags([])
                }
            }
        } else {
            dispatch({type: 'IN', Arg: Args});
            if (SETSDG.isWonByPro(Args)) {
                setTags([]);
                setResult('One argument labelled OUT before has been changed into IN, PRO has won.');
                return
            }
            const arg = SETSDG.getAvailableQuestionArg();
            if (arg) {
                Question(arg)
            } else {
                setResult('No more steps, PRO wins this game.');
                setTags([])
            }
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
export default StableChatList
