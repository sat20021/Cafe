import React from 'react';
import { Card, Typography, Row, Col, Button } from 'antd';
import { CalendarOutlined, CommentOutlined, UserOutlined, ReadOutlined } from '@ant-design/icons';
import ContactCTA from '../common/ContactCTA';

const { Title, Paragraph, Text } = Typography;

const news = [
  {
    image: '/images/coffee.jpg',
    date: 'June 05, 2024',
    author: 'Bela Café',
    comments: 8,
    title: 'Bela Café Launches Zero-Waste Baking Classes',
    desc: 'Join our new workshops and learn how to bake delicious cakes while reducing your environmental footprint. Sign up for our next class!',
  },
  {
    image: '/images/donut.jpg',
    date: 'May 22, 2024',
    author: 'Bela Team',
    comments: 5,
    title: 'Celebrating World Environment Day with Free Plantable Seed Cards',
    desc: 'Every purchase this week comes with a plantable seed card. Grow your own herbs and flowers at home—on us!',
  },
];

const LatestNews = () => {
  return (
    <>
      <section style={{ padding: '64px 0', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <Title level={1} style={{ textAlign: 'center', marginBottom: 48 }}>Bela's Green News & Events</Title>
          <Row gutter={[32, 32]} style={{ marginBottom: 48 }}>
            {news.map((item, idx) => (
              <Col xs={24} lg={12} key={idx}>
                <Card
                  hoverable
                  cover={<img src={item.image} alt={item.title} style={{ height: 200, objectFit: 'cover' }} />}
                  style={{ borderRadius: 16, boxShadow: '0 2px 12px #0001', marginBottom: 16 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                    <Text type="secondary"><CalendarOutlined /> {item.date}</Text>
                    <div style={{ display: 'flex', gap: 16 }}>
                      <Text type="secondary"><UserOutlined /> {item.author}</Text>
                      <Text type="warning"><CommentOutlined /> {item.comments} Comments</Text>
                    </div>
                  </div>
                  <Title level={3} style={{ marginBottom: 12 }}>{item.title}</Title>
                  <Paragraph style={{ marginBottom: 0 }}>{item.desc}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" size="large" icon={<ReadOutlined />}>Read All Green News</Button>
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
};

export default LatestNews;