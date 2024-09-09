<template>
  <div v-if="useDevice().isDesktop" ref="el" class="base-cursor">
    <Transition name="fade">
      <div v-if="cursorDrag" class="drag" :class="{ 'is--clicked': cursorClicked }">
        <div class="drag-btn left">
          <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 7L2 4L5 1" stroke="white" stroke-width="1.5" />
          </svg>
        </div>

        <p>Drag</p>

        <div class="drag-btn right">
          <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 7L4 4L1 1" stroke="white" stroke-width="1.5" />
          </svg>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="cursorDiscover" class="discover" :class="{ 'is--clicked': cursorClicked }">
        <p>Discover More</p>

        <div class="discover-btn right">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.9965 8.5308C11.9965 8.84819 11.7333 9.11139 11.4159 9.11139C11.0985 9.11139 10.8353 8.84819 10.8353 8.5308V1.98239L0.988945 11.8287C0.872827 11.9448 0.725745 11.999 0.578662 11.999C0.43158 11.999 0.284497 11.9448 0.16838 11.8287C-0.0561152 11.6042 -0.0561152 11.2326 0.16838 11.0082L10.0154 1.16118H3.46566C3.14827 1.16118 2.88507 0.897979 2.88507 0.58059C2.88507 0.263201 3.14827 0 3.46566 0H11.4159C11.5013 0 11.5827 0.0190504 11.6562 0.0530812C11.7182 0.0808598 11.7761 0.119992 11.8266 0.170477C11.884 0.227843 11.9267 0.294813 11.9547 0.366478C11.9816 0.432929 11.9965 0.505232 11.9965 0.58059V8.5308Z"
              fill="white" />
          </svg>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import gsap from 'gsap';

const el = ref(null);

const cursorDrag = useCursorDrag();
const cursorDiscover = useCursorDiscover();
const cursorClicked = useCursorClicked();

let xTo, yTo;

const animateCursor = (e) => {
  if (xTo && yTo) {
    xTo(e.clientX);
    yTo(e.clientY);
  }
};

onMounted(() => {
  if (!useDevice().isDesktop) return;

  if (el.value) {
    gsap.set(el.value, { xPercent: -50, yPercent: -50 });

    xTo = gsap.quickTo(el.value, 'x', { duration: 0.45 });
    yTo = gsap.quickTo(el.value, 'y', { duration: 0.45 });

    window.addEventListener('mousemove', animateCursor);
  }
});

onUnmounted(() => {
  window.removeEventListener('mousemove', animateCursor);
});
</script>

<style scoped lang="scss">
.base-cursor {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  top: 0%;
  left: 0%;
  transform: translate(-50%, -50%);

  @include mx.mobile {
    display: none;
  }

  .drag,
  .discover {
    position: absolute;
    top: fn.toVw(20);
    left: 50%;
    transform: translateX(-50%);
    font-size: fn.toVw(16);
    line-height: 1;
    color: #fff;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(10px);
    border-radius: fn.toVw(50);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: fn.toVw(12);
    white-space: nowrap;
    padding: fn.toVw(6);
    transition:
      opacity 0.5s ease,
      transform 0.3s ease;

    &.is--clicked {
      transform: translateX(-50%) scale(0.9);
    }

    .drag-btn,
    .discover-btn {
      width: fn.toVw(20);
      height: fn.toVw(20);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      background: rgba($color: #ffffff, $alpha: 0.2);
      border-radius: 50%;

      svg {
        width: fn.toVw(6);
        height: auto;
      }
    }
  }

  .discover {
    padding: fn.toVw(11) fn.toVw(20);
    gap: fn.toVw(8);

    .discover-btn {
      width: auto;
      height: auto;
      background-color: transparent;

      svg {
        width: fn.toVw(12);
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
