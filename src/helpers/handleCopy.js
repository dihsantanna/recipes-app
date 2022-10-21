import copy from 'clipboard-copy';

let TIMEOUT_ID;

const handleCopy = (setCopyMsg, { type, id } = undefined) => {
  clearTimeout(TIMEOUT_ID);
  setCopyMsg(false);

  const ms = 2000;
  const regExp = /\S+[bebidas]?[comidas]\//i;
  const url = window.location.href;
  const newUrl = type && id
    ? url.replace('/receitas-favoritas', `/${type}s/${id}`)
      .replace('/receitas-feitas', `/${type}s/${id}`)
    : url.match(regExp)[0] + id;
  copy(newUrl);
  setCopyMsg(true);
  TIMEOUT_ID = setTimeout(() => {
    setCopyMsg(false);
  }, ms);
};

export default handleCopy;
