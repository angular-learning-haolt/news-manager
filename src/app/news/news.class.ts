export class News {
    public date: string;
// tslint:disable-next-line: variable-name
    public date_gmt: string;
    public guid: any;
    public id: number;
    public link: string;
    public modified: string;
// tslint:disable-next-line: variable-name
    public modified_gmt: string;
    public slug: string;
    public status: string;
    public type: string;
    public password: string;
    public title: any;
    public content: any;
    public author: number;
    public excerpt: any;
// tslint:disable-next-line: variable-name
    public featured_media: number;
// tslint:disable-next-line: variable-name
    public comment_status: string;
// tslint:disable-next-line: variable-name
    public ping_status: string;
    public format: string;
    public meta: any;
    public sticky: boolean;
    public template: string;
    public categories: string[];
    public tags: string[];

    constructor(
        date: string,
// tslint:disable-next-line: variable-name
        date_gmt: string,
        guid: any,
        id: number,
        link: string,
        modified: string,
// tslint:disable-next-line: variable-name
        modified_gmt: string,
        slug: string,
        status: string,
        type: string,
        password: string,
        title: any,
        content: any,
        author: number,
        excerpt: any,
// tslint:disable-next-line: variable-name
        featured_media: number,
// tslint:disable-next-line: variable-name
        comment_status: string,
// tslint:disable-next-line: variable-name
        ping_status: string,
        format: string,
        meta: any,
        sticky: boolean,
        template: string,
        categories: string[],
        tags: string[]
    ) {
        this.date = date;
        this.date_gmt = date_gmt;
        this.guid = guid;
        this.id = id;
        this.link = link;
        this.modified = modified;
        this.modified_gmt = modified_gmt;
        this.slug = slug;
        this.status = status;
        this.type = type;
        this.password = password;
        this.title = title;
        this.content = content;
        this.author = author;
        this.excerpt = excerpt;
        this.featured_media = featured_media;
        this.comment_status = comment_status;
        this.ping_status = ping_status;
        this.format = format;
        this.meta = meta;
        this.sticky = sticky;
        this.template = template;
        this.categories = categories;
        this.tags = tags;
    }
}