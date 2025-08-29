# 工具函数模块

[根目录](../../CLAUDE.md) > [src](../) > **lib**

## 变更记录 (Changelog)

### 2025-08-29 10:31:16 - 模块文档创建
- 识别API客户端和数据转换功能
- 分析通用工具函数
- 记录类型定义和数据处理逻辑

---

## 模块职责

工具函数模块提供应用的通用工具函数和API客户端功能，包括数据获取、类型转换、样式工具等。确保代码的复用性和一致性。

## 入口与启动

### 主要模块
- **`api.ts`**: API客户端和数据转换工具
- **`utils.ts`**: 通用工具函数（样式类名合并等）

### 功能分类
1. **API相关**: 数据获取、类型定义、数据转换
2. **样式工具**: 类名合并、条件样式处理
3. **类型定义**: 共享的TypeScript接口定义

## 对外接口

### API客户端接口

#### 数据获取函数
```typescript
// 获取球蟒数据
async function fetchBallPythons(): Promise<BallPythonApiResponse>

// 数据转换函数
function transformBallPythonToProduct(pythonProduct: BallPythonProduct): Product
```

#### 核心类型定义
```typescript
interface BallPythonDetail {
  sex: string;          // 性别标识
  birth: string;        // 出生日期
  weight: number | null; // 体重（克）
  diet: string;         // 饮食信息
}

interface Store {
  _id: string;
  storeName: string;
  address: {
    _id: string;
    province: string;   // 店铺所在省份
  };
}

interface BallPythonProduct {
  _id: string;
  title: string;
  images: string[];
  price: number;        // 原始价格
  shippingPrice: number | null;
  stock: number | null;
  type: string;
  detail: BallPythonDetail;
  s1: Category;         // 一级分类
  s2: Category;         // 二级分类
  store: Store;
}
```

### 工具函数接口

#### 样式工具
```typescript
// 条件类名合并函数
function cn(...inputs: ClassValue[]): string
```

## 关键依赖与配置

### API配置
- **API端点**: `/api/ball-pythons` (内部API路由)
- **图片服务**: `https://www.repttown.com/n/images/product/thumb/`
- **价格转换率**: `0.22` (可能是汇率或折扣率)

### 样式工具依赖
- **clsx**: 条件类名处理
- **tailwind-merge**: Tailwind CSS类名冲突解决

### 图片处理配置
```typescript
// 图片URL构建逻辑
const imageUrl = images.length > 0 
  ? `https://www.repttown.com/n/images/product/thumb/${images[0]}.jpeg`
  : 'https://picsum.photos/300/400?random=snake'; // 默认图片
```

## 数据模型

### 数据转换流程
1. **原始数据**: 从Repttown API获取的 `BallPythonProduct`
2. **价格转换**: `originalPrice * 0.22`
3. **图片处理**: 构建完整图片URL或使用默认图片
4. **分类合并**: `${s1.title} > ${s2.title}`
5. **输出格式**: 前端友好的 `Product` 格式

### 关键数据处理
```typescript
// 价格计算
price: (pythonProduct.price) * 0.22

// 图片URL处理
image: pythonProduct.images.length > 0 
  ? `https://www.repttown.com/n/images/product/thumb/${pythonProduct.images[0]}.jpeg`
  : 'https://picsum.photos/300/400?random=snake'

// 分类信息合并
category: `${pythonProduct.s1.title} > ${pythonProduct.s2.title}`

// 固定尺寸设置
imageHeight: 400  // 默认高度
imageWidth: 300   // 默认宽度
```

## 测试与质量

### 当前状态
❌ **无测试覆盖** - 需要添加工具函数测试

### 推荐测试策略
1. **API功能测试**
   - `fetchBallPythons` 网络请求测试
   - 错误处理和状态码验证测试
   - 响应数据格式验证测试

2. **数据转换测试**
   - `transformBallPythonToProduct` 转换逻辑测试
   - 价格计算准确性测试
   - 图片URL构建测试
   - 边界条件处理测试（空图片数组等）

3. **工具函数测试**
   - `cn` 类名合并功能测试
   - Tailwind CSS类名冲突解决测试

### 测试文件建议
```
src/lib/
├── __tests__/
│   ├── api.test.ts
│   └── utils.test.ts
├── api.ts
└── utils.ts
```

## 常见问题 (FAQ)

### Q: 价格为什么要乘以0.22？
A: 这可能是汇率转换（如美元转人民币的历史汇率）或者是平台的折扣率。建议通过配置文件管理此参数。

### Q: 默认图片服务picsum.photos的作用？
A: 当商品没有图片时，提供一个占位图片，确保界面布局不会出现空白。

### Q: 为什么图片尺寸固定为300x400？
A: 为了确保瀑布流布局的一致性，所有商品卡片使用相同的宽高比。

### Q: cn函数的作用是什么？
A: 智能合并CSS类名，解决Tailwind CSS中可能出现的样式冲突，确保最终生效的是正确的样式类。

## 相关文件清单

### 核心文件
- `src/lib/api.ts` - API客户端和数据转换 (核心业务逻辑)
- `src/lib/utils.ts` - 通用工具函数 (样式工具)

### 使用方文件
- `src/app/page.tsx` - API函数使用方
- `src/app/api/ball-pythons/route.ts` - 后端API实现
- `src/components/ProductCard.tsx` - 数据展示组件
- `src/components/WaterfallLayout.tsx` - 布局组件

### 配置文件
- `components.json` - 包含utils别名配置
- `tsconfig.json` - TypeScript路径映射 (`@/*`)

### 外部依赖
- **Repttown API**: 数据源
- **Picsum Photos**: 默认图片服务

---
*模块文档最后更新: 2025-08-29 10:31:16*