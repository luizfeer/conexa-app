<template>
  <q-btn color="primary" :label="label" class="font-bold rounded-md mx-2" />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ButtonBase',
  props: {
    label: {
      type: String,
      default: ''
    },
  }
})
</script>
