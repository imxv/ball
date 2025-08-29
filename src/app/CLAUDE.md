# 前端应用模块

[根目录](../../CLAUDE.md) > [src](../) > **app**

## 变更记录 (Changelog)

### 2025-08-29 10:31:16 - 模块文档创建
- 识别主页面组件和布局组件
- 分析用户界面交互逻辑
- 记录状态管理和数据加载策略

---

## 模块职责

前端应用模块负责整个 Ball Python Marketplace 的用户界面展示，采用 Next.js App Router 架构，提供响应式的商品浏览体验。

## 入口与启动

### 主要入口文件
- **`page.tsx`**: 应用主页面，实现商品列表展示和无限滚动
- **`layout.tsx`**: 根布局组件，定义全局HTML结构和元数据

### 启动流程
1. Next.js 服务器渲染 `layout.tsx` 生成基础HTML结构
2. 客户端激活 `page.tsx`，开始数据获取流程
3. 通过 `/api/ball-pythons` 获取商品数据
4. 渲染瀑布流布局展示商品列表

## 对外接口

### 页面路由
- **`/`**: 主页面 - 商品列表展示页面

### 状态接口
```typescript
interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  imageHeight: number;
  imageWidth: number;
  detail?: BallPythonDetail;
  store?: Store;
  shippingPrice?: number | null;
  category?: string;
}
```

## 关键依赖与配置

### 核心依赖
- **Next.js 15.4.7**: React框架和路由系统
- **React 19.1.0**: UI框架
- **TypeScript**: 类型安全开发

### 组件依赖
- `../components/WaterfallLayout`: 瀑布流布局组件
- `../lib/api`: API数据获取和转换
- `@/components/ui/*`: UI基础组件 (Button, Spinner)

### 关键配置
```typescript
const PRODUCTS_PER_LOAD = 20; // 每次加载商品数量
```

## 数据模型

### 状态管理
```typescript
// 主要状态
const [allProducts, setAllProducts] = useState<Product[]>([]);        // 所有商品数据
const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);  // 当前显示的商品
const [loading, setLoading] = useState(true);                        // 初始加载状态
const [loadingMore, setLoadingMore] = useState(false);              // 加载更多状态
const [error, setError] = useState<string | null>(null);            // 错误状态
const [currentIndex, setCurrentIndex] = useState(0);                // 当前加载索引
```

### 数据流向
1. **初始加载**: `fetchBallPythons()` → 数据转换 → 去重处理 → `setAllProducts()`
2. **分批显示**: `allProducts` → 切片 → `setDisplayedProducts()`
3. **无限滚动**: 滚动事件触发 → `loadMoreProducts()` → 追加新商品

## 测试与质量

### 当前状态
❌ **无测试覆盖** - 需要添加测试

### 推荐测试策略
1. **组件渲染测试**
   - 主页面正常渲染测试
   - 加载状态UI测试
   - 错误状态UI测试

2. **交互功能测试**
   - 无限滚动触发测试
   - 商品加载去重逻辑测试
   - 错误重试功能测试

3. **数据流测试**
   - API数据获取和状态更新测试
   - 商品展示数量和索引管理测试

### 测试文件建议
```
src/app/
├── __tests__/
│   ├── page.test.tsx
│   └── layout.test.tsx
└── page.tsx
```

## 常见问题 (FAQ)

### Q: 为什么商品价格需要乘以0.22？
A: 这是在 `transformBallPythonToProduct` 函数中的价格转换逻辑，可能是汇率换算或折扣计算。

### Q: 无限滚动如何避免重复加载？
A: 通过 `loadingMore` 状态和 `currentIndex >= allProducts.length` 条件判断来防止重复请求。

### Q: 为什么使用500ms延迟加载？
A: 模拟真实的网络延迟，提供更好的用户体验和加载动画效果。

## 相关文件清单

### 核心文件
- `src/app/page.tsx` - 主页面组件 (主要业务逻辑)
- `src/app/layout.tsx` - 根布局组件
- `src/app/globals.css` - 全局样式文件
- `src/app/favicon.ico` - 网站图标

### 依赖文件
- `src/components/WaterfallLayout.tsx` - 瀑布流布局
- `src/lib/api.ts` - API客户端和数据转换
- `src/components/ui/button.tsx` - 按钮组件
- `src/components/ui/spinner.tsx` - 加载动画组件

### 配置文件
- `next.config.ts` - Next.js配置
- `tsconfig.json` - TypeScript配置
- `package.json` - 项目依赖和脚本

---
*模块文档最后更新: 2025-08-29 10:31:16*