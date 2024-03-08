export class Article {
    public title: string;
    public content: string;
    public image: string;
    public date: string;

    constructor(title: string, content: string, image: string, date: string) {
        this.title = title;
        this.content = content;
        this.image = image;
        this.date = date;

    }
}
