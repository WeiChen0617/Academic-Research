import React, {useState} from "react";
import {Card} from "antd";
import SETAF from "../../../structure/model_SETAF/SETAF";
import SETGDG from "../../../structure/model_games/SETGDG";
import SETPDG from "../../../structure/model_games/SETPDG";
import GroudedChatList from "./GroudedChatList";
import PreferredChatList from "./PreferredChatList";
import StableChatList from "./StableChatList";
import SETSDG from "../../../structure/model_games/SETSDG";
import {Argument} from "../../../structure/model_SETAF/Argument";

interface IProps {
    SETAF: SETAF,
    state: any,
    dispatch: Function,
    setKey: Function,
    tabKey: string,
}

const tabListNoTitle = [
    {
        key: 'SETGDG',
        tab: 'SETGDG',
    },
    {
        key: 'SETPGD',
        tab: 'SETPGD',
    },
    {
        key: 'SETSGD',
        tab: 'SETSGD',
    },
];
const setgdg = new SETGDG();
const setpdg = new SETPDG();
const setsdg = new SETSDG();

const ChatList: React.FunctionComponent<IProps> = (props) => {
    const {SETAF, state, dispatch, setKey, tabKey,} = props;
    setgdg.setSETAF(SETAF);
    setpdg.setSETAF(SETAF);
    setsdg.setSETAF(SETAF);
    const [isFirstPhase, setIsFirstPhase] = useState(true);
    const [indexOfFirstPhaseEnd, setIndexOfFirstPhaseEnd] = useState(100000);
    const [Tags, setTags] = useState<Array<Set<Argument>>>([]);
    const [result, setResult] = useState('');

    const onTabChange = (key: any) => {
        setKey(key);
        setgdg.reset();
        setpdg.reset();
        setsdg.reset();
        setResult('');
        setTags([]);
        setIsFirstPhase(true);
        setIndexOfFirstPhaseEnd(-1);
        dispatch({type: 'RESET'})
    };
    return (
        <Card
            style={{flex: 3}}
            tabList={tabListNoTitle}
            // activeTabKey={tabKey}
            onTabChange={key => {
                onTabChange(key);
            }}
        >
            {tabKey === 'SETGDG' && <GroudedChatList result={result}
                                                     setResult={setResult}
                                                     Tags={Tags}
                                                     setTags={setTags}
                                                     state={state}
                                                     dispatch={dispatch}
                                                     SETGDG={setgdg}
                                                     SETAF={SETAF}/>}
            {tabKey === 'SETPGD' && <PreferredChatList result={result}
                                                       setResult={setResult}
                                                       Tags={Tags}
                                                       setTags={setTags}
                                                       setIndexOfFirstPhaseEnd={setIndexOfFirstPhaseEnd}
                                                       indexOfFirstPhaseEnd={indexOfFirstPhaseEnd}
                                                       isFirstPhase={isFirstPhase}
                                                       setIsFirstPhase={setIsFirstPhase}
                                                       state={state}
                                                       dispatch={dispatch}
                                                       SETPDG={setpdg}
                                                       SETAF={SETAF}/>}
            {tabKey === 'SETSGD' && <StableChatList result={result}
                                                    setResult={setResult}
                                                    Tags={Tags}
                                                    setTags={setTags}
                                                    dispatch={dispatch}
                                                    state={state}
                                                    SETAF={SETAF}
                                                    SETSDG={setsdg}/>}
        </Card>
    )
}
export default ChatList
