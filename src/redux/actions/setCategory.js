import { SET_CATEGORY } from '../types';

const setCategory = (category) => ({
  type: SET_CATEGORY,
  payload: { category },
});

export default setCategory;
