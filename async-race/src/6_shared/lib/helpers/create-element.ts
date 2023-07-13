export function createElement (
  tagName: string,
  classes: string[],
) {
  const element = document.createElement(tagName);
  element.classList.add(...classes);
  return element;
}
