import{u as C,r as l,A as D,a as F,j as e,e as I,L,B as q,b as g,c as A}from"./index-DLTgNBl2.js";import{N as _,e as B,l as P,g as $,s as M}from"./Notification-CsVqrqKI.js";const R="data:image/svg+xml,%3csvg%20width='10'%20height='8'%20viewBox='0%200%2010%208'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20id='Vector'%20d='M3.49693%208L0%204.2079L0.874233%203.25988L3.49693%206.10395L9.12577%200L10%200.948025L3.49693%208Z'%20fill='black'/%3e%3c/svg%3e",O=()=>{C("Sign In | SquareCraft");const{setUserState:w}=l.useContext(D),j=F(),[o,b]=l.useState(""),[c,N]=l.useState(""),[n,v]=l.useState(!1),[d,E]=l.useState(!1),[s,i]=l.useState({}),[m,x]=l.useState(!1),y=/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,k=()=>{let t={};return o?y.test(o)||(t.email="Invalid email format."):t.email="Email is required.",i(t),Object.keys(t).length===0},S=async t=>{var u,p,f,h;if(t.preventDefault(),!!k())try{x(!0);const a=await g.post(`${A}/api/v1/login`,{email:o,password:c,rememberMe:n}),r=(u=a==null?void 0:a.data)==null?void 0:u.squarCraft_auth_token;localStorage.setItem("squarCraft_auth_token",r),sessionStorage.setItem("squarCraft_auth_token",r),document.cookie=`squarCraft_auth_token=${r}; path=/; max-age=${60*60}`,g.defaults.headers.common.Authorization=`Bearer ${r}`,console.log(a),a.status===200&&(j("/dashboard/myWebsites"),w((p=a==null?void 0:a.data)==null?void 0:p.user))}catch(a){i({api:((h=(f=a.response)==null?void 0:f.data)==null?void 0:h.message)||"An error occurred."})}finally{x(!1)}};return e.jsx("div",{className:"w-full flex items-center justify-center mt-[6.5rem] xl:mt-[10rem] xl:px-8",children:e.jsxs("div",{className:"max-w-[480px] w-full bg-white border-[#EDEDED] shadow-md rounded-[10px] p-6 xl:p-12",children:[e.jsx("p",{className:"font-semibold text-[20px] xl:text-[28px]",children:"Sign In Your Account"}),(s==null?void 0:s.api)&&e.jsx(_,{message:s==null?void 0:s.api,type:s,icon:"",className:"",onClose:()=>i(null)}),e.jsxs("form",{onSubmit:S,className:"mt-6",children:[e.jsxs("div",{className:"w-full",children:[e.jsxs("p",{children:["Email ",e.jsx("span",{className:"text-2xl text-red-600",children:"*"})]}),e.jsxs("div",{className:"relative w-full",children:[e.jsx("input",{type:"email",value:o,onChange:t=>b(t.target.value),className:"w-full rounded-lg mt-2 border pl-[38px] border-[#EDEDED] py-3 bg-[#FAFBFE] focus:outline-[#f7decd]",placeholder:"Enter Your Email"}),e.jsx("img",{src:B,className:"absolute top-[26px] left-3",alt:"Email Icon",width:16})]}),(s==null?void 0:s.email)&&e.jsx("p",{className:"text-xs text-red-600 mt-1",children:s==null?void 0:s.email})]}),e.jsxs("div",{className:"w-full mt-4",children:[e.jsxs("p",{children:["Password ",e.jsx("span",{className:"text-2xl text-red-600",children:"*"})]}),e.jsxs("div",{className:"relative w-full",children:[e.jsx("input",{type:d?"text":"password",value:c,onChange:t=>N(t.target.value),className:"w-full rounded-lg mt-2 border pl-[38px] pr-10 border-[#EDEDED] py-3 bg-[#FAFBFE] focus:outline-[#f7decd]",placeholder:"Enter Your Password"}),e.jsx("img",{src:P,className:"absolute top-[24px] left-3.5",alt:"Lock Icon",width:13}),e.jsx("div",{className:"absolute top-[25px] right-3.5 cursor-pointer",onClick:()=>E(!d),children:e.jsx("img",{src:I,alt:"Eye Icon",width:20})})]}),(s==null?void 0:s.password)&&e.jsx("p",{className:"text-xs text-red-600 mt-1",children:s==null?void 0:s.password})]}),e.jsxs("div",{className:"flex items-center mt-2 justify-between w-full",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("div",{className:"relative",children:[e.jsx("input",{type:"checkbox",id:"customCheckbox",className:"w-4 h-4 appearance-none bg-gray-200 rounded cursor-pointer checked:bg-jaffa-400 transition-colors duration-300",onChange:t=>v(t.target.checked)}),n&&e.jsx("img",{src:R,alt:"Tick",className:"absolute top-1.5 left-[3px] w-2.5"})]}),e.jsx("p",{className:"font-semibold text-sm",children:"Remember Me"})]}),e.jsx(L,{to:"/auth/Forgot-pass-email-verify",className:"text-jaffa-400 text-sm",children:"Forgot Password?"})]}),e.jsx("button",{type:"submit",className:"w-full mt-6 text-center block bg-jaffa-400 py-3 rounded-[10px] font-semibold",disabled:m,children:m?e.jsx(q,{}):"Sign In"}),e.jsxs("div",{className:"flex items-end mt-6 gap-2 w-full",children:[e.jsx("p",{className:"text-xs text-gray-400 text-nowrap",children:"Or Continue With"}),e.jsx("div",{className:"w-full border-gray-200 border-dotted border-b"})]}),e.jsxs("div",{className:"mt-6 flex flex-col xl:flex-row items-center justify-between gap-3 w-full",children:[e.jsxs("div",{className:"bg-[#FAFBFE] hover:bg-[#f3f4f8] mx-auto justify-center transition-all cursor-pointer border w-full rounded-md py-4 flex items-center gap-2 border-[#EDEDED]",children:[e.jsx("img",{src:$,alt:"Google",width:25}),e.jsx("p",{className:"text-[16px] font-semibold",children:"Google"})]}),e.jsxs("div",{className:"bg-[#FAFBFE] hover:bg-[#f3f4f8] transition-all justify-center cursor-pointer border w-full rounded-md py-4 flex items-center gap-2 border-[#EDEDED]",children:[e.jsx("img",{src:M,alt:"Squarespace",width:25}),e.jsx("p",{className:"text-[16px] font-semibold",children:"Squarespace"})]})]})]})]})})};export{O as default};
