import React from "react";
import { Col, Row } from 'antd';

import CalendarMy from "../Components/Calendar"

function General() {
  return (
    <div style={{ height: '100vh' }}>
      <Row style={{ height: '100%' }}>
        <Col span={24}><CalendarMy/></Col>
    
      </Row>
    </div>
  );
}

export default General;
