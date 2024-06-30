import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useState } from "react";
import { SmileCenter } from "../interfaces/SmileCenter";
import SmileCenterModal from "./SmileCenterModal";

interface SmileCenterCardProps {
  center: SmileCenter;
}

const SmileCenterCard: React.FC<SmileCenterCardProps> = ({ center }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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
    <>
      <Card
        sx={{
          maxWidth: 345,
          margin: 2,
          display: "flex",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 255, 0.2)",
          alignItems: "center",
        }}
        onClick={handleOpenModal} // Abrir modal al hacer clic en el card
      >
        <CardMedia
          component="img"
          sx={{ width: 30, height: 30, margin: 1 }}
          image="/assets/tooth.png"
          alt={center.Center_Name}
        />
        <Box sx={{ flex: 1 }}>
          <CardContent>
            <Typography gutterBottom component="div" color="blue">
              {center.Center_Name.substring(0, 33)}
            </Typography>
            <Typography variant="body2" color="red">
              40% off
            </Typography>
            <Typography color="text.secondary">
              {center.Street}, {center.Number}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatTimetable(center.Timetable)}
            </Typography>
          </CardContent>
        </Box>
      </Card>
      <SmileCenterModal
        center={center}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default SmileCenterCard;
