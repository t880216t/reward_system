(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[12],{"5WY0":function(e,t,a){e.exports={main:"antd-pro\\pages\\-user\\-register-main",getCaptcha:"antd-pro\\pages\\-user\\-register-getCaptcha",submit:"antd-pro\\pages\\-user\\-register-submit",login:"antd-pro\\pages\\-user\\-register-login",error:"antd-pro\\pages\\-user\\-register-error",success:"antd-pro\\pages\\-user\\-register-success",warning:"antd-pro\\pages\\-user\\-register-warning","progress-pass":"antd-pro\\pages\\-user\\-register-progress-pass",progress:"antd-pro\\pages\\-user\\-register-progress"}},cq3J:function(e,t,a){"use strict";var r=a("lP4d"),s=a("nVH6");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("yyMw");var l=r(a("MhBB"));a("i17s");var i=r(a("Mymj"));a("sqlq");var n=r(a("MJFX")),o=r(a("6/rC")),d=r(a("hp2J")),u=r(a("qcWJ")),c=r(a("kOQm")),f=r(a("lrLM")),p=r(a("Q+0f"));a("KMqP");var m=r(a("0UW4"));a("k50B");var g=r(a("vOJe"));a("mGKJ");var v,h,w,E,y=r(a("z+Wi")),M=s(a("W897")),b=a("32uE"),k=a("E41k"),F=r(a("SPz1")),S=r(a("tOZ7")),P=r(a("5WY0")),q=y.default.Item,C=(g.default.Option,m.default.Group,{ok:M.default.createElement("div",{className:P.default.success},M.default.createElement(k.FormattedMessage,{id:"validation.password.strength.strong"})),pass:M.default.createElement("div",{className:P.default.warning},M.default.createElement(k.FormattedMessage,{id:"validation.password.strength.medium"})),poor:M.default.createElement("div",{className:P.default.error},M.default.createElement(k.FormattedMessage,{id:"validation.password.strength.short"}))}),J={ok:"success",pass:"normal",poor:"exception"},N=(v=(0,b.connect)(function(e){var t=e.register,a=e.loading;return{register:t,submitting:a.effects["register/submit"]}}),h=y.default.create(),v(w=h((E=function(e){function t(){var e,a;(0,d.default)(this,t);for(var r=arguments.length,s=new Array(r),l=0;l<r;l++)s[l]=arguments[l];return a=(0,c.default)(this,(e=(0,f.default)(t)).call.apply(e,[this].concat(s))),a.state={count:0,confirmDirty:!1,visible:!1,help:"",prefix:"86"},a.onGetCaptcha=function(){var e=59;a.setState({count:e}),a.interval=setInterval(function(){e-=1,a.setState({count:e}),0===e&&clearInterval(a.interval)},1e3)},a.getPasswordStatus=function(){var e=a.props.form,t=e.getFieldValue("password");return t&&t.length>9?"ok":t&&t.length>5?"pass":"poor"},a.handleSubmit=function(e){e.preventDefault();var t=a.props,r=t.form,s=t.dispatch;r.validateFields({force:!0},function(e,t){e||s({type:"register/submit",payload:(0,o.default)({},t)})})},a.handleConfirmBlur=function(e){var t=e.target.value,r=a.state.confirmDirty;a.setState({confirmDirty:r||!!t})},a.checkConfirm=function(e,t,r){var s=a.props.form;t&&t!==s.getFieldValue("password")?r((0,k.formatMessage)({id:"validation.password.twice"})):r()},a.checkPassword=function(e,t,r){var s=a.state,l=s.visible,i=s.confirmDirty;if(t)if(a.setState({help:""}),l||a.setState({visible:!!t}),t.length<6)r("error");else{var n=a.props.form;t&&i&&n.validateFields(["confirm"],{force:!0}),r()}else a.setState({help:(0,k.formatMessage)({id:"validation.password.required"}),visible:!!t}),r("error")},a.changePrefix=function(e){a.setState({prefix:e})},a.renderPasswordProgress=function(){var e=a.props.form,t=e.getFieldValue("password"),r=a.getPasswordStatus();return t&&t.length?M.default.createElement("div",{className:P.default["progress-".concat(r)]},M.default.createElement(n.default,{status:J[r],className:P.default.progress,strokeWidth:6,percent:10*t.length>100?100:10*t.length,showInfo:!1})):null},a}return(0,p.default)(t,e),(0,u.default)(t,[{key:"componentDidUpdate",value:function(){var e=this.props,t=e.form,a=e.register,r=t.getFieldValue("mail");"ok"===a.status&&S.default.push({pathname:"/user/register-result",state:{account:r}})}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"render",value:function(){var e=this.props,t=e.form,a=e.submitting,r=t.getFieldDecorator,s=this.state,n=s.help,o=s.visible;return M.default.createElement("div",{className:P.default.main},M.default.createElement("h3",null,M.default.createElement(k.FormattedMessage,{id:"app.register.register"})),M.default.createElement(y.default,{onSubmit:this.handleSubmit},M.default.createElement(q,null,r("username",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u767b\u5f55\u7528\u6237\u540d"}]})(M.default.createElement(m.default,{size:"large",placeholder:"\u767b\u5f55\u540d"}))),M.default.createElement(q,{help:n},M.default.createElement(i.default,{content:M.default.createElement("div",{style:{padding:"4px 0"}},C[this.getPasswordStatus()],this.renderPasswordProgress(),M.default.createElement("div",{style:{marginTop:10}},M.default.createElement(k.FormattedMessage,{id:"validation.password.strength.msg"}))),overlayStyle:{width:240},placement:"right",visible:o},r("password",{rules:[{validator:this.checkPassword}]})(M.default.createElement(m.default,{size:"large",type:"password",placeholder:(0,k.formatMessage)({id:"form.password.placeholder"})})))),M.default.createElement(q,null,r("confirm",{rules:[{required:!0,message:(0,k.formatMessage)({id:"validation.confirm-password.required"})},{validator:this.checkConfirm}]})(M.default.createElement(m.default,{size:"large",type:"password",placeholder:(0,k.formatMessage)({id:"form.confirm-password.placeholder"})}))),M.default.createElement(q,null,r("email",{rules:[{required:!0,message:(0,k.formatMessage)({id:"validation.email.required"})},{type:"email",message:(0,k.formatMessage)({id:"validation.email.wrong-format"})}]})(M.default.createElement(m.default,{size:"large",placeholder:(0,k.formatMessage)({id:"form.email.placeholder"})}))),M.default.createElement(q,null,M.default.createElement(l.default,{size:"large",loading:a,className:P.default.submit,type:"primary",htmlType:"submit"},M.default.createElement(k.FormattedMessage,{id:"app.register.register"})),M.default.createElement(F.default,{className:P.default.login,to:"/User/Login"},M.default.createElement(k.FormattedMessage,{id:"app.register.sing-in"})))))}}]),t}(M.Component),w=E))||w)||w),W=N;t.default=W}}]);