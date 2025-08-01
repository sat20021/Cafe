import React from 'react';
import { Card, Typography, Row, Col, Statistic, Button } from 'antd';
import { FieldTimeOutlined, GiftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import ContactCTA from '../common/ContactCTA';

const { Title, Paragraph, Text } = Typography;

const countdown = [
  { label: 'Days', value: 3 },
  { label: 'Hours', value: 12 },
  { label: 'Minutes', value: 45 },
  { label: 'Seconds', value: 10 },
];

const BigDeal = () => {
  return (
    <>
      <section style={{ background: 'linear-gradient(90deg, #52c41a 0%, #237804 100%)', padding: '64px 0' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
          <Card variant="borderless" styles={{ root: { background: 'rgba(255,255,255,0.08)', borderRadius: 24, boxShadow: '0 4px 24px #0002' } }}>
            <Title level={1} style={{ color: '#fff', textAlign: 'center', marginBottom: 32 }}>This Week's Green Deal</Title>
            <Row gutter={24} justify="center" style={{ marginBottom: 32 }}>
              {countdown.map((item, idx) => (
                <Col xs={6} sm={6} md={6} key={item.label} style={{ textAlign: 'center' }}>
                  <Statistic
                    value={item.value}
                    title={<Text style={{ color: '#fff', opacity: 0.9 }}>{item.label}</Text>}
                    valueStyle={{ color: '#fff', fontWeight: 700, fontSize: 32 }}
                    prefix={<FieldTimeOutlined style={{ color: '#fff', marginRight: 4 }} />}
                  />
                </Col>
              ))}
            </Row>
            <div style={{ textAlign: 'center' }}>
              <Title level={2} style={{ color: '#ffe58f', marginBottom: 16 }}>
                <GiftOutlined style={{ color: '#faad14', marginRight: 8 }} />Buy 1, Plant 1!
              </Title>
              <Paragraph style={{ color: '#fff', fontSize: 18, marginBottom: 32, maxWidth: 600, margin: '0 auto' }}>
                For every cake you buy this week, we'll plant a tree in your name. Join us in baking a better tomorrow!
              </Paragraph>
              <Button type="primary" size="large" icon={<ArrowRightOutlined />} style={{ background: '#faad14', borderColor: '#faad14', color: '#fff', fontWeight: 600, boxShadow: '0 2px 8px #faad1440' }}>
                Shop Green Deal
              </Button>
            </div>
          </Card>
        </div>
      </section>
      <ContactCTA />
    </>
  );
};

export default BigDeal;