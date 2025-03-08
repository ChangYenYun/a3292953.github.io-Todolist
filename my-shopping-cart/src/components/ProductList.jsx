import React, { useState } from 'react'; // 引入 React 和 useState

function ProductList({ products, onDeleteProduct, onEditProduct }) {
  // "" 新增狀態來管理編輯模式 ""
  const [editingId, setEditingId] = useState(null); // 當前正在編輯的商品 ID
  const [editName, setEditName] = useState(''); // 編輯模式下的商品名稱
  const [editPrice, setEditPrice] = useState(''); // 編輯模式下的商品價格

  // "" 進入編輯模式的函數 ""
  const handleEditClick = (product) => {
    setEditingId(product.id); // 設置正在編輯的商品 ID
    setEditName(product.name); // 設置編輯模式下的商品名稱
    setEditPrice(product.price.toString()); // 設置編輯模式下的商品價格
  };

  // "" 保存編輯的函數 ""
  const handleSaveClick = (id) => {
    if (editName && editPrice) { // 檢查輸入框是否為空
      onEditProduct(id, editName, parseFloat(editPrice)); // 呼叫父組件的處理函數
      setEditingId(null); // 退出編輯模式
    }
  };

  return (
    <div>
      <h2>購物車內容</h2>
      {products.length === 0 ? ( // 如果購物車是空的，顯示「無商品」
        <p>無商品</p>
      ) : (
        <ul>
          {products.map((product) => ( // 遍歷商品列表，顯示每個商品
            <li key={product.id}>
              {editingId === product.id ? ( // "" 如果當前商品正在編輯 ""
                <div>
                  {/* "" 編輯模式下的輸入框 "" */}
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <input
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                  />
                  {/* "" 保存按鈕 "" */}
                  <button onClick={() => handleSaveClick(product.id)}>保存</button>
                </div>
              ) : (
                <div>
                  {/* "" 點擊商品名稱進入編輯模式 "" */}
                  <span onClick={() => handleEditClick(product)}>{product.name}</span> - ${product.price.toFixed(2)}
                  {/* 刪除按鈕 */}
                  <button onClick={() => onDeleteProduct(product.id)}>刪除</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductList;