export interface AppointmentData {
    appointmentPoolId: number;
    numberOfAppointment: string;
    clientCode: string;
    fullname: string;
    clientNames: string;
    clientSurnames: string;
    clientPhone: string;
    chassis: string;
    brandCode: string;
    brandDescription: string;
    modelCode: string;
    modelDescription: string;
    lineCode: string;
    lineDescription: string;
    versionCode: string;
    versionDescription: string;
    vehicleYear: string;
    date: Date;
    type: string;
    typeDescription: string;
    feeling: string;
    crane: boolean;
    home: boolean;
    isEmergency: boolean;
    contacts: Contact[];
    vehicleCampaigns?: any[];
    services?: Service[];
}

export interface Contact {
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    services: Service[];
    imagesDescription: ImagesDescription[];
}

export interface ImagesDescription {
    description: string;
    imageUrl: string;
}

export interface Service {
    serviceNumber?: string;
    serviceDescription: string;
}
