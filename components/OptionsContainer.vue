<template>
  <form class="form-container">
    <h2>Добавить опрос</h2>
    <ul>
      <li v-for="condition in conditions" :key="condition.id">
        <div v-if="condition.id > 1" class="and-block"><h2>И</h2></div>
        <div>
          <div class="row">
            <h2>Условие {{ condition.id }}</h2>
            <div class="mult">
              <multiselect
                :id="condition.id"
                placeholder="Выберите условие"
                :options="options.nameOptions"
                :searchable="false"
                :value="condition.name"
                @input="changeName(condition, $event)"
              ></multiselect>
            </div>
          </div>
          <div v-if="condition.name === 'Возраст респондента'">
            <div v-for="param in condition.params" :key="param.id" class="row">
              <div v-if="param.id > 1" class="param-name-container">
                <input
                  type="button"
                  class="and-or-btn"
                  :value="param.compoundType"
                  @click="changeCompoundType(param, condition)"
                />
                <h4>Диапозон {{ param.id }}</h4>
              </div>
              <div v-else class="param-name-container">
                <h4>Диапозон {{ param.id }}</h4>
              </div>
              <label for="from">От</label>
              <input
                type="number"
                name="from"
                id="1"
                :value="param.from"
                @input="changeRange(param, condition, $event)"
              />
              <label for="to">До</label>
              <input
                type="number"
                name="to"
                id="1"
                :value="param.to"
                @input="changeRange(param, condition, $event)"
              />
            </div>
            <input
              class="add-param-btn"
              type="button"
              value=" + Добавить диапозон"
              v-on:click="addRange(condition)"
            />
          </div>
          <div v-if="condition.name === 'Тип карты лояльности'">
            <div v-for="param in condition.params" :key="param.id" class="row">
              <div v-if="param.id > 1" class="param-name-container">
                <input
                  type="button"
                  class="and-or-btn"
                  :value="param.compoundType"
                  @click="changeCompoundType(param, condition)"
                />
                <h4>Тип {{ param.id }}</h4>
              </div>
              <div v-else class="param-name-container">
                <h4>Тип {{ param.id }}</h4>
              </div>
              <div class="mult">
                <multiselect
                  :id="param.id"
                  placeholder="Выберите тип карты"
                  :options="options.paramsOptions[1]"
                  :searchable="false"
                  :value="param.type"
                  @input="changeCartType(param, condition, $event)"
                ></multiselect>
              </div>
            </div>
            <input
              class="add-param-btn"
              type="button"
              value="+ Добавить тип"
              v-on:click="addCartType(condition)"
            />
          </div>
          <div v-if="condition.name === 'Статус карты лояльности'">
            <div v-for="param in condition.params" :key="param.id" class="row">
              <div v-if="param.id > 1" class="param-name-container">
                <input
                  type="button"
                  class="and-or-btn"
                  :value="param.compoundType"
                  @click="changeCompoundType(param, condition)"
                />
                <h4>Статус {{ param.id }}</h4>
              </div>
              <div v-else class="param-name-container">
                <h4>Статус {{ param.id }}</h4>
              </div>
              <div class="mult">
                <multiselect
                  :id="param.id"
                  placeholder="Выберите статус карты"
                  :options="options.paramsOptions[2]"
                  :searchable="false"
                  :value="param.status"
                  @input="changeCartStatus(param, condition, $event)"
                ></multiselect>
              </div>
            </div>
            <input
              class="add-param-btn"
              type="button"
              value="+ Добавить статус"
              v-on:click="addCartStatus(condition)"
            />
          </div>
        </div>
        <input
          class="del-condition-btn"
          type="button"
          value="Удалить условие"
          v-on:click="deleteCondition(condition)"
        />
      </li>
    </ul>
    <button class="condition-add-btn" type="button" v-on:click="addCondition">
      <p>+</p>
      <p>Нажмите, чтобы добавить новое условие выборки</p>
      <p>Все условия связываются между собой логическим "И"</p>
    </button>
    <input class="next-btn" type="button" v-on:click="submit" value="Далее" />
  </form>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Multiselect,
  },
  computed: mapGetters({
    conditions: 'conditions',
    options: 'options',
  }),
  methods: {
    addCondition() {
      this.$store.commit('addCondition')
      this.$forceUpdate()
    },

    deleteCondition(condition) {
      console.log(condition.id)
      this.$store.commit('deleteCondition', condition.id)
      this.$forceUpdate()
    },

    changeCompoundType(param, condition) {
      console.log(param, condition)
      this.$store.commit('changeCompoundType', {
        conditionId: condition.id,
        paramId: param.id,
      })
      this.$forceUpdate()
    },

    changeName(condition, selectedName) {
      this.$store.commit('changeName', { id: condition.id, name: selectedName })
      this.$forceUpdate()
    },

    addRange(condition) {
      this.$store.commit('addRange', { id: condition.id })
      this.$forceUpdate()
    },

    changeRange(param, condition, e) {
      this.$store.commit('changeRange', {
        paramId: param.id,
        conditionId: condition.id,
        value: e.target.value,
        option: e.target.name,
      })
      this.$forceUpdate()
    },

    addCartType(condition) {
      this.$store.commit('addCartType', { id: condition.id })
      this.$forceUpdate()
    },

    changeCartType(param, condition, type) {
      this.$store.commit('changeCartType', {
        paramId: param.id,
        conditionId: condition.id,
        type: type,
      })
      this.$forceUpdate()
    },

    addCartStatus(condition) {
      this.$store.commit('addCartStatus', { id: condition.id })
      this.$forceUpdate()
    },

    changeCartStatus(param, condition, status) {
      this.$store.commit('changeCartStatus', {
        paramId: param.id,
        conditionId: condition.id,
        status: status,
      })
      this.$forceUpdate()
    },

    submit() {
      let info = this.$store.state
      alert('Вывелось в консоль, дальше примерно то, что в консоли')
      alert(JSON.stringify(info, null, 2))
      console.log({ info })
    },
  },
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>

<style>
* {
  margin: 0;
  padding: 0;
}
.options-container {
  animation: 2s appear;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}

.form-container {
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px auto 0;
  -webkit-box-shadow: 0px 18px 42px 2px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 18px 42px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 18px 42px 2px rgba(0, 0, 0, 0.3);
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 15px;
}
.row > h2 {
  width: 220px;
}

.row > input {
  width: 75px;
  padding: 5px 5px;
  margin-right: 5px;
  border: 1px solid rgb(214, 214, 214);
  border-radius: 5px;
  outline: none;
}

.row > label {
  margin-right: 5px;
}

.param-name-container {
  width: 220px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.and-or-btn {
  padding: 5px 5px;
  width: 40px;
  text-align: center;
  background-color: inherit;
  outline: none;
  border: 1px solid rgb(214, 214, 214);
  border-radius: 5px;
  margin-right: 10px;
}

.and-or-btn:hover {
  border: 1px solid rgb(97, 97, 97);
}

.add-param-btn {
  position: relative;
  top: 27px;
  left: 215px;
  padding: 5px 5px;
  color: rgb(21, 118, 16);
  border: 1px solid rgb(21, 118, 16);
  border-radius: 5px;
  background-color: white;
  outline: none;
}

.add-param-btn:hover {
  border: 1px solid rgb(15, 84, 12);
  background-color: rgb(248, 248, 248);
}

.del-condition-btn {
  position: relative;
  left: 630px;
  padding: 5px 5px;
  color: rgb(209, 31, 31);
  border: 1px solid rgb(209, 31, 31);
  border-radius: 5px;
  background-color: white;
  outline: none;
}

.del-condition-btn:hover {
  border: 1px solid rgb(84, 12, 12);
  background-color: rgb(248, 248, 248);
}

h2 {
  font-size: 18px;
}

.form-container > h2 {
  width: 100%;
  text-align: start;
  color: gray;
  padding: 5px 0 5px 24px;
}

.form-container > ul {
  padding: 0 2px;
  width: 100%;
}

.form-container > ul > li {
  padding: 10px 22px 20px;
  list-style: none;
  border: 1px solid rgb(214, 214, 214);
  position: relative;
  margin-bottom: 2px;
}

.mult {
  width: 550px;
}

.condition-add-btn {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: inherit;
  border: 1px solid rgb(214, 214, 214);
  border-radius: 12px;
  margin: 20px 0 20px;
  padding-bottom: 10px;
  color: rgb(30, 160, 45);
  outline: none;
}

.condition-add-btn > p:first-child {
  font-size: 42px;
}

.and-block {
  width: 40px;
  text-align: center;
  top: -16px;
  left: 40px;
  position: absolute;
  border: 1px solid rgb(214, 214, 214);
  border-radius: 5px;
  background-color: white;
}

.next-btn {
  padding: 5px 5px;
  color: white;
  border-radius: 5px;
  border: 1px solid rgb(50, 148, 26);
  background-color: rgb(50, 148, 26);
  outline: none;
}
</style>