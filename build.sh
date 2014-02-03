#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var root = path.resolve(__dirname);
var demoPaths = [];

function readDir(dir) {
  var files = fs.readdirSync(dir);
  files.forEach(function (file) {
    if (file === '.git') {
      return;
    }
    var filePath = path.join(dir, file);
    var isFile = fs.statSync(filePath).isFile();
    if (!isFile) {
      readDir(filePath);
    }
    if (isFile && file === 'index.html') {
      demoPaths.push(dir.replace(root, ''));
    }
  });
}

readDir(root);

var demoByChp = {};
demoPaths.forEach(function (path) {
  var tmp = path.match(/^\/([\w\d]+)\/([\w\d]+)/);
  if (!tmp) {
    return;
  }

  var chName = tmp[1];
  var demoName = tmp[2];
  demoByChp[chName] = demoByChp[chName] || [];
  demoByChp[chName][demoName] = path;
});

var templateCh = '<h3>{{chName}}</h3>\n{{content}}';

var templateCch = fs.readFileSync(path.join(root, 'demo.html'), 'utf-8');

var html = '';

for(var chName in demoByChp) {
  var liHtml = '';
  var demos = demoByChp[chName];
  for (var name in demos) {
    liHtml += templateCch.replace(/{{name}}/g, name).replace(/{{path}}/g, demos[name]);
  }

  html += templateCh.replace(/{{chName}}/g, chName).replace(/{{content}}/g, liHtml);
}

var tpl = fs.readFileSync(path.join(root, 'template.html'), 'utf-8');
fs.writeFileSync(path.join(root, 'index.html'), tpl.replace(/{{demos}}/g, html));

console.log('build completed');
