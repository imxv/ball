import WaterfallLayout from "../components/WaterfallLayout";

const sampleProducts = [
  {
    id: "1",
    title: "时尚休闲运动鞋",
    price: 299,
    image: "https://picsum.photos/300/400?random=1",
    imageHeight: 400,
    imageWidth: 300,
  },
  {
    id: "2", 
    title: "经典牛仔夹克",
    price: 459,
    image: "https://picsum.photos/300/500?random=2",
    imageHeight: 500,
    imageWidth: 300,
  },
  {
    id: "3",
    title: "简约白色T恤",
    price: 89,
    image: "https://picsum.photos/300/320?random=3",
    imageHeight: 320,
    imageWidth: 300,
  },
  {
    id: "4",
    title: "复古手表",
    price: 1299,
    image: "https://picsum.photos/300/450?random=4",
    imageHeight: 450,
    imageWidth: 300,
  },
  {
    id: "5",
    title: "精美手工包包",
    price: 699,
    image: "https://picsum.photos/300/380?random=5",
    imageHeight: 380,
    imageWidth: 300,
  },
  {
    id: "6",
    title: "潮流太阳镜",
    price: 199,
    image: "https://picsum.photos/300/350?random=6",
    imageHeight: 350,
    imageWidth: 300,
  },
  {
    id: "7",
    title: "舒适棉质卫衣",
    price: 359,
    image: "https://picsum.photos/300/420?random=7",
    imageHeight: 420,
    imageWidth: 300,
  },
  {
    id: "8",
    title: "高质量牛仔裤",
    price: 399,
    image: "https://picsum.photos/300/480?random=8",
    imageHeight: 480,
    imageWidth: 300,
  },
  {
    id: "9",
    title: "防水户外背包",
    price: 599,
    image: "https://picsum.photos/300/360?random=9",
    imageHeight: 360,
    imageWidth: 300,
  },
  {
    id: "10",
    title: "经典白色球鞋",
    price: 799,
    image: "https://picsum.photos/300/390?random=10",
    imageHeight: 390,
    imageWidth: 300,
  },
  {
    id: "11",
    title: "轻薄羽绒服",
    price: 899,
    image: "https://picsum.photos/300/520?random=11",
    imageHeight: 520,
    imageWidth: 300,
  },
  {
    id: "12",
    title: "时尚围巾",
    price: 129,
    image: "https://picsum.photos/300/280?random=12",
    imageHeight: 280,
    imageWidth: 300,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-2">
          商品展示
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400">
          瀑布流布局商品展示页面
        </p>
      </div>
      <WaterfallLayout products={sampleProducts} />
    </div>
  );
}
