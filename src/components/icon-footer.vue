<template>
    <button class="icon-footer">
        <slot></slot>
    </button>
</template>

<script>
export default {
name: 'IconFooter',
}
</script>

<style>
.icon-footer {
  display: flex;
  align-items: center;
  margin: 1%;
}

button {
  width: 40px;
  height: 40px;
  margin-top: 5px;
  background-color: #b60000;
  border: none;
  border-left: 7px solid #b60000;
  border-radius: 7px;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  box-shadow:rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, 
            rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, 
            rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
}

button:hover {
  background-color: #fff;
  color: #b60000;
}
</style>
    