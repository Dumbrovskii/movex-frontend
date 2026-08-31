export interface User {
    id: number,
    phone: string,
    fullName: string,
    email: string | null,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null
}