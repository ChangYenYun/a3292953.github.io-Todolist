import React, { useState } from 'react'; // 引入 React 和 useState
import ProductInput from './components/ProductInput'; // 引入商品輸入框組件
import ProductList from './components/ProductList'; // 引入購物車列表組件
import './App.css'; // 引入樣式文件

function App() {
  const [products, setProducts] = useState([]); // 使用 useState 管理商品列表

  // 處理新增商品的函數
  const handleAddProduct = (name, price) => {
    const newProduct = {
      id: Date.now(), // 使用時間戳作為唯一 ID
      name: name,
      price: parseFloat(price), // 將價格轉為浮點數
    };
    setProducts([...products, newProduct]); // 將新商品加入列表
  };

  // 處理刪除商品的函數
  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id)); // 過濾掉指定 ID 的商品
  };

  // "" 處理編輯商品的函數 ""
  const handleEditProduct = (id, newName, newPrice) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, name: newName, price: newPrice } : product
      )
    );
  };

  // 計算總金額
  const totalAmount = products.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="App">
      <h1>簡易購物車</h1>
      {/* 商品輸入框與新增按鈕組件 */}
      <ProductInput onAddProduct={handleAddProduct} />
      {/* 購物車列表組件 */}
      <ProductList
        products={products}
        onDeleteProduct={handleDeleteProduct}
        onEditProduct={handleEditProduct} // "" 傳遞編輯函數 ""
      />
      {/* 顯示總金額 */}
      <h2>總金額: ${totalAmount.toFixed(2)}</h2>
    </div>
  );
}

export default App;