// server.mjs（プロキシで :3000 → :3001、/docs等を /ja/... へ 308）
import http from 'http'; import httpProxy from 'http-proxy'; import {URL} from 'url';
const target='http://localhost:3001'; const proxy=httpProxy.createProxyServer({target,xfwd:true});
const locales=['ja','en']; const needs=['docs','pricing','product','cases','security','demo'];
const server=http.createServer((req,res)=>{try{const u=new URL(req.url,'http://localhost');const p=u.pathname;
const hasLocale=locales.some(l=>p===`/${l}`||p.startsWith(`/${l}/`));
const needsLocale=needs.some(s=>p===`/${s}`||p.startsWith(`/${s}/`));
if(!hasLocale&&needsLocale){res.statusCode=308;res.setHeader('Location',`/ja${p}${u.search||''}`);return res.end();}
proxy.web(req,res);}catch(e){res.statusCode=500;res.end('proxy error');}});
server.listen(3000,()=>console.log('▶ proxy :3000 → :3001 (ja redirects active)'));
