<template>
  <Layout>
    <div class="form-group">
      <label for="">
        <h3>Selecciona un Indicador</h3>
      </label>
      <select v-model="indicador" class="form-select" name="indicador">
        <option v-for="(indicador, index) of indicadoresEconomicos" :key="index">
          {{indicador.codigo}}
        </option>
      </select>
      <Spinner v-if="loading"/>
      <!-- Indicadores informacion -->

      <div class="mt-4" v-if="indicadorInfo.serie">
        <!-- <h3> Indicador :{{ indicador }}</h3> -->
        <div class="mt-4">
          <h4>Nombre del Indicador: {{ indicadorInfo.nombre | trasnformarMayus}}</h4>
          <h5>Unidad de medida : {{ indicadorInfo.unidad_medida}}</h5>
        </div>
      </div>

      <!-- tabla con la informacion del indicador seleccionado -->
      <table v-if="indicadorInfo.serie" class="table mt-5">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Valor</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="indice of indicadorInfo.serie" :key="indice.fecha">
            <td>{{ indice.fecha | fechaFilter }}</td>
            <td>{{indice.valor }}</td>
          </tr>
          
        </tbody>
      </table>
    </div>
  </Layout>
</template>

<script>
import Layout from "../layout/Layout.vue";
import Spinner from "../components/Spinner.vue";
import { indicadoresEconomicos } from '../api/indicadores';

export default {
  name: "HomeView",
  components: {
    Layout,
    Spinner
  },
  data() {
    return {
      indicadorInfo: [],
      indicadoresEconomicos: [
        { codigo: 'uf'},
        { codigo: 'ivp'},
        { codigo: 'dolar'},
        { codigo: 'dolar_intercambio'},
        { codigo: 'euro'},
        { codigo: 'ipc'},
        { codigo: 'imacec'},
        { codigo: 'tpm'},
        { codigo: 'libra_cobre'},
        { codigo: 'tasa_desempleo'},
        { codigo: 'bitcoin'},
      ],
      indicador: '',
      loading: false,
      miFecha: ''
    }
  },
  methods: {
    async getIndicadores() {
      try {
        this.indicadorInfo = await indicadoresEconomicos(this.indicador);
        console.log(this.indicadorInfo.serie) // array
        this.loading = false; // termino de realizar la peticion
      } catch(error) {
        throw error;
      }
    }
  },
  created() {
    this.getIndicadores();
  },
  watch: {
    indicador() {
      this.loading = true;
      this.indicadorInfo = [];
      this.getIndicadores();
      // console.log('estoy observando los cambios en el indicador')
    }
  },
  filters: {
    // en la version 3 no existen los filters
    fechaFilter: function(value) {
      // value =  indice.fecha
      const fecha = new Date(value);
      const formatoFecha = `${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()}`;
      return formatoFecha;
    },
    trasnformarMayus: function(str) {
      // str = indicadorInfo.nombre
      return str.toUpperCase();
    }
  }

};
</script>

<style>
</style>