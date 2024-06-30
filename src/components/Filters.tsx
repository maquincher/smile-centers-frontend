import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { SmileCenter } from "../interfaces/SmileCenter";
import { Zone } from "../interfaces/enums";

interface FiltersProps {
  zone: string;
  services: string;
  appointmentType?: string; // Make appointmentType optional
  centerType?: string; // Make centerType optional
  onFilterChange: (filters: {
    zone: string;
    services: string;
    appointmentType: string; // Ensure appointmentType is always a string
    centerType: string; // Ensure centerType is always a string
  }) => void;
  smileCenters: SmileCenter[];
}

const Filters: React.FC<FiltersProps> = ({
  zone,
  services,
  appointmentType,
  centerType,
  onFilterChange,
  smileCenters,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [availableServices, setAvailableServices] = useState<string[]>([]);
  const [availableAppointmentTypes, setAvailableAppointmentTypes] = useState<
    string[]
  >([]);
  const [availableCenterTypes, setAvailableCenterTypes] = useState<string[]>(
    []
  );

  useEffect(() => {
    // Fetch available services from smileCenters
    const servicesSet = new Set<string>();
    smileCenters.forEach((center) => {
      Object.keys(center.Services).forEach((service) => {
        servicesSet.add(service);
      });
    });
    setAvailableServices(Array.from(servicesSet));
  }, [smileCenters]);

  useEffect(() => {
    // Fetch available appointment types from smileCenters based on selected service
    const appointmentTypesSet = new Set<string>();
    if (services) {
      smileCenters.forEach((center) => {
        if (center.Services[services]) {
          appointmentTypesSet.add(center.Services[services].AppointmentTypeId);
        }
      });
      setAvailableAppointmentTypes(Array.from(appointmentTypesSet));
    } else {
      // If no service is selected, show default Appointment_Type_Id
      const appointmentTypeIdsSet = new Set<string>();
      smileCenters.forEach((center) => {
        appointmentTypeIdsSet.add(center.Appointment_Type_Id);
      });
      setAvailableAppointmentTypes(Array.from(appointmentTypeIdsSet));
    }
  }, [services, smileCenters]);

  useEffect(() => {
    // Fetch available center types from smileCenters
    const centerTypesSet = new Set<string>();
    smileCenters.forEach((center) => {
      centerTypesSet.add(center.Center_Type);
    });
    setAvailableCenterTypes(Array.from(centerTypesSet));
  }, [smileCenters]);

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    onFilterChange({
      zone: name === "zone" ? (value as string) : zone,
      services: name === "services" ? (value as string) : services,
      appointmentType:
        name === "appointmentType" ? (value as string) : appointmentType || "", // Ensure appointmentType is always a string
      centerType: name === "centerType" ? (value as string) : centerType || "", // Ensure centerType is always a string
    });
  };

  const handleClearFilters = () => {
    onFilterChange({
      zone: "",
      services: "",
      appointmentType: "", // Ensure appointmentType is initialized as string
      centerType: "", // Ensure centerType is initialized as string
    });
  };

  return (
    <Box mb={2} width="100%">
      <Typography variant="h6" gutterBottom>
        Filtrar Centros
      </Typography>

      <Box
        display="flex"
        justifyContent={isMobile ? "center" : "space-between"}
        flexDirection={isMobile ? "column" : "row"}
        mb={2}
        flexWrap="wrap"
      >
        <FormControl
          variant="outlined"
          margin="normal"
          sx={{ minWidth: isMobile ? "100%" : "30%" }}
        >
          <InputLabel>Zone</InputLabel>
          <Select
            value={zone}
            onChange={handleFilterChange} // Correct the event type here
            label="Zone"
            name="zone"
          >
            {Object.values(Zone).map((zone) => (
              <MenuItem key={zone} value={zone}>
                {zone}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          margin="normal"
          sx={{ minWidth: isMobile ? "100%" : "30%" }}
        >
          <InputLabel>Services</InputLabel>
          <Select
            value={services}
            onChange={handleFilterChange} // Correct the event type here
            label="Services"
            name="services"
          >
            {availableServices.map((service) => (
              <MenuItem key={service} value={service}>
                {service}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          margin="normal"
          sx={{ minWidth: isMobile ? "100%" : "30%" }}
        >
          <InputLabel>Appointment Type</InputLabel>
          <Select
            value={appointmentType || ""}
            onChange={handleFilterChange} // Correct the event type here
            label="Appointment Type"
            name="appointmentType"
          >
            {availableAppointmentTypes.map((appointmentType) => (
              <MenuItem key={appointmentType} value={appointmentType}>
                {appointmentType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          margin="normal"
          sx={{ minWidth: isMobile ? "100%" : "30%" }}
        >
          <InputLabel>Center Type</InputLabel>
          <Select
            value={centerType || ""}
            onChange={handleFilterChange} // Correct the event type here
            label="Center Type"
            name="centerType"
          >
            {availableCenterTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box display="flex" justifyContent="end">
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClearFilters}
        >
          Limpiar Filtros
        </Button>
      </Box>
    </Box>
  );
};

export default Filters;
