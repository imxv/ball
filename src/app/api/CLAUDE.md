# API服务模块

[根目录](../../../CLAUDE.md) > [src](../../) > [app](../) > **api**

## 变更记录 (Changelog)

### 2025-08-29 10:31:16 - 模块文档创建
- 识别球蟒数据API路由功能
- 分析第三方API代理逻辑
- 记录数据获取和错误处理策略

---

## 模块职责

API服务模块提供后端API接口，主要负责代理第三方Repttown API，获取球蟒商品数据并提供给前端使用。采用Next.js App Router的API Routes架构。

## 入口与启动

### API路由入口
- **`ball-pythons/route.ts`**: 球蟒商品数据API端点

### 请求流程
1. 前端发起 `GET /api/ball-pythons` 请求
2. 服务器端代理请求到 Repttown API
3. 分两步获取数据：先获取总数量，再获取全部商品
4. 返回完整的商品数据给前端

## 对外接口

### API端点
**GET `/api/ball-pythons`**
- **描述**: 获取所有球蟒商品数据
- **响应格式**: `BallPythonApiResponse`
- **状态码**: 
  - `200`: 成功返回商品数据
  - `500`: 服务器错误

### 响应数据结构
```typescript
interface BallPythonApiResponse {
  amount: number;              // 商品总数量
  products: BallPythonProduct[]; // 商品列表
}

interface BallPythonProduct {
  _id: string;
  title: string;
  images: string[];
  price: number;
  shippingPrice: number | null;
  stock: number | null;
  type: string;
  detail: BallPythonDetail;
  s1: Category;     // 一级分类
  s2: Category;     // 二级分类
  store: Store;     // 店铺信息
}
```

## 关键依赖与配置

### 第三方API依赖
- **Repttown API**: `https://www.repttown.com/n/api/v1/product/animals/snakes/ballpythons`
- **请求参数**: 
  - `sort=0`: 排序方式
  - `stock=in`: 仅显示有库存商品
  - `count=true`: 返回商品数量
  - `size`: 每页商品数量

### HTTP配置
```javascript
headers: {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...'
}
```

## 数据模型

### 核心数据类型
```typescript
interface BallPythonDetail {
  sex: string;          // 性别 ('m'=雄性, 'w'=雌性)
  birth: string;        // 出生日期
  weight: number | null; // 体重
  diet: string;         // 饮食习惯
}

interface Store {
  _id: string;
  storeName: string;
  address: {
    _id: string;
    province: string;   // 店铺省份
  };
}

interface Category {
  title: string;        // 分类名称
  path: string;         // 分类路径
}
```

### 数据获取策略
1. **分页策略**: 先获取总数量，再一次性获取所有商品
2. **错误处理**: HTTP状态码检查和异常捕获
3. **数据代理**: 完整转发第三方API响应

## 测试与质量

### 当前状态
❌ **无测试覆盖** - 需要添加API测试

### 推荐测试策略
1. **API功能测试**
   - 正常数据获取测试
   - 第三方API连接失败测试
   - 数据格式验证测试

2. **错误处理测试**
   - 网络超时处理测试
   - 非200状态码处理测试
   - JSON解析错误测试

3. **性能测试**
   - API响应时间测试
   - 大数据量处理测试

### 测试文件建议
```
src/app/api/
├── __tests__/
│   └── ball-pythons.test.ts
└── ball-pythons/
    └── route.ts
```

## 常见问题 (FAQ)

### Q: 为什么要分两次请求获取数据？
A: 第一次请求获取总商品数量，第二次请求根据总数量获取所有商品，确保不遗漏任何商品。

### Q: User-Agent字段的作用是什么？
A: 模拟真实浏览器请求，避免被第三方API识别为爬虫而被阻止访问。

### Q: 如何处理第三方API不稳定的问题？
A: 目前仅有基础错误处理，建议添加重试机制和缓存策略。

### Q: API是否支持分页？
A: 当前实现是一次性获取所有数据，前端负责分页展示。可考虑添加分页支持以优化性能。

## 相关文件清单

### 核心文件
- `src/app/api/ball-pythons/route.ts` - 球蟒数据API路由 (主要逻辑)

### 相关文件
- `src/lib/api.ts` - 客户端API调用和数据转换
- `src/app/page.tsx` - API使用方（前端页面）

### 配置文件
- `next.config.ts` - Next.js API路由配置
- `tsconfig.json` - TypeScript类型配置

### 第三方依赖
- **Repttown API**: 数据源服务
  - 商品数据接口
  - 图片资源服务

---
*模块文档最后更新: 2025-08-29 10:31:16*