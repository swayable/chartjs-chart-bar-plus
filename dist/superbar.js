!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports["chartjs-chart-superbar"]=e():t["chartjs-chart-superbar"]=e()}(window,function(){return function(t){var e={};function r(a){if(e[a])return e[a].exports;var o=e[a]={i:a,l:!1,exports:{}};return t[a].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(a,o,function(e){return t[e]}.bind(null,o));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r.r(e);const a=({pos:t,value:e,error:r,scale:a})=>{switch(t){case"start":return a.getPixelForValue(e-r);case"end":return a.getPixelForValue(e+r);case"mid":return a.getPixelForValue(e);default:throw new Error("Must supply a `pos` argument")}};var o={setupErrorStyles(){const t=this.getDataset(),e=t.data,r=Array.isArray(t.backgroundColor),a=[],{insignificantColor:o,animate:s}=this.chart.options.errorBars;e.forEach((e,i)=>{let n;e._animate=s,n=e.insignificant?o:r?t.backgroundColor[i]:t.backgroundColor,a.push(n)}),t.backgroundColor=a},drawErrorBar(){const t=this,e=t.index,{datasets:r}=t.chart.data,o=t.chart.ctx,s=t.getMeta(),i=t.getValueScale(),n=i.isHorizontal(),c=(t=>t?"y":"x")(n),l=t.getDataset().data,{width:h,color:d}=t.chart.options.errorBars;l.forEach((l,u)=>{const p=s.data[u]._view[c],f=l.error,g={ctx:o,datum:l,width:h,color:d};if(!f)return;let y=0;if(i.options.stacked||void 0!==s.stack)for(let a=0;a<e;a++){if(t.chart.getDatasetMeta(a).stack!==s.stack)continue;const e=r[a].data[u];y+=i.getRightValue(e)}const m=y+i.getRightValue(l),x=a({pos:"start",value:m,error:f,scale:i}),b=a({pos:"end",value:m,error:f,scale:i}),w=a({pos:"mid",value:m,error:f,scale:i});n?(g.startX=x,g.endX=b,g.midX=w,g.startY=g.endY=g.midY=p):(g.startY=x,g.endY=b,g.midY=w,g.startX=g.endX=g.midX=p),l._animate?(({ctx:t,width:e,color:r,startX:a,startY:o,endX:s,endY:i,midX:n,midY:c,datum:l})=>{let h=0,d=2,u=c,p=n;o==c&&(h=2,d=0);const f=()=>{t.beginPath(),t.lineWidth=e,t.strokeStyle=r,t.moveTo(n,c),t.lineTo(n-h,c-d),t.stroke(),t.moveTo(p,u),t.lineTo(p+h,u+d),t.stroke(),n-=h,u+=d,p+=h,(c-=d)>i||n>a?window.requestAnimationFrame(f):l._animate=!1};setTimeout(f,1e3)})(g):(({ctx:t,width:e,color:r,startX:a,startY:o,endX:s,endY:i})=>{t.lineWidth=e,t.strokeStyle=r,t.beginPath(),t.moveTo(a,o),t.lineTo(s,i),t.stroke()})(g)})}};var s={changeBarThickness(){const t=this.getMeta(),e=this.getDataset().data,r=this.getIndexScale(),a=r.isHorizontal()?"width":"height";e.forEach((e,o)=>{const s=r.getBarThickness(e);t.data[o]._view[a]=s,t.data[o]._model[a]=s})}};Chart="function"==typeof Chart?Chart:window.Chart,function(t){const e=t.scaleService,r=e.getScaleConstructor("category").extend({getPixelForValue(t,e,r){const a=this.options.offset;"number"!=typeof r&&(r=0);const o=this.chart.data.datasets[r].data[e],s=this._getCategoryThickness(o);let i=this._calcOffset(e,r);return a&&(i+=s/2),this._offsetBase()+i},getBarThickness(t){return t.thickness*this._axisSize()-2*this._spacingSize()},_spacingSize(){return this._axisSize()*this.options.spacing},_offsetBase(){return this.isHorizontal()?this.left:this.top},_axisSize(){return this.isHorizontal()?this.width:this.height},_getCategoryThickness(t){return this.getBarThickness(t)+2*this._spacingSize()},_calcOffset(t,e){const r=this;return r.chart.data.datasets[e].data.slice(r.minIndex,t).reduce((t,e)=>t+r._getCategoryThickness(e),0)}});e.registerScaleType("thickCategory",r,{spacing:.01,position:"bottom",categoryPercentage:1,barPercentage:1,offset:!0,gridLines:{display:!1,offsetGridLines:!0}})}(Chart),function(t){const e=t.scaleService,r=e.getScaleConstructor("linear"),a=r.extend({determineDataLimits(){const t=this;if(!t.chart.options.errorBars.show)return r.prototype.determineDataLimits.call(this);let e=0,a=0;const{datasets:o}=t.chart.data;o.forEach(r=>{r.data.forEach(r=>{const o=t.getRightValue(r),s=o-r.error,i=o+r.error;e=Math.min(e,s),a=Math.max(a,i)})}),t.min=e,t.max=a}});e.registerScaleType("linearWithError",a,{position:"left"})}(Chart),function(t){const e=t.helpers,r={errorBars:{show:!0,animate:!0,color:"rgba(255, 20, 20, 0.3)",width:2,insignificantColor:"rgba(200, 200, 200, 0.8)"}};t.defaults.superBar=e.extend(t.defaults.bar,r,{scales:{xAxes:[{type:"thickCategory"}],yAxes:[{type:"linearWithError"}]}}),t.defaults.horizontalSuperBar=e.extend(t.defaults.horizontalBar,r,{scales:{xAxes:[{type:"linearWithError"}],yAxes:[{type:"thickCategory"}]}});const a={initialize(e,r){t.controllers.bar.prototype.initialize.apply(this,arguments),e.options.errorBars.show&&this.setupErrorStyles()},update(e){t.controllers.bar.prototype.update.call(this,e),this.chart.options.errorBars.show&&this.drawErrorBar(),this.changeBarThickness()},draw(e){t.controllers.bar.prototype.draw.call(this,e),this.chart.options.errorBars.show&&this.drawErrorBar()}};e.extend(a,o,s),t.controllers.superBar=t.controllers.bar.extend(a),t.controllers.horizontalSuperBar=t.controllers.horizontalBar.extend(a)}(Chart)}])});