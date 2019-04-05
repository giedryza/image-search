import React from 'react';

import './assets/scss/main.scss';
import Store from './context/store';
import Layout from './components/Layout';
import Search from './components/Search';

const App = () => (
  <Store>
    <Layout>
      <Search />
    </Layout>
  </Store>
);

export default App;
