(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"===typeof document?document.currentScript:void 0,366564,e=>{e.i(593375);const t=e.i(418651);
const n=e.i(516637);
const r=e.i(126519);
const s=e.i(87371);
const o=e.i(772770);
const i=n;
const l=e.i(388926);class u extends i.Component{getSnapshotBeforeUpdate(e){const t=this.props.childRef.current;if(t&&e.isPresent&&!this.props.isPresent){const e=this.props.sizeRef.current;e.height=t.offsetHeight||0,e.width=t.offsetWidth||0,e.top=t.offsetTop,e.left=t.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function c({children:e,isPresent:n}){const r=(0,i.useId)();
const s=(0,i.useRef)(null);
const o=(0,i.useRef)({width:0,height:0,top:0,left:0});
const {nonce:c}=(0,i.useContext)(l.MotionConfigContext);return(0,i.useInsertionEffect)(()=>{const{width:e,height:t,top:i,left:l}=o.current;if(n||!s.current||!e||!t)return;s.current.dataset.motionPopId=r;const u=document.createElement("style");return c&&(u.nonce=c),document.head.appendChild(u),u.sheet?.insertRule(`
          [data-motion-pop-id="${r}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${t}px !important;
            top: ${i}px !important;
            left: ${l}px !important;
          }
        `),()=>{document.head.removeChild(u)}},[n]),(0,t.jsx)(u,{isPresent:n,childRef:s,sizeRef:o,children:i.cloneElement(e,{ref:s})})}const a=({children:e,initial:r,isPresent:i,onExitComplete:l,custom:u,presenceAffectsLayout:a,mode:d})=>{const f=(0,s.useConstant)(p);
const h=(0,n.useId)();
const m=(0,n.useCallback)(e=>{for(const t of(f.set(e,!0),f.values()))if(!t)return;l?.()},[f,l]);
const x=(0,n.useMemo)(()=>({id:h,initial:r,isPresent:i,custom:u,onExitComplete:m,register:e=>(f.set(e,!1),()=>f.delete(e))}),a?[Math.random(),m]:[i,m]);return(0,n.useMemo)(()=>{f.forEach((e,t)=>f.set(t,!1))},[i]),n.useEffect(()=>{i||f.size||!l||l()},[i]),"popLayout"===d&&(e=(0,t.jsx)(c,{isPresent:i,children:e})),(0,t.jsx)(o.PresenceContext.Provider,{value:x,children:e})};function p(){return new Map}const d=e.i(349869);const f=e=>e.key||"";function h(e){const t=[];return n.Children.forEach(e,e=>{(0,n.isValidElement)(e)&&t.push(e)}),t}const m=e.i(399449);const x=({children:e,custom:o,initial:i=!0,onExitComplete:l,presenceAffectsLayout:u=!0,mode:c="sync",propagate:p=!1})=>{const [x,C]=(0,d.usePresence)(p);
const g=(0,n.useMemo)(()=>h(e),[e]);
const P=p&&!x?[]:g.map(f);
const v=(0,n.useRef)(!0);
const E=(0,n.useRef)(g);
const R=(0,s.useConstant)(()=>new Map);
const [y,j]=(0,n.useState)(g);
const [M,w]=(0,n.useState)(g);(0,m.useIsomorphicLayoutEffect)(()=>{v.current=!1,E.current=g;for(let e=0;e<M.length;e++){const t=f(M[e]);P.includes(t)?R.delete(t):!0!==R.get(t)&&R.set(t,!1)}},[M,P.length,P.join("-")]);const b=[];if(g!==y){let e=[...g];for(let t=0;t<M.length;t++){const n=M[t];
const r=f(n);P.includes(r)||(e.splice(t,0,n),b.push(n))}"wait"===c&&b.length&&(e=b),w(h(e)),j(g);return}const{forceRender:I}=(0,n.useContext)(r.LayoutGroupContext);return(0,t.jsx)(t.Fragment,{children:M.map(e=>{const n=f(e);
const r=(!p||!!x)&&(g===M||P.includes(n));return(0,t.jsx)(a,{isPresent:r,initial:(!v.current||!!i)&&void 0,custom:r?void 0:o,presenceAffectsLayout:u,mode:c,onExitComplete:r?void 0:()=>{if(!R.has(n))return;R.set(n,!0);let e=!0;R.forEach(t=>{t||(e=!1)}),e&&(null==I||I(),w(E.current),p&&(null==C||C()),l?.())},children:e},n)})})};e.s(["AnimatePresence",()=>x],366564)}]);