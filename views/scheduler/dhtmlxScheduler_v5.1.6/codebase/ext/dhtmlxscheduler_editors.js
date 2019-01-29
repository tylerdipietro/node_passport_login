/*
@license
dhtmlxScheduler v.5.1.6 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.form_blocks.combo={render:function(e){e.cached_options||(e.cached_options={});var t="";return t+="<div class='"+e.type+"' style='height:"+(e.height||20)+"px;' ></div>"},set_value:function(e,t,a,i){!function(){function t(){if(e._combo&&e._combo.DOMParent){var t=e._combo;t.unload?t.unload():t.destructor&&t.destructor(),t.DOMParent=t.DOMelem=null}}t();var a=scheduler.attachEvent("onAfterLightbox",function(){t(),scheduler.detachEvent(a)})}(),window.dhx_globalImgPath=i.image_path||"/",e._combo=new dhtmlXCombo(e,i.name,e.offsetWidth-8),
i.onchange&&e._combo.attachEvent("onChange",i.onchange),i.options_height&&e._combo.setOptionHeight(i.options_height);var r=e._combo;if(r.enableFilteringMode(i.filtering,i.script_path||null,!!i.cache),i.script_path){var n=a[i.map_to];n?i.cached_options[n]?(r.addOption(n,i.cached_options[n]),r.disable(1),r.selectOption(0),r.disable(0)):scheduler.$ajax.get(i.script_path+"?id="+n+"&uid="+scheduler.uid(),function(e){var t,a=e.xmlDoc.responseText;try{var l=JSON.parse(a);t=l.options[0].text}catch(d){var o=scheduler.$ajax.xpath("//option",e.xmlDoc)[0];
t=o.childNodes[0].nodeValue}i.cached_options[n]=t,r.addOption(n,t),r.disable(1),r.selectOption(0),r.disable(0)}):r.setComboValue("")}else{for(var l=[],d=0;d<i.options.length;d++){var o=i.options[d],s=[o.key,o.label,o.css];l.push(s)}if(r.addOption(l),a[i.map_to]){var _=r.getIndexByValue(a[i.map_to]);r.selectOption(_)}}},get_value:function(e,t,a){var i=e._combo.getSelectedValue();return a.script_path&&(a.cached_options[i]=e._combo.getSelectedText()),i},focus:function(e){}},scheduler.form_blocks.radio={
render:function(e){var t="";t+="<div class='dhx_cal_ltext dhx_cal_radio' style='height:"+e.height+"px;' >";for(var a=0;a<e.options.length;a++){var i=scheduler.uid();t+="<input id='"+i+"' type='radio' name='"+e.name+"' value='"+e.options[a].key+"'><label for='"+i+"'> "+e.options[a].label+"</label>",e.vertical&&(t+="<br/>")}return t+="</div>"},set_value:function(e,t,a,i){for(var r=e.getElementsByTagName("input"),n=0;n<r.length;n++){r[n].checked=!1;var l=a[i.map_to]||t;r[n].value==l&&(r[n].checked=!0);
}},get_value:function(e,t,a){for(var i=e.getElementsByTagName("input"),r=0;r<i.length;r++)if(i[r].checked)return i[r].value},focus:function(e){}},scheduler.form_blocks.checkbox={render:function(e){return scheduler.config.wide_form?'<div class="dhx_cal_wide_checkbox" '+(e.height?"style='height:"+e.height+"px;'":"")+"></div>":""},set_value:function(e,t,a,i){e=document.getElementById(i.id);var r=scheduler.uid(),n="undefined"!=typeof i.checked_value?t==i.checked_value:!!t;e.className+=" dhx_cal_checkbox";
var l="<input id='"+r+"' type='checkbox' value='true' name='"+i.name+"'"+(n?"checked='true'":"")+"'>",d="<label for='"+r+"'>"+(scheduler.locale.labels["section_"+i.name]||i.name)+"</label>";if(scheduler.config.wide_form?(e.innerHTML=d,e.nextSibling.innerHTML=l):e.innerHTML=l+d,i.handler){var o=e.getElementsByTagName("input")[0];o.onclick=i.handler}},get_value:function(e,t,a){e=document.getElementById(a.id);var i=e.getElementsByTagName("input")[0];return i||(i=e.nextSibling.getElementsByTagName("input")[0]),
i.checked?a.checked_value||!0:a.unchecked_value||!1},focus:function(e){}};
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_editors.js.map