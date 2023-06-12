import { checkElement } from '../../../helpers/check_element';
import { ISourse } from '../../../types/types';
import './sources.css';

class Sources {
    public draw(data: ISourse[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = checkElement<HTMLTemplateElement>('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true);

            if (!(sourceClone instanceof DocumentFragment)) {
                throw new Error ('Element is not an instance of Document Fragment')
            }

            checkElement<HTMLSpanElement>('.source__item-name', sourceClone).textContent = item.name;
            checkElement<HTMLDivElement>('.source__item', sourceClone).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        checkElement<HTMLDivElement>('.sources').append(fragment);
    }
}

export default Sources;
