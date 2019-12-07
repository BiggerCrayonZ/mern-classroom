const defaultState = () => ({
  initUrl: '',
  user: {},
});

const initialState = { ...defaultState() };

export default function(state = initialState, action) {
  const { type } = action;
  switch (type) {
    default:
      return state;
  }
}
