export class SupportMenu {
    supportMenuId: string;
    supportMenuTitle: string;
    supportMenuContent: string;
    userId: string | null;

    constructor(supportMenuId: string, supportMenuTitle: string, supportMenuContent: string, userId: string) {
        this.supportMenuId = supportMenuId;
        this.supportMenuTitle = supportMenuTitle;
        this.supportMenuContent = supportMenuContent;
        this.userId = userId;
    }
}