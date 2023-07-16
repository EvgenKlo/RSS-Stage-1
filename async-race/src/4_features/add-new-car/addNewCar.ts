import { IGarageContainer } from "../../3_widgets/garage-container/type";
import { ICarResponse } from "../../types";
import { changePage } from './../change-page/change-page'

export function addNewCar(response: ICarResponse, garageContainer: IGarageContainer) {
  garageContainer.garage.addCarInGarage(response);
  garageContainer.carsCount++;
  garageContainer.garageTittle.innerText = `Garage (${garageContainer.carsCount})`;
  garageContainer.pageNumberText.innerText = `Page ${garageContainer.pageNumber} of ${Math.ceil(Number(garageContainer.carsCount) / 7)}`;
  garageContainer.changePageBtns.forEach((item, index) => {
    if(index === 1 && garageContainer.carsCount > garageContainer.pageNumber * 7 && item.classList.contains('off')) {
      item.classList.remove('off');
      item.addEventListener('click', () => {
        garageContainer.pageNumber = changePage(item, garageContainer.pageNumber);
        garageContainer.changePageBtns.forEach((element) => {
          element.parentElement?.remove();
        })
        garageContainer.buildAutodrom();
      })
    }
  })
}
