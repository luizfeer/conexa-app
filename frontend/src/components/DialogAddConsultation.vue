<template>
  <q-dialog v-model="prompt.show">
      <q-card style="min-width: 350px " class="w-full">
        <q-card-section>
          <div class="text-h6">Agendar nova Consulta</div>
        </q-card-section>

          <div class="p-2">
            <q-stepper
              v-model="step"
              class="border-0 shadow-none"
              vertical
              color="primary"
              animated
            >
              <q-step
                :name="1"
                title="Paciente"
                icon="person"
                :done="step > 1"
              >
               <SelectPatient @setPatient="patient=$event"/>

                <q-stepper-navigation>
                  <q-btn @click="step = 2" color="primary" label="Continuar" :disabled="!patient" />
                </q-stepper-navigation>
              </q-step>

              <q-step
                :name="2"
                title="Data da consulta"
                icon="event"
                :done="step > 2"
              >
                <DatePicker @setDate="date=$event"/>

                <q-stepper-navigation>
                  <q-btn @click="step = 3" color="primary" label="Continuar" :disabled="!date"/>
                  <q-btn flat @click="step = 1" color="primary" label="Voltar" class="q-ml-sm" />
                </q-stepper-navigation>
              </q-step>
              <q-step
                :name="3"
                title="Hora da consulta"
                icon="schedule"
                :done="step > 3"
              >
                <TimerPicker :date="date" @setDate="date=$event"/>

                <q-stepper-navigation>
                  <q-btn @click="step = 4" color="primary" label="Continuar" />
                  <q-btn flat @click="step = 1" color="primary" label="Voltar" class="q-ml-sm" />
                </q-stepper-navigation>
              </q-step>



              <q-step
                :name="4"
                title="Revise os dados"
                icon="check"
              >
              <p class="text-base text-gray-600">

                <span class="font-bold">
                  Paciente:
                </span>
                {{ patient.first_name }} {{ patient.last_name }}
              </p>
              <p class=" text-base text-gray-600">
                <span class="font-bold">
                  Data:
                </span>
                {{ format(new Date(date), "dd/MM/yyyy 'às' HH:mm") }}
              </p>

                <q-stepper-navigation>
                  <q-btn color="primary" label="Finalizar" @click="saveConsultation" />
                  <q-btn flat @click="step = 2" color="primary" label="Voltar" class="q-ml-sm" />
                </q-stepper-navigation>
              </q-step>
            </q-stepper>
          </div>

          <!-- <q-input
                autofocus
                v-model="form.email"
                type="email"
                name="email"
                label="Email"
                placeholder="Digite seu e-mail"
                class="mb-5"
               :rules="emailRules"
              /> -->

        <!-- <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add address" v-close-popup />
        </q-card-actions> -->
      </q-card>
    </q-dialog>
</template>

<script>
import { reactive, watch,  ref } from 'vue'
import DatePicker from 'components/NewConsultation/DatePicker.vue'
import TimerPicker from 'components/NewConsultation/TimerPicker.vue'
import SelectPatient from 'components/NewConsultation/SelectPatient.vue'
import { format } from 'date-fns'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

export default {
  components:{
    DatePicker,
    TimerPicker,
    SelectPatient
  },
  props:{
    show:{
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const $q = useQuasar()

    const prompt = reactive({
      show: false
    })
    const form = ref({
      patientId: null,
      date: ''
    })
    const date = ref('')
    const patient = ref({
        first_name: '',
        last_name: '',
        id: ''
    })
    const step = ref(1)

    watch(() => props.show, () => {
      prompt.show = props.show
    })
    watch(() => prompt.show, (val) => {
      if(!val) emit('closeModal')
    })
     const saveConsultation = async () => {
        form.value = {
          patientId: patient.value.id,
          date: new Date(date.value).toString()
        }
        $q.loading.show()
        try {
          await api.post('/consultations', form.value)
          emit('success')
          step.value = 1
          $q.notify({
            color: 'positive',
            position: 'top',
            message: 'Consulta cadastrada com sucesso!',
            icon: 'check'
          })

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

    return {
      format,
      date,
      patient,
      step,
      prompt,
      form,
      saveConsultation
    }
  }
}
</script>

<style>
.q-stepper--vertical .q-stepper__tab{
  padding: 12px!important;
}
.q-stepper--vertical .q-stepper__step-inner {
    padding: 0 5px 30px 30px;
}
</style>
