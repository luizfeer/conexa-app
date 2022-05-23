<template>
  <div>
    <q-splitter
      v-model="splitterModel"
      horizontal
    >

      <template v-slot:before>
        <div class="q-pa-md">
          <q-date
            v-model="date"
            :events="events"
            event-color="orange"
            mask="YYYY/MM/DD"
            :locale="myLocale"
          />
        </div>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="date"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel
              v-for="(event, index) in events"
              :key="index"
              :name="event"
            >
            <div class="font-normal text-base text-gray-600">
              <span class="font-bold">
                Consultas já agendadas neste dia
              </span>
              <div
                v-for="consultationsDays in consultations.filter((el)=> event === format(new Date(el.date), 'yyyy/MM/dd'))"
                :key="consultationsDays.id"
                classss
              >
                <div class="mt-1 ml-2">🟠 {{ consultationsDays.patient.first_name }} {{ consultationsDays.patient.last_name }} - {{ format(new Date(consultationsDays.date), "dd/MM/yyyy 'às' HH:mm") }} </div>

              </div>
            </div>
           </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>
<script>
import { ref,  watch } from 'vue'
import { consultationsStore } from 'stores/consultations'
import { storeToRefs } from 'pinia'
import { format } from 'date-fns'


export default {
setup (props, { emit }){
    const date = ref('2021/02/05')
    watch(date, (val) => {
      emit('setDate', val)
    })
    const store = consultationsStore()
    const { consultations } = storeToRefs(store)
    const events = consultations.value.map((el) =>  { return format(new Date(el.date), 'yyyy/MM/dd')})
    return {
      format,
      consultations,
      splitterModel: ref(50),
      date,
      events,
      myLocale: {
        days: 'Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sábado'.split('_'),
        daysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
        months: ' Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
        monthsShort: 'Jan_Fev_Mar_Abr_Maio_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
        firstDayOfWeek: 1,
        firstDayOfWeek: 1,
        format24h: true,
        pluralDay: 'dias'
      }
    }
  }
}
</script>
