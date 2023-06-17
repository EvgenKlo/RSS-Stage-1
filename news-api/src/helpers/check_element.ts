export function checkElement<T extends HTMLElement> (selector: string, parentElement: Document| HTMLElement | DocumentFragment = document): T {
  const element = parentElement.querySelector<T>(selector);
  if (!element) {
    throw new Error (`Sorry, element ${selector} not found`)
  }
  return element;
}