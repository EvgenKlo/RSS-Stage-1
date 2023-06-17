import { INewsResponse, ISourseResponse } from '../../types/types';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    private news = new News();;
    private sources = new Sources();;

    public drawNews(data: INewsResponse): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: ISourseResponse): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
