# 💕 Love App - Ứng dụng dành cho couple

Một ứng dụng web đẹp mắt được xây dựng bằng React + Vite, TailwindCSS, Redux Toolkit và React Router DOM, dành riêng cho các cặp đôi muốn lưu giữ kỷ niệm và chia sẻ thông điệp yêu thương.

## 🎨 Tính năng

### 🏠 Trang chủ (Home)
- Giới thiệu về ứng dụng
- Các tính năng nổi bật
- Thiết kế đẹp mắt với màu pastel

### 📖 Giới thiệu (About)
- Câu chuyện tình yêu của đôi bạn
- Thông tin cá nhân
- Liên kết mạng xã hội

### 🍔 Menu
- **Chưa đăng nhập**: Hiển thị mô tả các tính năng
- **Sau đăng nhập**: Truy cập đầy đủ các tính năng đặc biệt

### 🔐 Mở khóa (Login)
- Không dùng username/password
- Chọn đúng ngày kỷ niệm (ví dụ `01-01-2025`)
- Submit sẽ mở modal confirm trước khi vào bên trong

### 💌 Nhập mã nhận thông điệp
- Nhập mã bí mật để mở khóa thông điệp yêu thương
- 8 mã đặc biệt có sẵn:
  - `LOVE143` - I Love You
  - `FOREVER` - Mãi mãi bên nhau
  - `SUNSHINE` - Em là ánh nắng
  - `ANGEL` - Thiên thần của anh
  - `DREAM` - Giấc mơ đẹp nhất
  - `STAR` - Ngôi sao sáng nhất
  - `HEARTBEAT` - Tim anh đập vì em
  - `BABE` - Baby của anh

### 📸 Xem kỷ niệm
- 6 kỷ niệm đẹp với hình ảnh và mô tả
- Hiệu ứng hover và animation mượt mà
- Click để xem chi tiết

## 🛠️ Công nghệ sử dụng

- **React 19** - UI Framework
- **Vite** - Build tool
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Redux Toolkit** - State management
- **React Router DOM** - Routing

## 📦 Cài đặt

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

## 🎨 Màu sắc chủ đạo

- `pastel-pink`: #FFB6C1
- `pastel-purple`: #E6B0FF
- `pastel-blue`: #B0E0FF
- `pastel-peach`: #FFDAB9

## ✨ Animations

Ứng dụng sử dụng nhiều animation mềm mại:
- `fade-in` - Hiệu ứng mờ dần
- `slide-up` - Trượt lên từ dưới
- `scale-in` - Phóng to từ nhỏ
- `shake` - Rung lắc khi lỗi
- `glow` - Phát sáng

## 📁 Cấu trúc dự án

```
src/
├── components/
│   └── Header.tsx          # Header với navigation
├── features/
│   ├── authSlice.ts        # Redux slice cho authentication
│   ├── memorySlice.ts      # Redux slice cho memories và codes
│   └── uiSlice.ts          # Redux slice cho UI state
├── pages/
│   ├── Home.tsx            # Trang chủ
│   ├── About.tsx           # Giới thiệu
│   ├── Menu.tsx            # Menu chính
│   ├── Login.tsx           # Đăng nhập
│   ├── CodeInput.tsx       # Nhập mã
│   └── Memories.tsx        # Xem kỷ niệm
├── store/
│   └── store.ts            # Redux store configuration
├── App.tsx                 # Main app component
├── main.tsx                # Entry point
└── index.css               # Global styles + Tailwind
```

## 🔒 Cách mở khóa

1. Mở ứng dụng và khám phá trang Home, About
2. Click **Sign in** trên header để mở modal
3. Chọn đúng **ngày kỷ niệm** (ví dụ 01-01-2025) và xác nhận
4. Sau khi mở khóa, bạn có thể:
   - Nhập các mã bí mật để nhận thông điệp
   - Xem bộ sưu tập kỷ niệm đẹp

## 🎯 Tùy chỉnh

### Thêm mã mới
Mở file `src/features/memorySlice.ts` và thêm vào mảng `codeMessages`:

```typescript
{
  code: 'YOUR_CODE',
  message: 'Your message here',
  emoji: '💖',
}
```

### Thêm kỷ niệm mới
Mở file `src/features/memorySlice.ts` và thêm vào mảng `memories`:

```typescript
{
  id: 7,
  image: 'https://your-image-url.com',
  description: 'Mô tả kỷ niệm',
  date: '01/01/2024',
}
```

### Thay đổi thông tin đăng nhập
Mở file `src/features/authSlice.ts` và sửa điều kiện trong reducer `login`:

```typescript
if (username === 'your_username' && password === 'your_password') {
  // ...
}
```

## 🚀 Triển khai

Ứng dụng có thể được triển khai lên:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

## 📝 License

Made with 💕 Love App 2023

---

**Lưu ý:** Đây là ứng dụng demo với dữ liệu fix cứng. Để kết nối backend thực tế, bạn cần:
1. Tạo API endpoints
2. Thay thế các action trong Redux slices bằng async thunks
3. Kết nối với database để lưu trữ dữ liệu thực
