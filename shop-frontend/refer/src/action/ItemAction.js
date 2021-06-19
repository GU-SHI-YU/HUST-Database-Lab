import {ITEM} from '../constants/Constants';

/**
 * fetch data depend on item id
 * @param itemId item id
 * @param blob  boolean including blob (0 or 1)
 */
export async function fetchItem(itemId, blob) {
  return await fetch(`${ITEM}/${itemId}/${blob}`, {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return new Error('请求错误');
    }
  }).then(json => {
    return json.data;
  })
    .catch(error => {
      console.error(error);
    });
}