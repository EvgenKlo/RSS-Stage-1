import './style.scss'
import { createElement } from '../../6_shared/lib/helpers/create-element';

export class WinnersHeader {
  public tableHeader = this.crateTableHeader();

  private crateTableHeader() {
    const tableHeader = createElement('tr', ['table__head']);
    const tableColumnNames = ['Number', 'Car', 'Name', 'Wins', 'Best time (seconds)'];
    tableColumnNames.forEach((item) => {
      const headCeil = createElement('th', ['table__head-ceil', `table__head-ceil_${item.toLocaleLowerCase().split(' ').join('-')}`]);
      headCeil.innerText = item;
      tableHeader.append(headCeil);
    })
    return tableHeader;
  }

  public appendTo(parent: HTMLElement) {
    parent.append(this.tableHeader);
    return this.tableHeader;
  }

}
