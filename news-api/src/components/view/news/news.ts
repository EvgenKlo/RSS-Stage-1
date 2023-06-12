import { checkElement } from '../../../helpers/check_element';
import { INewsResponse } from '../../../types/types';
import './news.css';

class News {
    public draw(data: INewsResponse["articles"]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp = checkElement<HTMLTemplateElement>('#newsItemTemp');

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true);

            if (!(newsClone instanceof DocumentFragment)) {
                throw new Error ('Element is not an instance of Document Fragment')
            }

            if (idx % 2) checkElement<HTMLDivElement>('.news__item', newsClone).classList.add('alt');

            checkElement<HTMLDivElement>('.news__meta-photo', newsClone).style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            checkElement<HTMLLIElement>('.news__meta-author', newsClone).textContent = item.author || item.source.name;
            checkElement<HTMLLIElement>('.news__meta-date', newsClone).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            checkElement<HTMLHeadingElement>('.news__description-title', newsClone).textContent = item.title;
            checkElement<HTMLHeadingElement>('.news__description-source', newsClone).textContent = item.source.name;
            checkElement<HTMLParagraphElement>('.news__description-content', newsClone).textContent = item.description;
            checkElement<HTMLAnchorElement>('.news__read-more a', newsClone).setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        checkElement<HTMLAnchorElement>('.news').innerHTML = '';
        checkElement<HTMLAnchorElement>('.news').appendChild(fragment);
    }
}

export default News;
