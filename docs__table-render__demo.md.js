(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{"0zqC":function(b,i,a){"use strict";a.r(i);var n=a("tJVT"),r=a("q1tI"),t=a.n(r),E=a("k3GJ"),u=a("MZF8"),o=a("dEAq"),C=a.n(o),B=a("ZpkN"),L=a("TIsu"),le=a.n(L);function f(v,c){var d,s=(d=v.match(/\.(\w+)$/))===null||d===void 0?void 0:d[1];return s||(s=c.tsx?"tsx":"jsx"),s}var U=v=>{var c,d,s,P=Object(r.useRef)(),x=Object(r.useContext)(o.context),M=x.locale,e=Object(o.useLocaleProps)(M,v),N=Object(o.useDemoUrl)(e.identifier),D=e.demoUrl||N,K=(u.a===null||u.a===void 0?void 0:u.a.location.hash)==="#".concat(e.identifier),W=Object.keys(e.sources).length===1,h=Object(o.useCodeSandbox)((c=e.hideActions)!==null&&c!==void 0&&c.includes("CSB")?null:e),y=Object(o.useRiddle)((d=e.hideActions)!==null&&d!==void 0&&d.includes("RIDDLE")?null:e),w=Object(o.useMotions)(e.motions||[],P.current),A=Object(n.default)(w,2),F=A[0],$=A[1],J=Object(o.useCopy)(),S=Object(n.default)(J,2),k=S[0],z=S[1],G=Object(r.useState)("_"),j=Object(n.default)(G,2),_=j[0],X=j[1],Z=Object(r.useState)(f(_,e.sources[_])),T=Object(n.default)(Z,2),O=T[0],H=T[1],V=Object(r.useState)(Boolean(e.defaultShowCode)),g=Object(n.default)(V,2),m=g[0],Q=g[1],Y=Object(r.useState)(Math.random()),R=Object(n.default)(Y,2),q=R[0],I=R[1],p=e.sources[_][O]||e.sources[_].content,ee=Object(o.useTSPlaygroundUrl)(M,p),te=Object(r.useRef)(),ae=Object(o.usePrefersColor)(),re=Object(n.default)(ae,1),oe=re[0];Object(r.useEffect)(()=>{I(Math.random())},[oe]);function ne(l){X(l),H(f(l,e.sources[l]))}return t.a.createElement("div",{style:e.style,className:[e.className,"__dumi-default-previewer",K?"__dumi-default-previewer-target":""].filter(Boolean).join(" "),id:e.identifier,"data-debug":e.debug||void 0,"data-iframe":e.iframe||void 0},e.iframe&&t.a.createElement("div",{className:"__dumi-default-previewer-browser-nav"}),t.a.createElement("div",{ref:P,className:"__dumi-default-previewer-demo",style:{transform:e.transform?"translate(0, 0)":void 0,padding:e.compact||e.iframe&&e.compact!==!1?"0":void 0,background:e.background}},e.iframe?t.a.createElement("iframe",{title:"dumi-previewer",style:{height:String(e.iframe).replace(/(\d)$/,"$1px")},key:q,src:D,ref:te}):e.children),t.a.createElement("div",{className:"__dumi-default-previewer-desc","data-title":e.title},e.title&&t.a.createElement(o.AnchorLink,{to:"#".concat(e.identifier)},e.title),e.description&&t.a.createElement("div",{dangerouslySetInnerHTML:{__html:e.description}})),t.a.createElement("div",{className:"__dumi-default-previewer-actions"},h&&t.a.createElement("button",{title:"Open demo on CodeSandbox.io",className:"__dumi-default-icon",role:"codesandbox",onClick:h}),y&&t.a.createElement("button",{title:"Open demo on Riddle",className:"__dumi-default-icon",role:"riddle",onClick:y}),e.motions&&t.a.createElement("button",{title:"Execute motions",className:"__dumi-default-icon",role:"motions",disabled:$,onClick:()=>F()}),e.iframe&&t.a.createElement("button",{title:"Reload demo iframe page",className:"__dumi-default-icon",role:"refresh",onClick:()=>I(Math.random())}),!((s=e.hideActions)!==null&&s!==void 0&&s.includes("EXTERNAL"))&&t.a.createElement(o.Link,{target:"_blank",to:D},t.a.createElement("button",{title:"Open demo in new tab",className:"__dumi-default-icon",role:"open-demo",type:"button"})),t.a.createElement("span",null),t.a.createElement("button",{title:"Copy source code",className:"__dumi-default-icon",role:"copy","data-status":z,onClick:()=>k(p)}),O==="tsx"&&m&&t.a.createElement(o.Link,{target:"_blank",to:ee},t.a.createElement("button",{title:"Get JSX via TypeScript Playground",className:"__dumi-default-icon",role:"change-tsx",type:"button"})),t.a.createElement("button",{title:"Toggle source code panel",className:"__dumi-default-icon".concat(m?" __dumi-default-btn-expand":""),role:"source",type:"button",onClick:()=>Q(!m)})),m&&t.a.createElement("div",{className:"__dumi-default-previewer-source-wrapper"},!W&&t.a.createElement(E.default,{className:"__dumi-default-previewer-source-tab",prefixCls:"__dumi-default-tabs",moreIcon:"\xB7\xB7\xB7",defaultActiveKey:_,onChange:ne},Object.keys(e.sources).map(l=>t.a.createElement(E.TabPane,{tab:l==="_"?"index.".concat(f(l,e.sources[l])):l,key:l}))),t.a.createElement("div",{className:"__dumi-default-previewer-source"},t.a.createElement(B.a,{code:p,lang:O,showCopy:!1}))))};i.default=U},R1DA:function(b,i,a){"use strict";a.r(i);var n=a("q1tI"),r=a.n(n),t=a("dEAq"),E=a.n(t),u=a("0zqC"),o=a("JjdP"),C=r.a.memo(o.default["table-render-advanced"].component);i.default=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"markdown"}),r.a.createElement(u.default,o.default["table-render-advanced"].previewerProps,r.a.createElement(C,null))))}},TIsu:function(b,i,a){}}]);
