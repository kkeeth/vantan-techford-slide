const cart = [
  { name: "apple", price: "200" },
  { name: "orange", price: "400" },
  { name: "banana", price: "150" },
];

const cheap = cart.filter(({ price }) => Number(price) <= 300);

// 丁寧に書くと以下になります
// const cheap = cart.filter((item) => {
//   return Number(item.price) <= 300;
// });

console.log(cheap);
// cheapの値が300円以下のフルーツ全ての配列になるようにフィルタリングしてください