<style lang="scss" scoped>
body {
  background: -webkit-repeating-linear-gradient(
    -45deg,
    #71b7e6,
    #69a6ce,
    #b98acc,
    #ee8176,
    #b98acc,
    #69a6ce,
    #9b59b6
  );
  background-size: 400%;
}
.error-page {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.error-page .content {
  max-width: 600px;
  text-align: center;
}
.content h1 {
  position: relative;
  font-size: 3rem;
  line-height: 1em;
}
.content h1:after {
  position: absolute;
  content: attr(data-text);
  top: 0;
  left: 0;
  right: 0;
  background: -webkit-repeating-linear-gradient(
    -45deg,
    #71b7e6,
    #69a6ce,
    #b98acc,
    #ee8176,
    #b98acc,
    #69a6ce,
    #9b59b6
  );
  background-size: 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.25);
  animation: animate 10s ease-in-out infinite;
}
@keyframes animate {
  0% {
    background-position: 0 0;
  }
  25% {
    background-position: 100% 0;
  }
  50% {
    background-position: 100% 100%;
  }
  75% {
    background-position: 0 100%;
  }
  100% {
    background-position: 0 0;
  }
}
.content h4 {
  position: relative;
  font-size: 2em;
  text-transform: uppercase;
  color: #000;
  min-width: 600px;
}
.content h4:after {
  position: absolute;
  content: attr(data-text);
  top: 0;
  left: 0;
  right: 0;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.4);
}
.content p {
  font-size: 1.2em;
  color: #0d0d0d;
}
.content .btns a {
  display: inline-block;
  text-decoration: none;
  border: 2px solid #69a6ce;
  color: #69a6ce;
  font-weight: 500;
  padding: 10px 25px;
  border-radius: 25px;
  text-transform: uppercase;
  transition: all 0.3ms ease;
}

.content .btns a:hover {
  color: #fff;
  background: #69a6ce;
}
</style>

<template>
  <div class="error-page">
    <div class="content">
      <h1 data-text="404">404</h1>
      <h4 data-text="Opps! Page not found">页面找不到了!</h4>
      <div class="btns">
        <router-link to="/admin">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
}
</script>
