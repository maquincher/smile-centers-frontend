import React, { useEffect, useState } from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { SmileCenter } from "../interfaces/SmileCenter";
import { fetchSmileCenters } from "../services/smileCenterService";
import Filters from "./Filters";
import SmileCenterCard from "./SmileCenterCard";

const SmileCenterList: React.FC = () => {
  const [centers, setCenters] = useState<SmileCenter[]>([]);
  const [filteredCenters, setFilteredCenters] = useState<SmileCenter[]>([]);
  const [filters, setFilters] = useState({
    zone: "",
    services: "",
    appointmentType: "",
    centerType: "",
  });

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const data = await fetchSmileCenters();
        setCenters(data);
        setFilteredCenters(data);
      } catch (error) {
        console.error("Error fetching Smile Centers:", error);
      }
    };

    fetchCenters();
  }, []);

  const handleFilterChange = (newFilters: {
    zone: string;
    services: string;
    appointmentType?: string;
    centerType: string;
  }) => {
    const updatedFilters = {
      ...newFilters,
      appointmentType: newFilters.appointmentType || "",
    };
    setFilters(updatedFilters);
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered = centers.filter((center) => {
        const { zone, services, appointmentType, centerType } = filters;
        let passZone = true;
        let passServices = true;
        let passAppointmentType = true;
        let passCenterType = true;

        if (zone && center.Zone !== zone) {
          passZone = false;
        }

        if (services && !Object.keys(center.Services).includes(services)) {
          passServices = false;
        }

        if (appointmentType && appointmentType !== center.Appointment_Type_Id) {
          passAppointmentType = false;
        }

        if (centerType && centerType !== center.Center_Type) {
          passCenterType = false;
        }

        return (
          passZone && passServices && passAppointmentType && passCenterType
        );
      });
      setFilteredCenters(filtered);
    };

    applyFilters();
  }, [centers, filters]);

  return (
    <Container>
      <Filters
        zone={filters.zone}
        services={filters.services}
        appointmentType={filters.appointmentType}
        centerType={filters.centerType}
        onFilterChange={handleFilterChange}
        smileCenters={centers}
        key="filters"
      />

      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          Resultados de Smile Centers
        </Typography>
        <Typography variant="body1">
          Se han encontrado {filteredCenters.length} centros que coinciden con
          los filtros seleccionados.
        </Typography>
      </Paper>

      <Grid container spacing={2}>
        {filteredCenters.map((center, index) => (
          <Grid item key={center.Place_Id} xs={12} sm={6} md={4}>
            <SmileCenterCard center={center} key={index} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SmileCenterList;
