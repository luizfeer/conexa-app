<template>
  <div>
    <q-select
      v-model="patientId"
      label="Paciente"
      :options="patientsFiltered"
      :option-label="(item) => `${item.first_name} ${item.last_name}`"
      fill-input
      input-debounce="0"
      class="ml-3"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            Sem pacientes
          </q-item-section>
        </q-item>
      </template>
    </q-select>
    <!-- <q-btn flat class="mt-2">Adicionar novo paciente</q-btn> -->
  </div>
</template>


<script>
import { watch,  ref } from 'vue'
import { consultationsStore } from 'stores/consultations'
import { storeToRefs } from 'pinia'

export default {
  setup (props, { emit }) {
    const store = consultationsStore()
    const { patients } = storeToRefs(store)
    const patientId = ref(null)
    const patientsFiltered = ref(patients)

     watch(patientId, (val) => {
      emit('setPatient', val)
    })
    return {
      patientsFiltered,
      patientId
      // filterFn (val, update) {
      //   let pare = patients.value
      //     if (val === '') {
      //       update(() => {
      //         patientsFiltered.value = pare
      //       })
      //       return
      //     }
      //     update(() => {
      //       const needle = val.toLowerCase()
      //       patientsFiltered.value = pare.filter(v => v.first_name.toLowerCase().indexOf(needle) > -1)
      //     })
      //   }
      }
  }
}
</script>


