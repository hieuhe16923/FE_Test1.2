import React, { useState } from 'react';
import ValidatedInput from './component/ValidatedInput';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [formData, setFormData] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateName = (text) => {
    const regex = /^[A-Za-zÀ-ỹà-ỹ\s]{3,30}$/u;
    return regex.test(text.trim());
  };

  const validateUsername = (text) => {
    const trimmed = text.trim();
    const regex = /^[^\s]{3,30}$/u;
    return regex.test(trimmed);
  };


  const validatePassword = (text) => {
    return text.length >= 6 && text.length <= 10;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dữ liệu gửi đi:', formData);
    alert('Gửi thành công!');
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Form Đăng ký</h2>
      <form onSubmit={handleSubmit}>
        <ValidatedInput
          label="Họ và tên"
          name="fullName"
          validationFn={validateName}
          errorMessage="Tên không hợp lệ. Chỉ gồm chữ, từ 3-30 ký tự."
          onChange={handleChange}
        />
        <ValidatedInput
          label="Tên người dùng"
          name="username"
          validationFn={validateUsername}
          errorMessage="Tên người dùng chỉ từ 3-30 ký tự, không khoảng trắng."
          onChange={handleChange}
        />
        <ValidatedInput
          label="Mật khẩu"
          name="password"
          type="password"
          validationFn={validatePassword}
          errorMessage="Mật khẩu phải từ 6 đến 10 ký tự."
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary mt-3">Đăng ký</button>
      </form>
    </div>
  );
}

export default App;
