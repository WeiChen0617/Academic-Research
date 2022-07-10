import React from 'react';
import 'antd/dist/antd.css';
import '../../../../index.css';
import {Button} from 'antd';

const NavButton: React.FC = (props) => {
    return <Button style={{margin: '5%'}} type="primary" {...props}/>
};

export default NavButton


