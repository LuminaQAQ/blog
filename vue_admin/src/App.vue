<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;

  width: 100%;
  height: 100%;

  background-color: #f5f7fa;

  scrollbar-width: none;
}
#app {
  height: 100%;
  width: 100%;
}

::-webkit-scrollbar {
  width: 0;
}

@keyframes router {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.animation-enter {
  animation: router 0.3s;
}

hr {
  margin: 2rem 0;
  position: relative;
  border: 2px dashed #abd5fb;
  box-sizing: border-box;
  height: 0;
  overflow: visible;
}
// hr::before {
//   content: "";
//   position: absolute;
//   top: -1rem;
//   left: 5%;
//   width: 2rem;
//   height: 2rem;
//   background-image: url("./assets/images/common/scissor.svg");
//   background-size: cover;
//   transition: left 0.5s ease-in;
// }

hr:hover::before {
  left: 85%;
  transition: left 0.5s;
}

.multiple-text-overflow {
  font-size: 0.8rem;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -moz-box-orient: vertical;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.single-text-overflow {
  font-size: 0.8rem;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
