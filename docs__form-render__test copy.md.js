(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{"0zqC":function(b,i,a){"use strict";a.r(i);var l=a("tJVT"),o=a("q1tI"),t=a.n(o),E=a("k3GJ"),u=a("MZF8"),r=a("dEAq"),C=a.n(r),B=a("ZpkN"),L=a("TIsu"),ne=a.n(L);function f(v,c){var s,d=(s=v.match(/\.(\w+)$/))===null||s===void 0?void 0:s[1];return d||(d=c.tsx?"tsx":"jsx"),d}var U=v=>{var c,s,d,P=Object(o.useRef)(),x=Object(o.useContext)(r.context),M=x.locale,e=Object(r.useLocaleProps)(M,v),N=Object(r.useDemoUrl)(e.identifier),D=e.demoUrl||N,K=(u.a===null||u.a===void 0?void 0:u.a.location.hash)==="#".concat(e.identifier),W=Object.keys(e.sources).length===1,h=Object(r.useCodeSandbox)((c=e.hideActions)!==null&&c!==void 0&&c.includes("CSB")?null:e),y=Object(r.useRiddle)((s=e.hideActions)!==null&&s!==void 0&&s.includes("RIDDLE")?null:e),w=Object(r.useMotions)(e.motions||[],P.current),S=Object(l.default)(w,2),F=S[0],$=S[1],J=Object(r.useCopy)(),j=Object(l.default)(J,2),k=j[0],z=j[1],G=Object(o.useState)("_"),A=Object(l.default)(G,2),m=A[0],X=A[1],Z=Object(o.useState)(f(m,e.sources[m])),T=Object(l.default)(Z,2),O=T[0],H=T[1],V=Object(o.useState)(Boolean(e.defaultShowCode)),g=Object(l.default)(V,2),_=g[0],Q=g[1],Y=Object(o.useState)(Math.random()),R=Object(l.default)(Y,2),q=R[0],I=R[1],p=e.sources[m][O]||e.sources[m].content,ee=Object(r.useTSPlaygroundUrl)(M,p),te=Object(o.useRef)(),ae=Object(r.usePrefersColor)(),oe=Object(l.default)(ae,1),re=oe[0];Object(o.useEffect)(()=>{I(Math.random())},[re]);function le(n){X(n),H(f(n,e.sources[n]))}return t.a.createElement("div",{style:e.style,className:[e.className,"__dumi-default-previewer",K?"__dumi-default-previewer-target":""].filter(Boolean).join(" "),id:e.identifier,"data-debug":e.debug||void 0,"data-iframe":e.iframe||void 0},e.iframe&&t.a.createElement("div",{className:"__dumi-default-previewer-browser-nav"}),t.a.createElement("div",{ref:P,className:"__dumi-default-previewer-demo",style:{transform:e.transform?"translate(0, 0)":void 0,padding:e.compact||e.iframe&&e.compact!==!1?"0":void 0,background:e.background}},e.iframe?t.a.createElement("iframe",{title:"dumi-previewer",style:{height:String(e.iframe).replace(/(\d)$/,"$1px")},key:q,src:D,ref:te}):e.children),t.a.createElement("div",{className:"__dumi-default-previewer-desc","data-title":e.title},e.title&&t.a.createElement(r.AnchorLink,{to:"#".concat(e.identifier)},e.title),e.description&&t.a.createElement("div",{dangerouslySetInnerHTML:{__html:e.description}})),t.a.createElement("div",{className:"__dumi-default-previewer-actions"},h&&t.a.createElement("button",{title:"Open demo on CodeSandbox.io",className:"__dumi-default-icon",role:"codesandbox",onClick:h}),y&&t.a.createElement("button",{title:"Open demo on Riddle",className:"__dumi-default-icon",role:"riddle",onClick:y}),e.motions&&t.a.createElement("button",{title:"Execute motions",className:"__dumi-default-icon",role:"motions",disabled:$,onClick:()=>F()}),e.iframe&&t.a.createElement("button",{title:"Reload demo iframe page",className:"__dumi-default-icon",role:"refresh",onClick:()=>I(Math.random())}),!((d=e.hideActions)!==null&&d!==void 0&&d.includes("EXTERNAL"))&&t.a.createElement(r.Link,{target:"_blank",to:D},t.a.createElement("button",{title:"Open demo in new tab",className:"__dumi-default-icon",role:"open-demo",type:"button"})),t.a.createElement("span",null),t.a.createElement("button",{title:"Copy source code",className:"__dumi-default-icon",role:"copy","data-status":z,onClick:()=>k(p)}),O==="tsx"&&_&&t.a.createElement(r.Link,{target:"_blank",to:ee},t.a.createElement("button",{title:"Get JSX via TypeScript Playground",className:"__dumi-default-icon",role:"change-tsx",type:"button"})),t.a.createElement("button",{title:"Toggle source code panel",className:"__dumi-default-icon".concat(_?" __dumi-default-btn-expand":""),role:"source",type:"button",onClick:()=>Q(!_)})),_&&t.a.createElement("div",{className:"__dumi-default-previewer-source-wrapper"},!W&&t.a.createElement(E.default,{className:"__dumi-default-previewer-source-tab",prefixCls:"__dumi-default-tabs",moreIcon:"\xB7\xB7\xB7",defaultActiveKey:m,onChange:le},Object.keys(e.sources).map(n=>t.a.createElement(E.TabPane,{tab:n==="_"?"index.".concat(f(n,e.sources[n])):n,key:n}))),t.a.createElement("div",{className:"__dumi-default-previewer-source"},t.a.createElement(B.a,{code:p,lang:O,showCopy:!1}))))};i.default=U},TIsu:function(b,i,a){},scie:function(b,i,a){"use strict";a.r(i);var l=a("q1tI"),o=a.n(l),t=a("dEAq"),E=a.n(t),u=a("0zqC"),r=a("JjdP"),C=o.a.memo(r.default["test copy-demo"].component);i.default=function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"markdown"}),o.a.createElement(u.default,r.default["test copy-demo"].previewerProps,o.a.createElement(C,null))))}}}]);
