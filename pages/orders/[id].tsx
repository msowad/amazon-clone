import Breadcrumb from '@/src/components/Breadcrumb';
import { Layout } from '@/src/components/Layout';
import React from 'react';

interface Props {
  //
}

const Order: React.FC<Props> = () => {
  return (
    <Layout title='Order Detail'>
      <Breadcrumb
        links={[
          { href: '/', label: 'Home' },
          { href: '/orders', label: 'orders' },
        ]}
        current='order'
      />
    </Layout>
  );
};

export default Order;
