export function checkElement<T extends HTMLElement> (selector: string, parentElement: Document| HTMLElement | DocumentFragment = document): T {
  const element: T | null = parentElement.querySelector(selector);
  if (!element) {
    throw new Error (`Sorry, element ${selector} not found`)
  }
  return element;
}