(function(){var moreLink,morePanel,signinLink,masthead,placeholderSupport,showClass="blq-show",hideClass="blq-hide",hideAnimClass="blq-anim-hide",highlightedClass="blq-highlighted",animClass="blq-anim",closeString="Close";function $(selector){if(selector.indexOf("#")===0){return[document.getElementById(selector.substr(1))]}else{if(selector.indexOf(".")===0){return document.getElementsByClassName(selector.substr(1))}}return null}function moveMorePanelFromFooterToMast(){var newMorePanel=morePanel.cloneNode(true);morePanel.id="";morePanel=appendElement(newMorePanel,blqPanel)}function addToggleHandler(link,panel){if(link&&panel){_addClass(panel,hideAnimClass);animateElement(panel);link.onclick=function(){if(elementIsShown(panel)){hidePanel(link,panel)}else{if(elementIsShown(morePanel)){hidePanel(moreLink,morePanel)}showPanel(link,panel)}return false}}}function showPanel(link,panel){addHighlight(link);_swapInContent(link,closeString);expandElement(panel)}function hidePanel(link,panel){removeHighlight(link);_swapOutContent(link);collapseElement(panel)}function _swapInContent(el,newContent){var prentEl,styles,currentWidth;if(!window.getComputedStyle){return}el.blq_originalContent=el.innerHTML;prentEl=el.parentNode;styles=window.getComputedStyle(prentEl,null);currentWidth=styles.width;if(currentWidth==="auto"){return}_addClass(prentEl,"noRLPad");if(typeof currentWidth!=="undefined"){prentEl.style.width=currentWidth}el.innerHTML=newContent}function _swapOutContent(el){if(typeof el.blq_originalContent!=="undefined"){el.innerHTML=el.blq_originalContent;delete el.blq_originalContent}}function _initStatusbarCta(){var cta=$("#blq-idcta");if(!document.cookie.match(/\bIDENTITY=/)&&cta[0]){cta[0].href=cta[0]._signinUrl}}function appendElement(elementToAppend,elementToAppendTo){return elementToAppendTo.appendChild(elementToAppend)}function removeElement(el){el.parentNode.removeChild(el)}function animateElement(el){_addClass(el,animClass)}function elementIsShown(el){return _hasClass(el,showClass)}function _addClass(el,className){if(!_hasClass(el,className)){el.className+=(el.className?" ":"")+className}}function _removeClass(el,className){var oldClasses=el.className.split(" "),newClasses=[],i=oldClasses.length;while(i--){if(oldClasses[i]!==className){newClasses.unshift(oldClasses[i])}}el.className=(newClasses.length)?newClasses.join(" "):""}function _hasClass(el,className){if(!el.className){return false}return((" "+el.className+" ").indexOf(" "+className+" ")!==-1)}function expandElement(el){_removeClass(el,hideClass);_addClass(el,showClass);_addClass(blqPanel,showClass)}function collapseElement(el){_removeClass(el,showClass);_removeClass(blqPanel,showClass);if(el.addEventListener){el.addEventListener("webkitTransitionEnd",function(){hideElement(el);el.removeEventListener("webkitTransitionEnd",arguments.callee,true)},true)}}function hideElement(el){_addClass(el,hideClass)}function addHighlight(el){_addClass(el,highlightedClass)}function removeHighlight(el){_removeClass(el,highlightedClass)}function _browserIsCapable(win){if(!win){win=window}return(win.document.getElementById&&win.document.getElementsByTagName&&Object.prototype.toString.call(win.operamini)!=="[object OperaMini]")}function _supportsAttr(el,attribute){var element=document.createElement(el);return(attribute in element)}if(_browserIsCapable()){_addClass(document.body,"blq-js");if(window.opera){_addClass(document.body,"opera")}moreLink=$("#blq-more-link")[0];morePanel=$("#blq-more-panel")[0];signinLink=$("#blq-idcta-link")[0];masthead=$("#blq-mast")[0];blqPanel=$("#blq-panel")[0];placeholderSupport=_supportsAttr("input","placeholder");moveMorePanelFromFooterToMast();addToggleHandler(moreLink,morePanel);_initStatusbarCta()}function _(name){return eval("_"+name)}window.mlq={$:$,_:_}})();