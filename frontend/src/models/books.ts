/**Include one interface that we wish to export in our app to be used in other places or states */
export interface book {
    _id: string,
    title: string,
    author?: string,
    ISBN?: string,
    description?: string,
    downloadedAt: string,
    reviewedAt: string,
}