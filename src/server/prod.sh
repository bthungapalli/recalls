export NODE_ENV=production
forever start -o recallsout.log -e recallserr.log server.js
