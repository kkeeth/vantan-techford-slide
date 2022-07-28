const cart = [
  { name: "apple", price: "200" },
  { name: "orange", price: "400" },
  { name: "banana", price: "150" },
];

const onlyName = cart.map(({ name }) => name);

// 丁寧に書くと以下になります
// const onlyName = cart.map((item))) => {
//   return item.name;
// });

console.log(onlyName);
// onlyNameの値が商品の名前だけの配列になるようにしてください
