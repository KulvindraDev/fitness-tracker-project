import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { addActivity } from "../services/api";

const ActivityForm = ({ onActivitiesAdded }) => {
  const [activity, setActivity] = useState({
    type: "RUNNING",
    duration: "",
    caloriesBurned: "",
    addtionalMetrics: {},
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addActivity(activity);
      onActivitiesAdded();
      setActivity({
        type: "RUNNING",
        duration: "",
        caloriesBurned: "",
        addtionalMetrics: {},
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box component="form" sx={{ mb: 2 }} onSubmit={handleSubmit}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Activity Type</InputLabel>
        <Select
          value={activity.type}
          onChange={(e) => {
            setActivity({ ...activity, type: e.target.value });
          }}
        >
          <MenuItem value="RUNNING">Running</MenuItem>
          <MenuItem value="CYCLING">Cycling</MenuItem>
          <MenuItem value="WALKING">Walking</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        sx={{ mb: 2 }}
        label="Duration"
        type="number"
        value={activity.duration}
        onChange={(e) => {
          setActivity({ ...activity, duration: e.target.value });
        }}
      />
      <TextField
        fullWidth
        sx={{ mb: 2 }}
        label="Calories Burned"
        type="number"
        value={activity.caloriesBurned}
        onChange={(e) => {
          setActivity({ ...activity, caloriesBurned: e.target.value });
        }}
      />
      <Button type="submit" variant="contained">
        Add Activity
      </Button>
    </Box>
  );
};
export default ActivityForm;
