import React from 'react';
import { Card, Typography, List, Divider, Row, Col } from 'antd';
import Lottie from 'lottie-react';
import cafeAnimation from '../assets/lottie/cafe-front.json';
import ContactCTA from '../components/common/ContactCTA';

const { Title, Paragraph, Text } = Typography;

const missionItems = [
  '🌱 Use only organic, locally sourced ingredients',
  '♻️ Bake with zero-waste, green energy practices',
  '🍰 Serve every cake in biodegradable, plastic-free packaging',
  '🚴 Support our community with low-emission local deliveries',
  '🌍 Inspire others to make mindful, sustainable choices',
];

const sustainabilityItems = [
  '🌾 Composting all kitchen waste',
  '🌳 Planting a tree for every cake sold during special events',
  '🧁 Offering discounts for customers who bring their own containers or cups',
  '🌞 Powered by renewable energy',
];

export default function About() {
  return (
    <>
      <section style={{ padding: '3rem 0', background: 'var(--light)' }}>
        <Card
          style={{ maxWidth: 1000, margin: '0 auto', borderRadius: 12 }}
          styles={{ body: { padding: '2rem' } }}
          bordered={false}
          hoverable
        >
          <Row gutter={[48, 32]} align="middle" style={{ marginBottom: 32 }}>
            <Col xs={24} md={16}>
              <Title level={1} style={{ color: 'var(--primary)', marginBottom: 16 }}>About Bela</Title>
              <Paragraph style={{ fontSize: '1.1em', marginBottom: 24 }}>
                <Text strong>Bela – The Eco-Friendly Cake Café</Text> was founded with a simple mission: to bring joy through delicious cakes while caring for our planet. Our journey began with a passion for baking and a commitment to sustainability.
              </Paragraph>
            </Col>
            <Col xs={24} md={8} style={{ textAlign: 'center' }}>
              <Lottie
                animationData={cafeAnimation}
                loop={true}
                autoplay={true}
                style={{ height: 250 }}
              />
            </Col>
          </Row>
          <Divider orientation="left">Our Story</Divider>
          <Paragraph style={{ marginBottom: 20 }}>
            Inspired by nature and the love of good food, Bela started as a small kitchen project and grew into a cozy café where every treat is made with heart and purpose. We believe every celebration can be eco-friendly, and every cake can make a difference.
          </Paragraph>
          <Divider orientation="left">Our Mission & Eco-Vision</Divider>
          <List
            dataSource={missionItems}
            renderItem={item => <List.Item style={{ paddingLeft: 0 }}>{item}</List.Item>}
            style={{ marginBottom: 20 }}
          />
          <Divider orientation="left">Meet the Team</Divider>
          <Paragraph style={{ marginBottom: 20 }}>
            Our team is a family of passionate bakers, baristas, and eco-advocates. We're led by founder <Text strong>Bela Sharma</Text>, whose vision for a greener, sweeter world inspires everything we do.
          </Paragraph>
          <Divider orientation="left">Sustainability in Action</Divider>
          <List
            dataSource={sustainabilityItems}
            renderItem={item => <List.Item style={{ paddingLeft: 0 }}>{item}</List.Item>}
          />
        </Card>
      </section>
      <ContactCTA />
    </>
  );
} 