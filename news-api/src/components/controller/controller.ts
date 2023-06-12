import AppLoader from './appLoader';
import { Callback, INewsResponse, ISourseResponse } from '../../types/types';

class AppController extends AppLoader {
    public getSources(callback: Callback<ISourseResponse>): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: Event, callback: Callback<INewsResponse>): void {
        const target = e.target;
        const newsContainer = e.currentTarget;
        if (target instanceof HTMLElement && newsContainer instanceof HTMLElement) {
            let targetClone = target;
            while (targetClone !== newsContainer) {
                if (targetClone.classList.contains('source__item')) {
                    const sourceId = targetClone.getAttribute('data-source-id');
                    if (newsContainer.getAttribute('data-source') !== sourceId && sourceId !== null) {
                        newsContainer.setAttribute('data-source', sourceId);
                        super.getResp(
                            {
                                endpoint: 'everything',
                                options: {
                                    sources: sourceId,
                                },
                            },
                            callback
                        );
                    }
                    return;
                }
                if (targetClone.parentNode instanceof HTMLElement) {
                    targetClone = targetClone.parentNode;
                }
            }
        }
    }
}

export default AppController;
