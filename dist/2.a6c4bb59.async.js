(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{"0Fdr":function(e,t,r){"use strict";var a=r("lP4d");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=a(r("6/rC")),u=a(r("7sDq"));r("wcNQ");var n=a(r("XXnU")),d=r("dCQc"),c=r("34ay"),o=r("HZnN"),i=r("JZUw"),l={namespace:"register",state:{status:void 0},effects:{submit:u.default.mark(function e(t,r){var a,s,c,o;return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=t.payload,s=r.call,c=r.put,e.next=4,s(d.fakeRegister,a);case 4:if(o=e.sent,0!==o.code){e.next=11;break}return n.default.success(o.msg),e.next=9,c(i.routerRedux.push("/user/login"));case 9:e.next=12;break;case 11:n.default.error(o.msg);case 12:case"end":return e.stop()}},e)})},reducers:{registerHandle:function(e,t){var r=t.payload;return(0,c.setAuthority)("user"),(0,o.reloadAuthorized)(),(0,s.default)({},e,{status:r.status})}}};t.default=l}}]);