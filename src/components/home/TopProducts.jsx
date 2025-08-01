import React, { useState, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
import { Card, Row, Col, Input, Button, Tag, List, Typography, Badge, Empty, Spin } from 'antd';
import { ShoppingCartOutlined, StarOutlined, SearchOutlined } from '@ant-design/icons';
import Lottie from 'lottie-react';
import coffeeAnimation from '../../assets/lottie/coffee-pour.json';
import breadAnimation from '../../assets/lottie/bread-rising.json';
import ContactCTA from '../common/ContactCTA';

const { Title, Paragraph, Text } = Typography;

// Simulate API fetch
const fetchProducts = async () => {
  const { products } = await import('../../data/products.js');
  await new Promise(res => setTimeout(res, 300));
  return products;
};

const dietaryColors = {
  vegan: 'green',
  vegetarian: 'lime',
  'gluten-free': 'gold',
};

const TopProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState('Cakes');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError(null);
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setError(err);
        setIsLoading(false);
      });
  }, []);

  // Get unique categories
  const categories = ['All', ...new Set(products.map(product => product.category))];

  // Filter products based on category and search
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return (
    <>
      <section style={{ padding: '64px 0', background: 'var(--section-bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <Row gutter={[48, 32]} align="middle" style={{ marginBottom: 48 }}>
            <Col xs={24} md={16}>
              <Title level={1} style={{ marginBottom: 8 }}>Bela's Artisanal Menu</Title>
              <Paragraph style={{ marginBottom: 32, fontSize: 18 }}>
                Discover our handcrafted, eco-friendly treats made with love and sustainability in mind
              </Paragraph>
            </Col>
            <Col xs={24} md={8} style={{ textAlign: 'center' }}>
              <Lottie
                animationData={coffeeAnimation}
                loop={true}
                autoplay={true}
                style={{ height: 200 }}
              />
            </Col>
          </Row>

          {/* Loading/Error States */}
          {isLoading && (
            <div style={{ textAlign: 'center', padding: 48 }}><Spin size="large" /></div>
          )}
          {isError && (
            <div style={{ textAlign: 'center', padding: 48 }}><Text type="danger">Error: {error?.message || 'Failed to load products.'}</Text></div>
          )}

          {/* Search and Filter Section */}
          {!isLoading && !isError && (
            <div style={{ marginBottom: 32 }}>
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24} md={12}>
                  <Input
                    prefix={<SearchOutlined />}
                    placeholder="Search for your favorite treats..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    size="large"
                    allowClear
                  />
                </Col>
                <Col xs={24} md={12} style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 8 }}>
                    {categories.map(category => (
                      <Button
                        key={category}
                        type={selectedCategory === category ? 'primary' : 'default'}
                        style={{ marginBottom: 8 }}
                        onClick={() => setSelectedCategory(category)}
                        icon={
                          category === 'Cakes' && (
                            <Lottie
                              animationData={breadAnimation}
                              loop={true}
                              autoplay={selectedCategory === category}
                              style={{ width: 20, height: 20 }}
                            />
                          )
                        }
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </Col>
              </Row>
            </div>
          )}

          {/* Cart Summary */}
          {cartItems.length > 0 && (
            <Card styles={{ body: { marginBottom: 32, background: 'var(--card-bg)', border: '1px solid var(--card-border)' } }}>
              <Row align="middle" justify="space-between">
                <Col>
                  <Badge count={cartItems.reduce((total, item) => total + item.quantity, 0)}>
                    <ShoppingCartOutlined style={{ fontSize: 24, color: '#fa8c16' }} />
                  </Badge>
                  <Text style={{ marginLeft: 16 }}>
                    {cartItems.reduce((total, item) => total + item.quantity, 0)} items
                  </Text>
                  <Text strong style={{ marginLeft: 16, color: '#fa8c16' }}>
                    ${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                  </Text>
                </Col>
                <Col>
                  <Button type="primary" size="large">Checkout</Button>
                </Col>
              </Row>
            </Card>
          )}

          {/* Products Grid */}
          <Row gutter={[24, 32]}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <Col xs={24} sm={12} md={8} key={product.id}>
                  <Card
                    hoverable
                    cover={<img alt={product.name} src={product.image} style={{ height: 200, objectFit: 'cover' }} />}
                    actions={[
                      <Button
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        onClick={() => addToCart(product)}
                        size="middle"
                        key="add"
                      >
                        Add to Cart
                      </Button>,
                      <Button
                        icon={<StarOutlined />}
                        size="middle"
                        key="fav"
                      >
                        Quick View
                      </Button>
                    ]}
                    style={{ borderRadius: 16, boxShadow: '0 2px 12px #0001', marginBottom: 16 }}
                  >
                    <Title level={4} style={{ marginBottom: 8 }}>{product.name}</Title>
                    <Paragraph ellipsis={{ rows: 2 }}>{product.description}</Paragraph>
                    <div style={{ marginBottom: 8 }}>
                      <Tag color="orange">{product.category}</Tag>
                      {product.dietary.map(diet => (
                        <Tag color={dietaryColors[diet] || 'blue'} key={diet}>{diet}</Tag>
                      ))}
                    </div>
                    <Text strong style={{ fontSize: 20, color: '#fa8c16' }}>${product.price}</Text>
                  </Card>
                </Col>
              ))
            ) : (
              <Col span={24}>
                <Empty description="No treats found. Try adjusting your search or filter criteria." />
              </Col>
            )}
          </Row>
        </div>
      </section>
      <ContactCTA />
    </>
  );
};

export default TopProducts;