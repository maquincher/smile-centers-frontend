import React from "react";
import { Modal, Box, Typography, Button, Grid } from "@mui/material";
import { SmileCenter } from "../interfaces/SmileCenter";

interface SmileCenterModalProps {
  center: SmileCenter;
  open: boolean;
  onClose: () => void;
}

const SmileCenterModal: React.FC<SmileCenterModalProps> = ({
  center,
  open,
  onClose,
}) => {
  const formatTimetable = (timetable: SmileCenter["Timetable"]) => {
    const weekdays = timetable.weekdays
      ? `L-V ${timetable.weekdays.join(", ")}`
      : "";
    const saturday = timetable.saturday
      ? ` / S ${timetable.saturday.join(", ")}`
      : "";
    return `${weekdays}${saturday}`;
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          maxWidth: 600,
          maxHeight: "80%",
          overflowY: "auto",
        }}
      >
        <Typography variant="h5" gutterBottom>
          {center.Center_Name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Dirección: {center.Street}, {center.Number}, {center.City}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Horario: {formatTimetable(center.Timetable)}
        </Typography>
        <Typography variant="body1" color="text.primary" gutterBottom>
          Descripción:
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {center.Center_Desc}
        </Typography>
        <Typography variant="body1" color="text.primary" gutterBottom>
          Servicios:
        </Typography>
        <ul>
          {Object.keys(center.Services).map((serviceName) => (
            <li key={serviceName}>
              {serviceName}: {center.Services[serviceName].AppointmentTypeId}
            </li>
          ))}
        </ul>
        <Typography variant="body1" color="text.primary" gutterBottom>
          Valoración: {center.rating} / 5
        </Typography>
        <Typography variant="body1" color="text.primary" gutterBottom>
          Número de reviews: {center.totalReviews}
        </Typography>
        <Grid container justifyContent="flex-end">
          <Button onClick={onClose} color="primary" variant="contained">
            Cerrar
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
};

export default SmileCenterModal;
