import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CenterType, Services, Zone } from "../interfaces/enums";
import { SmileCenter } from "../interfaces/SmileCenter";

interface FiltersProps {
  zone: string;
  services: string;
  appointmentType?: string; // Make appointmentType optional
  centerType: string;
  onFilterChange: (filters: {
    zone: string;
    services: string;
    appointmentType: string; // Ensure appointmentType is always a string
    centerType: string;
  }) => void;
  smileCenters: SmileCenter[];
}

const Filters: React.FC<FiltersProps> = ({
  zone,
  services,
  appointmentType = "", // Ensure appointmentType is initialized as empty string
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
    smileCenters.forEach((center) => {
      Object.values(center.Services).forEach((service) => {
        appointmentTypesSet.add(service.AppointmentTypeId);
      });
    });
    setAvailableAppointmentTypes(Array.from(appointmentTypesSet));
  }, [smileCenters]);

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    onFilterChange({
      zone: name === "zone" ? value : zone,
      services: name === "services" ? value : services,
      appointmentType: name === "appointmentType" ? value : appointmentType,
      centerType: name === "centerType" ? value : centerType,
    });
  };

  const handleClearFilters = () => {
    onFilterChange({
      zone: "",
      services: "",
      appointmentType: "",
      centerType: "",
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
            onChange={handleFilterChange}
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

        {availableServices.length > 0 && (
          <FormControl
            variant="outlined"
            margin="normal"
            sx={{ minWidth: isMobile ? "100%" : "30%" }}
          >
            <InputLabel>Services</InputLabel>
            <Select
              value={services}
              onChange={handleFilterChange}
              label="Services"
              name="services"
            >
              <MenuItem value="">None</MenuItem>
              {availableServices.map((service) => (
                <MenuItem key={service} value={service}>
                  {service}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {availableAppointmentTypes.length > 0 && (
          <FormControl
            variant="outlined"
            margin="normal"
            sx={{ minWidth: isMobile ? "100%" : "30%" }}
          >
            <InputLabel>Appointment Type</InputLabel>
            <Select
              value={appointmentType}
              onChange={handleFilterChange}
              label="Appointment Type"
              name="appointmentType"
            >
              <MenuItem value="">None</MenuItem>
              {availableAppointmentTypes.map((appointmentType) => (
                <MenuItem key={appointmentType} value={appointmentType}>
                  {appointmentType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <FormControl
          variant="outlined"
          margin="normal"
          sx={{ minWidth: isMobile ? "100%" : "30%" }}
        >
          <InputLabel>Center Type</InputLabel>
          <Select
            value={centerType}
            onChange={handleFilterChange}
            label="Center Type"
            name="centerType"
          >
            {Object.values(CenterType).map((type) => (
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
