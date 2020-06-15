import React from 'react'
import { Menu } from 'antd';
import { Link } from 'react-router-dom'


function Navigation (){
    return(
        <div>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1"><Link to='/'>Accueil</Link><FileTextOutlined /></Menu.Item>
                <Menu.Item key="2"><Link to='/Post'>Articles</Link></Menu.Item>
            </Menu>
        </div>
    );
        
}

export default Navigation;