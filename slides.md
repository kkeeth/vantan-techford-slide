---
# try also 'default' to start simple
theme: penguin
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://source.unsplash.com/collection/94734566/1920x1080
# apply any windi css classes to the current slide
class: 'text-center'
# show line numbers in code blocks
lineNumbers: true
# some information about the slides, markdown enabled
info: |
  ## Javascript中級講義資料#1
  VANTAN Techgord Academy
  Created by [@unotovive](https://twitter.com/unotovive)
fonts:
  sans: 'Noto Sans JP'
  # use with `font-serif` css class from windicss
  serif: 'Noto Sans JP'
  # for code blocks, inline code, etc.
  mono: 'Fira Code'
# persist drawings in exports and build
drawings:
  persist: false
layout: intro
---

# Javascript中級

VANTAN Techford Academy

### #1 概論と環境構築 / Webアプリケーション基礎
<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

---
layout: new-section
---

# 出席確認🖐

<!--
7分ぐらい
-->

---
layout: new-section
---

# ご挨拶🖐

<!--
5分ぐらい
-->

---
layout: presenter
presenterImage: ./assets/1/me.jpg
---

# Takumi Otobe

主にJavascript中級クラスを担当します。
<br>
半年ほどですがよろしくお願いします!

- 📝 **職業** - UX engineer / Designer at YUMEMI
- 🎨 **経歴** - あとで
- 🧑‍💻 **得意な技術** - Vue, React, Typescript, AWS
- 🤹 **趣味** - スノボとボルダリング

<br>
<br>

Twitterアカウント [@unotovive](https://twitter.com/unotovive)

---
layout: new-section
---

# 授業の概要

<!--
3分
-->

---

# 授業の概要

### フロントエンドの授業です
Javascriptという講義名ですが、Javascriptを利用したブラウザ上で動作するWebアプリケーションについて学び、簡単なアプリのフロントエンドを作成できるようになることが目的です。

<br>

### そもそもフロントエンドって？
本日の次のコマで詳しく解説します。主にブラウザで動くアプリケーションの僕たちが実際に触る部分です。

<!--
フロントエンドって何ぞやって話は今日の2コマ目でするよ！
-->

---

# 最終目標について

この講義の最終目標は、フロントエンドフレームワーク「Vue.js」を利用し、簡単なSPAを1から作れる実力をつけることです。
<br>
<br>
この最終目標を達成するために、Javascriptという言語の基本的な理解から、Vue.jsの基礎、Vue.jsを実際に使ってアプリを作る流れまでを学びます。


---
layout: new-section
---

# シラバスの確認

<!-- 
  10分ぐらい
 -->

---

# シラバスの確認

<br>

| 日程 | 1コマ目 | 2コマ目 |
| --- | --- | --- |
| <kbd>1</kbd> | 概論と環境構築 | Webアプリケーション基礎 |
| <kbd>2</kbd> | Javascript基礎① | Javascript基礎② |
| <kbd>3</kbd> | Javascript基礎③ |Javascript基礎④ |
| <kbd>4</kbd> | Javascript基礎⑤ | Javascript基礎⑥ |
| <kbd>5</kbd> | Vue.jsとは？ | Vue.jsの基礎① |
| <kbd>6</kbd> | Vue.jsの基礎② | Vue.jsの基礎③ |
| <kbd>7</kbd> | Vue.jsの基礎④ | Vue.jsの基礎⑤ |

---

# シラバスの確認

<br>

| 日程 | 1コマ目 | 2コマ目 |
| --- | --- | --- |
| <kbd>8</kbd> | TODOアプリハンズオン① | TODOアプリハンズオン② |
| <kbd>9</kbd> | TODOアプリハンズオン③ | TODOアプリハンズオン④ |
| <kbd>10</kbd> | TODOアプリハンズオン⑤ | TODOアプリハンズオン⑥ |
| <kbd>11</kbd> | Vue.js応用編① | Vue.js応用編② |

---

# シラバスの確認

<br>

| 日程 | 1コマ目 | 2コマ目 |
| --- | --- | --- |
| <kbd>12</kbd> | チーム開発について | Gitとバージョン管理 |
| <kbd>13</kbd> | 最終課題について | 最終課題 (テーマ発表会) |
| <kbd>14</kbd> | 実務Tips① | 最終課題検討① |
| <kbd>15</kbd> | 実務Tips② | 最終課題検討② |
| <kbd>16</kbd> | 最終発表会とフィードバック① | 最終発表会とフィードバック② |

---
layout: new-section
---

# 授業の進め方について

---

## こういう形式での講義が初めてです...!

（進め方、ペース配分等）なにかあったら気軽に言ってください！

※質問等は随時コメントで投稿してください！（挙手でも大丈夫）

---

## 講義資料は公開します！

<div class="flex flex-grow  pt-8">
<div>

講義資料は [htttps://kougisiryounourl.com/#1](htttps://kougisiryounourl.com/#1) で公開します。<br>

Password :  <code style="color: #fff;">vantan.js</code>

コード等もここに写すので適宜自分でみながら進めてください。
<br>
<br>

##### ※コピペはほどほどに

</div>
<div  class="h-xs flex-grow-0 pl-12">

<img src="assets/1/me.jpg" class="h-xs">

</div>
</div>

<!--
コピペをするときは内容をよく読んで自分で理解したコードだけコピペしよう
-->

---
layout: new-section
---

# 環境構築

---

# 今回必要な環境

- **Node.js** : v14.18.0
- **n** : 最新版
- **VSCode** : 最新版
- **Google Chrome** : 最新版

---
layout: image-right
image: ./assets/1/node.png
---

# Node.js

以下の公式サイトから推奨版(14.18.0)を
<br>ダウンロードしてインストール

<div>
  <a href="https://nodejs.org/ja/" target="_blank" class="px-2 py-1 rounded cursor-pointer ring-inset bg-green-200">
    公式サイト <carbon:arrow-right class="inline"/>
  </a>
</div>

```bash
$ node -v
> v14.18.0

$ npm -v
> 6.14.13
```

---

### Node.jsとは?

v8 javascriptエンジンで動くJSの実行環境。<br>
ECMA Scriptの仕様にサーバーサイドで必要な機能を盛り込んだもの。
<br>
<br>

### ECMA Scriptとは...?

Javascriptの言語仕様のコア部分。<br>
毎年アップデートされて新機能が追加されたりしている(ES2020とか)

<!--
ESいくつの機能か確認しないと実行する環境によっては動かなかったり...
-->

---

# nの導入

「n」とは、nodeのバージョン管理ツールの一つ。
同じPC内で様々なバージョンのNodeを使い分けられます。

```bash
$ sudo npm install -g n
$ n --version
> v7.5.0
```

---

未インストールの場合、それぞれ最新版をインストールしましょう。

## VSCodeの導入

<div class="py-8">
  <a href="https://azure.microsoft.com/ja-jp/products/visual-studio-code/" target="_blank" class="px-2 py-1 rounded cursor-pointer ring-inset bg-green-200">
    公式サイト <carbon:arrow-right class="inline"/>
  </a>
</div>

## Google Chromeの導入

<div class="py-8">
  <a href="https://www.google.com/intl/ja_jp/chrome/" target="_blank" class="px-2 py-1 rounded cursor-pointer ring-inset bg-green-200">
    公式サイト <carbon:arrow-right class="inline"/>
  </a>
</div>

---

# VSCodeの設定

- formatOnSave: true
- Japanese Language Pack for Visual Studio Code
- prettierの導入
- Veturの導入
- CodeSpellCheckerの導入
- Material Icon Themeの導入
- (オススメ) Atom One Dark Theme

<!--
実際に導入しながら説明
-->

---
layout: new-section
---

# 1-2. Webアプリケーション基礎

---
layout: new-section
---

# Webアプリケーションとはなにか

---

# そもそもWebとは？

<br>

### Webの本来の意味: “クモの巣状のもの”

---

# Webとは

Webとは、インターネット上で標準的に用いられている文書の公開・閲覧システム。文字や図表、画像、動画などを組み合わせた文書を配布することができる。文書内の要素に別の文書を指し示す参照情報（ハイパーリンク）を埋め込むことができる「ハイパーテキスト」（hypertext）と呼ばれるシステムの一種である。
<br>
（[IT用語辞典 e-words](https://e-words.jp/w/Web.html)）

---

# Webの歴史

ティム・バーナーズ＝リーによって1991年8月6日に発表された技術

### Webの始まり
研究機関に在籍していたティムは、研究の文献やデータを1つのコンピュータに集め、そしてさらにその文書同士を「リンク」させる仕組みを計画し、それを実現した。
<br>
<br>
世界中に広がる情報網が「クモの巣」のように見えるという理由で、<br>
「世界中に広がるクモの巣」＝「World Wide Web(WWW)」と名付けた

<!-- 
ティムは、このシステムを発表する時にどんな名前にするかとても悩んでいたようです。たとえば「The Information Mine」という、「情報鉱山」という候補があったようです。これは頭文字を取ると「TIM(ティム)」になりますね。さすがにそれは自分本位すぎる！と思って止めたんだ、と後に本人のWebサイトで語られています。
 -->

---

### Webとは

<br>

## 「世界中どこにいても、コンピューターなどによって情報を得られるシステム」

---

## アプリケーションとは?

## Webアプリケーションとは？

# Webページの仕組み

## Webサーバーとは？

## ブラウザの仕組み

## HTMLの表示する

## CSSで装飾する

## javascriptで「動作」を作る

## 動的なWebページの歴史

### Webサーバー + CGI

### Webアプリケーションサーバー

# v8 Javascriptエンジン

# SPA + APIモデルの登場

# APIとは

# SPAとは

# モダンフロントエンドの技術

## フレームワークの登場

## コンポーネント指向

## 仮想DOM

## SSRとJamstack

## Webの技術でできること