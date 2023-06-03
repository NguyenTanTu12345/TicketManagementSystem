export class SupportMenu {
    supportMenuId: number;
    supportMenuTitle: string;
    supportMenuContent: string;
    userId: string;
    accessToken: string;

    constructor(supportMenuId: number, supportMenuTitle: string, supportMenuContent: string, 
        accessToken: string, userId: string) {
        this.supportMenuId = supportMenuId;
        this.supportMenuTitle = supportMenuTitle;
        this.supportMenuContent = supportMenuContent;
        this.accessToken = accessToken;
        this.userId = userId;
    }
}