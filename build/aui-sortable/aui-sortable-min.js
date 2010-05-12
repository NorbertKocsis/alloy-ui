AUI.add("aui-sortable",function(D){var G=D.Lang,E=D.ClassNameManager.getClassName,M="sortable",K=D.DD.DDM,J=E(M,"dragging"),F=E(M,"handle"),L=E(M,"item"),C=E(M,"no-handles"),H=E(M,"proxy");var B=D.Component.create({NAME:M,ATTRS:{dd:{value:{}},constrain:{},container:{value:null},groups:{valueFn:function(){var A=this;return[D.guid()];}},nodes:{value:null,setter:function(O){var A=this;var N=A.get("container");if(!(O instanceof D.NodeList)){if(G.isString(O)){if(N){O=N.all(O);}else{O=D.all(O);}}}if(O instanceof D.NodeList&&O.size()){A.set("container",O.item(0).get("parentNode"));}else{O=D.Attribute.INVALID_VALUE;}return O;}},placeholder:{},proxy:{}},EXTENDS:D.Base,prototype:{initializer:function(){var A=this;var N=A.get("nodes");var Q=A.get("constrain");A._useConstrain=!!Q;if(G.isObject(Q)){A._constrainConfig=Q;}var P=A.get("proxy");A._useProxy=!!P;if(G.isObject(P)){A._proxyConfig=P;}var O=A.get("dd");A._ddConfig=O;A._ddConfig=D.mix(A._ddConfig,{bubbleTargets:A,groups:A.get("groups"),placeholder:A.get("placeholder"),constrain:A.get("constrain"),proxy:A.get("proxy")});if(N){N.each(A.add,A);}A.after("drag:drag",A._onDrag);A.after("drag:end",A._onDragEnd);A.after("drag:over",A._onDragOver);A.after("drag:start",A._onDragStart);},add:function(Q){var N=this;if(Q){var O=N._ddConfig;if((Q instanceof D.Node)||G.isString(Q)||Q.nodeName){Q=D.one(Q);O.node=Q;}else{if(G.isObject(Q)){D.mix(Q,O);O=Q;}}var P=N.getSortableItem();var A=new P(O);}},getSortableItem:function(){var A=this;return I;},_onDrag:function(A){var V=this;var R=A.target;var Q=R.lastXY;var T=Q[0];var S=Q[1];var O=V._lastX;var N=V._lastY;var U=Math.abs(T-O);var P=Math.abs(S-N);V._goingUp=((T<O)&&U)||((S<N)&&P);V._lastX=T;V._lastY=S;D.later(50,K,K.syncActiveShims);},_onDragEnd:function(P){var A=this;var N=P.target;var O=N.get("node");O.removeClass(J);},_onDragOver:function(S){var A=this;var P=0;var R=D.DD.DDM;var Q=S.drag;var N=S.drop;var O=N.get("node");var T="placeBefore";if(!A._goingUp){T="placeAfter";}O[T](Q.get("placeholder"));N.sizeShim();},_onDragStart:function(P){var A=this;var N=P.target;var O=N.get("node");O.addClass(J);},_lastX:0,_lastY:0}});var I=D.Component.create({NAME:"sortableitem",ATTRS:{constrain:{value:null},placeholder:{getter:function(){var A=this;return A.get("node");}},proxy:{value:{borderStyle:0,moveOnEnd:false}},target:{value:true},syncPlaceholderSize:{value:true}},EXTENDS:D.DD.Drag,prototype:{initializer:function(){var A=this;var N=A.get("node");N.dd=A;N.addClass(L);A._useProxy=A.get("proxy");A.bindUI();A._initHandles();A._initConstrain();A._initProxy();},bindUI:function(){var A=this;A.on("drag:end",A._onDragEnd);A.on("drag:start",A._onDragStart);},_initHandles:function(){var A=this;var O=A.get("handles");var P=A.get("node");if(O){for(var N=O.length-1;N>=0;N--){var Q=O[N];P.all(Q).addClass(F);}}else{P.addClass(C);}A.removeInvalid("a");},_initConstrain:function(){var A=this;var N=A.get("constrain");if(!!N){if(!G.isObject(N)){N=null;}A.plug(D.Plugin.DDConstrained,N);}},_initProxy:function(){var A=this;var N=A.get("proxy");if(!!N){if(!G.isObject(N)){N=null;}A.plug(D.Plugin.DDProxy,N);}},_onDragEnd:function(O){var A=this;var N=O.target;if(A._useProxy){N.get("dragNode").removeClass(H);}},_onDragStart:function(O){var A=this;var N=O.target;if(A._useProxy){N.get("dragNode").addClass(H);}}}});D.Sortable=B;D.SortableItem=I;},"@VERSION@",{requires:["aui-base","dd"],skinnable:true});