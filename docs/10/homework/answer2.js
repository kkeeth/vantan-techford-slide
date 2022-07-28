const cart = [
  { name: "apple", price: "200" },
  { name: "orange", price: "400" },
  { name: "banana", price: "150" },
];

// 解１
let total = 0;
cart.forEach(({price}) => {
  total += Number(price);
})
const result = total;
console.log(result);
// resultの値が価格の合計になるようにしてください

// 解２
// こちらのほうがスマート
// const result = cart.reduce((total, {price}) => {
//   return total += Number(price);
// }, 0)
// console.log(result);

