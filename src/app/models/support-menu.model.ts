export class SupportMenu {
    supportMenuId: number;
    supportMenuTitle: string;
    supportMenuContent: string;
    accessToken: string;

    constructor(supportMenuId: number, supportMenuTitle: string, supportMenuContent: string, accessToken: string) {
        this.supportMenuId = supportMenuId;
        this.supportMenuTitle = supportMenuTitle;
        this.supportMenuContent = supportMenuContent;
        this.accessToken = accessToken;
    }
}