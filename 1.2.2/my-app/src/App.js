import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddOrEdit = () => {
    let value = inputValue.trim();
    if (value === '') return;

    if (value.length > 100) {
      value = value.slice(0, 100);
    }

    if (editingIndex !== null) {
      const updatedList = [...todoList];
      updatedList[editingIndex] = value;
      setTodoList(updatedList);
      setEditingIndex(null);
    } else {
      setTodoList([...todoList, value]);
    }

    setInputValue('');
  };

  const handleEdit = (index) => {
    setInputValue(todoList[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedList = todoList.filter((_, i) => i !== index);
    setTodoList(updatedList);
    if (editingIndex === index) {
      setInputValue('');
      setEditingIndex(null);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📋 Danh sách công việc</h2>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nhập công việc mới..."
          value={inputValue}
          maxLength={100}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAddOrEdit();
          }}
        />
        <button
          className="btn btn-primary me-2"
          onClick={handleAddOrEdit}
        >
          {editingIndex !== null ? 'Cập nhật' : 'Thêm'}
        </button>
      </div>

      {todoList.length === 0 ? (
        <p>📭 Không có công việc nào.</p>
      ) : (
        <ul
          className="list-group"
          style={{ maxHeight: '392px', overflowY: 'auto' }}
        >
          {todoList.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{item}</span>
              <div>
                <button
                  className="btn btn-sm btn-outline-secondary me-2"
                  onClick={() => handleEdit(index)}
                >
                  ✏️ Sửa
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(index)}
                >
                  🗑️ Xóa
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
