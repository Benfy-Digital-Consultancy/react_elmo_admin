(this.webpackJsonpelmo=this.webpackJsonpelmo||[]).push([[22,36,38,39,44,65,90,92,95,96,101,147],{102:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n);t(366);a.default=function(e){var a=e.placeholder,t=void 0===a?"":a,n=e.register,o=void 0===n?{}:n,r=e.value,c=void 0===r?"":r,i=e.type,s=void 0===i?"file":i,u=e.onChange,d=e.name,m=void 0===d?"":d,v=e.maxlength,h=void 0===v?"":v,p=e.error,f=void 0===p?"":p,b=(e.icons,e.GB,e.onWheel,e.messages),g=e.style,A=void 0===g?{}:g;return l.a.createElement(l.a.Fragment,null,l.a.createElement("input",{name:m,placeholder:t,className:"fileInputBox font-regular-14",ref:o,style:A,defaultValue:c,onChange:u,type:s,maxlength:h,onWheel:function(e){return e.currentTarget.blur()}}),l.a.createElement("span",{className:"text-danger fs-13"},(null===f||void 0===f?void 0:f.type)&&b[f.type]))}},119:function(e,a,t){"use strict";t.r(a);var n=t(25),l=t(0),o=t.n(l),r=(t(360),t(484),t(97)),c=t(9);t(98),t(99),t(228),t(102),t(44),t(61);a.default=function(e){var a=Object(c.f)(),t=Object(c.g)(),i=Object(l.useState)({}),s=Object(n.a)(i,2),u=s[0],d=s[1];Object(l.useEffect)((function(){t.state.item&&m(t.state.item)}),[]);var m=function(e){console.log(e),d(e)};return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",null,o.a.createElement(r.AppBack,{onClick:function(){return a.goBack()},label:"Back to School Onboard"})),o.a.createElement("div",{className:"create_header"},o.a.createElement("div",null,o.a.createElement("label",{className:"font-bold-20 user-title"},"School Details")),o.a.createElement("div",{className:"blank"}),o.a.createElement("div",{className:"row pt-4"},o.a.createElement("div",{className:"col-4"},o.a.createElement("label",{className:"font-regular-14"},"School ID"),o.a.createElement("h6",null,(null===u||void 0===u?void 0:u.schoolId)?null===u||void 0===u?void 0:u.schoolId:"-")),o.a.createElement("div",{className:"col-4"},o.a.createElement("label",{className:"font-regular-14"},"School Name"),o.a.createElement("h6",null,(null===u||void 0===u?void 0:u.schoolName)?null===u||void 0===u?void 0:u.schoolName:"-")),o.a.createElement("div",{className:"col-4"},o.a.createElement("label",{className:"font-regular-14"},"Contact Number"),o.a.createElement("h6",null,(null===u||void 0===u?void 0:u.countryCode)?null===u||void 0===u?void 0:u.countryCode:"-"," ",(null===u||void 0===u?void 0:u.mobileNumber)?null===u||void 0===u?void 0:u.mobileNumber:"-"))),o.a.createElement("div",{className:"row pt-4"},o.a.createElement("div",{className:"col-4"},o.a.createElement("label",{className:"font-regular-14"},"Board"),o.a.createElement("h6",null,(null===u||void 0===u?void 0:u.schoolBoard)?null===u||void 0===u?void 0:u.schoolBoard:"-")),o.a.createElement("div",{className:"col-4"},o.a.createElement("label",{className:"font-regular-14"},"Email ID"),o.a.createElement("h6",null,(null===u||void 0===u?void 0:u.email)?null===u||void 0===u?void 0:u.email:"-")),o.a.createElement("div",{className:"col-4"},o.a.createElement("label",{className:"font-regular-14"},"Status"),o.a.createElement("h6",{color:"#20B169"},(null===u||void 0===u?void 0:u.userStatus)?1==(null===u||void 0===u?void 0:u.userStatus)?"Active":"In-Active":"-"))),o.a.createElement("label",{className:"font-regular-20 address mt-4"},"School Address"),o.a.createElement("div",{className:"blank"}),o.a.createElement("div",{className:"row mt-3"},o.a.createElement("div",{className:"col-8"},o.a.createElement("label",{className:"font-regular-14"},"Board"),o.a.createElement("h6",null,(null===u||void 0===u?void 0:u.schoolAddress)?null===u||void 0===u?void 0:u.schoolAddress:"-")))))}},228:function(e,a,t){"use strict";t.r(a),t.d(a,"NormalButton",(function(){return s}));var n=t(69),l=t(70),o=t(169),r=t(168),c=t(0),i=t.n(c),s=(t(352),function(e){Object(o.a)(t,e);var a=Object(r.a)(t);function t(){return Object(n.a)(this,t),a.apply(this,arguments)}return Object(l.a)(t,[{key:"render",value:function(){var e=this.props,a=e.className,t=void 0===a?"":a,n=e.label,l=void 0===n?"":n,o=e.onClick,r=e.id,c=e.type,s=void 0===c?"submit":c,u=e.disabled,d=void 0!==u&&u,m=e.authButton,v=void 0!==m&&m,h=e.loginButton,p=void 0!==h&&h,f=e.dasboardButton,b=void 0!==f&&f,g=e.outlineButton,A=void 0!==g&&g,E=e.outlineEditButton,N=void 0!==E&&E,C=e.rightIcon,j=void 0===C?"":C;return i.a.createElement("div",null,i.a.createElement("button",{id:r,type:s,className:"cursor-pointer \n                     ".concat(v?"authButton":"","\n                     ").concat(p?"loginButton":"","\n                     ").concat(b?"dasboardButton":"","\n                     ").concat(A?"outlineButton":"","\n                     ").concat(N?"outlineEditButton":"","\n\n                     ").concat(t),onClick:o,disabled:d},l,""!==j?i.a.createElement("span",{className:"btn-right-icon ".concat(j)}):null))}}]),t}(c.Component));a.default=s},352:function(e,a,t){},353:function(e,a,t){},354:function(e,a,t){},355:function(e,a){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAICAYAAADJEc7MAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACTSURBVHgBjdDLCcMwDAbgqPIA3aCdxO4o3aA9GmwoBfvcjtAN2g2a2AtkhYyQAYwjHXIxzuMHgSzxgRFYa78557v3fmh2RGt9FkK8DtT3VK0x5rQHIeKfDYYQOqXUkR5vKeUvxjiuIQD4OOeeyMMtXCKe4bxcwjXEgfJLdKwHHetK7SWlBDVUhQVuamg1jKluS/sJ35hSYKwNX7wAAAAASUVORK5CYII="},360:function(e,a,t){},366:function(e,a,t){},97:function(e,a,t){"use strict";t.r(a),t.d(a,"AppBack",(function(){return r}));var n=t(0),l=t.n(n),o=t(358),r=(t(353),function(e){var a=e.onClick,t=void 0===a?{}:a,n=e.label;return l.a.createElement("div",{className:"app-back"},l.a.createElement("div",{className:"content-title"},l.a.createElement("div",{className:"d-flex align-items-center cursor-pointer",onClick:function(){return t()}},l.a.createElement(o.a,{color:"#208e5as"}),l.a.createElement("span",{className:"font-bold-16"},n))))})},98:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n);t(354);a.default=function(e){var a=e.placeholder,t=void 0===a?"":a,n=e.register,o=void 0===n?{}:n,r=e.value,c=void 0===r?"":r,i=e.type,s=void 0===i?"text":i,u=(e.onChange,e.name),d=void 0===u?"":u,m=e.maxlength,v=void 0===m?"":m,h=e.error,p=void 0===h?"":h,f=(e.icons,e.GB,e.disabled),b=void 0!==f&&f,g=(e.onWheel,e.messages),A=e.style,E=void 0===A?{}:A;return l.a.createElement(l.a.Fragment,null,l.a.createElement("input",{name:d,placeholder:t,className:"formInputBox font-regular-14 "+(b?"formDiabled":""),ref:o,disabled:b,style:E,defaultValue:c,type:s,maxlength:v,onWheel:function(e){return e.currentTarget.blur()}}),l.a.createElement("span",{className:"text-danger fs-13"},(null===p||void 0===p?void 0:p.type)&&g[p.type]))}},99:function(e,a,t){"use strict";t.r(a);var n=t(8),l=t(69),o=t(70),r=t(169),c=t(168),i=t(0),s=t.n(i),u=t(468),d=t(515),m=t(355),v=t.n(m),h=function(e){Object(r.a)(t,e);var a=Object(c.a)(t);function t(){var e;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(e=a.call.apply(a,[this].concat(o))).handleChange=function(a){if(e.props.isMulti){var t={target:{name:e.props.name,value:[]}};a&&a.length&&a.forEach((function(e){var a={value:e.value,label:e.label};t.target.value.push(a)})),e.props.handleChange(t)}else{var n={target:{name:e.props.name,value:a?a.value:"",label:a?a.label:""}};e.props.handleChange(n)}},e.handleInputChange=function(a){var t={target:{name:e.props.name,value:a||""}};e.props.handleinputChange&&e.props.handleinputChange(t)},e}return Object(o.a)(t,[{key:"render",value:function(){var e=this.props,a=e.className,t=void 0===a?"select-form-control w-100":a,l=e.options,o=void 0===l?[]:l,r=e.value,c=void 0===r?"":r,i=e.name,m=void 0===i?"":i,h=e.placeholder,p=void 0===h?"Select":h,f=e.disabled,b=void 0!==f&&f,g=e.isMulti,A=void 0!==g&&g,E=e.isClearable,N=void 0!==E&&E,C=e.isSearchable,j=void 0!==C&&C,B=e.showArrow,O=void 0===B||B,w={placeholder:function(e){return Object(n.a)(Object(n.a)({},e),{},{fontSize:14,color:"#000",fontWeight:500,lineHeight:16})},indicatorSeparator:function(e){return Object(n.a)(Object(n.a)({},e),{},{display:"none"})},dropdownIndicator:function(e){return Object(n.a)(Object(n.a)({},e),{},{padding:0,height:"26px",width:"26px",color:"black",display:"flex",justifyContent:"center",alignItems:"center"})},singleValue:function(e){return Object(n.a)(Object(n.a)({},e),{},{color:"#000000",fontWeight:600})},control:function(e){return Object(n.a)(Object(n.a)({},e),{},{borderRadius:0,border:"0.25px solid #C0C0C0",outline:"0",background:"#F9F9F9",height:42,paddingRight:10})}};return s.a.createElement(d.a,{className:t,classNamePrefix:"Select",isDisabled:b,isClearable:N,isSearchable:j,name:m,options:o,onChange:this.handleChange,isMulti:A,showArrow:O,placeholder:p,styles:w,value:o.length>0?o.find((function(e){return e.value===c})):null,components:{DropdownIndicator:function(e){return u.l.DropdownIndicator&&s.a.createElement(u.l.DropdownIndicator,e,s.a.createElement("span",null,s.a.createElement("img",{src:v.a,style:{width:"100%"}})))}}})}}]),t}(i.Component);a.default=h}}]);
//# sourceMappingURL=22.bc894cac.chunk.js.map