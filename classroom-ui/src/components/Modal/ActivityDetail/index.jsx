import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";

const ActivityDetail = (props) => {
  return (
    <Dialog
      fullWidth="md"
      open={actSelected.open}
      keepMounted
      TransitionComponent={Transition}
      aria-labelledby="detailActivity"
    >
      <div className="modal_detail_container">
        <div>
          <ListItem style={{ paddingLeft: "24px", paddingRight: "24px" }}>
            <ListItemText
              primary={
                actSelected.title ? (
                  <Typography variant="h5">{actSelected.title}</Typography>
                ) : (
                  "Actividad sin seleccionar"
                )
              }
              secondary={
                actSelected.subTitle ? (
                  <Typography variant="subtitle2">
                    {actSelected.subTitle}
                  </Typography>
                ) : (
                  "Favor de seleccionar una actividad previamente."
                )
              }
            />
          </ListItem>
          <DialogContent>
            <div className="modal_detail_hour">
              <div>
                <span>Fecha</span>
                <div>
                  <Chip color="secondary" label={actSelected.date} />
                </div>
              </div>
              <div>
                <span>Estado</span>
                <div>
                  {actSelected.conflict ? (
                    <Button style={{ backgroundColor: "#FF5252" }}>
                      Conflicto
                    </Button>
                  ) : (
                    <Chip color="primary" label="Registrado" />
                  )}
                </div>
              </div>
            </div>
            <Divider style={{ width: "100%" }} />
            <span>Descripción</span>
            <DialogContentText variant="body2" paragraph noWrap>
              {actSelected.desc
                ? actSelected.desc
                : "Favor de seleccionar una actividad previamente."}
            </DialogContentText>
          </DialogContent>
        </div>
        <div className="modal_detail_actions">
          <div className="modal_detail_actions_header">
            <Button
              onClick={() =>
                dispatch(remove(actSelected._id, unSelectActivity))
              }
            >
              Eliminar
            </Button>
            <ButtonBase onClick={() => unSelectActivity()}>
              <Close />
            </ButtonBase>
          </div>
          <Divider style={{ width: "100%" }} />
          <div className="modal_detail_actions_tools">
            <FormControl>
              <InputLabel shrink id="selectLocation">
                Localizaciones disponibles
              </InputLabel>
              <Select
                labelId="selectLocation"
                id="demo-simple-select-placeholder-label"
                value={`${actSelected.primaryLocation} - ${actSelected.secondaryLocation}`}
                onChange={(e) => onInputChangeLoc(e)}
                disabled={updateLoading}
              >
                {actSelected.available.map((x) => (
                  <MenuItem key={`key_${x}`} value={x}>
                    {x}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {console.log({
              actSelected,
              timeCon: timeConvert(actSelected.startHour * 60 * 60),
            })}
            <FormControl>
              <InputLabel shrink id="selectInitHour">
                Hora que inicia
              </InputLabel>
              <Select
                labelId="selectInitHour"
                id="selectionInitHour"
                value={timeConvert(actSelected.startHour * 60 * 60)}
                onChange={(e) => onInputChangeH(e)}
                disabled={updateLoading}
              >
                {actSelected.rowPattern.map((x) => (
                  <MenuItem
                    key={`key_${x}`}
                    value={timeConvert(x * 60 * 60)}
                    disabled={actSelected.durationPattern.includes(x)}
                  >
                    {timeConvert(x * 60 * 60)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl style={{ marginTop: "auto" }}>
              <Collapse in={updateLoading} style={{ width: "100%" }}>
                <LinearProgress />
              </Collapse>
              <Collapse in={!updateLoading} style={{ width: "100%" }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={Boolean(!actSelected.change)}
                  onClick={() => submitChanges()}
                >
                  Guardar
                </Button>
              </Collapse>
              {console.log({ actSelected })}
            </FormControl>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

ActivityDetail.propTypes = {};

export default ActivityDetail;
