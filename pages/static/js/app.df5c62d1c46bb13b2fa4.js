webpackJsonp([1],{"+cJt":function(e,t){},"/FF+":function(e,t,a){"use strict";var n,i=a("bOdI"),r=a.n(i),o=a("woOf"),s=a.n(o),l=a("sTbe"),c=a("UOq2");t.a=a.i(l.a)((n={},r()(n,c.a,function(e,t){if(!t.error&&t.payload&&t.payload.data.success){return s()({},e,{templatesInfo:t.payload.data.data})}return e}),r()(n,c.c,function(e,t){if(!t.error&&t.payload&&t.payload.data.success){return s()({},e,{textData:t.payload.data.data})}return s()({},e,{textData:"没有获取到此模块的文字信息,请点击重试"})}),r()(n,c.d,function(e,t){if(!t.error&&t.payload){return s()({},e,{textData:t.payload})}return e}),r()(n,"DECREMENT",function(e,t){return{counter:e.counter-t.payload}}),n),{templatesInfo:[]})},"/cg+":function(e,t,a){"use strict";var n=a("Zx67"),i=a.n(n),r=a("Zrlr"),o=a.n(r),s=a("wxAW"),l=a.n(s),c=a("zwoO"),u=a.n(c),d=a("Pf15"),p=a.n(d),m=a("U7vG"),h=a.n(m),f=a("KSGD"),v=(a.n(f),a("IidI")),y=(a.n(v),a("vaID")),E=a.n(y),g=a("37+n"),I=a.n(g),M=a("vgHw"),_=(a.n(M),a("uuhB")),b=(a.n(_),a("7h3N")),D=(a.n(b),a("H9lX")),T=a.n(D),S=a("M4fF"),N=(a.n(S),a("Om99")),w=(I.a.Item,function(e){function t(){var e,a,n,r;o()(this,t);for(var s=arguments.length,l=Array(s),c=0;c<s;c++)l[c]=arguments[c];return a=n=u()(this,(e=t.__proto__||i()(t)).call.apply(e,[this].concat(l))),n.state={loading:!1},r=a,u()(n,r)}return p()(t,e),l()(t,[{key:"handleOk",value:function(){}},{key:"render",value:function(){return h.a.createElement("div",{className:T.a.addModule},h.a.createElement(E.a,{visible:this.props.visiableAddNew,title:"新增模块",onOk:this.handleOk,onCancel:this.props.hideModal,footer:null},h.a.createElement(N.a,{addNewModule:this.props.addNewModule})))}}]),t}(h.a.Component));t.a=w},"0TZD":function(e,t){},"6+V5":function(e,t,a){"use strict";var n,i=a("bOdI"),r=a.n(i),o=a("woOf"),s=a.n(o),l=a("sTbe"),c=a("UOq2");t.a=a.i(l.a)((n={},r()(n,c.h,function(e,t){var a=++e.isFetching;return s()({},e,{isFetching:a})}),r()(n,c.i,function(e,t){var a=0===e.isFetching?0:--e.isFetching;return s()({},e,{isFetching:a})}),r()(n,c.j,function(e,t){return s()({},e,{errorDetail:t.payload})}),r()(n,c.g,function(e,t){return s()({},e,{errorDetail:t.payload})}),n),{isFetching:0,errorDetail:""})},"9kqz":function(e,t){},ARlz:function(e,t){},BCOr:function(e,t,a){"use strict";var n,i=a("bOdI"),r=a.n(i),o=a("//Fk"),s=a.n(o),l=a("mtWM"),c=a.n(l),u=a("UOq2"),d=a("IcnI");c.a.defaults.baseURL="http://121.42.252.26/autoreport",c.a.interceptors.request.use(function(e){return d.a.dispatch({type:"REQUEST_BEGIN"}),e},function(e){return s.a.reject(e)}),c.a.interceptors.response.use(function(e){return d.a.dispatch({type:"REQUEST_COMPLETE"}),console.log(12),e.data.success||d.a.dispatch({type:"ERROR_OCCUR",payload:"数据获取失败!"}),e},function(e){e.response.data;d.a.dispatch({type:"REQUEST_COMPLETE"}),d.a.dispatch({type:"ERROR_OCCUR",payload:"请求发生了错误!"})}),t.a=(n={},r()(n,u.a,function(e){return{type:u.a,payload:c.a.get("/template",{params:e})}}),r()(n,u.b,function(e){return{type:u.b,payload:c.a.post("/template/update",e)}}),r()(n,u.c,function(e){return{type:u.c,payload:c.a.get("/module",{params:e})}}),r()(n,u.d,function(e){return{type:u.d,payload:e}}),r()(n,u.e,function(e){return{type:u.e,payload:c.a.post("/module/update",e)}}),r()(n,u.f,function(e){return{type:u.f,payload:c.a.post("/module/insert",e)}}),n)},BdWZ:function(e,t,a){"use strict";var n=a("bOdI"),i=a.n(n),r=a("UOq2");t.a=i()({},r.g,function(e){return{type:r.g}})},ChGC:function(e,t,a){"use strict";var n=a("2KeS"),i=a("/FF+"),r=a("6+V5");t.a=a.i(n.d)({templates:i.a,common:r.a})},Ehd3:function(e,t){},Ekug:function(e,t){},H9lX:function(e,t){e.exports={tab_content:"_-0xKWrto_jwFqh4PwF3uX",align_center:"uG5NrP6fv3DacYMTo94I7",switch_container:"_1JMswzPnqkGvp_My374r9F",edit:"_33icvMaKMV_6KEbpuaWSqp",edit_body:"_1b2Pu6BiB4nxLkTWYwxq6o",sync_circle:"_3T5EZ4OMKPFjj6dhmB68bW",add_new:"vUXBK6N-O3sTeUKbzdlj8",addModule:"_2hPIkU4N9B7MbCQQjGb5qW"}},IcnI:function(e,t,a){"use strict";var n=a("2KeS"),i=a("po9w"),r=a.n(i),o=a("ChGC"),s={};t.a=a.i(n.b)(o.a,s,a.i(n.c)(r.a))},JaHG:function(e,t,a){"use strict";a.d(t,"a",function(){return n});var n=function(e){var t=parseInt(e);return!isNaN(t)}},NHnr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("U7vG"),i=a.n(n),r=a("O27J"),o=a.n(r),s=a("F8kA"),l=a("RH2O"),c=a("eqvY"),u=a("IcnI"),d=a("ciQf"),p=a.n(d),m=p()();o.a.render(i.a.createElement(l.a,{store:u.a},i.a.createElement(s.a,{history:m},i.a.createElement("div",{className:"atv"},i.a.createElement(s.b,{path:"/",component:c.a})))),document.getElementById("app"))},OK1h:function(e,t){},Om99:function(e,t,a){"use strict";function n(e){return f()(e).some(function(t){return e[t]})}var i=a("Zx67"),r=a.n(i),o=a("Zrlr"),s=a.n(o),l=a("wxAW"),c=a.n(l),u=a("zwoO"),d=a.n(u),p=a("Pf15"),m=a.n(p),h=a("fZjL"),f=a.n(h),v=a("U7vG"),y=a.n(v),E=a("IidI"),g=a.n(E),I=a("37+n"),M=a.n(I),_=a("vgHw"),b=a.n(_),D=a("uuhB"),T=a.n(D),S=a("7h3N"),N=a.n(S),w=M.a.Item,k=function(e){function t(){var e,a,n,i;s()(this,t);for(var o=arguments.length,l=Array(o),c=0;c<o;c++)l[c]=arguments[c];return a=n=d()(this,(e=t.__proto__||r()(t)).call.apply(e,[this].concat(l))),n.handleSubmit=function(e){e.preventDefault(),n.props.form.validateFields(function(e,t){e||(console.log("Received values of form: ",t),console.log(n.props),n.props.addNewModule(t).then(function(e){if(!e.payload.data.success)return void N.a.error({message:payload.data.message});n.props.form.resetFields(),n.props.form.validateFields(),N.a.success({message:"新增模块成功！"})}).catch(function(e){}))})},i=a,d()(n,i)}return m()(t,e),c()(t,[{key:"componentDidMount",value:function(){this.props.form.validateFields()}},{key:"render",value:function(){var e=this.props.form,t=e.getFieldDecorator,a=e.getFieldsError,i=e.getFieldError,r=e.isFieldTouched,o=(e.resetFields,r("id")&&i("id")),s=r("name")&&i("name");return y.a.createElement(M.a,{layout:"vertical",onSubmit:this.handleSubmit},y.a.createElement(w,{validateStatus:o?"error":"",help:o||""},t("id",{rules:[{required:!0,message:"请输入模块ID，ID必须为数字",pattern:/^(\d)*$/}]})(y.a.createElement(T.a,{prefix:y.a.createElement(b.a,{type:"edit",style:{fontSize:13}}),placeholder:"模块ID"}))),y.a.createElement(w,{validateStatus:s?"error":"",help:s||""},t("name",{rules:[{required:!0,message:"请输入模块名称"}]})(y.a.createElement(T.a,{prefix:y.a.createElement(b.a,{type:"edit",style:{fontSize:13}}),placeholder:"模块名称"}))),y.a.createElement(w,null,t("description",{rules:[{required:!1,message:"请输入文字描述"}]})(y.a.createElement(T.a,{prefix:y.a.createElement(b.a,{type:"edit",style:{fontSize:13}}),type:"textarea",placeholder:"模块文字描述"}))),y.a.createElement(w,null,t("remark",{rules:[{required:!1,message:"请输入备注信息"}]})(y.a.createElement(T.a,{prefix:y.a.createElement(b.a,{type:"edit",style:{fontSize:13}}),placeholder:"备注信息"}))),y.a.createElement(w,null,y.a.createElement(g.a,{type:"primary",htmlType:"submit",disabled:n(a())},"提交")))}}]),t}(y.a.Component);t.a=M.a.create()(k)},Rj6T:function(e,t,a){"use strict";var n=a("Zx67"),i=a.n(n),r=a("Zrlr"),o=a.n(r),s=a("wxAW"),l=a.n(s),c=a("zwoO"),u=a.n(c),d=a("Pf15"),p=a.n(d),m=a("U7vG"),h=a.n(m),f=a("RH2O"),v=a("pT54"),y=a.n(v),E=a("UraS"),g=a.n(E),I=a("1cZb"),M=a.n(I),_=a("N3Nc"),b=(a.n(_),a("BdWZ")),D=function(e){function t(e){o()(this,t);var a=u()(this,(t.__proto__||i()(t)).call(this,e));return a.state={errorDetail:""},a}return p()(t,e),l()(t,[{key:"componentWillReceiveProps",value:function(e){var t=e.common.errorDetail;t&&(M.a.error(t),this.props.CLEAR_ERRORS())}},{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this.props.common,t=e.isFetching,a=this.state&&this.state.errorDetail;return a&&console.log("errorDetail",a),h.a.createElement("div",{className:"globalBase"},t>0?h.a.createElement(y.a,{type:"spokes",color:"red",height:40,width:40,className:g.a.loading}):"")}}]),t}(h.a.Component),T=function(e){return{common:e.common}},S=b.a;t.a=a.i(f.b)(T,S)(D)},U2t0:function(e,t,a){"use strict";var n=a("Zx67"),i=a.n(n),r=a("Zrlr"),o=a.n(r),s=a("wxAW"),l=a.n(s),c=a("zwoO"),u=a.n(c),d=a("Pf15"),p=a.n(d),m=a("i61F"),h=(a.n(m),a("U7vG")),f=a.n(h),v=a("KSGD"),y=a.n(v),E=a("IidI"),g=a.n(E),I=a("RjUz"),M=a.n(I),_=a("7h3N"),b=a.n(_),D=a("vgHw"),T=(a.n(D),a("H9lX")),S=a.n(T),N=a("M4fF"),w=a.n(N),k=a.i(m.SortableElement)(function(e){var t=e.value,a=e.active,n=e.switchDo;return f.a.createElement("li",{style:{position:"relative",width:"100%",display:"block",padding:16,backgroundColor:"#FFF",borderBottom:"1px solid #EFEFEF",boxSizing:"border-box",WebkitUserSelect:"none"}},t,f.a.createElement("div",{className:S.a.switch_container},f.a.createElement(M.a,{checked:a,onChange:n})))}),x=a.i(m.SortableContainer)(function(e){var t=e.items,a=e.switchDo,n=e.that;return f.a.createElement("ul",{style:{width:"100%",maxHeight:"600px",margin:"0 auto",marginBottom:"10px",overflow:"auto",backgroundColor:"#f3f3f3",border:"1px solid #EFEFEF",borderRadius:3}},t.map(function(e,t){var i=e.name,r=e.active,o=e.id;return f.a.createElement(k,{key:"item-"+t,index:t,value:i,active:r,switchDo:a.bind(n,{active:r,id:o})})}))}),F=function(e){function t(){var e,n,r,s;o()(this,t);for(var l=arguments.length,c=Array(l),d=0;d<l;d++)c[d]=arguments[d];return n=r=u()(this,(e=t.__proto__||i()(t)).call.apply(e,[this].concat(c))),r.state={items:[],loading:!1},r.onSortEnd=function(e){var t=e.oldIndex,n=e.newIndex,i=r.state.items;if(r.props.selectedModule(i[t]),t===n)return void console.log("顺序没有发生变化");r.setState({items:a.i(m.arrayMove)(i,t,n)},function(){r.props.templateModifyTrue()})},s=n,u()(r,s)}return p()(t,e),l()(t,[{key:"componentWillReceiveProps",value:function(e){e.templateID!==this.state.templateID&&this.setState({items:this.props.curModules,templateID:this.props.templateID})}},{key:"shouldComponentUpdate",value:function(e,t){return e.templateID!==this.state.templateID||this.state!==t}},{key:"componentDidMount",value:function(){0===this.state.items.length&&this.setState({items:this.props.curModules,templateID:this.props.templateID})}},{key:"switch",value:function(e,t){var a=this,n=e.active,i=e.id,r=w.a.cloneDeep(this.state.items),o=w.a.find(r,{id:i,active:n});o?(o.active=t,this.setState({items:r},function(){a.props.templateModifyTrue()})):console.log("没有找到module")}},{key:"syncModules",value:function(){var e=this;if(0===this.state.items.length||!this.props.templateModify)return void b.a.warning({message:"没有检测到更改！"});this.setState({loading:!0}),this.props.sync({templateID:this.state.templateID,modules:this.state.items,templateName:this.props.templateName}).then(function(t){t.payload?(e.setState({loading:!1}),e.props.templateModifyFalse(),b.a.success({message:"同步模块顺序&开关状态成功！"}),e.props.reFetchData()):(e.setState({loading:!1}),b.a.error({message:"同步失败！",description:"服务当前不可用"}))})}},{key:"render",value:function(){return f.a.createElement("div",{className:S.a.sort_list},f.a.createElement(x,{items:this.state.items,onSortEnd:this.onSortEnd,that:this,switchDo:this.switch}),f.a.createElement("div",{className:S.a.align_center},f.a.createElement(g.a,{type:"primary",icon:"sync",onClick:this.syncModules.bind(this),loading:this.state.loading},"同步模块顺序 & 开关状态")))}}]),t}(f.a.Component);t.a=F,F.propTypes={curModules:y.a.array}},U9Xq:function(e,t){},UOq2:function(e,t,a){"use strict";a.d(t,"a",function(){return n}),a.d(t,"h",function(){return i}),a.d(t,"i",function(){return r}),a.d(t,"j",function(){return o}),a.d(t,"b",function(){return s}),a.d(t,"g",function(){return l}),a.d(t,"c",function(){return c}),a.d(t,"d",function(){return u}),a.d(t,"e",function(){return d}),a.d(t,"f",function(){return p});var n="GET_TEMPLATES",i="REQUEST_BEGIN",r="REQUEST_COMPLETE",o="ERROR_OCCUR",s="SYNC_MODULES_IN_TEMPLATES",l="CLEAR_ERRORS",c="GET_MODULE_TEXT",u="SAVE_TEXTAREA",d="SYNC_TEXTAREA",p="ADD_NEW_MODULE"},UraS:function(e,t){e.exports={loading:"_2qlCpo31oA7m63zX0FCPV_"}},W9Z6:function(e,t){},"Yq+E":function(e,t){e.exports={container:"_2vEaSEppDHCKse6wPryRHA"}},eqvY:function(e,t,a){"use strict";var n=a("U7vG"),i=a.n(n),r=a("F8kA"),o=a("i3dJ"),s=a("zYeL"),l=a("Yq+E"),c=a.n(l),u=a("Rj6T");t.a=function(e){e.match;return i.a.createElement("div",null,i.a.createElement("div",{className:c.a.container},i.a.createElement("div",{className:"left"},i.a.createElement("aside",{id:"aside",className:"aside"},i.a.createElement("div",{className:"logo"},"运营平台"),i.a.createElement("ul",{className:"menu",id:"asidemenu"}))),i.a.createElement("div",{className:"right"},i.a.createElement(u.a,null),i.a.createElement(r.c,null,i.a.createElement(r.d,null,i.a.createElement(r.b,{path:"/hospital/:id",exact:!0,component:s.a}),i.a.createElement(r.b,{path:"/",component:o.a}))))))}},i3dJ:function(e,t,a){"use strict";var n=a("U7vG"),i=a.n(n);t.a=function(){return i.a.createElement("div",null,"没有对应的页面：404 ERROR!")}},iWD4:function(e,t){},k42R:function(e,t){},kEWN:function(e,t){},t6q1:function(e,t){},tWyK:function(e,t,a){"use strict";var n=a("Zx67"),i=a.n(n),r=a("Zrlr"),o=a.n(r),s=a("wxAW"),l=a.n(s),c=a("zwoO"),u=a.n(c),d=a("Pf15"),p=a.n(d),m=a("U7vG"),h=a.n(m),f=a("H9lX"),v=a.n(f),y=a("M4fF"),E=(a.n(y),a("vgHw")),g=a.n(E),I=a("l2X+"),M=a.n(I),_=a("xLyH"),b=a.n(_),D=a("uuhB"),T=a.n(D),S=a("IidI"),N=a.n(S),w=a("7h3N"),k=a.n(w),x=T.a.TextArea,F=function(e){function t(){var e,a,n,r;o()(this,t);for(var s=arguments.length,l=Array(s),c=0;c<s;c++)l[c]=arguments[c];return a=n=u()(this,(e=t.__proto__||i()(t)).call.apply(e,[this].concat(l))),n.state={loading:!1},r=a,u()(n,r)}return p()(t,e),l()(t,[{key:"componentDidMount",value:function(){var e=this.props.module;this.props.getModuleText({hosId:this.props.HospitalId,pageId:e.id})}},{key:"componentWillReceiveProps",value:function(e){if(parseInt(this.props.module.id)!==parseInt(e.module.id)){console.log("更新module id");var t=e.module;this.props.getModuleText({hosId:this.props.HospitalId,pageId:t.id})}}},{key:"updateTextarea",value:function(e){var t=e.target.value;console.log(t),this.props.saveTextArea(t)}},{key:"syncTextArea",value:function(){var e=this;this.setState({loading:!0});var t=this.props.module;this.props.syncTextArea({hosId:this.props.HospitalId,pageId:t.id,sections:this.props.textData}).then(function(t){t.payload?(e.setState({loading:!1}),e.props.templateModifyFalse(),k.a.success({message:"同步模块文字成功！"})):(e.setState({loading:!1}),k.a.error({message:"同步失败！",description:"服务当前不可用"}))})}},{key:"render",value:function(){var e=this.props.textData?this.props.textData:"这个模块还没有文本数据！";return h.a.createElement("div",null,h.a.createElement(b.a,{message:"当前编辑的模板ID是 "+this.props.templateID+",模块名是"+this.props.module.name,type:"info",showIcon:!0}),h.a.createElement(M.a,{mode:"horizontal",selectedKeys:["edit"]},h.a.createElement(M.a.Item,{key:"edit"},h.a.createElement(g.a,{type:"mail"}),"编辑模块"),h.a.createElement(M.a.Item,{key:"preview"},h.a.createElement(g.a,{type:"mail"}),"预览"),h.a.createElement(M.a.Item,{key:"gpdf"},h.a.createElement("a",{href:"https://ant.design",target:"_blank",rel:"noopener noreferrer"},h.a.createElement(g.a,{type:"mail"}),"生成PDF"))),h.a.createElement("div",{className:v.a.edit_body},h.a.createElement(x,{placeholder:"正在加载文本信息...",value:e,rows:8,onChange:this.updateTextarea.bind(this)}),h.a.createElement("div",{className:v.a.sync_circle},h.a.createElement(N.a,{type:"primary",icon:"sync",onClick:this.syncTextArea.bind(this),loading:this.state.loading},"同步模块文字"))))}}]),t}(h.a.Component);t.a=F},vmjQ:function(e,t){},w0dx:function(e,t,a){"use strict";var n=a("Zx67"),i=a.n(n),r=a("Zrlr"),o=a.n(r),s=a("wxAW"),l=a.n(s),c=a("zwoO"),u=a.n(c),d=a("Pf15"),p=a.n(d),m=a("U7vG"),h=a.n(m),f=a("qB1w"),v=a.n(f),y=a("3pby"),E=(a.n(y),a("H9lX")),g=a.n(E),I=a("vaID"),M=a.n(I),_=a("vgHw"),b=a.n(_),D=a("IidI"),T=a.n(D),S=a("7h3N"),N=a.n(S),w=a("Y2f6"),k=(a.n(w),a("du7Z")),x=(a.n(k),a("N3Nc")),F=(a.n(x),a("+ASa")),O=(a.n(F),a("d5We")),A=(a.n(O),a("XCJ0")),R=(a.n(A),a("r0bZ")),C=(a.n(R),a("GPBq")),U=(a.n(C),a("4yHo")),P=(a.n(U),a("onAH")),H=(a.n(P),a("M4fF")),G=a.n(H),K=a("1cZb"),W=(a.n(K),a("U2t0")),q=a("JaHG"),z=a("tWyK"),Z=a("/cg+"),B=v.a.TabPane,L=function(e){function t(){var e,a,n,r;o()(this,t);for(var s=arguments.length,l=Array(s),c=0;c<s;c++)l[c]=arguments[c];return a=n=u()(this,(e=t.__proto__||i()(t)).call.apply(e,[this].concat(l))),n.state={activeKey:"",templateModify:!1,selectedModule:"",visiableAddNew:!1},n.tabClick=function(e){parseInt(e)!==parseInt(n.state.activeKey)&&(n.state.templateModify?M.a.confirm({title:"请确认",content:"当前配置已经修改，你要丢弃当前修改吗？",okText:"是的",cancelText:"取消",onOk:n.confirmSHIFT.bind(n,e)}):n.confirmSHIFT(e))},r=a,u()(n,r)}return p()(t,e),l()(t,[{key:"exchangeModulePosition",value:function(e,t,a){var n=G.a.find(this.props.templatesInfo.templates,{templateID:parseInt(e)});G.a.cloneDeep(n)}},{key:"templateModifyTrue",value:function(){this.setState({templateModify:!0})}},{key:"templateModifyFalse",value:function(){this.setState({templateModify:!1})}},{key:"confirmSHIFT",value:function(e){var t=G.a.find(this.props.templatesInfo,{templateID:parseInt(e)});t?(N.a.warning({message:"请注意！您即将配置"+t.templateName+"!"}),this.switchSure(e)):N.a.warning({message:"没有找到对应的模板,id为:"+e})}},{key:"switchSure",value:function(e){var t=this;parseInt(e)!==parseInt(this.state.activeKey)&&this.setState({activeKey:e,selectedModule:""},function(){t.templateModifyFalse()})}},{key:"showModal",value:function(){this.setState({visiableAddNew:!0})}},{key:"hideModal",value:function(){this.setState({visiableAddNew:!1})}},{key:"componentDidMount",value:function(){var e=this;this.props.GET_TEMPLATES().then(function(){var t=parseInt(e.state.activeKey),n=0!==e.props.templatesInfo.length?e.props.templatesInfo[0].templateID:"",i="number"!=typeof t||isNaN(t)?parseInt(n):t;a.i(q.a)(n)&&e.setState({activeKey:i},function(){console.log("初始加载完毕的page为",i)})})}},{key:"curSelectModule",value:function(e){this.setState({selectedModule:e})}},{key:"render",value:function(){var e=this.props.match.params.id,t=this.props.templatesInfo,a=0!==t.length,n=t,i=G.a.find(n,{templateID:parseInt(this.state.activeKey)});return h.a.createElement("div",null,a&&h.a.createElement("div",null,h.a.createElement("div",null,h.a.createElement(v.a,{onTabClick:this.tabClick.bind(this),activeKey:""+this.state.activeKey,size:"default",type:"card"},n&&n.map(function(e){return h.a.createElement(B,{tab:e.templateName,key:e.templateID})})))),h.a.createElement("div",{className:g.a.tab_content},h.a.createElement("div",{className:"modules_list"},h.a.createElement("div",null,i&&h.a.createElement(W.a,{sync:this.props.SYNC_MODULES_IN_TEMPLATES,templateID:this.state.activeKey,templateName:i.templateName,exchangeModulePosition:this.exchangeModulePosition,curModules:i.modules,templateModifyTrue:this.templateModifyTrue.bind(this),templateModifyFalse:this.templateModifyFalse.bind(this),templateModify:this.state.templateModify,selectedModule:this.curSelectModule.bind(this),reFetchData:this.componentDidMount.bind(this)}))),h.a.createElement("div",{className:"modules_content"},a&&!this.state.selectedModule&&h.a.createElement("div",{className:g.a.edit,style:{marginTop:100,marginBottom:100}},h.a.createElement(b.a,{type:"edit",style:{fontSize:100,color:"#e2e2e2"}}),h.a.createElement("div",null,"点击左侧模块，进行编辑操作")),this.state.selectedModule&&h.a.createElement(z.a,{module:this.state.selectedModule,templateID:this.state.activeKey,textData:this.props.textData,getModuleText:this.props.GET_MODULE_TEXT,saveTextArea:this.props.SAVE_TEXTAREA,syncTextArea:this.props.SYNC_TEXTAREA,templateModifyTrue:this.templateModifyTrue.bind(this),templateModifyFalse:this.templateModifyFalse.bind(this),HospitalId:e}))),h.a.createElement("div",{className:g.a.add_new},h.a.createElement(T.a,{type:"primary",shape:"circle",icon:"plus",onClick:this.showModal.bind(this)}),h.a.createElement(Z.a,{visiableAddNew:this.state.visiableAddNew,hideModal:this.hideModal.bind(this),addNewModule:this.props.ADD_NEW_MODULE})))}}]),t}(h.a.Component);t.a=L},zYeL:function(e,t,a){"use strict";var n=a("U7vG"),i=(a.n(n),a("BCOr")),r=a("RH2O"),o=a("w0dx"),s=function(e){return e.templates},l=i.a,c=a.i(r.b)(s,l)(o.a);t.a=c}},["NHnr"]);