import React, { useState } from 'react'; // 引入 React 和 useState

function ProductInput({ onAddProduct }) {
  const [productName, setProductName] = useState(''); // 管理商品名稱輸入框的值
  const [productPrice, setProductPrice] = useState(''); // 管理商品價格輸入框的值

  // 處理新增按鈕點擊事件
  const handleAddClick = () => {
    if (productName && productPrice) { // 檢查輸入框是否為空
      onAddProduct(productName, productPrice); // 呼叫父組件的處理函數
      setProductName(''); // 清空商品名稱輸入框
      setProductPrice(''); // 清空商品價格輸入框
    }
  };

  return (
    <div>
      {/* 商品名稱輸入框 */}
      <input
        type="text"
        placeholder="商品名稱"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      {/* 商品價格輸入框 */}
      <input
        type="number"
        placeholder="商品價格"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
      />
      {/* 新增商品按鈕 */}
      <button onClick={handleAddClick}>新增商品</button>
    </div>
  );
}

export default ProductInput;