import React from 'react';
import 'antd/dist/antd.css';

function AdminDashboard(){
    return(
        <div>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={6}>
                    Accéder aux articles
                </Col>
            </Row>
        </div>
    );
}

export default AdminDashboard;
