export interface SmileCenter {
  Appointment_Type_Id: string;
  Timetable: {
    weekdays?: string[];
    saturday?: string[];
  };
  Notes: string;
  Zip: string;
  Moons_Center: string;
  Street: string;
  Center_Type: string;
  Apt: string;
  Active: boolean;
  Partner: string;
  List_Price: number;
  Number: string;
  ACL: string;
  City: string;
  Latitude: number;
  Zone: string;
  Map_URL: string;
  Appointment_Cost: number;
  Prev_Videocall: boolean;
  Phone: string;
  Order: number;
  Neighborhood: string;
  promo: string;
  Longitude: number;
  Currency: string;
  State: string;
  Place_Id: string;
  Region: string;
  Center_Name: string;
  Calendar_Id: string;
  Country: string;
  totalReviews: number;
  Map_Image: string;
  embed: string;
  Appointment_Type: string;
  extractReviews: boolean;
  reviews: string[];
  Center_Desc: string;
  rating: number;
  Appointment_Calendar: string;
  Services: {
    [key: string]: {
      productId: string;
      AppointmentTypeId: string;
    };
  };
  retailApp: boolean;
  mergeCalendars: boolean;
  Delete: boolean;
  whatsAppLink: string;
  whatsAppCall: string;
}
