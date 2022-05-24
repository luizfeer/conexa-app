<template>
<div>
  <div class="mobile-display">
    <div class="bg-[#FFFFFB] fixed bottom-0 left-0 p-2 py-4 md:p-4 w-full flex justify-between border-t-2 border-[#DAD2D0] md:border-t-0">
      <button-base outline label="Ajuda"></button-base>
      <button-base label="Agendar consulta" @click="show=true"></button-base>
    </div>
  </div>
  <button-base class="tw-hidden md:block mx-6 m-6 fixed bottom-0 left-0" outline label="Ajuda"></button-base>
  <button-base class="tw-hidden md:block mx-6 m-6 fixed bottom-0 right-0" label="Agendar consulta" @click="show=true"></button-base>
  <dialog-add-consultation @success="success" :show="show" @close-modal="show = false"/>
</div>

</template>

<script>
import { defineComponent, ref } from 'vue'
import ButtonBase from 'components/ButtonBase.vue'
import DialogAddConsultation from 'components/DialogAddConsultation.vue'
import { consultationsStore } from 'stores/consultations'

export default defineComponent({
  name: 'BaseBar',
  components: {
    ButtonBase,
    DialogAddConsultation
  },
  setup(){
    const store = consultationsStore()
    const show = ref(false)
    const success = async () => {
      show.value = false
      store.requestConsultations()
    }
    return{
      show,
      success
    }
  }

})
</script>
<style lang="postcss" scoped>
.mobile-display{
  @apply block md:hidden
}
</style>
