import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface ApplianceService {
    id: bigint;
    categoryId: bigint;
    name: string;
    description: string;
    price: bigint;
}
export interface ContactInquiry {
    name: string;
    email: string;
    message: string;
}
export interface UserProfile {
    name: string;
    profilePhoto?: ExternalBlob;
    email: string;
    mobile: string;
}
export interface ServiceCategory {
    id: bigint;
    icon?: ExternalBlob;
    name: string;
    description: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addApplianceService(name: string, description: string, price: bigint, categoryId: bigint): Promise<void>;
    addMultipleApplianceServices(services: Array<[string, string, bigint, bigint]>): Promise<void>;
    addServiceCategory(name: string, description: string, icon: ExternalBlob | null): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllApplianceServices(): Promise<Array<ApplianceService>>;
    getAllContactInquiries(): Promise<Array<ContactInquiry>>;
    getAllServiceCategories(): Promise<Array<ServiceCategory>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getServicesByCategory(categoryId: bigint): Promise<Array<ApplianceService>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getUserProfilePhoto(user: Principal): Promise<ExternalBlob | null>;
    initializeServiceCategories(categories: Array<[string, string, ExternalBlob | null]>): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactInquiry(name: string, email: string, message: string): Promise<void>;
    uploadProfilePhoto(photo: ExternalBlob): Promise<void>;
}
