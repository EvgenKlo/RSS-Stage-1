export function changePage(btn: HTMLElement, pageNumber: number) {
  if(btn.classList.contains('garage__change-btn_next')) {
    pageNumber++;
  } else {
    pageNumber--;
  }
  return(pageNumber);
}
