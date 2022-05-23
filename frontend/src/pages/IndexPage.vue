<template>
  <q-page class="container mx-auto">
    <list-consultations/>
    <base-bar/>
  </q-page>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import BaseBar from 'components/BaseBar.vue'
import ListConsultations from 'components/ListConsultations.vue'
export default defineComponent({
  name: 'IndexPage',
  components: {
    ListConsultations,
    BaseBar
  },

    setup () {

      return {

      }
    }

})
// /consultations?_expand=patient
</script>
