  <template>
  <q-layout class="bg-[#FFFFFB]">
    <q-header elevated class="header fixed" height-hint="61.59">
      <q-toolbar class="q-py-sm q-px-md">
        <img alt="Conexa logo" src="~assets/logo-conexa.svg" />

        <q-space />
        <div class="font-bold text-gray-800 tw-hidden md:block"> {{ name ? `Olá, Dr. ${name}` : `Olá!` }} </div>
        <button-base label="Sair" @click="logout"></button-base>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { useRouter  } from 'vue-router'
import { onMounted, ref } from 'vue'

import ButtonBase from 'components/ButtonBase.vue'
export default({
  components: {
    ButtonBase,
  },
  setup() {
    const Router = useRouter();
    const logout = () =>{
      localStorage.clear()
      Router.push({ path: '/login' })
    }
    const name = ref('')
    onMounted(()=>{
      name.value = JSON.parse(localStorage.getItem("name"))
    })
    return{
      logout,
      name
    }
  },
})
</script>

<style scoped>
.header {
  background-color: #fffffb;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.05);
}
</style>
