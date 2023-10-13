# 全スライドのベースにならないように回避
mv index.html top.html

# 全部ビルド
cp slides/1.md ./ && slidev build -o dist/1 --base /1/ 1.md && rm 1.md
cp slides/2.md ./ && slidev build -o dist/2 --base /1/ 2.md && rm 2.md
# slidev build -o dist/15 --base /15/ slides/15.md

# TOP ページ用
cp top.html dist/index.html
cp -R styles dist
mv top.html index.html