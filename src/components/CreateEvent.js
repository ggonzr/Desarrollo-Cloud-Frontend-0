import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { createEvent } from "../services/backend-services";

//Permite actualizar un evento en el sistema.
export default function CreateEvent({classes, updateEventInferface, addElement}) {
  const [event, setEvent] = useState({
    event_name: "",
    event_category: "",
    event_place: "",
    event_address: "",
    event_initial_date: "",
    event_final_date: "",
    event_type: "",
  });

  const readFile = (ev) => {
    let file = ev.target.files[0];
    if (!file) {
      return;
    }
    return file;
  };
  
  return (
    <Grid item xs={12} sm={6}>
      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h6" noWrap>
          Crear nuevo evento
        </Typography>
        <TextField
          className={classes.textField}
          variant="outlined"
          margin="normal"
          required
          name="event_address"
          label="Nuevo nombre del evento"
          type="text"
          id="event_title"
          defaultValue={event.event_name}
          onChange={(ev) => {
            setEvent({ ...event, event_name: ev.target.value });
          }}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          margin="normal"
          required
          name="event_address"
          label="Dirección del evento"
          type="text"
          id="event_address"
          defaultValue={event.event_address}
          onChange={(ev) => {
            setEvent({ ...event, event_address: ev.target.value });
          }}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          margin="normal"
          required
          name="event_place"
          label="Lugar del evento"
          type="text"
          id="event_place"
          defaultValue={event.event_place}
          onChange={(ev) => {
            setEvent({ ...event, event_place: ev.target.value });
          }}
        />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            className={classes.formLabel}
            htmlFor="filled-age-native-simple"
          >
            Categoria
          </InputLabel>
          <Select
            native
            value={event.event_category}
            onChange={(ev) => {
              ev.preventDefault();
              setEvent({ ...event, event_category: ev.target.value });
            }}
          >
            <option value={"COURSE"}>Curso</option>
            <option value={"CONFERENCE"}>Conferencia</option>
            <option value={"SEMINAR"}>Seminario</option>
            <option value={"CONGRESS"}>Congreso</option>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            className={classes.formLabel}
            htmlFor="filled-age-native-simple"
          >
            Tipo de evento
          </InputLabel>
          <Select
            native
            value={event.event_type}
            onChange={(ev) => {
              ev.preventDefault();
              setEvent({ ...event, event_type: ev.target.value });
            }}
          >
            <option value={"VIRTUAL"}>Virtual</option>
            <option value={"PRESENCIAL"}>Presencial</option>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            id="datetime-local"
            label="Fecha de inicio"
            type="datetime-local"
            defaultValue={event.event_initial_date}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(ev) => {
              setEvent({ ...event, event_initial_date: ev.target.value });
            }}
          />
          <TextField
            id="datetime-local"
            label="Fecha final"
            type="datetime-local"
            defaultValue={event.event_final_date}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(ev) => {
              setEvent({ ...event, event_final_date: ev.target.value });
            }}
          />
        </FormControl>
        <input
          accept="image/*"
          className={classes.inputFile}
          id="icon-button-file"
          type="file"
          onChange={(ev) => {
            ev.preventDefault();
            setEvent({ ...event, thumbnail: readFile(ev) });
          }}
        />
        <label htmlFor="icon-button-file">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <FileCopyIcon />
          </IconButton>
        </label>
        <Button
          type="submit"
          className={classes.detailButton}
          variant="contained"
          color="primary"
          onClick={(ev) => {
            createEvent(event);  
            addElement(event);          
            updateEventInferface({idx: -1}); //Cerrar la ventana
          }}
        >
          Crear
        </Button>
      </Paper>
    </Grid>
  );
}
