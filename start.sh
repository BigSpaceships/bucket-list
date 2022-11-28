# pkill nginx

npx concurrently "vite --host" "tsnd --respawn ./src/server/server.ts" 
# "nginx -e /home/runner/bucket-list/logs/error.log -c /home/runner/bucket-list/nginx.conf"