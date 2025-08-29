# 组件库模块

[根目录](../../CLAUDE.md) > [src](../) > **components**

## 变更记录 (Changelog)

### 2025-08-29 10:31:16 - 模块文档创建
- 识别瀑布流布局和商品卡片组件
- 分析UI基础组件库结构
- 记录组件设计模式和使用方式

---

## 模块职责

组件库模块提供应用的所有UI组件，包括业务组件（瀑布流布局、商品卡片）和基础UI组件（按钮、徽章、卡片等）。基于shadcn/ui设计系统，确保组件的一致性和可复用性。

## 入口与启动

### 主要组件入口
- **`WaterfallLayout.tsx`**: 瀑布流布局容器组件
- **`ProductCard.tsx`**: 商品展示卡片组件
- **`ProductCardSkeleton.tsx`**: 商品卡片骨架屏组件

### 基础UI组件 (`ui/` 目录)
- `badge.tsx` - 徽章组件
- `button.tsx` - 按钮组件
- `card.tsx` - 卡片容器组件
- `skeleton.tsx` - 骨架屏组件
- `spinner.tsx` - 加载动画组件

## 对外接口

### 业务组件接口

#### WaterfallLayout
```typescript
interface WaterfallLayoutProps {
  products: Product[];           // 商品数据数组
  showSkeleton?: boolean;        // 是否显示骨架屏
  skeletonCount?: number;        // 骨架屏数量 (默认12)
}
```

#### ProductCard
```typescript
interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  imageHeight: number;
  imageWidth: number;
  detail?: BallPythonDetail;      // 球蟒详细信息
  store?: Store;                  // 店铺信息
  shippingPrice?: number | null;  // 运费
  category?: string;              // 分类信息
}
```

### UI组件接口 (基于shadcn/ui)
```typescript
// Button组件
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

// Badge组件
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}
```

## 关键依赖与配置

### 核心依赖
- **React 19.1.0**: 组件框架
- **Next.js Image**: 图片优化组件
- **@radix-ui/react-slot**: 组件组合工具
- **class-variance-authority**: 样式变体管理
- **clsx + tailwind-merge**: 样式类名合并

### 设计系统配置
```json
{
  "style": "new-york",      // shadcn/ui样式风格
  "rsc": true,              // React Server Components支持
  "tsx": true,              // TypeScript支持
  "tailwind": {
    "baseColor": "neutral", // 基础色彩
    "cssVariables": true    // CSS变量支持
  }
}
```

## 数据模型

### 瀑布流布局算法
```typescript
// 响应式列数计算
const calculateColumns = () => {
  const width = window.innerWidth;
  if (width >= 1536) return 5;      // 2xl: 5列
  else if (width >= 1280) return 4; // xl:  4列
  else if (width >= 1024) return 3; // lg:  3列
  else if (width >= 640) return 2;  // sm:  2列
  else return 1;                    // xs:  1列
}
```

### 高度计算逻辑
```typescript
// 商品卡片高度计算
const cardWidth = 300; // 固定卡片宽度
const aspectRatio = imageHeight / imageWidth;
const imageHeight = cardWidth * aspectRatio;
const contentHeight = 100; // 内容区域估计高度
const totalHeight = imageHeight + contentHeight + 16; // 包含间距
```

### 商品信息展示逻辑
- **性别显示**: `'m'` → `🚹 Male`, `'w'` → `🚺 Female`
- **日期格式**: 中文格式 `YYYY-MM-DD`
- **价格显示**: 人民币符号 `¥` + 价格

## 测试与质量

### 当前状态
❌ **无测试覆盖** - 需要添加组件测试

### 推荐测试策略
1. **组件渲染测试**
   - 各组件正常渲染测试
   - Props传递和显示测试
   - 样式类名应用测试

2. **交互功能测试**
   - 卡片hover效果测试
   - 响应式布局测试
   - 骨架屏切换测试

3. **瀑布流布局测试**
   - 列数响应式计算测试
   - 商品分布算法测试
   - 窗口resize处理测试

### 测试文件建议
```
src/components/
├── __tests__/
│   ├── WaterfallLayout.test.tsx
│   ├── ProductCard.test.tsx
│   └── ui/
│       ├── button.test.tsx
│       └── badge.test.tsx
└── [组件文件]
```

## 常见问题 (FAQ)

### Q: 瀑布流如何实现高度平衡？
A: 通过计算每列的累积高度，始终将新商品添加到最短的列中，确保各列高度相对均衡。

### Q: 响应式布局何时重新计算？
A: 监听window的resize事件，窗口大小变化时重新计算列数和商品分布。

### Q: 图片尺寸如何处理？
A: 使用Next.js Image组件的fill模式，配合object-cover确保图片按比例填充容器。

### Q: 骨架屏如何与真实内容保持一致？
A: 骨架屏组件模拟真实卡片的结构和尺寸，确保加载过程中布局稳定。

## 相关文件清单

### 业务组件
- `src/components/WaterfallLayout.tsx` - 瀑布流布局组件 (核心布局逻辑)
- `src/components/ProductCard.tsx` - 商品卡片组件 (商品展示)
- `src/components/ProductCardSkeleton.tsx` - 骨架屏组件 (加载状态)

### UI基础组件
- `src/components/ui/badge.tsx` - 徽章组件 (标签展示)
- `src/components/ui/button.tsx` - 按钮组件 (交互操作)
- `src/components/ui/card.tsx` - 卡片组件 (容器组件)
- `src/components/ui/skeleton.tsx` - 骨架屏基础组件
- `src/components/ui/spinner.tsx` - 加载动画组件

### 配置文件
- `components.json` - shadcn/ui配置文件
- `src/lib/utils.ts` - 工具函数 (cn样式合并)

### 样式文件
- `src/app/globals.css` - 全局样式和CSS变量
- `tailwind.config` - Tailwind CSS配置 (推断存在)

---
*模块文档最后更新: 2025-08-29 10:31:16*