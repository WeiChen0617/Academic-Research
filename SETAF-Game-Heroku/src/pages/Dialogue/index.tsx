import React, {useState, useReducer} from "react";
import 'antd/dist/antd.css';
import '../../index.css';
import SETAF from "../../structure/model_SETAF/SETAF";
import {Modal, Button} from "antd";
import {Argument} from "../../structure/model_SETAF/Argument";
import Buttons from "./Components/Buttons";
import Cards from "./Components/Cards";
import ChatList from "./Components/ChatList";
import GraphTable from "./Components/GraphTable";

type ActionType = {
    type: string,
    Arg: Set<Argument>,
    name?: string,
    label?: string,
}
const reducer: any = (state: any, action: ActionType) => {
    switch (action.type) {
        case 'HTB':
            return {
                ...state, Player: [...state.Player, ...[
                    {
                        name: 'PRO',
                        description: 'HTB(\u007B' + [...action.Arg].map((i) => {
                            return i.getDescription() + ''
                        }) + '\u007d)'
                    }]]
            };
        case 'CB':
            return {
                ...state, Player: [...state.Player, ...[
                    {
                        name: 'OPP',
                        description: 'CB(\u007B' + [...action.Arg].map((i) => {
                            return i.getDescription() + ''
                        }) + '\u007d)'
                    }]]
            };
        case 'CONCEDE':
            return {
                ...state, Player: [...state.Player, ...[
                    {
                        name: 'OPP',
                        description: 'CONCEDE(\u007B' + [...action.Arg].map((i) => {
                            return i.getDescription() + ''
                        }) + '\u007d)'
                    }]]
            };
        case 'RETRACT':
            return {
                ...state, Player: [...state.Player, ...[
                    {
                        name: 'OPP',
                        description: 'RETRACT(\u007B' + [...action.Arg].map((i) => {
                            return i.getDescription() + ''
                        }) + '\u007d)'
                    }]]
            };
        case 'RESET':
            return {
                ...state, Player: [], FocalArgument: null, FocalLabel: null
            };
        case 'WI':
            return {
                ...state, Player: [...state.Player, ...[
                    {
                        name: action.name,
                        description: 'WI(\u007B' + [...action.Arg].map((i) => {
                            return i.getDescription() + ''
                        }) + '\u007d)'
                    }]]
            };
        case 'CL':
            return {
                ...state, Player: [...state.Player, ...[
                    {
                        name: action.name,
                        description: 'CL(' + action.label + '\u007B' + [...action.Arg].map((i) => {
                            return i.getDescription() + ''
                        }) + '\u007d)'
                    }]]
            };
        case 'FOCAL':
            return {
                ...state, FocalArgument: action.Arg, FocalLabel: action.label
            };
        case 'IN':
            return {
                ...state, Player: [...state.Player, ...[
                    {
                        name: 'PRO',
                        description: 'IN(' + '\u007B' + [...action.Arg].map((i) => {
                            return i.getDescription() + ''
                        }) + '\u007d)'
                    }]]
            };
        case 'OUT':
            return {
                ...state, Player: [...state.Player, ...[
                    {
                        name: 'OPP',
                        description: 'OUT(' + '\u007B' + [...action.Arg].map((i) => {
                            return i.getDescription() + ''
                        }) + '\u007d)'
                    }]]
            };
        case 'QUESTION':
            return {
                ...state, Player: [...state.Player, ...[
                    {
                        name: 'OPP',
                        description: 'QUESTION(' + '\u007B' + [...action.Arg].map((i) => {
                            return i.getDescription() + ''
                        }) + '\u007d)'
                    }]]
            };
        default:
            return state
    }
};

const Dialogue: React.FunctionComponent = () => {
    const [File, setFile] = useState({name: '', content: ''});
    const [setaf, setSETAF] = useState(new SETAF);
    const [state, dispatch] = useReducer<(state: any, action: any) => any>(reducer, {Player: []});
    const [key, setKey] = useState('SETGDG');

    const [isModalVisible, setIsModalVisible] = useState(true);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    return (
        <div style={{display: 'flex', flexDirection: 'row', flex: 1}}>
            <Buttons dispatch={dispatch} File={File} setKey={setKey} setFile={setFile} setaf={setaf}
                     setSETAF={setSETAF}/>
            <Cards SETAF={setaf}/>
            <ChatList tabKey={key} setKey={setKey} state={state} dispatch={dispatch} SETAF={setaf}/>
            <GraphTable SETAF={setaf}/>
            <Modal title="Guide" visible={isModalVisible}
                   footer={[<Button key={'submit'} type='primary' onClick={handleOk}>OK</Button>]}>
                <p>Please upload one .SETAF file first using 'Upload' button.</p>
            </Modal>
        </div>
    )
};
export default Dialogue
