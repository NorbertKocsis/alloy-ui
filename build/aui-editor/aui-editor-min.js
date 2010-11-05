AUI.add("aui-editor-base",function(B){var D=B.Lang,E="editor";var C=B.Component.create({NAME:E,EXTENDS:B.EditorBase,ATTRS:{toolbarConfig:{value:null}},prototype:{initializer:function(){var A=this;A.publish("toolbar:ready",{fireOnce:true});A.after("ready",function(){A.plug(B.Plugin.EditorToolbar,A.get("toolbarConfig"));A.fire("toolbar:ready");A.focus();});},addGroup:function(F){var A=this;A.on("toolbar:ready",function(){A.toolbar.addGroup(F);});},addGroupType:function(F,G){var A=this;A.on("toolbar:ready",function(){A.toolbar.addGroupType(F,G);});}}});B.Editor=C;},"@VERSION@",{requires:["aui-base","editor-base","aui-editor-toolbar-plugin"]});AUI.add("aui-editor-tools-plugin",function(C){var F=C.Lang,G="justify",H={div:true,h1:true,h2:true,h3:true,h4:true,h5:true,h6:true,p:true},J={br:true},D={li:true},E='<div style="text-align: {0};">{1}</div>';function I(A){var K=null;var L=A.get("childNodes");L.some(function(N,M,O){if(N.get("innerHTML")=="{0}"){N.html("");K=N;return true;}return I(N);});return K;}var B={};C.mix(C.Plugin.ExecCommand.COMMANDS,{justify:function(M,L){var Q=this;var R=Q.get("host");var K=R.getInstance();var P=new K.Selection();var O=P.getSelected();var N=false;if(P.isCollapsed||!O.size()){var A=P.anchorTextNode;O=[A];N=true;}O.each(function(V,S,X){var T=V.get("tagName");if(T){T=T.toLowerCase();}if(J[T]){return;}if(T=="font"){var W=V.get("parentNode");if(!W.test("body")){V=W;T=V.get("tagName").toLowerCase();}}if(!V.test("body")&&V.getComputedStyle("textAlign")==L){return;}var U=V.get("parentNode");var Y;if(H[T]||V.getComputedStyle("display")=="block"){Y=V;}else{if(!U.get("childNodes").item(1)||D[T]){T=U.get("tagName").toLowerCase();if(H[T]||U.getComputedStyle("display")=="block"){Y=U;}}else{if(N){R.execCommand("inserthtml",F.sub(E,[L,K.Selection.CURSOR]));P.focusCursor(true,true);return;}else{Y=C.Node.create(F.sub(E,[L,""]));U.insert(Y,V);Y.append(V);}}}if(Y){Y.setStyle("textAlign",L);}});},justifycenter:function(){var A=this;return A.get("host").execCommand(G,"center");},justifyleft:function(){var A=this;return A.get("host").execCommand(G,"left");},justifyright:function(){var A=this;return A.get("host").execCommand(G,"right");},subscript:function(){var A=this;return A.get("host").execCommand("wrap","sub");},superscript:function(){var A=this;return A.get("host").execCommand("wrap","sup");},wraphtml:function(N,P){var A=this;var M=A.get("host");var O=M.getInstance();var L=new O.Selection();var K=L.getSelected();if(!L.isCollapsed&&K.size()){K.each(function(S,Q,U){var R=S.ancestor();var V=C.Node.create(P);R.insert(V,S);if(V.html()!=""){if(V.html()=="{0}"){V.html("");}else{var T=I(V);if(T){V=T;}}}V.append(S);});}else{M.execCommand("inserthtml",F.sub(P,[O.Selection.CURSOR]));if(P.indexOf("{0}")!=-1){L.focusCursor(true,true);}}}});C.Plugin.EditorTools=B;},"@VERSION@",{requires:["aui-base","editor-base"]});AUI.add("aui-editor-menu-plugin",function(E){var L=E.Lang,B=L.isString,G=E.ClassNameManager.getClassName,Q="editormenu",D="editormenuplugin",N="menu",R="content",C=G(Q,R,"list"),I=G(Q,R,"text"),K=G(Q,R,"item"),O="<{1}{2}>{0}</{1}>",M='<li class="'+K+'">'+O+"</li>",F='<ul class="'+C+'"></ul>',J='<li class="'+I+'"><span>{0}</span></li>';var H=E.Component.create({NAME:Q,EXTENDS:E.OverlayContext,ATTRS:{headerContent:{value:"",setter:function(S){var A=this;A._headerContent=S;return"";}},host:{value:false},items:{value:null}},prototype:{renderUI:function(){var A=this;H.superclass.renderUI.apply(A,arguments);var X=A.get("host");var T=A.get("contentBox");var V=A._headerContent;var U=A.get("items");var W=E.Node.create(F);E.each(U,function(c,a,d){var Z="";if(B(c)){Z+=L.sub(J,[c]);}else{var Y=A._generateTagAttr(c);Z+=L.sub(M,[c.label,c.tag,Y]);}var b=E.Node.create(Z);b.setData(Q,c);W.append(b);});var S=new E.Panel({collapsible:false,headerContent:V,icons:[{icon:"close",handler:{fn:A.hide,context:A}}]}).render(T);S.bodyNode.append(W);A._menuList=W;},bindUI:function(){var A=this;H.superclass.bindUI.apply(A,arguments);A._menuList.delegate("click",A._onMenuListItemClick,"."+K,A);},_generateTagAttr:function(X){var A=this;var S=[];var U="";var T=X.attributes;var W=X.styles;if(T){for(var V in T){S.push(" "+V+'="'+T[V]+'"');}}if(W){S=[' style="'];for(var V in W){S.push(V+": "+W[V]+";");}S.push('"');}return S.join("");},_onMenuListItemClick:function(X){var S=this;var W=X.currentTarget;var U=W.getData(Q);var A=S._generateTagAttr(U);var T=L.sub(O,["{0}",U.tag,A]);var V=S.get("host");V.execCommand("wraphtml",T);V.focus();S.hide();},_uiSetHeight:function(U){var A=this;var S=A.get("boundingBox");var T=A._menuList;S.setStyle("height","auto");T.setStyle("height",U);},_uiSetWidth:function(U){var A=this;var S=A.get("boundingBox");var T=A._menuList;S.setStyle("width","auto");T.setStyle("width",U);}}});var P=E.Component.create({EXTENDS:E.Plugin.Base,NAME:D,NS:N,prototype:{add:function(S){var A=this;var T=A.get("host");return new H(E.mix({host:T},S)).render();}}});E.namespace("Plugin").EditorMenu=P;},"@VERSION@",{requires:["aui-base","editor-base","aui-overlay-context","aui-panel","aui-editor-tools-plugin"]});AUI.add("aui-editor-toolbar-plugin",function(T){var AJ=T.Lang,d=AJ.isArray,U=AJ.isFunction,AE=T.ClassNameManager.getClassName,i="editortoolbar",AH="toolbar",X="alignment",e="align-left",w="align-inline",W="align-block",AI="align-right",k="color",p="content",Q="font",AD="indent",M="input",r="insert",g="insertimage",x="insertlink",s="list",Y="select",D="source",N="styles",z="subscript",y="text",n="circle-check",B="close",AB={backcolor:true,forecolor:true,format:true,insertimage:true,insertlink:true,source:true,styles:true},a=["b","big","font","em","i","small","s","strike","strong","sub","sup","u"],R=AE("button","holder"),S=AE("field",M),Z=AE("field",M,"text"),I=AE("field","label"),h=AE("field","numeric"),O=AE(i,"align","node"),b=AE(i,g),L=AE(i,x),C=AE(i,Y,"fontname"),AC=AE(i,Y,"fontsize"),G=AE(i,"size","separator"),J=AE(i,D,"textarea"),F=AE("state","active"),K=AE(i),c=AE(i,p),q='<div class="'+O+'"></div>',P="<a></a>",f="<img />",m='<a href="{0}"{2}>{1}</a>',H='<textarea class="'+J+'"></textarea>',AG='<div class="'+K+'"><div class="'+c+'"></div></div>',u='<div class="'+R+'"></div>',AF='<select class="'+C+'">{0}</select>',V='<option selected="selected"></option>'+"<option>Arial</option>"+"<option>Arial Black</option>"+"<option>Comic Sans MS</option>"+"<option>Courier New</option>"+"<option>Lucida Console</option>"+"<option>Tahoma</option>"+"<option>Times New Roman</option>"+"<option>Trebuchet MS</option>"+"<option>Verdana</option>",v='<select class="'+AC+'">{0}</select>',o='<option selected="selected"></option>'+'<option value="1">10</option>'+'<option value="2">13</option>'+'<option value="3">16</option>'+'<option value="4">18</option>'+'<option value="5">24</option>'+'<option value="6">32</option>'+'<option value="7">48</option>',l='<span class="'+G+'">x</span>';
var j=T.Component.create({NAME:i,NS:AH,EXTENDS:T.Plugin.Base,ATTRS:{append:{value:null},groups:{value:[{type:Q},{type:y},{type:z},{type:k},{type:X},{type:AD},{type:s},{type:r},{type:D}]}},prototype:{initializer:function(){var AZ=this;var AQ=AZ.get("host");var AO=AQ.frame.get("container");var AX=AZ.get("append");var Aa=AZ.get("groups");var AM=T.Node.create(AG);var AP=AM.one("."+c);AO.placeBefore(AM);AZ._boundingBox=AM;AZ._contentBox=AP;var AR=[];if(AX!=null&&d(AX)){var AS=AX.length;for(var AV=0;AV<AS;AV++){var AY=AX[AV];if(AY.index!=null){var AK=AZ._isGroupIncluded("type",Aa,AY.type);if(AK!=-1){Aa.splice(AK,1);}Aa.splice(Math.min(AY.index,Aa.length),0,AY);}else{Aa.push(AY);}}}for(var AV=0;AV<Aa.length;AV++){var AL=Aa[AV];var AT=t[AL.type]||AL;var AW=[];if(d(AL.include)){var A=AL.include.length;for(var AU=0;AU<A;AU++){var AK=AZ._isGroupIncluded("icon",AT.children,AL.include[AU]);if(AK!=-1){AW.push(AT.children[AK]);}}}else{AW=AT.children;}var AN=AZ._addGroup(AL,AT,AW);if(AN){AR.push(AN);}}AZ._toolbars=AR;AP.delegate("click",function(Ae){var Ac=this;var Ad=T.Widget.getByNode(Ae.currentTarget);if(Ad){var Ab=Ad.get("icon").split("-");if(!AB[Ab[0]]){Ac.execCommand(Ab[0],(Ab[1]?Ab[1]:""));Ac.focus();}}},"button",AQ);},addGroup:function(AL){var A=this;var AK=t[AL.type]||AL;A._addGroup(AL,AK);},addGroupType:function(AK,AL){var A=this;if(!t[AK]){t[AK]=AL;}},_addGroup:function(AN,AT,AX){var Aa=this;var AK=(AX==null&&AN.index!=null);AX=AX||AT.children;if(d(AX)){var AQ=Aa.get("host");var AP=Aa._contentBox;var AL=[];var AO;var AS={boundingBox:Aa._boundingBox,contentBox:AP};for(var AW=0;AW<AX.length;AW++){var A=AX[AW];if(!A.select){var Ac=YUI.AUI.defaults.EditorToolbar.STRINGS[A._titleKey];A.title=(Ac!=null?Ac:AA[A._titleKey]);AL.push(A);}}if(AL.length>0){AO=new T.Toolbar(T.merge(AT.config,AN.toolbar,{children:AL})).render(AP);}var AU=AT.generate;if(AU&&U(AU.init)){AU.init.call(Aa,AQ,AS);}AL=(AL.length>0?AL:AX);for(var AW=0;AW<AL.length;AW++){var AZ=AL[AW];var AY=AZ.icon;if(AU&&U(AU[AY])){var Ab=(AN.config?AN.config[AY]:null);AS.button=(AZ.select||!AO?null:AO.item(AW));AU[AY].call(Aa,AQ,AS,Ab);}}if(AK){var AR=AP.get("childNodes");var AV=AR.size();var AM=AN.index;if(AM<AV-1){AP.insert(AR.item(AV-1),AR.item(AM));}}return AO;}},_isGroupIncluded:function(AK,AM,AN){var A=this;for(var AL=0;AL<AM.length;AL++){if(AM[AL][AK]==AN){return AL;}}return -1;},_updateToolbar:function(A,AP){var AQ=this;if(A.changedNode){var AL=A.commands;var AR=AQ.toolbars;var AT=function(AV,AU,AX){var AW=!!(AL[AV.get("icon")]);AV.StateInteraction.set("active",AW);};if(AR){for(var AN=0;AN<AR.length;AN++){AR[AN].each(AT);}}var AK=A.fontFamily;var AO=AP._fontNameOptions;var AS=A.fontSize;var AM=AP._fontSizeOptions;if(AO){AO.item(0).set("selected",true);AO.each(function(AV,AU,AX){var AW=AV.get("value").toLowerCase();if(AW===AK.toLowerCase()){AV.set("selected",true);}});}if(AM){AS=AS.replace("px","");AM.item(0).set("selected",true);AM.each(function(AW,AV,AY){var AX=AW.get("value").toLowerCase();var AU=AW.get("text");if(AU===AS){AW.set("selected",true);}});}}}}});function E(AL){var A=this;var AN=AL.currentTarget;var AK=AN.get("className");var AM=AK.substring(AK.lastIndexOf("-")+1);var AO=AN.get("value");A.execCommand(AM,AO);A.focus();}j.generateOverlay=function(AM,AL,A){var AK=new T["OverlayContext"+(A?"Panel":"")](T.merge({align:{node:AM,points:["tl","bl"]},hideOn:"click",showOn:"click",trigger:AM},AL)).render();return AK;};j.generateColorPicker=function(AP,AM,AL,AQ){var AO=AM.button;var AK=AO.get("boundingBox");var A=new T.ColorPicker(T.merge({align:{node:AK,points:["tl","bl"]},trigger:AK},AL));if(AL&&AL.plugins){for(var AN=0;AN<AL.plugins.length;AN++){A.plug(AL.plugins[AN],AL);}}A.render(T.getBody());A.on("colorChange",function(AT){var AR=this;var AS=A.get("rgb");AP.execCommand(AQ,AS.hex);AP.focus();});};j.openOverlayToAlignNode=function(AL,AK,AM,A){var AO=AM.getXY();var AN=A.getXY();AO=[AO[0]+AN[0],AO[1]+AN[1]];AK.setStyle("width",A.get("offsetWidth"));AK.setStyle("height",A.get("offsetHeight"));AK.setXY(AO);AK.show();AL.set("align",{node:AK,points:["tl","bc"]});AL.show();};var AA={ALIGN:"Align",ALIGN_BLOCK:"Block",ALIGN_LEFT:"Left",ALIGN_INLINE:"Inline",ALIGN_RIGHT:"Right",BACKCOLOR:"Background Color",BOLD:"Bold",BORDER:"Border",DESCRIPTION:"Description",EDIT_IMAGE:"Edit Image",EDIT_LINK:"Edit Link",FORECOLOR:"Foreground Color",IMAGE_URL:"Image URL",INDENT:"Indent",INSERT:"Insert",INSERT_IMAGE:"Insert Image",INSERT_LINK:"Insert Link",INSERT_ORDERED_LIST:"Insert Numbered List",INSERT_UNORDERED_LIST:"Insert Bulleted List",ITALIC:"Italic",JUSTIFY_LEFT:"Justify Left",JUSTIFY_CENTER:"Justify Center",JUSTIFY_RIGHT:"Justify Right",LINE_THROUGH:"Line Through",LINK_URL:"Link URL",OPEN_IN_NEW_WINDOW:"Open in new window",OUTDENT:"Outdent",PADDING:"Padding",REMOVE_FORMAT:"Format Source",SAVE:"Save",SIZE:"Size",SOURCE:"Source",SUBSCRIPT:"Subscript",SUPERSCRIPT:"Superscript",STYLES:"Styles",UNDERLINE:"Underline"};if(!YUI.AUI.defaults.EditorToolbar){YUI.AUI.defaults.EditorToolbar={STRINGS:{}};}T.mix(YUI.AUI.defaults.EditorToolbar.STRINGS,AA);var t={};t[X]={children:[{icon:"justifyleft",_titleKey:"JUSTIFY_LEFT"},{icon:"justifycenter",_titleKey:"JUSTIFY_CENTER"},{icon:"justifyright",_titleKey:"JUSTIFY_RIGHT"}]};t[k]={children:[{icon:"forecolor",_titleKey:"FORECOLOR"},{icon:"backcolor",_titleKey:"BACKCOLOR"}],generate:{forecolor:function(AM,AL,AK){var A=this;j.generateColorPicker(AM,AL,AK,"forecolor");},backcolor:function(AM,AL,AK){var A=this;j.generateColorPicker(AM,AL,AK,"backcolor");}}};t[Q]={children:[{icon:"fontname",select:true},{icon:"fontsize",select:true}],generate:{init:function(AM,AL){var A=this;var AK=AL.contentBox;AM.after("nodeChange",function(AO){var AN=this;switch(AO.changedType){case"keyup":case"mousedown":AN._updateToolbar(AO,AL);break;}},A);},fontname:function(AO,AN,AM){var A=this;var AK=AN.contentBox;var AP;var AQ=[V];if(AM&&AM.optionHtml){AQ[0]=AM.optionHtml;}AP=T.Node.create(AJ.sub(AF,AQ));AK.append(AP);AP.on("change",E,AO);var AL=AK.all("."+C+" option");
AN._fontNameOptions=AL;return AP;},fontsize:function(AO,AN,AM){var A=this;var AK=AN.contentBox;var AP;var AQ=[o];if(AM&&AM.optionHtml){AQ[0]=AM.optionHtml;}AP=T.Node.create(AJ.sub(v,AQ));AK.append(AP);AP.on("change",E,AO);var AL=AK.all("."+AC+" option");AN._fontSizeOptions=AL;return AP;}}};t[AD]={children:[{icon:"indent",_titleKey:"INDENT"},{icon:"outdent",_titleKey:"OUTDENT"}]};t[r]={children:[{icon:"insertimage",_titleKey:"INSERT_IMAGE"},{icon:"insertlink",_titleKey:"INSERT_LINK"}],generate:{insertimage:function(AN,AW,Af){var Ad=this;var A=AW.button;var AQ=A.get("boundingBox");var Ac=j.generateOverlay(AQ,Af,true);var AZ=Ac.get("contentBox");var AU=new T.Panel({collapsible:false,title:YUI.AUI.defaults.EditorToolbar.STRINGS.INSERT_IMAGE,icons:[{icon:B,handler:{fn:Ac.hide,context:Ac}}]}).render(AZ);AZ=AU.bodyNode;if(Af&&Af.dataBrowser){Af.dataBrowser.render(AZ);}else{var AR=AN.frame._iframe;var AP;var Ag;var Ae=new T.Form({cssClass:b,labelAlign:"left"}).render(AZ);var AT=[{labelText:"none",value:"none"}];for(var Aa=1;Aa<6;Aa++){AT.push({labelText:Aa+"px",value:Aa+"px solid"});}Ae.add([{id:"imageURL",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.IMAGE_URL},{id:"size",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.SIZE,type:"hidden"},{id:"width",labelText:false,cssClass:h},{id:"height",labelText:false,cssClass:h},{id:"padding",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.PADDING},new T.Select({id:"border",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.BORDER,options:AT}),{id:"align",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.ALIGN,type:"hidden"},{id:"description",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.DESCRIPTION},{id:"linkURL",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.LINK_URL},{id:"openInNewWindow",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.OPEN_IN_NEW_WINDOW,type:"checkbox"}],true);Ae.getField("width").get("boundingBox").placeAfter(l);var AO=Ae.get("contentBox");var Ab=T.Node.create(u);var AV=Ae.getField("openInNewWindow");var AY=new T.ButtonItem({icon:n,label:YUI.AUI.defaults.EditorToolbar.STRINGS.INSERT}).render(Ab);AY.on("click",function(Ai){var As=this;var Aj;var Am;var Aq;if(AP){Am=AP;Aq=AP.get("parentNode");if(Aq.get("tagName").toLowerCase()=="a"){Aj=Aq;}}else{Am=T.Node.create(f);}var Al=Ae.get("fieldValues");var Ar=Al.description;var An={src:Al.imageURL,title:Ar,alt:Ar};var Ap={border:Al.border};var At=parseInt(Al.height,10);var Ak=parseInt(Al.width,10);if(!isNaN(At)){An.height=At;}if(!isNaN(Ak)){An.width=Ak;}var Ao=parseInt(Al.padding,10);if(!isNaN(Ao)){Ap.padding=Ao;}AX.some(function(Aw,Av,Ay){var Au=this;var Ax=Aw.StateInteraction.get("active");if(Ax){Ap.display="";switch(Av){case 0:An.align="left";break;case 1:An.align="";break;case 2:An.align="center";Ap.display="block";break;case 3:An.align="right";break;}return true;}});Am.setAttrs(An);Am.setStyles(Ap);var Ah=Al.linkURL;if(Ah){if(!Aj){Aj=T.Node.create(P);if(AP){Aq.insert(Aj,AP);}Aj.append(Am);}Aj.setAttribute("href",Ah);Aj.setAttribute("target",(AV.get("node").get("checked")?"_blank":""));Am=Aj;}else{if(AP&&Aj){Aq.insert(AP,Aj);Aj.remove(true);}}if(!AP&&Ag&&Ag.anchorNode){Ag.anchorNode.append(Am);}Ac.hide();});var AS=T.Node.create(f);var AK=Ae.getField("height");var AL=Ae.getField("width");AS.on("load",function(Ai){var Ah=Ai.currentTarget;if(!AK.get("value")||!AL.get("value")){Ae.set("values",{height:Ah.get("height"),width:Ah.get("width")});}});Ae.getField("imageURL").get("node").on("blur",function(Ah){AS.set("src",this.val());});AO.append(Ab);var AX=new T.Toolbar({activeState:true,children:[{icon:e,title:YUI.AUI.defaults.EditorToolbar.STRINGS.ALIGN_LEFT},{icon:w,title:YUI.AUI.defaults.EditorToolbar.STRINGS.ALIGN_INLINE},{icon:W,title:YUI.AUI.defaults.EditorToolbar.STRINGS.ALIGN_BLOCK},{icon:AI,title:YUI.AUI.defaults.EditorToolbar.STRINGS.ALIGN_RIGHT}]});AX.after("buttonitem:click",function(Ai){var Ah=Ai.target;AX.each(function(Ak,Aj,Al){if(Ak!=Ah){Ak.StateInteraction.set("active",false);}});});AX.render(Ae.getField("align").get("contentBox"));Ac.on("show",function(Ah){if(!Ag||!Ag.anchorNode){var Ai=AN.getInstance();AN.focus();Ag=new Ai.Selection();}});Ac.after("hide",function(Ah){Ae.resetValues();AX.each(function(Aj,Ai,Ak){Aj.StateInteraction.set("active",false);});AV.get("node").set("checked",false);AU.set("title",YUI.AUI.defaults.EditorToolbar.STRINGS.INSERT_IMAGE);AY.set("label",YUI.AUI.defaults.EditorToolbar.STRINGS.INSERT);AM.hide();Ac.set("align",{node:AQ,points:["tl","bl"]});AP=null;});var AM=T.Node.create(q);AM.hide();T.getBody().append(AM);AN.on("toolbar:ready",function(){var Ah=AN.frame._iframe;var Ai=AN.getInstance();Ah.on("mouseout",function(Aj){var Ak=AN.getInstance();Ag=new Ak.Selection();});Ai.one("body").delegate("click",function(Ao){var Aj=this;if(AP!=Ao.currentTarget){var Al=Ao.currentTarget;var An=Al.get("parentNode");var Ak=Al.getStyle("borderWidth");var Ap=Al.getStyle("padding");var Aq=(An.get("tagName").toLowerCase()=="a");Ae.set("values",{border:(Ak?Ak+" solid":""),description:Al.get("alt"),height:Al.get("height"),imageURL:Al.get("src"),linkURL:(Aq?An.get("href"):""),width:Al.get("width"),padding:(Ap?parseInt(Ap):"")});var Am=1;switch(Al.getAttribute("align")){case"left":Am=0;break;case"center":Am=2;break;case"right":Am=3;break;}AX.item(Am).StateInteraction.set("active",true);AV.get("node").attr("checked",(Aq&&An.getAttribute("target")=="_blank"));AU.set("title",YUI.AUI.defaults.EditorToolbar.STRINGS.EDIT_IMAGE);AY.set("label",YUI.AUI.defaults.EditorToolbar.STRINGS.SAVE);AP=Al;j.openOverlayToAlignNode(Ac,AM,Ah,Al);}},"img");});}},insertlink:function(AL,AT,AZ){var AY=this;var A=AT.button;var AN=A.get("boundingBox");var AX=j.generateOverlay(AN,AZ,true);var AV=AX.get("contentBox");var AR=new T.Panel({collapsible:false,title:YUI.AUI.defaults.EditorToolbar.STRINGS.INSERT_LINK,icons:[{icon:B,handler:{fn:AX.hide,context:AX}}]}).render(AV);AV=AR.bodyNode;var AO=AL.frame._iframe;var AM;var Aa;var AQ=new T.Form({cssClass:L,labelAlign:"left"}).render(AV);AQ.add([{id:"description",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.DESCRIPTION},{id:"linkURL",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.LINK_URL},{id:"openInNewWindow",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.OPEN_IN_NEW_WINDOW,type:"checkbox"}],true);
var AP=AQ.get("contentBox");var AW=T.Node.create(u);var AS=AQ.getField("openInNewWindow");var AU=new T.ButtonItem({icon:n,label:YUI.AUI.defaults.EditorToolbar.STRINGS.INSERT}).render(AW);AU.on("click",function(Ad){var Ab=this;var Ac=AQ.get("fieldValues");if(AM){AM.setAttribute("href",Ac.linkURL);AM.set("innerHTML",Ac.description);if(AS.get("node").get("checked")){AM.setAttribute("target","_blank");}else{AM.setAttribute("target","");}}else{AL.execCommand("inserthtml",AJ.sub(m,[Ac.linkURL,Ac.description,(AS.get("node").get("checked")?' target="_blank"':"")]));}AX.hide();});AP.append(AW);AX.after("hide",function(Ab){AQ.resetValues();AS.get("node").set("checked",false);AR.set("title",YUI.AUI.defaults.EditorToolbar.STRINGS.CREATE_LINK);AU.set("label",YUI.AUI.defaults.EditorToolbar.STRINGS.INSERT);AK.hide();AX.set("align",{node:AN,points:["tl","bl"]});AM=null;});var AK=T.Node.create(q);AK.hide();T.getBody().append(AK);AL.on("toolbar:ready",function(){var Ab=AL.getInstance();Ab.one("body").delegate("click",function(Af){var Ac=this;if(AM!=Af.currentTarget){var Ae=Af.currentTarget;if(!Ae.one("img")){var Ad=Ae.get("parentNode");AQ.set("values",{description:Ae.get("innerHTML"),linkURL:Ae.getAttribute("href"),});AS.get("node").attr("checked",(Ae.getAttribute("target")=="_blank"));AR.set("title",YUI.AUI.defaults.EditorToolbar.STRINGS.EDIT_LINK);AU.set("label",YUI.AUI.defaults.EditorToolbar.STRINGS.SAVE);AM=Ae;j.openOverlayToAlignNode(AX,AK,AO,Ae);}}},"a");});}}};t[s]={children:[{icon:"insertunorderedlist",_titleKey:"INSERT_UNORDERED_LIST"},{icon:"insertorderedlist",_titleKey:"INSERT_ORDERED_LIST"}],generate:{init:function(AK){var A=this;AK.plug(T.Plugin.EditorLists);}}};t[D]={children:[{icon:"format",_titleKey:"REMOVE_FORMAT"},{icon:"source",_titleKey:"SOURCE"}],generate:{format:function(AN,AL,AK){var A=this;var AO=AN.frame;var AM=AL.button;AM.on("click",function(AS){var AP=this;var AT=AP.getInstance();var AR=new AT.Selection();var AQ=AR.getSelected();if(!AR.isCollapsed&&AQ.size()){AQ.each(function(Aa,AW,Ab){var AU=this;Aa.removeAttribute("style");var AY=Aa.get("innerHTML");AY=AY.replace(/<([a-zA-Z0-9]*)\b[^>]*>/g,"<$1>");for(var AX=0;AX<a.length;AX++){var AV=new RegExp("(<"+a[AX]+">|<\\/"+a[AX]+">)","ig");AY=AY.replace(AV,"");}Aa.set("innerHTML",AY);var AZ=Aa.get("parentNode");if(!AZ.test("body")){AZ.removeAttribute("style");}});}},AN);},source:function(AN,AQ,AL){var AR=this;var AK=AN.frame;var A=AK.get("container");var AO=AQ.contentBox;var AM=AQ.button;var AP=T.Node.create(H);AP.hide();A.append(AP);AM._visible=false;AM.on("click",function(AV){var AT=AM._visible;if(AT){AN.set("content",AP.val());AP.hide();AP.val("");AK.show();}else{var AU=AK._iframe;AP.val(AN.getContent());var AS=AU.get("offsetHeight")-AP.getPadding("tb");AP.setStyle("height",AS);AK.hide();AP.show();}AT=!AT;AM._visible=AT;AO.all("select").attr("disabled",AT);AO.all("button").attr("disabled",AT);AM.get("contentBox").attr("disabled",false);});}}};t[N]={children:[{icon:"styles",_titleKey:"STYLES"}],generate:{styles:function(AO,AM,AL){var A=this;var AN=AM.button;var AK=AN.get("boundingBox");AO.plug(T.Plugin.EditorMenu);AO.menu.add(T.merge({align:{node:AK,points:["tl","bl"]},hideOn:"click",showOn:"click",trigger:AK},AL));}}};t[z]={children:[{icon:"subscript",_titleKey:"SUBSCRIPT"},{icon:"superscript",_titleKey:"SUPERSCRIPT"}]};t[y]={children:[{icon:"bold",_titleKey:"BOLD"},{icon:"italic",_titleKey:"ITALIC"},{icon:"underline",_titleKey:"UNDERLINE"},{icon:"strikethrough",_titleKey:"LINE_THROUGH"}]};T.namespace("Plugin").EditorToolbar=j;},"@VERSION@",{requires:["aui-base","aui-button-item","aui-color-picker","aui-editor-menu-plugin","aui-editor-tools-plugin","aui-form-select","aui-overlay-context-panel","aui-panel","aui-toolbar","createlink-base","editor-lists","editor-base","plugin"]});AUI.add("aui-editor-bbcode-plugin",function(S){var F=S.Lang,O=F.isArray,P=F.isString,K=S.ClassNameManager.getClassName,J="bbcodeplugin",R="bbcode",N="quote",X=N,Q=N+"-content",Z=N+"-title",T="\\[(({0})=([^\\]]*))\\]([\\s\\S]*?)\\[\\/{0}\\]",V="\\[({0})\\]([\\s\\S]*?)\\[\\/{0}\\]",E="<{0}(>|\\b[^>]*>)([\\s\\S]*?)</{0}>",G="<(([a-z0-9]+)\\b[^>]*?style=(\"|').*?{0}\\s*:\\s*([^;\"']+);?[^>]*)>([\\s\\S]*?)<(/\\2)>",I="(<[a-z0-9]+[^>]*>|</[a-z0-9]+>)",M='<div class="'+X+'"><div class="'+Q+'">',H="</div></div>",D='<div class="'+Z+'">$1</div>'+M,L="<div>{0}</div>",U=new RegExp(I,"gi"),W=[{convert:[["br"]],regExp:"<{0}[^>]*>",output:"\n"},{convert:[{tags:["font-family"],source:["font"]},{tags:["font-size"],source:["size"]},{tags:["[^a-z-]*color"],source:["color"]}],regExp:G,output:"<$1>[{0}=$4]$5[/{0}]<$6>"},{convert:[{tags:["font-style"],source:["i"]},{tags:["font-weight"],source:["b"]}],regExp:G,output:"<$1>[{0}]$5[/{0}]<$6>"},{convert:[["text-decoration"]],regExp:G,output:function(){var a="";var A=arguments[4].toLowerCase();if(A.indexOf("underline")!=-1){a+="[u]";}else{if(A.indexOf("line-through")!=-1){a+="[s]";}}if(a!=""){return"<"+arguments[1]+">"+a+arguments[5]+a.replace("[","[/")+"<"+arguments[6]+">";}return arguments[0];}},{convert:[["margin-left"]],regExp:G,output:function(){var a="";var b=parseInt(arguments[3],10);if(!isNaN(b)){var c=Math.floor(b/40);for(var A=0;A<c;A++){a+="[indent]";}}a=a+arguments[5]+a.replace(/\[/g,"[/");return"<"+arguments[1]+">"+a+"<"+arguments[6]+">";}},{convert:[{tags:["font","size"],source:["size"]},{tags:["font","face"],source:["font"]}],regExp:"(<{0}\\b[^>]*{1}=(\"|')([^\"']+)(\"|')[^>]*>)([\\s\\S]*?)(</{0}>)",output:"$1[{0}=$3]$5[/{0}]$6"},{convert:[["text-align"]],regExp:G,output:"<$1>[$4]$5[/$4]<$6>"},{convert:[["quote"]],regExp:"<div\\b[^>]*class=(\"|')([^\"']*?)_"+X+"[^\"']*(\"|')[^>]*>([\\s\\S]*?)</div>",output:"$4"},{convert:[["span"]],regExp:E,output:"$2"},{convert:[["blockquote"]],regExp:E,output:"[indent]$2[/indent]"},{convert:[["b"],["strong"]],regExp:E,output:"[b]$2[/b]"},{convert:[["i"],["em"]],regExp:E,output:"[i]$2[/i]"},{convert:[["u"]],regExp:E,output:"[u]$2[/u]"},{convert:[["s"],["strike"]],regExp:E,output:"[s]$2[/s]"},{convert:[["img"]],regExp:"(<a[^>]*>)?<{0}\\b[^>]*src=(\"|')([^\"']+)(\"|')[^>]*>(</a>)?",output:"[img]$3[/img]"},{convert:[["a"]],regExp:"<{0}\\b[^>]*href=(\"|')mailto:([^\"']+)(\"|')[^>]*>([\\s\\S]*?)</{0}>",output:"[email=$2]$4[/email]"},{convert:[["a"]],regExp:"<{0}\\b[^>]*href=(\"|')([^\"']+)(\"|')[^>]*>([\\s\\S]*?)</{0}>",output:"[url=$2]$4[/url]"},{convert:[["center"]],regExp:E,output:"[center]$2[/center]"},{convert:[["ul"]],regExp:E,output:"[list]$2[/list]"},{convert:[["ol"]],regExp:E,output:"[list=1]$2[/list]"},{convert:[["li"]],regExp:E,output:"[*]$2"},{convert:[["code"]],regExp:E,output:"[code]$2[/code]"},{convert:[["div"]],regExp:E,output:"$2\n"},{convert:[["h1"],["h2"],["h3"],["h4"],["h5"],["h6"]],regExp:E,output:"[b]$2[/b]\n"},{convert:[["p"]],regExp:E,output:"$2\n\n"},{convert:[{tags:["list","left|center|right"],source:["list"]}],regExp:"(\\[{0}[^\\]]*\\])\\s*\\[({1})\\]([\\s\\S]*?)\\[/\\2\\]\\s*\\[/{0}\\]",output:"[$2]$1$3[/{0}][/$2]"}],C=[{convert:[{tags:["b"],source:["b"]},{tags:["i"],source:["i"]},{tags:["u"],source:["u"]},{tags:["s"],source:["s"]},{tags:["code"],source:["code"]}],regExp:V,output:"<{0}>$2</{0}>"},{convert:[{tags:["color"],source:["color"]}],regExp:T,output:'<span style="{0}: $3;">$4</span>'},{convert:[{tags:["font"],source:["face"]},{tags:["size"],source:["size"]}],regExp:T,output:'<font {0}="$3">$4</font>'},{convert:[["img"]],regExp:V,output:'<img src="$2" alt="" />'},{convert:[{tags:["email"],source:["mailto:"]},{tags:["url"],source:[""]}],regExp:T,output:'<a href="{0}$3">$4</a>'},{convert:[["list"]],regExp:"\\[({0}(=1)?)]([\\s\\S]*?)\\[\\/{0}\\]",output:function(){var b="";
if(arguments[1]=="list=1"){b+="<ol>";}else{b+="<ul>";}var A=F.trim(arguments[3]).split("[*]");for(var a=1;a<A.length;a++){b+="<li>"+A[a]+"</li>";}if(arguments[1]=="list=1"){b+="</ol>";}else{b+="</ul>";}return b;}},{convert:[{tags:["indent"],source:["blockquote"]}],regExp:V,output:"<{0}>$2</{0}>"},{convert:[["left"],["center"],["right"]],regExp:V+"\n?",output:'<div style="text-align: $1;">$2</div>'},{convert:[["\n"]],regExp:"{0}",output:"<br />"}];var Y={};Y[N]={children:[{icon:"quote",_titleKey:"QUOTE"}]};S.mix(S.Plugin.ExecCommand.COMMANDS,{quote:function(c,d){var A=this;var b=A.get("host");var a=M+"{0}"+H;b.execCommand("wraphtml",a);b.focus();}});if(!YUI.AUI.defaults.EditorToolbar){YUI.AUI.defaults.EditorToolbar={STRINGS:{}};}S.mix(YUI.AUI.defaults.EditorToolbar.STRINGS,{QUOTE:"Quote"});var B=S.Component.create({NAME:J,NS:R,EXTENDS:S.Plugin.Base,ATTRS:{host:{value:false}},prototype:{initializer:function(){var A=this;var a=A.get("host");a.addGroupType(N,Y[N]);A.afterHostMethod("getContent",A.getBBCode,A);a.on("contentChange",A._contentChange,A);},getBBCode:function(){var A=this;var c=A.get("host");var d=c.getInstance();var e=d.one("body");var a;var b=function(n,h,f){var i;var m=n;do{if(m){i=m;}m=m.one("div."+Q);}while(m);var l=i.get("parentNode");var k=l.previous();var j="["+N;if(k&&k.hasClass(Z)){var g=k.get("innerHTML");g=g.replace(U,"");j+="="+(g.charAt(g.length-1)==":"?g.substring(0,g.length-1):k.get("innerHTML"));k.remove(true);}j+="]"+i.get("innerHTML")+"[/"+N+"]\n";l.set("innerHTML",j);l.removeClass(N);l.addClass("_"+N);};while(a=e.all("div."+X)){if(!a.size()){break;}a.each(b);}html=e.get("innerHTML");html=A._parseTagExpressions(W,html);html=html.replace(U,"");return new S.Do.AlterReturn(null,html);},getContentAsHtml:function(){var A=this;var a=A.get("host");return a.constructor.prototype.getContent.apply(a,arguments);},setContentAsBBCode:function(a){var A=this;var c=A.get("host");var b=A._parseBBCode(a);c.set("content",b);},_contentChange:function(a){var A=this;a.newVal=A._parseBBCode(a.newVal);a.stopImmediatePropagation();},_parseBBCode:function(a){var A=this;var b=a;b=b.replace(/\[quote=([^\]]*)\]/gi,D);b=b.replace(/\[quote\]/gi,M);b=b.replace(/\[\/quote\]\n?/gi,H);b=A._parseTagExpressions(C,b);return b;},_parseTagExpressions:function(l,f){var k=this;var e;var h;var A;var a;var m;for(var d=0;d<l.length;d++){e=l[d];h=e.convert;a=h.length;for(var c=0;c<a;c++){var b=e.output;A=h[c];if(O(A)){m=A;}else{m=A.tags;if(P(b)){b=F.sub(b,A.source);}}var g=F.sub(e.regExp,m);f=f.replace(new RegExp(g,"gi"),b);}}return f;}}});S.namespace("Plugin").EditorBBCode=B;},"@VERSION@",{requires:["aui-base","editor-base"]});AUI.add("aui-editor",function(B){},"@VERSION@",{skinnable:true,use:["aui-editor-base","aui-editor-tools-plugin","aui-editor-menu-plugin","aui-editor-toolbar-plugin","aui-editor-bbcode-plugin"]});