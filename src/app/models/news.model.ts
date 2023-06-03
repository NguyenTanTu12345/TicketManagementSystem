export class News {
    newsId: string;
    newsTitle: string;
    newsContent: string;
    newsImagePath: string;
    newsDate: Date | null;
    accessToken: string;

    constructor(newsId: string, newsTitle: string, newsContent: string,
        newsImagePath: string, newsDate: Date, accessToken: string) {
        this.newsId = newsId;
        this.newsTitle = newsTitle;
        this.newsContent = newsContent;
        this.newsImagePath = newsImagePath;
        this.newsDate = newsDate;
        this.accessToken = accessToken;
    }
}