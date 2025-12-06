export interface AppointmentData {
    AppointmentPoolId: number;
    NumberOfAppointment: string;
    ClientCode: string;
    Fullname: string;
    ClientNames: string;
    ClientSurnames: string;
    ClientPhone: string;
    Chassis: string;
    BrandCode: string;
    BrandDescription: string;
    ModelCode: string;
    ModelDescription: string;
    LineCode: string;
    LineDescription: string;
    VersionCode: string;
    VersionDescription: string;
    VehicleYear: string;
    Date: string;
    Type: string;
    Email?: string;
    TypeDescription: string;
    Crane: boolean;
    Home: boolean;
    IsEmergency: boolean;
    Contacts: Contact[];
    Services: Service[];
    VehicleCampaigns?: any[];
}

export interface Contact {
    ContactName?: string;
    ContactEmail?: string;
    ContactPhone?: string;
    Services?: Service[];
    ImagesDescription?: ImagesDescription[];
}

export interface ImagesDescription {
    Description?: string;
    ImageUrl?: string;
}

export interface Service {
    ServiceDescription: string;
}
