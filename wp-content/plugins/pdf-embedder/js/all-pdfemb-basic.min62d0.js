var pdfembGrabToPan=function(){function c(a){this.element=a.element;this.document=a.element.ownerDocument;"function"===typeof a.ignoreTarget&&(this.ignoreTarget=a.ignoreTarget);this.onActiveChanged=a.onActiveChanged;this.activate=this.activate.bind(this);this.deactivate=this.deactivate.bind(this);this.toggle=this.toggle.bind(this);this._onmousedown=this._onmousedown.bind(this);this._onmousemove=this._onmousemove.bind(this);this._onmousewheel=this._onmousewheel.bind(this);this._endPan=this._endPan.bind(this);
(this.overlay=document.createElement("div")).className="grab-to-pan-grabbing"}c.prototype={CSS_CLASS_GRAB:"grab-to-pan-grab",activate:function(){if(!this.active&&(this.active=!0,this.element.addEventListener("mousedown",this._onmousedown,!0),this.element.addEventListener("DOMMouseScroll",this._onmousewheel),this.element.addEventListener("mousewheel",this._onmousewheel),this.element.classList.add(this.CSS_CLASS_GRAB),this.onActiveChanged))this.onActiveChanged(!0)},deactivate:function(){if(this.active&&
(this.active=!1,this.element.removeEventListener("mousedown",this._onmousedown,!0),this._endPan(),this.element.classList.remove(this.CSS_CLASS_GRAB),this.onActiveChanged))this.onActiveChanged(!1)},toggle:function(){this.active?this.deactivate():this.activate()},ignoreTarget:function(a){return a[h]("a[href], a[href] *, input, textarea, button, button *, select, option")},_onmousedown:function(a){if(0===a.button&&!this.ignoreTarget(a.target)){this.scrollLeftStart=this.element.scrollLeft;this.scrollTopStart=
this.element.scrollTop;this.clientXStart=a.clientX;this.clientYStart=a.clientY;this.document.addEventListener("mousemove",this._onmousemove,!0);this.document.addEventListener("mouseup",this._endPan,!0);this.element.addEventListener("scroll",this._endPan,!0);a.preventDefault();a.stopPropagation();this.document.documentElement.classList.add(this.CSS_CLASS_GRABBING);var b=document.activeElement;b&&!b.contains(a.target)&&b.blur()}},_onmousemove:function(c){this.element.removeEventListener("scroll",this._endPan,
!0);var d;d="buttons"in c&&a?!(c.buttons|1):b||e?0===c.which:void 0;d?this._endPan():(d=c.clientX-this.clientXStart,this.element.scrollTop=this.scrollTopStart-(c.clientY-this.clientYStart),this.element.scrollLeft=this.scrollLeftStart-d,this.overlay.parentNode||document.body.appendChild(this.overlay))},_onmousewheel:function(a){this.element.removeEventListener("scroll",this._endPan,!0);a="DOMMouseScroll"===a.type?-a.detail:a.wheelDelta/40;this.scrollLeftStart=this.element.scrollLeft;this.scrollTopStart=
this.element.scrollTop;this.element.scrollTop=this.scrollTopStart-40*a;this.overlay.parentNode||document.body.appendChild(this.overlay)},_endPan:function(){this.element.removeEventListener("scroll",this._endPan,!0);this.document.removeEventListener("mousemove",this._onmousemove,!0);this.document.removeEventListener("mouseup",this._endPan,!0);this.overlay.parentNode&&this.overlay.parentNode.removeChild(this.overlay)}};var h;["webkitM","mozM","msM","oM","m"].some(function(a){a+="atches";a in document.documentElement&&
(h=a);a+="Selector";a in document.documentElement&&(h=a);return h});var a=!document.documentMode||9<document.documentMode,d=window.chrome,b=d&&(d.webstore||d.app),e=/Apple/.test(navigator.vendor)&&/Version\/([6-9]\d*|[1-5]\d+)/.test(navigator.userAgent);return c}();function pdfembGetPDF(c,h){h(c,!1)}function pdfembWantMobile(c,h,a,d){return!1}function pdfembMakeMobile(c,h,a){}function pdfembAddMoreToolbar(c,h,a){}function pdfembPremiumJumpToTop(c){};jQuery(document).ready(function(c){var h=function(){var a=document.createElement("canvas").getContext("2d");return(window.devicePixelRatio||1)/(a.webkitBackingStorePixelRatio||a.mozBackingStorePixelRatio||a.msBackingStorePixelRatio||a.oBackingStorePixelRatio||a.backingStorePixelRatio||1)}();createHiDPICanvas=function(a,c,b){b||(b=h);var e=document.createElement("canvas");e.width=a*b;e.height=c*b;e.style.width=a+"px";e.style.height=c+"px";e.getContext("2d").setTransform(b,0,0,b,0,0);return e};c.fn.pdfEmbedder=
function(){this.each(function(a,d){var b,e=c(d);if(e.is("a")){var f=e.data();b=c("<div></div>",{"class":e.attr("class"),style:e.attr("style")});b.data(c.extend({"pdf-url":e.attr("href")},f));e.replaceWith(b)}else b=e;b.append(c("<div></div>",{"class":"pdfemb-loadingmsg"}).append(document.createTextNode(pdfemb_trans.objectL10n.loading)));"on"==b.data("disablerightclick")&&b.bind("contextmenu",function(a){a.preventDefault()});var h=function(a,e){b.empty().append(c("<div></div>",{"class":"pdfemb-inner-div"}).append(c("<canvas></canvas>",
{"class":"pdfemb-the-canvas"})));b.data("pdfDoc",a);var d=b.data("toolbar");"bottom"!=d&&c.fn.pdfEmbedder.addToolbar(b,!0,"on"==b.data("toolbar-fixed"),e);"top"!=d&&c.fn.pdfEmbedder.addToolbar(b,!1,"on"==b.data("toolbar-fixed"),e);b.on("pdfembGotopage",function(a,d){d>b.data("pdfDoc").numPages||0>=d||b.data("pagenum")==d||(b.data("pagenum",d),c.fn.pdfEmbedder.queueRenderPage(b,d),pdfembPremiumJumpToTop(b))});b.on("pdfembGotoHash",function(a,d){if(d.dest){dest=d.dest;var e;"string"===typeof dest?(destString=
dest,e=b.data("pdfDoc").getDestination(dest)):e=Promise.resolve(dest);e.then(function(a){a instanceof Array&&!(1>a.length)&&b.data("pdfDoc").getPageIndex(a[0]).then(function(a){a+=1;a>b.data("pdfDoc").numPages||0>=a||b.data("pagenum")==a||(b.data("pagenum",a),c.fn.pdfEmbedder.queueRenderPage(b,a),pdfembPremiumJumpToTop(b))})})}});b.on("pdfembGotoAction",function(a,d){var e=b.data("pagenum"),f=e;switch(d){case "GoBack":--f;break;case "GoForward":++f;break;case "NextPage":++f;break;case "PrevPage":--f;
break;case "LastPage":f=b.data("pdfDoc").numPages;break;case "FirstPage":f=1}f==e||f>b.data("pdfDoc").numPages||0>=f||(b.data("pagenum",f),c.fn.pdfEmbedder.queueRenderPage(b,f))});b.data("pageCount",a.numPages);(!b.data("pagenum")||1>b.data("pagenum")||b.data("pagenum")>a.numPages)&&b.data("pagenum",1);b.data("showIsSecure",e);b.data("pageNumPending",null);d="on"==b.data("fullScreen")?parseInt(b.data("startfpzoom")):parseInt(b.data("startzoom"));if(isNaN(d)||20>d||500<d)d=100;b.data("zoom",d);100!=
d&&b.find("span.pdfemb-zoom").text(d+"%");c.fn.pdfEmbedder.renderPage(b,b.data("pagenum"));b.find("span.pdfemb-page-count").text(a.numPages);d=new pdfembGrabToPan({element:b.find("div.pdfemb-inner-div")[0]});b.data("grabtopan",d);c(window).resize(function(){setTimeout(function(){c.fn.pdfEmbedder.queueRenderPage(b,b.data("pagenum"))},100)})},e=function(a,d){null===a?b.empty().append(c("<div></div>",{"class":"pdfemb-errormsg"}).append(msgnode=c("<span></span>").append(document.createTextNode("Failed to load and decrypt PDF")))):
PDFJS.getDocument(a).then(function(a){h(a,d)},function(a){var d=document.createTextNode(a.message);"UnexpectedResponseException"==a.name&&0==a.status&&(d=c("<span></span>").append(document.createTextNode(pdfemb_trans.objectL10n.domainerror+" ")).append(c('<a href="https://wp-pdf.com/troubleshooting/#unexpected" target="_blank">'+pdfemb_trans.objectL10n.clickhereinfo+"</a>")));b.empty().append(c("<div></div>",{"class":"pdfemb-errormsg"}).append(d))})};b.data("pdfDoc")?h(b.data("pdfDoc"),b.data("showIsSecure")):
(f=b.data("pdf-url"),pdfembGetPDF(f,e))});return this};c.fn.pdfEmbedder.annotationsLayerFactory="undefined"!=typeof pdfembPremiumAnnotationsLayerFactory?new pdfembPremiumAnnotationsLayerFactory:{createAnnotationsLayerBuilder:function(a,c){return null}};c.fn.pdfEmbedder.checkForResize=function(a){var d=c(window).height(),b=c(window).width(),e=a.data("checked-window-height"),f=a.data("checked-window-width");if(!e||!f)a.data("checked-window-height",d),a.data("checked-window-width",b);else if(e!=d||f!=
b)c.fn.pdfEmbedder.queueRenderPage(a,a.data("pagenum")),a.data("checked-window-height",d),a.data("checked-window-width",b);"true"!=a.data("fullScreenClosed")&&setTimeout(function(){c.fn.pdfEmbedder.checkForResize(a)},1E3)};c.fn.pdfEmbedder.renderPage=function(a,d,b){a.data("pageRendering",!0);a.data("pdfDoc").getPage(d).then(function(e){var f=a.find(".pdfemb-the-canvas"),y=null,r=null,u=null,v=null;b&&(u=f.width(),v=f.height(),r=f[0].getContext("2d"),y=r.getImageData(0,0,u*h,v*h));var n,g=e.getViewport(1),
l=g.width,m=g.height;if(0>=l||0>=m)a.empty().append(document.createTextNode(pdfemb_trans.objectL10n.widthheightinvalid));else{var q=a.parent().width(),g=l,p=m;if("max"==a.data("width"))g=q;else if("auto"==a.data("width"))g=l;else if(g=parseInt(a.data("width"),10),isNaN(g)||0>=g)g=q;0>=g&&(g=l);g>q&&0<q&&(g=q);n=g/l;var p=m*n,w=a.find("div.pdfemb-toolbar-fixed"),t=(q=pdfembWantMobile(c,a,g,k))?0:w.length,k=parseInt(a.data("height"),10);if(isNaN(k)||0>=k||k>p)k="auto"==a.data("height")?a.parent().height()-
t*w.height():p;var g=Math.floor(g),p=Math.floor(p),x=100,l=g,m=p,A=0,B=0;q||(x=a.data("zoom"),l=g*x/100,m=p*x/100,l<g&&(A=(g-l)/2),m<k&&(B=(k-m)/2));var C=e.getViewport(n*x/100);g!=a.width()&&a.width(g);a.height()!=k&&a.height(k+t*w.height());n=a.find("div.pdfemb-inner-div");var E=n[0].scrollLeft,z=n[0].scrollTop;n.width(g);n.height(k);w=w.filter(".pdfemb-toolbar-top");0<t&&n.css("top",w.height());f[0].width=l*h;f[0].height=m*h;f.css("width",l);f.css("height",m);f[0].getContext("2d").setTransform(h,
0,0,h,0,0);f.css("left",A).css("top",B);(l>g||m>p||m>k)&&!q?(k=a.data("fromZoom"),t=a.data("toZoom"),0<k&&0<t&&(z+=p/2,n.scrollLeft((E+g/2)*t/k-g/2),n.scrollTop(z*t/k-p/2)),a.data("grabtopan").activate()):("on"==a.data("fullScreen")?a.data("grabtopan").activate():a.data("grabtopan").deactivate(),a.find("div.pdfemb-inner-div").scrollLeft(0).scrollTop(0));a.data("fromZoom",0).data("toZoom",0);pdfembMakeMobile(c,q,a);if(b)a.data("pagenum",d),a.data("pageRendering",!1),f=c("<canvas>").attr("width",y.width).attr("height",
y.height)[0],f.getContext("2d").putImageData(y,0,0),r.scale(l/(u*h),m/(v*h)),r.drawImage(f,0,0);else{var D=f[0].getContext("2d");e.render({canvasContext:D,viewport:C}).promise.then(function(){"function"==typeof pdfembPremiumPreRenderCanvas&&c.isArray(pdfemb_trans.watermark_map)&&0<pdfemb_trans.watermark_map.length&&(-1==a.data("pdf-url").search("/?pdfemb-serveurl=")||"undefined"!=typeof pdfemb_trans.watermark_evenpagesonly&&pdfemb_trans.watermark_evenpagesonly&&0!=d%2||pdfembPremiumPreRenderCanvas(c,
D,pdfemb_trans.watermark_map,x));a.data("pagenum",d);a.data("pageRendering",!1);a.find("div.pdfemb-toolbar .pdfemb-page-num").each(function(a,b){var e=c(b);e.is("span")?e.text(d):e.val(d)});d<a.data("pageCount")?a.find(".pdfemb-next").removeAttr("disabled").removeClass("pdfemb-btndisabled"):a.find(".pdfemb-next").attr("disabled","disabled").addClass("pdfemb-btndisabled");1<d?a.find(".pdfemb-prev").removeAttr("disabled").removeClass("pdfemb-btndisabled"):a.find(".pdfemb-prev").attr("disabled","disabled").addClass("pdfemb-btndisabled");
var b=c.fn.pdfEmbedder.annotationsLayerFactory.createAnnotationsLayerBuilder(a.find("div.pdfemb-inner-div")[0],e);null!=b&&(a.find("div.pdfembAnnotationLayer").remove(),b.setupAnnotations(C,a.data("newwindow")));null!==a.data("pageNumPending")&&(c.fn.pdfEmbedder.renderPage(a,a.data("pageNumPending")),a.data("pageNumPending",null))})}}})};c.fn.pdfEmbedder.queueRenderPage=function(a,d,b){a.data("pageRendering")?a.data("pageNumPending",d):c.fn.pdfEmbedder.renderPage(a,d,b)};c.fn.pdfEmbedder.goFullScreen=
function(a){a=c('<div class="pdfemb-fs-window"></div>');c(document.body).append(a)};c.fn.pdfEmbedder.changeZoom=function(a,d){var b=a.data("zoom"),e=b+d;a.data("zoom",e);a.find("span.pdfemb-zoom").text(e+"%");c.fn.pdfEmbedder.queueRenderPage(a,a.data("pagenum"));a.data("fromZoom",b).data("toZoom",e)};c.fn.pdfEmbedder.magnifyZoom=function(a,d){var b=a.data("zoom"),e=Math.floor(b*d);20>e&&(e=20);500<e&&(e=500);a.data("zoom",e);a.find("span.pdfemb-zoom").text(e+"%");c.fn.pdfEmbedder.queueRenderPage(a,
a.data("pagenum"),!0);a.data("fromZoom",b).data("toZoom",e)};c.fn.pdfEmbedder.addToolbar=function(a,d,b,e){var f=c("<div></div>",{"class":"pdfemb-toolbar pdfemb-toolbar"+(b?"-fixed":"-hover")+" "+(d?" pdfemb-toolbar-top":"pdfemb-toolbar-bottom")}),h=c('<button class="pdfemb-prev" title="'+pdfemb_trans.objectL10n.prev+'" type="button"></button>');f.append(h);var r=c('<button class="pdfemb-next" title="'+pdfemb_trans.objectL10n.next+'" type="button"></button>');f.append(r);f.append(c('<div class="pdfemb-page-area">'+
pdfemb_trans.objectL10n.page+' <span class="pdfemb-page-num">0</span> / <span class="pdfemb-page-count"></span></div>'));var u=c('<button class="pdfemb-zoomout" title="'+pdfemb_trans.objectL10n.zoomout+'" type="button"></button>');f.append(u);var v=c('<button class="pdfemb-zoomin" title="'+pdfemb_trans.objectL10n.zoomin+'" type="button"></button>');f.append(v);f.append(c("<div>"+pdfemb_trans.objectL10n.zoom+' <span class="pdfemb-zoom">100%</span></div>'));e&&f.append(c("<div>"+pdfemb_trans.objectL10n.secure+
"</div>"));d?a.prepend(f):a.append(f);h.on("click",function(b){1>=a.data("pagenum")||(a.data("pagenum",a.data("pagenum")-1),c.fn.pdfEmbedder.queueRenderPage(a,a.data("pagenum")),pdfembPremiumJumpToTop(a))});r.on("click",function(b){a.data("pagenum")>=a.data("pdfDoc").numPages||(a.data("pagenum",a.data("pagenum")+1),c.fn.pdfEmbedder.queueRenderPage(a,a.data("pagenum")),pdfembPremiumJumpToTop(a))});v.on("click",function(b){500<=a.data("zoom")||c.fn.pdfEmbedder.changeZoom(a,10)});u.on("click",function(b){20>=
a.data("zoom")||c.fn.pdfEmbedder.changeZoom(a,-10)});pdfembAddMoreToolbar(c,f,a);b||(a.on("mouseenter",function(b){b=a.find("div.pdfemb-toolbar-hover");!0!==b.data("no-hover")&&b.show()}),a.on("mouseleave",function(b){a.find("div.pdfemb-toolbar-hover").hide()}));pdfemb_trans.poweredby&&f.append(c("<div></div>",{"class":"pdfemb-poweredby"}).append(c('<a href="https://wp-pdf.com/?utm_source=Poweredby&utm_medium=freemium&utm_campaign=Freemium" target="_blank">wp-pdf.com</a>')))};PDFJS.workerSrc=pdfemb_trans.worker_src;
PDFJS.cMapUrl=pdfemb_trans.cmap_url;PDFJS.cMapPacked=!0;c(".pdfemb-viewer").pdfEmbedder()});
