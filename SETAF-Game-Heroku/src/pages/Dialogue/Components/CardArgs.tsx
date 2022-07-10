import React, {useState} from "react";
import {Card, List} from "antd";
import SETAF from "../../../structure/model_SETAF/SETAF";
import {Argument} from "../../../structure/model_SETAF/Argument";

interface IProps {
    SETAF: SETAF
}

const CardArgs: React.FunctionComponent<IProps> = (props) => {
    const {SETAF} = props;
    const [key, setKey] = useState('Arguments');
    const tabListNoTitle = [
        {
            key: 'Arguments',
            tab: 'Arguments',
        },
    ];
    let arrArg: Argument[] = [];
    SETAF.getListOfArguments().forEach((i) => {
        i.forEach((j) => arrArg.push(j))
    });

    const contentListNoTitle = {
        Argument:
            <List
                bordered
                dataSource={arrArg}
                renderItem={(item) => (
                    <List.Item>{item.getDescription()}</List.Item>)}
            />,
    };

    const onTabChange = (key: any) => {
        setKey(key)
    };


    return (
        <Card
            style={{flex: 1}}
            tabList={tabListNoTitle}
            activeTabKey={key}
            // tabBarExtraContent={<a href="#">More</a>}
            onTabChange={key => {
                onTabChange(key);
            }}
        >
            {contentListNoTitle.Argument}
        </Card>
    )
}
export default CardArgs
