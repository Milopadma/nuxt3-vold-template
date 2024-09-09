<template>
  <Transition :css="false" @leave="onLeave">
    <div v-if="cookie !== true" ref="el" class="popup-cookies" @click="acceptCookies">
      <div ref="elContent" class="content">
        <p>This website uses cookies.</p>
        <span class="link active">Okay</span>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import gsap from 'gsap';
const cookie = useCookie('accept-cookies');

const acceptCookies = () => {
  cookie.value = true;
};

const el = ref();
const elContent = ref();

const isPreloadDone = useIsPreloadDone();

let ctx;

const onLeave = (el, done) => {
  ctx = gsap.context(() => {
    const contentElement = el.querySelector('.content');
    if (contentElement) {
      gsap.to(contentElement, {
        yPercent: 101,
        duration: 1.2,
        ease: 'expo.inOut',
        overwrite: true,
        onComplete: done,
      });
    }
  }, el.value);
};

onMounted(() => {
  if (cookie.value === true) return;

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      paused: true,
      delay: 1.3,
    });

    tl.from(elContent.value, {
      yPercent: 101,
      duration: 1.4,
      ease: 'expo.out',
    });

    watch(isPreloadDone, (value) => {
      if (value) {
        tl.play();
      }
    });
  }, el.value);
});

onUnmounted(() => {
  ctx && ctx.revert();
});
</script>

<style scoped lang="scss">
.popup-cookies {
  position: fixed;
  bottom: calc(fn.toVw(50) / 2);
  right: fn.toVw(64);
  z-index: 50;
  overflow: hidden;
  cursor: pointer;

  @include mx.mobile {
    bottom: fn.toVw(20);
    left: 50%;
    right: auto;
    transform: translateX(-50%);
  }

  &:hover {
    .content {
      background-color: rgba(var.$color-white, 0.4);
    }
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: fn.toVw(16);
    white-space: nowrap;

    padding: fn.toVw(12) fn.toVw(32);
    background: rgba(var.$color-white, 0.25);
    backdrop-filter: blur(10px);
    color: var.$color-white;
    transition: background-color 0.3s ease;

    @include mx.mobile {
      padding: fn.toVw(14) fn.toVw(24);
    }
  }

  .link {
    display: block;
    line-height: calc(24 / 18);

    &::before {
      opacity: 0.5;
    }
  }

  &:hover {
    .link {
      &::before {
        transform-origin: right;
        transform: scale3d(0, 1, 1);
      }
    }
  }
}
</style>
