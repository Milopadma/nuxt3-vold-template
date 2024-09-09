<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  sectionId: string;
  data: Record<string, any>;
}>();

const isOpen = ref(false);

const toggleAccordion = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <section class="error-component-section">
    <div class="homepage-grid">
      <div class="error-message">
        <strong>Error:</strong>
        <span> Unknown section: "{{ props.sectionId }}". This component does not exist.</span>
      </div>
      <div class="accordion">
        <button class="accordion-toggle" @click="toggleAccordion">{{ isOpen ? 'Hide' : 'Show' }} Data Structure</button>
        <div v-if="isOpen" class="accordion-content">
          <pre><code>{{ JSON.stringify(props.data, null, 2) }}</code></pre>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.error-component-section {
  background-color: var.$color-primary;
  padding: fn.toVw(80) fn.toVw(var.$container);
  @include mx.mobile {
    padding: fn.toVw(60) fn.toVw(var.$container-m);
  }
}

.homepage-grid {
  display: grid;
  grid-template-columns: repeat(var.$grid-col, 1fr);
  column-gap: fn.toVw(var.$grid-gap);
  @include mx.mobile {
    grid-template-columns: repeat(var.$grid-col-m, 1fr);
    column-gap: fn.toVw(var.$grid-gap-m);
  }
}

.error-message {
  grid-column: 1 / -1;
  @extend .font-body2;
  color: var.$color-text;
  background-color: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  padding: fn.toVw(20);
  border-radius: fn.toVw(4);
  margin-bottom: fn.toVw(20);

  strong {
    font-weight: bold;
    margin-right: fn.toVw(8);
  }
}

.accordion {
  grid-column: 1 / -1;
  margin-bottom: fn.toVw(20);
}

.accordion-toggle {
  background-color: var(--color-secondary);
  color: var(--color-text);
  cursor: pointer;
  padding: fn.toVw(15);
  width: 100%;
  text-align: left;
  border: none;
  outline: none;
  transition: 0.4s;
  @extend .font-body2;
  font-weight: bold;

  &:hover {
    background-color: darken(#000, 10%);
  }
}

.accordion-content {
  padding: fn.toVw(20);
  background-color: var.$color-background;
  border: 1px solid var.$color-primary;
  border-top: none;
  overflow-x: auto;
}

pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

code {
  font-family: monospace;
  @extend .font-body2;
  line-height: 1.4;
}
</style>
