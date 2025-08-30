# 全スライドのベースにならないように回避
mv index.html top.html

# 全部ビルド
cp slides/1.md ./ && slidev build -o dist/1 --base /1/ 1.md && rm 1.md
cp slides/2.md ./ && slidev build -o dist/2 --base /2/ 2.md && rm 2.md
cp slides/4.md ./ && slidev build -o dist/4 --base /4/ 4.md && rm 4.md
cp slides/5.md ./ && slidev build -o dist/5 --base /5/ 5.md && rm 5.md
cp slides/11.md ./ && slidev build -o dist/11 --base /11/ 11.md && rm 11.md
# cp slides/7.md ./ && slidev build -o dist/7 --base /7/ 7.md && rm 7.md
# cp slides/8.md ./ && slidev build -o dist/8 --base /8/ 8.md && rm 8.md
# cp slides/9.md ./ && slidev build -o dist/9 --base /9/ 9.md && rm 9.md
# cp slides/10.md ./ && slidev build -o dist/10 --base /10/ 10.md && rm 10.md
# cp slides/11.md ./ && slidev build -o dist/11 --base /11/ 11.md && rm 11.md
# cp slides/20.md ./ && slidev build -o dist/20 --base /20/ 20.md && rm 20.md
# cp slides/23.md ./ && slidev build -o dist/23 --base /23/ 23.md && rm 23.md
# slidev build -o dist/15 --base /15/ slides/15.md

# TOP ページ用
cp top.html dist/index.html
cp -R styles dist
mv top.html index.html