<template>
  <div>
    <q-time
      v-model="time"
      format24h
      mask="YYYY/MM/DD HH:mm"
    />
  </div>
</template>
<script>
import { ref, watch } from 'vue'

export default {
  props:{
    date:{
      type: String,
      required: true
    }
  },
  setup (props, { emit }){
    const time = ref(`${props.date} 00:00`)
    watch(time, (val) => {
      emit('setDate', val)
    })
    return {
      time
    }
  }
}
</script>
