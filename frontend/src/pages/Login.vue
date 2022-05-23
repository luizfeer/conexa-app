<template>
<q-layout class="bg-[#FFFFFB]">
   <q-header elevated class="header" height-hint="61.59">
      <q-toolbar class="q-py-sm q-px-md flex justify-center md:justify-start">
        <img alt="Quasar logo" src="~assets/logo-conexa.svg"  class="h-6"/>
      </q-toolbar>
    </q-header>
  <q-page class="w-full h-full row flex container mx-auto justify-around items-center">
     <div class="column justify-center items-center tw-hidden md:block">
      <div class="text-bold text-6xl title-login text-secondary py-8 px-4">Faça Login</div>
       <q-img
            alt="Login"
            class="h-[266px] w-[338px] mt-14"
            src="~assets/illustration-login.svg"
          />
     </div>
    <div class="column justify-center items-center">
      <div class="mobile-display text-bold text-5xl title-login text-[#210080] py-8 px-4 ">Faça Login</div>
      <div class="row w-full">
        <q-form @submit="login" class="w-full">
          <q-card class="border-0 shadow-none bg-[#FFFFFB] w-full md:w-96">
            <q-card-section class="px-3">
              <q-input
                clearable
                v-model="form.email"
                type="email"
                name="email"
                label="Email"
                placeholder="Digite seu e-mail"
                class="mb-5"
               :rules="emailRules"
              />
              <q-input
                v-model="form.password"
                name="password"
                placeholder="Digite sua senha"
                label="Senha"
                :type="isPwd ? 'password' : 'text'"
                :rules="pwRules"
              >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
              </q-input>
            </q-card-section>
            <q-card-actions class="q-px-md">
              <button-base
                unelevated
                color="primary"
                size="lg"
                class="full-width"
                type="submit"
                label="Entrar"
                >
              </button-base>
            </q-card-actions>
          </q-card>
        </q-form>
      </div>
    </div>
  </q-page>
</q-layout>
</template>

<script>
import { useQuasar } from 'quasar'
import { reactive, ref  } from 'vue'
import { useRouter  } from 'vue-router'
import { api  } from 'boot/axios'
import ButtonBase from 'components/ButtonBase.vue'

export default {
  name: 'LoginApp',
  components: {
    ButtonBase,
  },
  setup () {
    const Router = useRouter();
    const $q = useQuasar()
    const isPwd = ref(false)
    const form = reactive({
      email: '',
      password: ''
    })
    const login = () => {
    $q.loading.show()
    api.post('/login', {...form})
      .then((response) => {
        const data = response.data
        console.log(data)
        if(data){
         api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
         localStorage.setItem("token", JSON.stringify(data.token))
         localStorage.setItem("name",  JSON.stringify(data.name))

         Router.push({ path: '/' })
        }
      })
      .catch((err) => {
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
      })
      .finally(()=>{
        $q.loading.hide()
      })
    }
    return {
      isPwd,
      form,
      login,
       emailRules: [
        val => (val && val.length > 3) || 'Digite seu email'
      ],
        pwRules: [
        val => (val && val.length > 0) || 'Digite sua senha'
      ],
    }
  },



}
</script>

<style lang="postcss" scoped>
.title-login{
  font-family: 'Montserrat', sans-serif;
}
.mobile-display{
  @apply block md:hidden
}
.header {
  background-color: #fffffb;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.05);
}
</style>

