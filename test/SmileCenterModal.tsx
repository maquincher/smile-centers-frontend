import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SmileCenterModal from "./SmileCenterModal";
import { SmileCenter } from "../interfaces/SmileCenter";

// Mock data for testing
const mockCenter: SmileCenter = {
  Appointment_Type_Id: "1",
  Timetable: {
    weekdays: ["9:00 - 18:00"],
    saturday: ["9:00 - 12:00"],
  },
  Notes: "",
  Zip: "12345",
  Moons_Center: "",
  Street: "Mock Street",
  Center_Type: "Dental",
  Apt: "",
  Active: true,
  Partner: "",
  List_Price: 100,
  Number: "123",
  ACL: "",
  City: "Mock City",
  Latitude: 0,
  Zone: "Mock Zone",
  Map_URL: "",
  Appointment_Cost: 50,
  Prev_Videocall: false,
  Phone: "123-456-7890",
  Order: 0,
  Neighborhood: "",
  promo: "",
  Longitude: 0,
  Currency: "USD",
  State: "Mock State",
  Place_Id: "",
  Region: "",
  Center_Name: "Mock Smile Center",
  Calendar_Id: "",
  Country: "Mock Country",
  totalReviews: 10,
  Map_Image: "",
  embed: "",
  Appointment_Type: "",
  extractReviews: false,
  reviews: [],
  Center_Desc: "Mock description",
  rating: 4.5,
  Appointment_Calendar: "",
  Services: {
    Service1: { productId: "1", AppointmentTypeId: "1" },
    Service2: { productId: "2", AppointmentTypeId: "2" },
  },
  retailApp: false,
  mergeCalendars: false,
  Delete: false,
  whatsAppLink: "",
  whatsAppCall: "",
};

describe("SmileCenterModal Component", () => {
  test("renders modal with center details", () => {
    render(
      <SmileCenterModal center={mockCenter} open={true} onClose={() => {}} />
    );

    expect(screen.getByText(mockCenter.Center_Name)).toBeInTheDocument();
    expect(
      screen.getByText(
        `Dirección: ${mockCenter.Street}, ${mockCenter.Number}, ${mockCenter.City}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Horario: L-V 9:00 - 18:00 / S 9:00 - 12:00`)
    ).toBeInTheDocument();
    expect(screen.getByText("Descripción:")).toBeInTheDocument();
    expect(screen.getByText(mockCenter.Center_Desc)).toBeInTheDocument();
    expect(screen.getByText("Servicios:")).toBeInTheDocument();
    expect(screen.getByText("Service1: 1")).toBeInTheDocument();
    expect(screen.getByText("Service2: 2")).toBeInTheDocument();
    expect(screen.getByText("Valoración: 4.5 / 5")).toBeInTheDocument();
    expect(screen.getByText("Número de reviews: 10")).toBeInTheDocument();
  });

  test("closes modal when close button is clicked", () => {
    const handleClose = jest.fn();
    render(
      <SmileCenterModal center={mockCenter} open={true} onClose={handleClose} />
    );

    const closeButton = screen.getByRole("button", { name: /Cerrar/i });
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
