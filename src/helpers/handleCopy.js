import copy from 'clipboard-copy';

let TIMEOUT_ID;

const DATA_DEFAULT = { type: '', id: '' };

const handleCopy = (setCopyMsg, { type, id } = { ...DATA_DEFAULT }) => {
  clearTimeout(TIMEOUT_ID);
  setCopyMsg(false);

  const ms = 2000;
  const regExp = /\S+([bebidas]|[comidas])\/\d+/i;
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
