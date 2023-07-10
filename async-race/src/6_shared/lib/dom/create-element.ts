export function createElementInDOM (
  tagName: string,
  classes: string[],
  parentElement: HTMLElement = document.body
) {
  const element = document.createElement(tagName);
  element.classList.add(...classes);
  parentElement.append(element);
  return element;
}
