# 当前路径为执行脚本命令的路径，也就是 package.json 所在路径，而不是本文件的路径
cd ./examples/dist
git init
git remote add origin https://github.com/CoderMonkie/vue-grabbing-box.git
git config user.email maonianyou@foxmail.com
# git pull origin gh-pages
git add .
git commit -m "auto deploy gh-pages for demo-vue2"
git push -u origin master:gh-pages --force