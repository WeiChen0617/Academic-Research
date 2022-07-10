import React, {useState} from "react";
import {Button, Drawer} from "antd";
import Loader from "./Loader";
import Parser from '../../../structure/Parser'
import SETAF from "../../../structure/model_SETAF/SETAF";
import CardArgs from "./CardArgs";

interface IProps {
    File: { name: string, content: string }
    setFile: Function,
    setSETAF: Function,
    setaf: SETAF,
    dispatch: Function,
    setKey: Function,
}

const Buttons: React.FunctionComponent<IProps> = props => {
    const {File, setFile, setSETAF, setaf, dispatch, setKey} = props;
    const [visible, setVisible] = useState(false);


    const showDrawer = () => {
        setSETAF(new SETAF);
        setVisible(true);
        dispatch({type: 'RESET'});
        setKey('SETGDG')
    };

    const Parse = () => {
        return Parser(File.content);
    }
    const onClose = () => {
        setVisible(false);
        setSETAF(Parse());
        setFile({name: '', content: ''})
    };
    return (
        <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
            <Button type="primary" onClick={showDrawer}>Upload</Button>
            <Drawer
                title="File Loader"
                placement="top"
                height={'400px'}
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <div style={{height: '90%'}}>
                    <Loader File={File} setFile={setFile} hideDrawer={onClose}/>
                </div>
            </Drawer>
            <CardArgs SETAF={setaf}/>

        </div>
    )
};
export default Buttons
