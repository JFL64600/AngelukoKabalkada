var Oe=Object.defineProperty;var Re=(i,e,t)=>e in i?Oe(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var M=(i,e,t)=>Re(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const z=globalThis,Y=z.ShadowRoot&&(z.ShadyCSS===void 0||z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Z=Symbol(),ne=new WeakMap;let be=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==Z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Y&&e===void 0){const n=t!==void 0&&t.length===1;n&&(e=ne.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&ne.set(t,e))}return e}toString(){return this.cssText}};const Me=i=>new be(typeof i=="string"?i:i+"",void 0,Z),ee=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((n,s,r)=>n+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+i[r+1],i[0]);return new be(t,i,Z)},Ne=(i,e)=>{if(Y)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const n=document.createElement("style"),s=z.litNonce;s!==void 0&&n.setAttribute("nonce",s),n.textContent=t.cssText,i.appendChild(n)}},ie=Y?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return Me(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ze,defineProperty:Ie,getOwnPropertyDescriptor:je,getOwnPropertyNames:De,getOwnPropertySymbols:qe,getPrototypeOf:Be}=Object,_=globalThis,re=_.trustedTypes,Ve=re?re.emptyScript:"",B=_.reactiveElementPolyfillSupport,P=(i,e)=>i,J={toAttribute(i,e){switch(e){case Boolean:i=i?Ve:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},ye=(i,e)=>!ze(i,e),oe={attribute:!0,type:String,converter:J,reflect:!1,hasChanged:ye};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),_.litPropertyMetadata??(_.litPropertyMetadata=new WeakMap);class E extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=oe){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){const n=Symbol(),s=this.getPropertyDescriptor(e,n,t);s!==void 0&&Ie(this.prototype,e,s)}}static getPropertyDescriptor(e,t,n){const{get:s,set:r}=je(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get(){return s==null?void 0:s.call(this)},set(o){const l=s==null?void 0:s.call(this);r.call(this,o),this.requestUpdate(e,l,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??oe}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;const e=Be(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){const t=this.properties,n=[...De(t),...qe(t)];for(const s of n)this.createProperty(s,t[s])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[n,s]of t)this.elementProperties.set(n,s)}this._$Eh=new Map;for(const[t,n]of this.elementProperties){const s=this._$Eu(t,n);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const s of n)t.unshift(ie(s))}else e!==void 0&&t.push(ie(e));return t}static _$Eu(e,t){const n=t.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ne(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var n;return(n=t.hostConnected)==null?void 0:n.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var n;return(n=t.hostDisconnected)==null?void 0:n.call(t)})}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$EC(e,t){var r;const n=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,n);if(s!==void 0&&n.reflect===!0){const o=(((r=n.converter)==null?void 0:r.toAttribute)!==void 0?n.converter:J).toAttribute(t,n.type);this._$Em=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){var r;const n=this.constructor,s=n._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const o=n.getPropertyOptions(s),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((r=o.converter)==null?void 0:r.fromAttribute)!==void 0?o.converter:J;this._$Em=s,this[s]=l.fromAttribute(t,o.type),this._$Em=null}}requestUpdate(e,t,n){if(e!==void 0){if(n??(n=this.constructor.getPropertyOptions(e)),!(n.hasChanged??ye)(this[e],t))return;this.P(e,t,n)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,t,n){this._$AL.has(e)||this._$AL.set(e,t),n.reflect===!0&&this._$Em!==e&&(this._$Ej??(this._$Ej=new Set)).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var n;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[r,o]of s)o.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.P(r,this[r],o)}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(n=this._$EO)==null||n.forEach(s=>{var r;return(r=s.hostUpdate)==null?void 0:r.call(s)}),this.update(t)):this._$EU()}catch(s){throw e=!1,this._$EU(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(n=>{var s;return(s=n.hostUpdated)==null?void 0:s.call(n)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&(this._$Ej=this._$Ej.forEach(t=>this._$EC(t,this[t]))),this._$EU()}updated(e){}firstUpdated(e){}}E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[P("elementProperties")]=new Map,E[P("finalized")]=new Map,B==null||B({ReactiveElement:E}),(_.reactiveElementVersions??(_.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const L=globalThis,I=L.trustedTypes,ae=I?I.createPolicy("lit-html",{createHTML:i=>i}):void 0,ve="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,Ae="?"+$,We=`<${Ae}>`,w=document,U=()=>w.createComment(""),T=i=>i===null||typeof i!="object"&&typeof i!="function",te=Array.isArray,Fe=i=>te(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",V=`[ 	
\f\r]`,C=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,le=/-->/g,ce=/>/g,b=RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),de=/'/g,he=/"/g,we=/^(?:script|style|textarea|title)$/i,Ke=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),S=Ke(1),x=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),ue=new WeakMap,v=w.createTreeWalker(w,129);function Ee(i,e){if(!te(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return ae!==void 0?ae.createHTML(e):e}const Qe=(i,e)=>{const t=i.length-1,n=[];let s,r=e===2?"<svg>":e===3?"<math>":"",o=C;for(let l=0;l<t;l++){const a=i[l];let d,h,c=-1,f=0;for(;f<a.length&&(o.lastIndex=f,h=o.exec(a),h!==null);)f=o.lastIndex,o===C?h[1]==="!--"?o=le:h[1]!==void 0?o=ce:h[2]!==void 0?(we.test(h[2])&&(s=RegExp("</"+h[2],"g")),o=b):h[3]!==void 0&&(o=b):o===b?h[0]===">"?(o=s??C,c=-1):h[1]===void 0?c=-2:(c=o.lastIndex-h[2].length,d=h[1],o=h[3]===void 0?b:h[3]==='"'?he:de):o===he||o===de?o=b:o===le||o===ce?o=C:(o=b,s=void 0);const p=o===b&&i[l+1].startsWith("/>")?" ":"";r+=o===C?a+We:c>=0?(n.push(d),a.slice(0,c)+ve+a.slice(c)+$+p):a+$+(c===-2?l:p)}return[Ee(i,r+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]};class H{constructor({strings:e,_$litType$:t},n){let s;this.parts=[];let r=0,o=0;const l=e.length-1,a=this.parts,[d,h]=Qe(e,t);if(this.el=H.createElement(d,n),v.currentNode=this.el.content,t===2||t===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=v.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const c of s.getAttributeNames())if(c.endsWith(ve)){const f=h[o++],p=s.getAttribute(c).split($),R=/([.?@])?(.*)/.exec(f);a.push({type:1,index:r,name:R[2],strings:p,ctor:R[1]==="."?Xe:R[1]==="?"?Ge:R[1]==="@"?Ye:q}),s.removeAttribute(c)}else c.startsWith($)&&(a.push({type:6,index:r}),s.removeAttribute(c));if(we.test(s.tagName)){const c=s.textContent.split($),f=c.length-1;if(f>0){s.textContent=I?I.emptyScript:"";for(let p=0;p<f;p++)s.append(c[p],U()),v.nextNode(),a.push({type:2,index:++r});s.append(c[f],U())}}}else if(s.nodeType===8)if(s.data===Ae)a.push({type:2,index:r});else{let c=-1;for(;(c=s.data.indexOf($,c+1))!==-1;)a.push({type:7,index:r}),c+=$.length-1}r++}}static createElement(e,t){const n=w.createElement("template");return n.innerHTML=e,n}}function k(i,e,t=i,n){var o,l;if(e===x)return e;let s=n!==void 0?(o=t._$Co)==null?void 0:o[n]:t._$Cl;const r=T(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==r&&((l=s==null?void 0:s._$AO)==null||l.call(s,!1),r===void 0?s=void 0:(s=new r(i),s._$AT(i,t,n)),n!==void 0?(t._$Co??(t._$Co=[]))[n]=s:t._$Cl=s),s!==void 0&&(e=k(i,s._$AS(i,e.values),s,n)),e}class Je{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:n}=this._$AD,s=((e==null?void 0:e.creationScope)??w).importNode(t,!0);v.currentNode=s;let r=v.nextNode(),o=0,l=0,a=n[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new O(r,r.nextSibling,this,e):a.type===1?d=new a.ctor(r,a.name,a.strings,this,e):a.type===6&&(d=new Ze(r,this,e)),this._$AV.push(d),a=n[++l]}o!==(a==null?void 0:a.index)&&(r=v.nextNode(),o++)}return v.currentNode=w,s}p(e){let t=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class O{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,n,s){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=k(this,e,t),T(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==x&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Fe(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==u&&T(this._$AH)?this._$AA.nextSibling.data=e:this.T(w.createTextNode(e)),this._$AH=e}$(e){var r;const{values:t,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=H.createElement(Ee(n.h,n.h[0]),this.options)),n);if(((r=this._$AH)==null?void 0:r._$AD)===s)this._$AH.p(t);else{const o=new Je(s,this),l=o.u(this.options);o.p(t),this.T(l),this._$AH=o}}_$AC(e){let t=ue.get(e.strings);return t===void 0&&ue.set(e.strings,t=new H(e)),t}k(e){te(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,s=0;for(const r of e)s===t.length?t.push(n=new O(this.O(U()),this.O(U()),this,this.options)):n=t[s],n._$AI(r),s++;s<t.length&&(this._$AR(n&&n._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var n;for((n=this._$AP)==null?void 0:n.call(this,!1,!0,t);e&&e!==this._$AB;){const s=e.nextSibling;e.remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,s,r){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=r,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=u}_$AI(e,t=this,n,s){const r=this.strings;let o=!1;if(r===void 0)e=k(this,e,t,0),o=!T(e)||e!==this._$AH&&e!==x,o&&(this._$AH=e);else{const l=e;let a,d;for(e=r[0],a=0;a<r.length-1;a++)d=k(this,l[n+a],t,a),d===x&&(d=this._$AH[a]),o||(o=!T(d)||d!==this._$AH[a]),d===u?e=u:e!==u&&(e+=(d??"")+r[a+1]),this._$AH[a]=d}o&&!s&&this.j(e)}j(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Xe extends q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===u?void 0:e}}class Ge extends q{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==u)}}class Ye extends q{constructor(e,t,n,s,r){super(e,t,n,s,r),this.type=5}_$AI(e,t=this){if((e=k(this,e,t,0)??u)===x)return;const n=this._$AH,s=e===u&&n!==u||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,r=e!==u&&(n===u||s);s&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Ze{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){k(this,e)}}const W=L.litHtmlPolyfillSupport;W==null||W(H,O),(L.litHtmlVersions??(L.litHtmlVersions=[])).push("3.2.1");const et=(i,e,t)=>{const n=(t==null?void 0:t.renderBefore)??e;let s=n._$litPart$;if(s===void 0){const r=(t==null?void 0:t.renderBefore)??null;n._$litPart$=s=new O(e.insertBefore(U(),r),r,void 0,t??{})}return s._$AI(i),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class A extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=et(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return x}}var _e;A._$litElement$=!0,A.finalized=!0,(_e=globalThis.litElementHydrateSupport)==null||_e.call(globalThis,{LitElement:A});const F=globalThis.litElementPolyfillSupport;F==null||F({LitElement:A});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.1");/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const X="lit-localize-status";/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const tt=i=>typeof i!="string"&&"strTag"in i,Se=(i,e,t)=>{let n=i[0];for(let s=1;s<i.length;s++)n+=e[t?t[s-1]:s-1],n+=i[s];return n};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const xe=i=>tt(i)?Se(i.strings,i.values):i;let g=xe,fe=!1;function st(i){if(fe)throw new Error("lit-localize can only be configured once");g=i,fe=!0}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class nt{constructor(e){this.__litLocalizeEventHandler=t=>{t.detail.status==="ready"&&this.host.requestUpdate()},this.host=e}hostConnected(){window.addEventListener(X,this.__litLocalizeEventHandler)}hostDisconnected(){window.removeEventListener(X,this.__litLocalizeEventHandler)}}const it=i=>i.addController(new nt(i)),se=it;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ke{constructor(){this.settled=!1,this.promise=new Promise((e,t)=>{this._resolve=e,this._reject=t})}resolve(e){this.settled=!0,this._resolve(e)}reject(e){this.settled=!0,this._reject(e)}}/**
 * @license
 * Copyright 2014 Travis Webb
 * SPDX-License-Identifier: MIT
 */const m=[];for(let i=0;i<256;i++)m[i]=(i>>4&15).toString(16)+(i&15).toString(16);function rt(i){let e=0,t=8997,n=0,s=33826,r=0,o=40164,l=0,a=52210;for(let d=0;d<i.length;d++)t^=i.charCodeAt(d),e=t*435,n=s*435,r=o*435,l=a*435,r+=t<<8,l+=s<<8,n+=e>>>16,t=e&65535,r+=n>>>16,s=n&65535,a=l+(r>>>16)&65535,o=r&65535;return m[a>>8]+m[a&255]+m[o>>8]+m[o&255]+m[s>>8]+m[s&255]+m[t>>8]+m[t&255]}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ot="",at="h",lt="s";function ct(i,e){return(e?at:lt)+rt(typeof i=="string"?i:i.join(ot))}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pe=new WeakMap,ge=new Map;function dt(i,e,t){if(i){const n=(t==null?void 0:t.id)??ht(e),s=i[n];if(s){if(typeof s=="string")return s;if("strTag"in s)return Se(s.strings,e.values,s.values);{let r=pe.get(s);return r===void 0&&(r=s.values,pe.set(s,r)),{...s,values:r.map(o=>e.values[o])}}}}return xe(e)}function ht(i){const e=typeof i=="string"?i:i.strings;let t=ge.get(e);return t===void 0&&(t=ct(e,typeof i!="string"&&!("strTag"in i)),ge.set(e,t)),t}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function K(i){window.dispatchEvent(new CustomEvent(X,{detail:i}))}let j="",Q,Ce,D,G,Pe,y=new ke;y.resolve();let N=0;const ut=i=>(st((e,t)=>dt(Pe,e,t)),j=Ce=i.sourceLocale,D=new Set(i.targetLocales),D.add(i.sourceLocale),G=i.loadLocale,{getLocale:ft,setLocale:pt}),ft=()=>j,pt=i=>{if(i===(Q??j))return y.promise;if(!D||!G)throw new Error("Internal error");if(!D.has(i))throw new Error("Invalid locale code");N++;const e=N;return Q=i,y.settled&&(y=new ke),K({status:"loading",loadingLocale:i}),(i===Ce?Promise.resolve({templates:void 0}):G(i)).then(n=>{N===e&&(j=i,Q=void 0,Pe=n.templates,K({status:"ready",readyLocale:i}),y.resolve())},n=>{N===e&&(K({status:"error",errorLocale:i,errorMessage:n.toString()}),y.reject(n))}),y.promise},gt="modulepreload",mt=function(i){return"/"+i},me={},$t=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));s=Promise.allSettled(t.map(a=>{if(a=mt(a),a in me)return;me[a]=!0;const d=a.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${h}`))return;const c=document.createElement("link");if(c.rel=d?"stylesheet":gt,d||(c.as="script"),c.crossOrigin="",c.href=a,l&&c.setAttribute("nonce",l),document.head.appendChild(c),d)return new Promise((f,p)=>{c.addEventListener("load",f),c.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${a}`)))})}))}function r(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return s.then(o=>{for(const l of o||[])l.status==="rejected"&&r(l.reason);return e().catch(r)})},_t=(i,e,t)=>{const n=i[e];return n?typeof n=="function"?n():Promise.resolve(n):new Promise((s,r)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(r.bind(null,new Error("Unknown variable dynamic import: "+e+(e.split("/").length!==t?". Note that variables only represent file names one level deep.":""))))})},Le="fr",bt=["eu"],yt=["eu","fr"],{getLocale:$e,setLocale:vt}=ut({sourceLocale:Le,targetLocales:bt,loadLocale:i=>_t(Object.assign({"./generated/locales/eu.js":()=>$t(()=>import("./eu-_t7kW-Op.js"),[])}),`./generated/locales/${i}.js`,4)}),At=async()=>{const e=new URL(window.location.href).searchParams.get("locale")||Le;await vt(e)},wt={fr:"FR",eu:"EUS"};class Ue extends A{constructor(){super(),se(this)}render(){return S`<header>
      <h1>
        <span class="titleCity">Angeluko</span>
        <span class="titleEvent">Kabalkada</span>
        <span class="titleYear">2026</span>
      </h1>
      <ul class="keep-inform">
        <li>
          <a target="_blank" href="https://forms.gle/s53DK9ChXnxEc81D6">
            ${g("Je veux rester informé")}
          </a>
        </li>
        <li>
          <a
            target="_blank"
            class="link-icon"
            href="https://www.instagram.com/angeluko_kabalkada/?igsh=dXgyb3VweGV0N3lr"
            title="Instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="currentColor"
              class="bi bi-instagram"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"
              />
            </svg>
          </a>
        </li>
        <li>
          <a
            target="_blank"
            class="link-icon"
            href="https://www.facebook.com/people/Angeluko-Kabalkada/61571618303612/?mibextid=LQQJ4d&rdid=D5bRI0r7KI6lMrj2&share_url=https://www.facebook.com/share/1BFLgUouEf/?mibextid=LQQJ4d"
            title="Facebook"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="currentColor"
              class="bi bi-facebook"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"
              />
            </svg>
          </a>
        </li>
      </ul>
      <ul class="language-switcher">
        ${yt.map(e=>S`<li>
              <button
                @click=${this.localeClicked}
                data-value="${e}"
                class="${e===$e()?"selected":""}"
              >
                ${wt[e]}
              </button>
            </li>`)}
      </ul>
    </header>`}localeClicked(e){const t=e.target.dataset.value;if(t!==$e()){const n=new URL(window.location.href);n.searchParams.set("locale",t),window.history.pushState(null,"",n.toString()),At()}}}M(Ue,"styles",ee`
    header {
      background-color: var(--bg-color-header);
      padding: 1em;
      display: grid;
      align-items: center;

      @media screen and (min-width: 768px) {
        grid-template-columns: 1fr 1fr 1fr;
      }

      h1 {
        margin: 0;
        font-size: 1em;
      }
    }

    .titleCity {
      line-height: 100%;
      letter-spacing: -0.125rem;
      margin: 0;
      font-size: 3rem;
      color: var(--grey-color);
      font-weight: 500;
    }

    .titleEvent {
      line-height: 100%;
      letter-spacing: -0.125rem;
      margin: 0;
      font-size: 3rem;
      color: var(--red-color);
      font-weight: bold;
    }

    .titleYear {
      line-height: 100%;
      letter-spacing: -0.125rem;
      margin: 0;
      font-size: 3.125rem;
      color: var(--pink-color);
      font-weight: bold;
    }

    .language-switcher {
      list-style: none;
      padding: 0;
      text-align: right;

      li {
        display: inline-block;
        margin-right: 10px;
        font-weight: bold;
        font-size: 1.25rem;

        button {
          color: var(--red-color);
          text-decoration: none;
          background: none;
          border: none;
          font-weight: bold;
          font-size: 1.25rem;

          &:not(.selected):hover,
          &:not(.selected):focus-visible {
            text-decoration: underline;
          }

          &.selected {
            color: var(--grey-color);
            cursor: default;
          }
        }
      }
    }

    .keep-inform {
      list-style: none;
      padding: 0;
      text-align: center;

      li {
        display: inline-block;
        margin-right: 10px;
        color: var(--green-color);
        font-weight: bold;
        font-size: 1.25rem;

        a {
          color: inherit;
          text-decoration: none;

          &:hover,
          &:focus-visible {
            text-decoration: underline;
          }
        }

        .link-icon {
          font-size: 1.3em;
          transition: transform 0.3s;
          display: inline-block;

          &:hover,
          &:focus-visible {
            transform: rotate(10deg);
            color: var(--red-color);
          }
        }
      }
    }
  `);customElements.define("ak-header",Ue);class Te extends A{constructor(){super(),se(this)}render(){return S`<main>
      <div class="div-bg"></div>
      <div class="content">
        ${g(S`Le groupe de danse traditionnelle
            <i><b>Angeluarrak</b></i> fêtera en 2026 ses 60 ans d'existence et
            d'engagement dans la préservation des traditions basques à travers
            la danse. Pour marquer cet anniversaire, le groupe s'associe aux
            associations angloys et organise une grande cavalcade qui
            rassemblera petits et grands dans un moment festif.`)}
      </div>
      <div class="content">&nbsp;</div>
      <div class="content">
        ${g(S`Cet événement culturel <b>important</b> est une occasion unique
            de célébrer l'histoire d&quot;<i><b>Angeluarrak</b></i> et de
            renforcer les liens entre les différentes associations d'Anglet,
            tout en mettant à l'honneur la richesse et la diversité du
            patrimoine local. La cavalcade promet d'être un temps fort dans le
            calendrier culturel de la ville, offrant aux habitants et aux
            visiteurs une immersion dans les traditions basques à travers des
            danses, des costumes, des musiques et du théâtre.`)}
      </div>
    </main>`}}M(Te,"styles",ee`
    main {
      padding: 20px;
      color: var(--black-color);
      position: relative;

      @media screen and (min-width: 768px) {
        padding-right: calc(50% + 110px);
      }
    }

    .div-bg {
      background: linear-gradient(
        to bottom,
        var(--bg-color-main) 50%,
        color-mix(in srgb, var(--black-color) 50%, var(--bg-color-main)) 100%
      );
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;

      @media screen and (min-width: 768px) {
        background:
          linear-gradient(
            to bottom,
            transparent 50%,
            color-mix(in srgb, var(--black-color) 50%, transparent) 100%
          ),
          url("/images/back.jpeg") no-repeat bottom;
        background-size: cover;
      }
    }

    .content {
      font-size: 1.25rem;
    }
  `);customElements.define("ak-main-index",Te);class He extends A{constructor(){super(),se(this)}render(){return S`<footer>
      <div>
        <h3>${g("Références")}</h3>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://www.eke.eus/fr/culture-basque/theatre-basque/charivaris-ou-toberak"
              >${g("Les charivaris ou Toberak")}</a
            >
          </li>
        </ul>
      </div>
      <div>
        <h3>${g("Actualités")}</h3>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://gureirratia.eus/berriak/4229-_kabalkadaren_helburua_da_angeluko_jendea_elkartzea_eta_denen_artean_euskara_sustengatu_eta_plazaratzea_"
              >${g("Le but de la cavalcade est de rassembler les habitants d'Anglet... (Gure Irratia)")}</a
            >
          </li>
          <li>
            <a
              target="_blank"
              href="https://www.mediabask.eus/fr/info_mbsk/20250113/anglet-aura-sa-cavalcade-en-septembre"
              >${g("Anglet aura sa cavalcade en septembre 2026 (mediabask)")}</a
            >
          </li>
        </ul>
      </div>
      <div>
        <h3>${g("Communautés")}</h3>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://www.instagram.com/angeluko_kabalkada/?igsh=dXgyb3VweGV0N3lr"
              >Instagram</a
            >
          </li>
          <li>
            <a
              target="_blank"
              href="https://www.facebook.com/people/Angeluko-Kabalkada/61571618303612/?mibextid=LQQJ4d&rdid=D5bRI0r7KI6lMrj2&share_url=https://www.facebook.com/share/1BFLgUouEf/?mibextid=LQQJ4d"
              >Facebook</a
            >
          </li>
        </ul>
      </div>
    </footer>`}}M(He,"styles",ee`
    footer {
      background-color: var(--bg-color-footer);
      padding: 1em;
      min-height: 120px;
      display: flex;
      flex-direction: column;

      @media screen and (min-width: 768px) {
        flex-direction: row;
        justify-content: space-around;
      }

      h3 {
        color: var(--red-color);
      }

      ul {
        list-style: none;
        padding: 0;
        color: var(--grey-color);
        margin-top: 0;

        li {
          display: inline-block;

          a {
            color: inherit;
            text-decoration: none;
            margin-left: 25px;

            &:hover,
            &:focus-visible {
              text-decoration: underline;
            }
          }
        }
      }
    }
  `);customElements.define("ak-footer",He);export{S as x};
