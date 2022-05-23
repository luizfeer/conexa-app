<template>
  <div>
    <div class="text-bold text-5xl text-secondary py-8 px-4">Consultas</div>
    <section class="flex flex-center h-[80vh] mx-2 md:mx-4" v-if="consultations.length>0">
      <div class="w-full max-w-xl">
        <div class="text-bold text-gray-700 text-base w-full p-1 md:p-4">
        {{ consultations.length }} consultas agendadas
        </div>
        <q-list>
          <q-item
            v-for="consult in consultations"
            :key="consult.id"
          >
            <q-item-section>
              <p class="font-normal text-base text-gray-600">
                {{ consult.patient.first_name }} {{ consult.patient.last_name }}
              </p>
              <p class="font-normal text-xs text-gray-600">
              {{ format(new Date(consult.date), "dd/MM/yyyy 'às' HH:mm") }}
              </p>
            </q-item-section>
            <q-item-section side >
              <button-base class="mx-0 py-3" label="Atender" @click="confirm(consult.id)"></button-base>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </section>
    <section class="flex flex-center h-[80vh] mx-4" v-else>
      <div class="flex flex-col max-w-[500px] w-full">
        <div class="flex justify-end">
          <img
            alt="Quasar logo"
            class="h-[60px] sm:h-[89px]"
            src="~assets/illustration-certificates.svg"
          />
        </div>
        <div class="flex justify-center">
          <div class="text-bold text-gray-400 text-lg text-center w-52">
            Não há nenhuma consulta agendada
          </div>
        </div>
        <div class="flex justify-start">
          <img alt="Quasar logo" class="h-20" src="~assets/illustration-plant.svg" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { consultationsStore } from 'stores/consultations'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { api } from 'boot/axios'
import { format } from 'date-fns'

import ButtonBase from 'components/ButtonBase.vue'

export default defineComponent({
  name: 'ListConsultations',
  components:{
    ButtonBase
  },
    setup () {
      const $q = useQuasar()
      const store = consultationsStore()
      const { consultations, patients } = storeToRefs(store)

      const request = async () => {
        $q.loading.show()
        try {
          await store.requestConsultations()
          const ptt = await api.get('/patients')
          store.setPatients(ptt.data)
        } catch (err) {
            console.log(err)
            let msg
            if(err.response){
              msg =  err.response.data.message
            }else {
              msg = 'Erro na conexão!'
            }
            $q.notify({
              color: 'negative',
              position: 'top',
              message: msg,
              icon: 'report_problem'
            })
          } finally {
            $q.loading.hide()
          }
      }
      onMounted(()=>{
        request()
      })

      return {
        format,
        consultations,
        patients,
        confirm (id) {
        $q.dialog({
          title: 'Deseja atender?',
          message: 'Ao atender essa consulta ela será deletada!',
          cancel: true,
          persistent: true
        }).onOk( async () => {
          try {
            await api.delete(`/consultations/${id}`)
            $q.notify({
              color: 'positive',
              position: 'top',
              message: 'Consulta atendida com sucesso!',
              icon: 'check'
            })
            store.requestConsultations()
          } catch (error) {

          }
        })
      }
    }
  }
})
//
</script>
<style lang="postcss" scoped>
.q-item{
  @apply px-1 py-4 md:p-4
}
</style>
