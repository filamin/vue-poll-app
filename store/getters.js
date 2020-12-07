import options from "./options";
export default {
  conditions(state) {
    return state.list;
  },
  options() {
    return options;
  },
};
