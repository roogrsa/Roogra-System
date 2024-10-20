export interface PermissionState {
    super: number,
    charts: number,
    admins: number,
    settings: number,
    ads: { all: number, primary: number, subscription: number },
    users: { all: number, advertisers: number, customers: number },
    categories: { primary: number, subscription: number, region: number },
    requests: { attestation: number, category: number },
    contact: { inquiries: number, issues: number, suggestions: number },
    reports: { chats: number, products: number },
    banlist: { chats: number, products: number },
}