# 全スライドのベースにならないように回避
mv index.html top.html

# 全部ビルド
cp slides/1.md ./ && slidev build -o dist/1 --base /1/ 1.md && rm 1.md
cp slides/2.md ./ && slidev build -o dist/2 --base /2/ 2.md && rm 2.md
cp slides/4.md ./ && slidev build -o dist/4 --base /4/ 4.md && rm 4.md
cp slides/5.md ./ && slidev build -o dist/5 --base /5/ 5.md && rm 5.md
cp slides/11.md ./ && slidev build -o dist/11 --base /11/ 11.md && rm 11.md
cp slides/12.md ./ && slidev build -o dist/12 --base /12/ 12.md && rm 12.md
cp slides/14.md ./ && slidev build -o dist/14 --base /14/ 14.md && rm 14.md
cp slides/15.md ./ && slidev build -o dist/15 --base /15/ 15.md && rm 15.md
cp slides/16.md ./ && slidev build -o dist/16 --base /16/ 16.md && rm 16.md
cp slides/17.md ./ && slidev build -o dist/17 --base /17/ 17.md && rm 17.md
cp slides/18.md ./ && slidev build -o dist/18 --base /18/ 18.md && rm 18.md
cp slides/19.md ./ && slidev build -o dist/19 --base /19/ 19.md && rm 19.md
cp slides/20.md ./ && slidev build -o dist/20 --base /20/ 20.md && rm 20.md
cp slides/appendix.md ./ && slidev build -o dist/appendix --base /appendix/ appendix.md && rm appendix.md

# TOP ページ用
cp top.html dist/index.html
cp -R styles dist
mv top.html index.html