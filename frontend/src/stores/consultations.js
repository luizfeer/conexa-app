import { defineStore } from 'pinia';
import { api } from 'boot/axios'

export const consultationsStore = defineStore('consultationsId', {
  state: () => ({
    _consultations: [],
    _patients:[]
  }),
  getters: {
    consultations: (state) => state._consultations,
    patients: (state) => state._patients,
  },
  actions: {
    setConsultations(payload) {
     this._consultations = payload
    },
    setPatients(payload) {
     this._patients = payload
    },
    async requestConsultations() {
      try {
        const ctt = await api.get('/consultations?_expand=patient')
        this._consultations = ctt.data
      } catch (error) {

      }
    },
  },
});
