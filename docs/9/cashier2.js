
// 【作りたいもの】
// カートの中身の合計金額を計算し、キャンペーンや消費税などを計算後出力するアプリ。
// 計算時にそれぞれのアイテム名と価格をコンソールに表示もする
// 理想の出力 ↓↓
// apple: 200円
// orange: 400円
// banana: 150円
// 合計金額は 783.7500000000001円です！

// 名前と価格がセットになった、オブジェクトの配列を定義
const cart = [
  { name: "apple", price: "200" },
  { name: "orange", price: "400" },
  { name: "banana", price: "150" },
];

// レジ表示関数を作成（オブジェクトを引数で受け取って、Apple: 200円みたいな出力をconsole.logで行う、返り値はなし）
const showCashier = ({name, price}) => {
  console.log(`${name}: ${price}円`);
  // 以下でもオーケー
  // console.log(name + ':' + price + '円');
};


// 結果として返したい変数を定義
let result = 0;

// 上の変数に、cartの中身の金額の合計を計算して代入（同時に、レジ表示関数でそれぞれのアイテムのログを出す）
// hint① for 文を使おう
// hint② 配列の長さは 配列.length で取得できます

for (let i = 0; i < cart.length; i++) {
  result += Number(cart[i].price);
  showCashier(cart[i]);
}

// 以下でもオーケー
// cart.forEach(({name, price}) => {
//   result += Number(price);
//   showCashier({name, price});
// })


// もし、金額の合計値が、500円以上であればキャンペーンで5% オフ
if (result >= 500) {
  result *= 0.95;
}

// 消費税計算(10%)
result *= 1.1;

// 最終的な金額を console.logで「合計金額は ~~~円です！」と出力
console.log(`合計金額は ${result}円です！`);
