if(!self.define){let e,i={};const r=(r,a)=>(r=new URL(r+".js",a).href,i[r]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=i,document.head.appendChild(e)}else e=r,importScripts(r),i()})).then((()=>{let e=i[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(a,s)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(i[n])return;let c={};const l=e=>r(e,n),d={module:{uri:n},exports:c,require:l};i[n]=Promise.all(a.map((e=>d[e]||l(e)))).then((e=>(s(...e),c)))}}define(["./workbox-07a7b4f2"],(function(e){"use strict";importScripts("fallback-fxyO0CpSkxFkr8B9WT7g5.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/CNAME",revision:"c5094da01de299ebfbd571b662b8a72a"},{url:"/_next/app-build-manifest.json",revision:"dc6275644d57de320292019f56152bcc"},{url:"/_next/static/chunks/0e5ce63c-0d0833dfe5d502ae.js",revision:"fxyO0CpSkxFkr8B9WT7g5"},{url:"/_next/static/chunks/373-24e8490800a8b6c6.js",revision:"fxyO0CpSkxFkr8B9WT7g5"},{url:"/_next/static/chunks/69-290fe14e1b7be432.js",revision:"fxyO0CpSkxFkr8B9WT7g5"},{url:"/_next/static/chunks/app/_not-found-689ea8f67dc683db.js",revision:"fxyO0CpSkxFkr8B9WT7g5"},{url:"/_next/static/chunks/app/layout-63a094145f745b4b.js",revision:"fxyO0CpSkxFkr8B9WT7g5"},{url:"/_next/static/chunks/b536a0f1-6ff8e81916339185.js",revision:"fxyO0CpSkxFkr8B9WT7g5"},{url:"/_next/static/chunks/fd9d1056-6d57819ecbc61343.js",revision:"fxyO0CpSkxFkr8B9WT7g5"},{url:"/_next/static/chunks/framework-ecc7c29b98f29b59.js",revision:"fxyO0CpSkxFkr8B9WT7g5"},{url:"/_next/static/chunks/main-629ded6c77fc5a51.js",revision:"fxyO0CpSkxFkr8B9WT7g5"},{url:"/_next/static/chunks/main-app-78ae0e03dc7b41da.js",revision:"fxyO0CpSkxFkr8B9WT7g5"},{url:"/_next/static/chunks/pages/_app-75f6107b0260711c.js",revision:"fxyO0CpSkxFkr8B9WT7g5"},{url:"/_next/static/chunks/pages/_error-9a890acb1e81c3fc.js",revision:"fxyO0CpSkxFkr8B9WT7g5"},{url:"/_next/static/chunks/pages/_offline-03a6f32c23c86fb2.js",revision:"fxyO0CpSkxFkr8B9WT7g5"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-b8a86a640178653e.js",revision:"fxyO0CpSkxFkr8B9WT7g5"},{url:"/_next/static/css/48489d9e0b32558e.css",revision:"48489d9e0b32558e"},{url:"/_next/static/fxyO0CpSkxFkr8B9WT7g5/_buildManifest.js",revision:"df0327b3fb62dc34ef7bdef52d1cf8fb"},{url:"/_next/static/fxyO0CpSkxFkr8B9WT7g5/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/0a0ce249959137f3-s.woff2",revision:"587c48d1657e8d379cafadd7b8a9a9df"},{url:"/_next/static/media/2084b837b601951d-s.woff2",revision:"da7530b6fb2a44da4883b85aeecc984c"},{url:"/_next/static/media/398b4bb64e745c45-s.woff2",revision:"800e4b03ee9aba1454fc70fd9b55fbe7"},{url:"/_next/static/media/3a634e28c4bd54fb-s.woff2",revision:"ac0aefa43d75a1481c61df50489e7321"},{url:"/_next/static/media/9366901f2e0806d1-s.woff2",revision:"dc79846f933acad2e093a61ef0311a23"},{url:"/_next/static/media/c4c7b0ec92b72e30-s.p.woff2",revision:"ae8ec5fbab76e9f5bd0624673aab8075"},{url:"/_next/static/media/d9f1473a63f76975-s.woff2",revision:"16a035757af44a681eda3b22ff43f2f0"},{url:"/_offline",revision:"fxyO0CpSkxFkr8B9WT7g5"},{url:"/dark-mode-favicon.ico",revision:"e9a27341a956f80b9127efd0645d33f8"},{url:"/icons/dark-mode-favicon.png",revision:"6262cdea49851417894c871e06baaf7f"},{url:"/icons/favicon.psd",revision:"4f477340f92ee3bd15b9478326208b61"},{url:"/icons/light-mode-favicon.png",revision:"89a6a4d554130159e632a9b0de476d86"},{url:"/icons/maskable-icon-512x512.jpg",revision:"ab570df32c9f70873ff493d06255fc05"},{url:"/icons/noun-aerobic-6208135-2.svg",revision:"5d3db20e920bb65f6055a44460a0cfee"},{url:"/icons/noun-milk-box-1083749.svg",revision:"d9c2b606d3aecf9f7764ad5d7f6f6e29"},{url:"/imgsOriginal/accelerometer.png",revision:"1901db77f944776c67d45f65d9023515"},{url:"/imgsOriginal/async-clipboard.png",revision:"c6f66bb998e4c227389af918cfbd9062"},{url:"/imgsOriginal/audio.png",revision:"4d21014d43f077404326131779923919"},{url:"/imgsOriginal/autofocus.png",revision:"c5cc8ae199c4eaa7190cd520618b3398"},{url:"/imgsOriginal/auxclick.png",revision:"574f5a779f88c556de69c11609e5eef8"},{url:"/imgsOriginal/av1.png",revision:"f862ce81bfadf9226e7d758fd9e9a89e"},{url:"/imgsOriginal/background-attachment.png",revision:"286e83f2ca6a71fc5805a9c6d644e6b4"},{url:"/imgsOriginal/background-sync.png",revision:"23aeff22bbb89edc3eeb77271068f24b"},{url:"/imgsOriginal/client-hints-dpr-width-viewport.png",revision:"f4cbbb407b33f5a3e882bc81a78eead9"},{url:"/imgsOriginal/colr-v1.png",revision:"2bd4e241dba82c1eb6517c4c5333dfd0"},{url:"/imgsOriginal/cookie-store-api.png",revision:"2bb718ffc7def60584d7ff27d4e7e0ea"},{url:"/imgsOriginal/createimagebitmap.png",revision:"7ac9d9f7c8b37e2f7e2fbcf3114b4147"},{url:"/imgsOriginal/css-container-queries-style.png",revision:"dfe9072d5d1d9592ebdb3595a3b8ee44"},{url:"/imgsOriginal/css-content-visibility.png",revision:"1b2c777e9f3de2ee92d1eba9fbac347b"},{url:"/imgsOriginal/css-mixblendmode.png",revision:"5fb7445dfbaf7e9e1da327d2c5bf9b28"},{url:"/imgsOriginal/css-overflow-anchor.png",revision:"61e79847207bace118dd5ec45461fe9a"},{url:"/imgsOriginal/css-paged-media.png",revision:"b017cc153341385ea838408601e186b7"},{url:"/imgsOriginal/css-paint-api.png",revision:"5ad3349c8e5488d7cae736b7d5d8af7f"},{url:"/imgsOriginal/css-resize.png",revision:"03ddc0a4ad5b747e5238f1320948a2b3"},{url:"/imgsOriginal/css-scrollbar.png",revision:"db22c8e209b44fc9daaf0e14c3b5f4a3"},{url:"/imgsOriginal/css-selection.png",revision:"cc35dadfb2c88c7eade8a870e6e4a7a0"},{url:"/imgsOriginal/css-text-wrap-balance.png",revision:"77194d06fe643c567bed4269d2caae98"},{url:"/imgsOriginal/css3-cursors-grab.png",revision:"9da6c15bae218c4422e7a0483b54a489"},{url:"/imgsOriginal/css3-cursors-newer.png",revision:"7a076acb85ed7fce6509ac96bf171da0"},{url:"/imgsOriginal/css3-cursors.png",revision:"2678faf7527e7e0f65053ae6f770cd03"},{url:"/imgsOriginal/custom-elementsv1.png",revision:"c89ae7046c827e59eb58b048fc86308a"},{url:"/imgsOriginal/document-policy.png",revision:"c0e4262087fb9d11e9cde4156e533d21"},{url:"/imgsOriginal/fullscreen.png",revision:"3ad8e293ee9e28861867409df9ec8167"},{url:"/imgsOriginal/gyroscope.png",revision:"7795a6657800cd1bc174b8e18788e74f"},{url:"/imgsOriginal/http3.png",revision:"278999570b6ddb791b54f642f37e146e"},{url:"/imgsOriginal/imagecapture.png",revision:"41be5561cb1cbc944da6253b83a4cede"},{url:"/imgsOriginal/input-datetime.png",revision:"8e1771fd7f98269e8068abd7a2529fd0"},{url:"/imgsOriginal/intersectionobserver-v2.png",revision:"4d1fe767be8fcf4d7e83304e3ec57cdc"},{url:"/imgsOriginal/link-icon-svg.png",revision:"b34ac56d954b6ba90cc98ee9447931da"},{url:"/imgsOriginal/link-rel-prefetch.png",revision:"8c70aa632357238543cec95edde4a0c1"},{url:"/imgsOriginal/link-rel-prerender.png",revision:"0b1d5247979a0505082fb30c0489f5a5"},{url:"/imgsOriginal/mediacapture-fromelement.png",revision:"b05ea14e7bc256d85319efe77286895d"},{url:"/imgsOriginal/mediasource.png",revision:"5e81d211616cdcdcfc3e5399ae649767"},{url:"/imgsOriginal/midi.png",revision:"10db08ececc0cc8d225b99f0ce436bd0"},{url:"/imgsOriginal/missing-image.png",revision:"e0649cef9a5d9f2be213da0e1c624985"},{url:"/imgsOriginal/netinfo.png",revision:"5f2595be6184acd685ad688ecce5b458"},{url:"/imgsOriginal/notifications.png",revision:"43ef444b8f4f501efbdf878945617e00"},{url:"/imgsOriginal/ogg-vorbis.png",revision:"b18a71398d5dca7a29ea3a0d3811ccca"},{url:"/imgsOriginal/opus.png",revision:"2883a904324b34fcd8e87a9767f234ec"},{url:"/imgsOriginal/orientation-sensor.png",revision:"6b18857faaf8e29450cefe38ef8f8a5a"},{url:"/imgsOriginal/permissions-policy.png",revision:"6166ae7614daae31ed5804a5a3e4f104"},{url:"/imgsOriginal/pointerlock.png",revision:"f51195228450e547a875ecb0059dd965"},{url:"/imgsOriginal/push-api.png",revision:"02c041612efa7883e6c7194559a76641"},{url:"/imgsOriginal/selection-api.png",revision:"4d5e8e7e14f461b1cac80ab792bd3b25"},{url:"/imgsOriginal/srcset.png",revision:"ed9b1a065edd54f3fde93cf9bd55f8d4"},{url:"/imgsOriginal/trusted-types.png",revision:"8f7ca78b2964e9c4d188529d4375fe79"},{url:"/imgsOriginal/vibration.png",revision:"8a50091072e69fcd4278ddfca462d35a"},{url:"/imgsOriginal/view-transitions.png",revision:"abae15dce290fe9e1a84be037eed9158"},{url:"/imgsOriginal/web-bluetooth.png",revision:"f7b3bb2c0d28777386e1641f68b5bc44"},{url:"/imgsOriginal/webcodecs.png",revision:"27f27164276e7f9a4e6188cbaa4050d4"},{url:"/imgsOriginal/webnfc.png",revision:"a61614690b37fedbe384c20be3b1b95f"},{url:"/imgsOriginal/webtransport.png",revision:"e7540942cc13d9dc82c493a63a758a5f"},{url:"/imgsOriginal/webusb.png",revision:"5335970bc94e7a9d91697b6ecb1c1d0e"},{url:"/imgsOriginal/webxr.png",revision:"b4f5b73ba88b62e4684e14618e97cd98"},{url:"/imgsSmaller/accelerometer.jpg",revision:"8561bc70ef0cf4b3fbc1ca42be69d8b3"},{url:"/imgsSmaller/async-clipboard.jpg",revision:"0889a61f8c04c4b8f169c554ebae29df"},{url:"/imgsSmaller/audio.jpg",revision:"7ff4d3f9d733aef42bb9911670d6c261"},{url:"/imgsSmaller/autofocus.jpg",revision:"7247201a28899de34c68121d21467380"},{url:"/imgsSmaller/auxclick.jpg",revision:"a9d86a6eee48db4d5c7638c84cba74f2"},{url:"/imgsSmaller/av1.jpg",revision:"e3389efa88a5042d9d9d566030f139b2"},{url:"/imgsSmaller/background-attachment.jpg",revision:"b7197cad7a94926f4533bdd2009ec3b1"},{url:"/imgsSmaller/background-sync.jpg",revision:"de07fce103ef4098d47c39ad9f34ca09"},{url:"/imgsSmaller/client-hints-dpr-width-viewport.jpg",revision:"bb9742c3ca5c29d71e9533dac66b0601"},{url:"/imgsSmaller/colr-v1.jpg",revision:"8381565e6765b3ff8a83ea44843c2ed3"},{url:"/imgsSmaller/cookie-store-api.jpg",revision:"b43d446b2607568cd97a585ca6f2e2d1"},{url:"/imgsSmaller/createimagebitmap.jpg",revision:"3713a235a3224489b9a1299ebc937708"},{url:"/imgsSmaller/css-container-queries-style.jpg",revision:"b9c2fab7b066ad195d6bf2a990d82419"},{url:"/imgsSmaller/css-content-visibility.jpg",revision:"974463f52ca88b55f080bbe634d1b338"},{url:"/imgsSmaller/css-mixblendmode.jpg",revision:"e7d33504679c424517c283420e63f5fa"},{url:"/imgsSmaller/css-overflow-anchor.jpg",revision:"d8f94b866b5a78c683172fbac8a384f0"},{url:"/imgsSmaller/css-paged-media.jpg",revision:"4866237db2824cbd3d5411ce6f1f9c4f"},{url:"/imgsSmaller/css-paint-api.jpg",revision:"041c12c7f1eb5889413645dae8e00ccd"},{url:"/imgsSmaller/css-resize.jpg",revision:"4f7ec1450ec2ef0dc86ed28f52b04459"},{url:"/imgsSmaller/css-scrollbar.jpg",revision:"1515d84f72a5191beb5e79a4dd847ebd"},{url:"/imgsSmaller/css-selection.jpg",revision:"7bc34da2dc3f5994905d17340714df83"},{url:"/imgsSmaller/css-text-wrap-balance.jpg",revision:"2e6d6b221b11fcaff75dd7138f12174f"},{url:"/imgsSmaller/css3-cursors-grab.jpg",revision:"1789ed83d7323e2226cb10b4d406f505"},{url:"/imgsSmaller/css3-cursors-newer.jpg",revision:"6dd7cc59640ac47d644afa8c28a08f58"},{url:"/imgsSmaller/css3-cursors.jpg",revision:"727f11dfd88ef17a894515b8655a6866"},{url:"/imgsSmaller/custom-elementsv1.jpg",revision:"650cf9939e07e2f87e6c46958ef30a8c"},{url:"/imgsSmaller/document-policy.jpg",revision:"4f0ad88630df4be67eb4756007d62a8d"},{url:"/imgsSmaller/fullscreen.jpg",revision:"5ffe6f505904b103f66b7931215ac1f6"},{url:"/imgsSmaller/gyroscope.jpg",revision:"542c4ff0ab674622ac19a11e2e9d6fca"},{url:"/imgsSmaller/http3.jpg",revision:"b994c728505adca2e5885dda88304d10"},{url:"/imgsSmaller/imagecapture.jpg",revision:"a1aa3daf8df1914202d038f6cd417b4c"},{url:"/imgsSmaller/input-datetime.jpg",revision:"094c4e603d404fdd8698ea9b8ee690dc"},{url:"/imgsSmaller/intersectionobserver-v2.jpg",revision:"86d26b72c661d42f2d2080a85ff809da"},{url:"/imgsSmaller/link-icon-svg.jpg",revision:"b580db42653a2f42f3cad1847698ff93"},{url:"/imgsSmaller/link-rel-prefetch.jpg",revision:"80677a408dc7704feed4e92eb8d04597"},{url:"/imgsSmaller/link-rel-prerender.jpg",revision:"4b4590870ca2f66daa1c8a6765d97703"},{url:"/imgsSmaller/mediacapture-fromelement.jpg",revision:"d9d529b4592af86da1498ec63c83b24d"},{url:"/imgsSmaller/mediasource.jpg",revision:"5e328a29fd0540d1a91152c660df6258"},{url:"/imgsSmaller/midi.jpg",revision:"36a94e715edd6c2d53704838a73e0ce2"},{url:"/imgsSmaller/missing-image.jpg",revision:"25238df89dc53bc92fd0cf9b3b30088d"},{url:"/imgsSmaller/netinfo.jpg",revision:"f92f0d15736a4b8699fdabc6c00672a8"},{url:"/imgsSmaller/notifications.jpg",revision:"d6ad560869cf995c7d52895f398abd65"},{url:"/imgsSmaller/ogg-vorbis.jpg",revision:"4ec4ffd740d6a28da7ec57dcf177e21c"},{url:"/imgsSmaller/opus.jpg",revision:"8886a96351cf194da27395e776adbc2b"},{url:"/imgsSmaller/orientation-sensor.jpg",revision:"3f6153f807938ed8ee315eb44175b72a"},{url:"/imgsSmaller/permissions-policy.jpg",revision:"ed87ac89ce2540cdfc77d00090765c78"},{url:"/imgsSmaller/pointerlock.jpg",revision:"526ea1b9bdacf9f0fa5a1b2f340513de"},{url:"/imgsSmaller/push-api.jpg",revision:"8df4215809f991fb41749219be0db3e1"},{url:"/imgsSmaller/selection-api.jpg",revision:"fbb38195c04a79516930639d1a6f145b"},{url:"/imgsSmaller/srcset.jpg",revision:"6ff01c59883ced930fc8568f7486fc44"},{url:"/imgsSmaller/trusted-types.jpg",revision:"c70d9b70adae98f6adaabca1a2eae80f"},{url:"/imgsSmaller/vibration.jpg",revision:"52a2229bcd5c504ac29a56b68c146339"},{url:"/imgsSmaller/view-transitions.jpg",revision:"fabf4160cc63dde455aefa2bb52f6ee2"},{url:"/imgsSmaller/web-bluetooth.jpg",revision:"28c11561f795dfcf1dda1832a5285d25"},{url:"/imgsSmaller/webcodecs.jpg",revision:"5a388101f3c6db525eda744480410009"},{url:"/imgsSmaller/webnfc.jpg",revision:"0fcaf8b59b181485faef88e39e0a6de5"},{url:"/imgsSmaller/webtransport.jpg",revision:"a15b2ca26532bf649be3f5063049de87"},{url:"/imgsSmaller/webusb.jpg",revision:"c637615464b910b9c8ebf50a6a2bc3be"},{url:"/imgsSmaller/webxr.jpg",revision:"c229292729aafc8369dc82a2a3a6e790"},{url:"/light-mode-favicon.ico",revision:"048b05b1becf31126c6029ddb4f047c1"},{url:"/manifest.json",revision:"e32b91926511ef04ae7f291e70094bf5"},{url:"/milkcarton-texture-bake-dark8.jpg",revision:"b6dc5c2670781d692368ffa7b8fb0410"},{url:"/milkcarton-texture-bake-dark8.png",revision:"845b6991a4fda9844c939d4ec3a41a64"},{url:"/milkcarton-texture-bake-light5.jpg",revision:"b3450b44f927bea805469e54b4a08657"},{url:"/milkcarton-texture-bake-light5.png",revision:"86e67df2afef85b0a37f3ecf52b9f362"},{url:"/milkcartons-noart.glb",revision:"fed637239cadc59b6448198673d7ea35"},{url:"/service-worker.js",revision:"e62486295c5c89fc4a84b3dd61971452"},{url:"/service-worker.js.map",revision:"345313d5db3bdb5d477a0928f5c1117a"},{url:"/sprites/spritesheet.jpg",revision:"7b75c5a262d529dbe04e7a7edc09a276"},{url:"/sprites/spritesheet.json",revision:"89b438e5815f9e7f335cd07bbac5f3e2"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:i,event:r,state:a})=>i&&"opaqueredirect"===i.type?new Response(i.body,{status:200,statusText:"OK",headers:i.headers}):i},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const i=e.pathname;return!i.startsWith("/api/auth/")&&!!i.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));
