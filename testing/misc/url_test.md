# Testing 

<div id="text"></div>

<script>
pathname = window.location.href;
param_string = pathname.split("?")[1];
if (param_string !== undefined) {
   document.getElementById("text").innerHTML = param_string;
}
</script>
