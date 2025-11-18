# 👾 Monster Navigation System - Hướng dẫn

## 🎮 Cách hoạt động

Website này sử dụng hệ thống navigation độc đáo: **Kéo menu items vào miệng con quái vật để chuyển trang!**

### Flow chính

1. **Xuất hiện** 👾
   - Con quái vật xuất hiện ở giữa màn hình
   - Mắt lườm lườm (chân mày cau)
   - Speech bubble: "Đói quá... 😢" (hiện mỗi 5s, giữ 2s)

2. **Kéo menu item** 🖐️
   - Click giữ vào bất kỳ menu nào (Home, Event, About, Memories)
   - Icon bánh 🎂 xuất hiện bên cạnh menu
   - Glow effect xung quanh
   - Quái vật: mắt mở to, chân mày nâng lên

3. **Đưa gần quái vật** 😮
   - < 300px: Bắt đầu há mồm
   - < 150px: Speech "Gần rồi! 🤤"
   - < 80px: Há mồm max, sẵn sàng ăn

4. **Thả vào miệng** 🍴
   - Thả chuột khi ở gần (< 80px)
   - Animation: pulse + particles
   - Confetti bắn ra
   - Đợi 0.5s...

5. **Chuyển trang** ✨
   - Navigate đến trang tương ứng
   - Smooth transition

### Fallback: Click bình thường

Nếu không kéo (chỉ click):
- Menu item vẫn navigate bình thường
- Không cần feed monster
- UX truyền thống

## 📁 Components Architecture

```
src/
├── components/
│   ├── MonsterGlobal.tsx          # Con quái vật global
│   ├── DraggableNavItem.tsx       # Wrapper cho nav items
│   ├── Header.tsx                 # Header với draggable items
│   ├── ButtonAnimation/
│   │   ├── Eye.tsx                # Mắt với pupil tracking
│   │   ├── Eyebrow.tsx            # Chân mày (lườm/excited)
│   │   ├── Mouth.tsx              # Miệng progressive opening
│   │   ├── SpeechBubble.tsx       # Hộp thoại
│   │   └── Cake.tsx               # Icon bánh (birthday login)
│   └── Calendar/                  # Calendar components
├── hooks/
│   ├── useMonsterFeed.ts          # Hook quản lý feeding logic
│   └── useTutorial.ts             # Tutorial hint logic
└── App.tsx                        # Orchestrate tất cả
```

## 🔄 Data Flow

```
User kéo nav item
  ↓
DraggableNavItem.onDragStart
  ↓
Header.onNavItemDragStart
  ↓
App.handleNavItemDragStart
  ↓
useMonsterFeed.startDragging
  ↓
Track position realtime
  ↓
Calculate distance to monster mouth
  ↓
Monster há mồm dần (openLevel 0→1)
  ↓
User thả chuột
  ↓
DraggableNavItem.onDragEnd
  ↓
Check distance < 80px?
  ↓ YES
triggerFeeding
  ↓
onFeedingComplete callback
  ↓
navigate(route)
```

## ✅ Happy Cases đã handle

### 1. **User kéo item vào miệng** ✅
```
Drag → Gần → Thả → Ăn → Navigate
```

### 2. **User kéo nhưng thả xa** ✅
```
Drag → Kéo xa → Thả → Item về vị trí cũ → Không navigate
```

### 3. **User chỉ click (không kéo)** ✅
```
Click → Navigate ngay (fallback UX)
```

### 4. **User kéo item nhưng kéo monster đi** ✅
```
Độc lập: monster cũng draggable
Distance vẫn calculate chính xác
```

### 5. **Calendar mở** ✅
```
Monster ẩn đi (isMonsterVisible = false)
Nav items vẫn clickable bình thường
```

### 6. **Multiple items kéo liên tiếp** ✅
```
currentDraggingItem track item đang kéo
Chỉ feed 1 item tại 1 thời điểm
Reset distance sau mỗi lần
```

### 7. **Tutorial lần đầu** ✅
```
showTutorial = true (check localStorage)
Hiện 15s hoặc đến khi user drag lần đầu
Lưu vào localStorage → không hiện lần sau
```

### 8. **Authenticated vs Non-authenticated** ✅
```
Chưa login: Home, Event, About
Đã login: Home, Event, About, Memories
Sign out button: không draggable (click thường)
```

## ⚡ Performance Optimizations

### 1. **RAF (RequestAnimationFrame)**
- Eye tracking: 60fps
- Position updates: throttled 100ms
- Smooth, không jank

### 2. **Framer Motion**
- GPU-accelerated transforms
- Optimized drag calculations
- Hardware acceleration

### 3. **Lazy calculations**
- Chỉ calculate distance khi có item đang drag
- Reset về 1000 khi không drag
- Không waste CPU

### 4. **Event listeners**
- Passive: true
- Cleanup properly
- No memory leaks

### 5. **Bundle size**
- Components modular, tree-shakeable
- Framer Motion đã có sẵn
- No extra dependencies

## 🎯 User Journey

### First-time user:
```
1. Load page → Tutorial hint hiện
2. "Kéo các mục menu vào miệng quái vật để chuyển trang!"
3. User thử kéo → Tutorial ẩn, lưu localStorage
4. Monster á mồm → Thả → Navigate
5. Hiểu cách dùng
```

### Returning user:
```
1. Load page → Không có tutorial (đã lưu localStorage)
2. Thoải mái kéo menu items
3. Hoặc click bình thường cũng được
```

## 🐛 Edge Cases

### What if user drags offscreen?
```
dragConstraints: giới hạn trong viewport
Item reset về vị trí cũ
```

### What if monster và item overlap ngay từ đầu?
```
Initial positions carefully placed
Monster: top 30%, center
Items: top 0, various x positions
```

### What if screen resize?
```
Monster position updates (useEffect với resize listener)
Items responsive với Tailwind
```

### What if mobile?
```
Touch events supported (Framer Motion tự handle)
Fallback: click navigation vẫn hoạt động
```

## 📊 Performance Metrics

**Expected:**
- FPS: 55-60fps (smooth)
- RAM: +10-15MB (acceptable)
- Bundle: +5KB (framer-motion already included)
- CPU: < 5% on modern devices

**Tested on:**
- Chrome/Firefox/Safari: ✅ Smooth
- Mobile (touch): ✅ Works
- Low-end devices: ✅ Acceptable (với fallback)

## 🎨 Visual States

| State | Eyes | Eyebrows | Mouth | Speech |
|-------|------|----------|-------|--------|
| Idle | 👀 Normal | 😒 Lườm (cau) | 😐 Đóng | "Đói quá..." |
| Item dragging | 👀 Alert | 😃 Nâng | 😐 Đóng | - |
| Item near | 👀 Wide | 😃 Cao | 😮 Há dần | "Gần rồi!" |
| Eating | 👀 Pulse | 😋 Cao | 😁 Mở | "Ngon!" |

## 🚀 Future Enhancements

Có thể thêm:
- Sound effects khi ăn
- More speech variations
- Easter eggs (special messages for specific items)
- Monster emotions (happy/sad based on usage)
- Multiple monster skins

---

**Made with 💕 và rất nhiều sáng tạo! 🎂👾**

