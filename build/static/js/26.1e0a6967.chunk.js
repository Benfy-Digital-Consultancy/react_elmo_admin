(this.webpackJsonpelmo=this.webpackJsonpelmo||[]).push([[26,54],{142:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),i=(t(223),t(324)),s=t.n(i);a.default=function(e){var a=e.totalPages,t=e.pageChange,n=e.handlePageSize,i=e.pageNumber,l=e.pageSize,o=e.pageOption,u=[!0===(void 0!==o&&o)&&{value:1,label:"1"},{value:10,label:"10"},{value:20,label:"20"},{value:30,label:"30"},{value:50,label:"50"}];return a>0&&r.a.createElement("div",{className:"mt-3 px-3"},r.a.createElement("div",{className:"div-pagination pt-2"},r.a.createElement("div",{className:"show-product"},r.a.createElement("span",null,"show"),r.a.createElement("select",{className:"cursor-pointer","aria-label":"Default select example",onChange:function(e){return n(e.target.value)},value:l},null===u||void 0===u?void 0:u.map((function(e,a){return r.a.createElement("option",{value:null===e||void 0===e?void 0:e.value,key:a},null===e||void 0===e?void 0:e.label)}))),r.a.createElement("span",null,"entries")),r.a.createElement("div",{className:"div-pagination ml-auto"},r.a.createElement(s.a,{disableInitialCallback:!0,previousLabel:"previous",nextLabel:"next",breakLabel:r.a.createElement("span",null,"..."),breakClassName:"me-2 my-auto",pageCount:Math.ceil(a),pageRangeDisplayed:1,onPageChange:function(e){return a=e.selected+1,void t(a);var a},containerClassName:"pagination custom-pagination",pageClassName:"page-item",pageLinkClassName:"page-link",activeClassName:"active",previousClassName:"page-item",nextClassName:"page-item",previousLinkClassName:"page-link",nextLinkClassName:"page-link",disabledClassName:"disabled",forcePage:i-1}))))}},223:function(e,a,t){},324:function(e,a,t){var n;e.exports=(n=t(0),function(e){var a={};function t(n){if(a[n])return a[n].exports;var r=a[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}return t.m=e,t.c=a,t.d=function(e,a,n){t.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,a){if(1&a&&(e=t(e)),8&a)return e;if(4&a&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var r in e)t.d(n,r,function(a){return e[a]}.bind(null,r));return n},t.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(a,"a",a),a},t.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},t.p="",t(t.s=4)}([function(e,a,t){e.exports=t(2)()},function(e,a){e.exports=n},function(e,a,t){"use strict";var n=t(3);function r(){}function i(){}i.resetWarningCache=r,e.exports=function(){function e(e,a,t,r,i,s){if(s!==n){var l=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}}function a(){return e}e.isRequired=e;var t={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:a,element:e,elementType:e,instanceOf:a,node:e,objectOf:a,oneOf:a,oneOfType:a,shape:a,exact:a,checkPropTypes:i,resetWarningCache:r};return t.PropTypes=t,t}},function(e,a,t){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,a,t){"use strict";t.r(a);var n=t(1),r=t.n(n),i=t(0),s=t.n(i);function l(){return(l=Object.assign||function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}var o=function(e){var a=e.pageClassName,t=e.pageLinkClassName,n=e.page,i=e.selected,s=e.activeClassName,o=e.activeLinkClassName,u=e.getEventListener,c=e.pageSelectedHandler,p=e.href,g=e.extraAriaContext,f=e.pageLabelBuilder,d=e.ariaLabel||"Page "+n+(g?" "+g:""),v=null;return i&&(v="page",d=e.ariaLabel||"Page "+n+" is your current page",a=void 0!==a?a+" "+s:s,void 0!==t?void 0!==o&&(t=t+" "+o):t=o),r.a.createElement("li",{className:a},r.a.createElement("a",l({role:"button",className:t,href:p,tabIndex:"0","aria-label":d,"aria-current":v,onKeyPress:c},u(c)),f(n)))};o.propTypes={pageSelectedHandler:s.a.func.isRequired,selected:s.a.bool.isRequired,pageClassName:s.a.string,pageLinkClassName:s.a.string,activeClassName:s.a.string,activeLinkClassName:s.a.string,extraAriaContext:s.a.string,href:s.a.string,ariaLabel:s.a.string,page:s.a.number.isRequired,getEventListener:s.a.func.isRequired,pageLabelBuilder:s.a.func.isRequired};var u=o;function c(){return(c=Object.assign||function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}var p=function(e){var a=e.breakLabel,t=e.breakClassName,n=e.breakLinkClassName,i=e.breakHandler,s=e.getEventListener,l=t||"break";return r.a.createElement("li",{className:l},r.a.createElement("a",c({className:n,role:"button",tabIndex:"0",onKeyPress:i},s(i)),a))};p.propTypes={breakLabel:s.a.oneOfType([s.a.string,s.a.node]),breakClassName:s.a.string,breakLinkClassName:s.a.string,breakHandler:s.a.func.isRequired,getEventListener:s.a.func.isRequired};var g=p;function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(){return(d=Object.assign||function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}function v(e,a){for(var t=0;t<a.length;t++){var n=a[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function b(e,a){return(b=Object.setPrototypeOf||function(e,a){return e.__proto__=a,e})(e,a)}function m(e,a){if(a&&("object"===f(a)||"function"==typeof a))return a;if(void 0!==a)throw new TypeError("Derived constructors may only return object or undefined");return h(e)}function h(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function C(e){return(C=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}var P=function(e){!function(e,a){if("function"!=typeof a&&null!==a)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(a&&a.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),a&&b(e,a)}(i,e);var a,t,n=function(e){var a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var t,n=C(e);if(a){var r=C(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return m(this,t)}}(i);function i(e){var a,t;return function(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}(this,i),y(h(a=n.call(this,e)),"handlePreviousPage",(function(e){var t=a.state.selected;e.preventDefault?e.preventDefault():e.returnValue=!1,t>0&&a.handlePageSelected(t-1,e)})),y(h(a),"handleNextPage",(function(e){var t=a.state.selected,n=a.props.pageCount;e.preventDefault?e.preventDefault():e.returnValue=!1,t<n-1&&a.handlePageSelected(t+1,e)})),y(h(a),"handlePageSelected",(function(e,t){t.preventDefault?t.preventDefault():t.returnValue=!1,a.state.selected!==e?(a.setState({selected:e}),a.callCallback(e)):a.callActiveCallback(e)})),y(h(a),"getEventListener",(function(e){return y({},a.props.eventListener,e)})),y(h(a),"handleBreakClick",(function(e,t){t.preventDefault?t.preventDefault():t.returnValue=!1;var n=a.state.selected;a.handlePageSelected(n<e?a.getForwardJump():a.getBackwardJump(),t)})),y(h(a),"callCallback",(function(e){void 0!==a.props.onPageChange&&"function"==typeof a.props.onPageChange&&a.props.onPageChange({selected:e})})),y(h(a),"callActiveCallback",(function(e){void 0!==a.props.onPageActive&&"function"==typeof a.props.onPageActive&&a.props.onPageActive({selected:e})})),y(h(a),"pagination",(function(){var e=[],t=a.props,n=t.pageRangeDisplayed,i=t.pageCount,s=t.marginPagesDisplayed,l=t.breakLabel,o=t.breakClassName,u=t.breakLinkClassName,c=a.state.selected;if(i<=n)for(var p=0;p<i;p++)e.push(a.getPageElement(p));else{var f,d,v,b=n/2,m=n-b;c>i-n/2?b=n-(m=i-c):c<n/2&&(m=n-(b=c));var h=function(e){return a.getPageElement(e)};for(f=0;f<i;f++)(d=f+1)<=s||d>i-s||f>=c-b&&f<=c+m?e.push(h(f)):l&&e[e.length-1]!==v&&(v=r.a.createElement(g,{key:f,breakLabel:l,breakClassName:o,breakLinkClassName:u,breakHandler:a.handleBreakClick.bind(null,f),getEventListener:a.getEventListener}),e.push(v))}return e})),void 0!==e.initialPage&&void 0!==e.forcePage&&console.warn("(react-paginate): Both initialPage (".concat(e.initialPage,") and forcePage (").concat(e.forcePage,") props are provided, which is discouraged.")+" Use exclusively forcePage prop for a controlled component.\nSee https://reactjs.org/docs/forms.html#controlled-components"),t=e.initialPage?e.initialPage:e.forcePage?e.forcePage:0,a.state={selected:t},a}return a=i,(t=[{key:"componentDidMount",value:function(){var e=this.props,a=e.initialPage,t=e.disableInitialCallback,n=e.extraAriaContext,r=e.pageCount;void 0===a||t||this.callCallback(a),n&&console.warn("DEPRECATED (react-paginate): The extraAriaContext prop is deprecated. You should now use the ariaLabelBuilder instead."),Number.isInteger(r)||console.warn("(react-paginate): The pageCount prop value provided is not an integer (".concat(this.props.pageCount,"). Did you forget a Math.ceil()?"))}},{key:"componentDidUpdate",value:function(e){void 0!==this.props.forcePage&&this.props.forcePage!==e.forcePage&&this.setState({selected:this.props.forcePage}),Number.isInteger(e.pageCount)&&!Number.isInteger(this.props.pageCount)&&console.warn("(react-paginate): The pageCount prop value provided is not an integer (".concat(this.props.pageCount,"). Did you forget a Math.ceil()?"))}},{key:"getForwardJump",value:function(){var e=this.state.selected,a=this.props,t=a.pageCount,n=e+a.pageRangeDisplayed;return n>=t?t-1:n}},{key:"getBackwardJump",value:function(){var e=this.state.selected-this.props.pageRangeDisplayed;return e<0?0:e}},{key:"hrefBuilder",value:function(e){var a=this.props,t=a.hrefBuilder,n=a.pageCount;if(t&&e!==this.state.selected&&e>=0&&e<n)return t(e+1)}},{key:"ariaLabelBuilder",value:function(e){var a=e===this.state.selected;if(this.props.ariaLabelBuilder&&e>=0&&e<this.props.pageCount){var t=this.props.ariaLabelBuilder(e+1,a);return this.props.extraAriaContext&&!a&&(t=t+" "+this.props.extraAriaContext),t}}},{key:"getPageElement",value:function(e){var a=this.state.selected,t=this.props,n=t.pageClassName,i=t.pageLinkClassName,s=t.activeClassName,l=t.activeLinkClassName,o=t.extraAriaContext,c=t.pageLabelBuilder;return r.a.createElement(u,{key:e,pageSelectedHandler:this.handlePageSelected.bind(null,e),selected:a===e,pageClassName:n,pageLinkClassName:i,activeClassName:s,activeLinkClassName:l,extraAriaContext:o,href:this.hrefBuilder(e),ariaLabel:this.ariaLabelBuilder(e),page:e+1,pageLabelBuilder:c,getEventListener:this.getEventListener})}},{key:"render",value:function(){var e=this.props.renderOnZeroPageCount;if(0===this.props.pageCount&&void 0!==e)return e?e(this.props):e;var a=this.props,t=a.disabledClassName,n=a.pageCount,i=a.className,s=a.containerClassName,l=a.previousLabel,o=a.previousClassName,u=a.previousLinkClassName,c=a.previousAriaLabel,p=a.prevRel,g=a.nextLabel,f=a.nextClassName,v=a.nextLinkClassName,b=a.nextAriaLabel,m=a.nextRel,h=this.state.selected,C=o+(0===h?" ".concat(t):""),y=f+(h===n-1?" ".concat(t):""),P=0===h?"true":"false",N=h===n-1?"true":"false";return r.a.createElement("ul",{className:i||s},r.a.createElement("li",{className:C},r.a.createElement("a",d({className:u,href:this.hrefBuilder(h-1),tabIndex:"0",role:"button",onKeyPress:this.handlePreviousPage,"aria-disabled":P,"aria-label":c,rel:p},this.getEventListener(this.handlePreviousPage)),l)),this.pagination(),r.a.createElement("li",{className:y},r.a.createElement("a",d({className:v,href:this.hrefBuilder(h+1),tabIndex:"0",role:"button",onKeyPress:this.handleNextPage,"aria-disabled":N,"aria-label":b,rel:m},this.getEventListener(this.handleNextPage)),g)))}}])&&v(a.prototype,t),i}(n.Component);y(P,"propTypes",{pageCount:s.a.number.isRequired,pageRangeDisplayed:s.a.number.isRequired,marginPagesDisplayed:s.a.number.isRequired,previousLabel:s.a.node,previousAriaLabel:s.a.string,prevRel:s.a.string,nextLabel:s.a.node,nextAriaLabel:s.a.string,nextRel:s.a.string,breakLabel:s.a.oneOfType([s.a.string,s.a.node]),hrefBuilder:s.a.func,onPageChange:s.a.func,onPageActive:s.a.func,initialPage:s.a.number,forcePage:s.a.number,disableInitialCallback:s.a.bool,containerClassName:s.a.string,className:s.a.string,pageClassName:s.a.string,pageLinkClassName:s.a.string,pageLabelBuilder:s.a.func,activeClassName:s.a.string,activeLinkClassName:s.a.string,previousClassName:s.a.string,nextClassName:s.a.string,previousLinkClassName:s.a.string,nextLinkClassName:s.a.string,disabledClassName:s.a.string,breakClassName:s.a.string,breakLinkClassName:s.a.string,extraAriaContext:s.a.string,ariaLabelBuilder:s.a.func,eventListener:s.a.string,renderOnZeroPageCount:s.a.func}),y(P,"defaultProps",{pageCount:10,pageRangeDisplayed:2,marginPagesDisplayed:3,activeClassName:"selected",previousLabel:"Previous",previousClassName:"previous",previousAriaLabel:"Previous page",prevRel:"prev",nextLabel:"Next",nextClassName:"next",nextAriaLabel:"Next page",nextRel:"next",breakLabel:"...",disabledClassName:"disabled",disableInitialCallback:!1,pageLabelBuilder:function(e){return e},eventListener:"onClick",renderOnZeroPageCount:void 0}),a.default=P}]))}}]);
//# sourceMappingURL=26.1e0a6967.chunk.js.map