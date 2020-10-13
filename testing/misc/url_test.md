# Testing 

<div id="text"></div>

<script>
pathname = window.location.href;
param_string = pathname.split("?")[1];
if (param_string !== undefined) {
   param_json = {};
   param_list = param_string.split("&");
   for (let i=0;i<param_list.length;i++) {
     [key, val] = param_list[i].split('=');
     param_json[key] = val;
   }
   document.getElementById("text").innerHTML = JSON.stringify(param_json);
}
</script>
