import React, {useState} from "react";
import {Card, List} from "antd";
import SETAF from "../../../structure/model_SETAF/SETAF";
import {Argument} from "../../../structure/model_SETAF/Argument";
import {Relation} from "../../../structure/model_SETAF/Relation";

interface IProps {
    SETAF: SETAF
}

const Cards: React.FunctionComponent<IProps> = (props) => {
    const {SETAF} = props;
    const [key, setKey] = useState('Argument');
    const tabListNoTitle = [
        {
            key: 'Attack',
            tab: 'Attacking Relations',
        },
    ];
    let arrAtt: Relation[] = [];
    SETAF.getListOfRelations().forEach((i: Relation) => {
        arrAtt.push(i)
    });

    const contentListNoTitle = {

        Attack:
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <List
                    style={{flex: 1}}
                    bordered
                    header={'Relation'}
                    dataSource={arrAtt}
                    renderItem={(item, index) => (
                        <List.Item>
                            r{index + 1}
                        </List.Item>)}
                />
                <List
                    style={{flex: 1}}
                    bordered
                    header={'Member'}
                    dataSource={arrAtt}
                    renderItem={(item) => (
                        <List.Item>
                            {Array.from(item.getOrigin()).map((i: Argument) => {
                                return i.getDescription() + ' '
                            })}
                        </List.Item>
                    )}
                />
                <List
                    style={{flex: 1}}
                    bordered
                    header={'Target'}
                    dataSource={arrAtt}
                    renderItem={(item) => (
                        <List.Item>
                            {item.getTarget().values().next().value.getDescription()}
                        </List.Item>)}
                />
            </div>
    };

    const onTabChange = (key: any) => {
        setKey(key)
    };


    return (
        <Card
            style={{flex: 2}}
            tabList={tabListNoTitle}
            // activeTabKey={this.state.noTitleKey}
            // tabBarExtraContent={<a href="#">More</a>}
            onTabChange={key => {
                onTabChange(key);
            }}
        >
            {contentListNoTitle.Attack}
        </Card>
    )
}
export default Cards
