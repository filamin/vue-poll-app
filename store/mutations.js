export default {
  addCondition(state) {
    state.list.push({
      id: state.list.length + 1,
      params: [],
    });
  },

  deleteCondition(state, id) {
    console.log(state.list.findIndex((condition) => condition.id === id + 1));
    state.list.splice(
      state.list.findIndex((condition) => condition.id === id),
      1
    );
    state.list.forEach((element, index) => {
      element.id = index + 1;
      console.log(element.id);
    });
  },

  changeCompoundType(state, { paramId, conditionId }) {
    let res;
    if (state.list[conditionId - 1].params[paramId - 1].compoundType === "И") {
      res = "ИЛИ";
    } else {
      res = "И";
    }
    state.list[conditionId - 1].params[paramId - 1].compoundType = res;
  },

  changeName(state, { id, name }) {
    state.list[id - 1].name = name;
    state.list[id - 1].params = [];
  },

  addRange(state, { id }) {
    state.list[id - 1].params.push({
      id: state.list[id - 1].params.length + 1,
      from: 0,
      to: 0,
      compoundType: state.list[id - 1].params.length > 0 ? "И" : null,
    });
  },

  changeRange(state, { paramId, conditionId, value, option }) {
    state.list[conditionId - 1].params[paramId - 1][option] = +value;
  },

  addCartType(state, { id }) {
    state.list[id - 1].params.push({
      id: state.list[id - 1].params.length + 1,
      compoundType: state.list[id - 1].params.length > 0 ? "И" : null,
    });
  },

  changeCartType(state, { paramId, conditionId, type }) {
    state.list[conditionId - 1].params[paramId - 1].type = type;
  },

  addCartStatus(state, { id }) {
    state.list[id - 1].params.push({
      id: state.list[id - 1].params.length + 1,
      compoundType: state.list[id - 1].params.length > 0 ? "И" : null,
    });
  },

  changeCartStatus(state, { paramId, conditionId, status }) {
    state.list[conditionId - 1].params[paramId - 1].status = status;
  },
};
