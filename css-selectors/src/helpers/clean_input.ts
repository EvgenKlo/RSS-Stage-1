import { checkElement } from './check_element';

export function cleanInput ():HTMLInputElement {
  const input = checkElement<HTMLInputElement>('.code-container__input');
  input.value = '';
  return input;
}
