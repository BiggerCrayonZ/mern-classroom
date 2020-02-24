import React from "react";
import PropTypes from "prop-types";
import "./ActivityController.scss";

import {
  syncActivities,
  deleteRegister,
} from '../../redux/actions/activity';

import { Chip, Fab } from "@material-ui/core";
import {
  FormatListNumbered,
  Sync,
  Clear,
} from "@material-ui/icons";

const ActivityController = ({ activity, dispatch }) => {
  const inputFileRef = React.useRef(null);
  
  const onChangeFile = (e) => {
    const { target: { files } } = e
    dispatch(syncActivities(files[0]));
  };

  return (
    <div className="controller">
      {activity.count > 0 && (
        <Chip
          color="primary"
          label={`Registros: ${activity.count}`}
          icon={<FormatListNumbered />}
        />
      )}
      {activity.count === 0 && <Chip color="primary" label="Sin registros" />}
      <div className="controller_file">
        <Fab
          size="small"
          style={{ marginRight: '1em' }}
          color="secondary"
          onClick={() => dispatch(deleteRegister())}
        >
          <Clear />
        </Fab>
        <input
          ref={inputFileRef}
          id="registerUpload"
          type="file"
          name="registerUpload"
          style={{ display: "none" }}
          onChange={onChangeFile}
        />
        <Fab
          color="primary"
          title="Sincronizar registros"
          onClick={() => {
            if (inputFileRef) inputFileRef.current.click();
          }}
        >
          <Sync />
        </Fab>
      </div>
    </div>
  );
};

ActivityController.propTypes = {
  activity: PropTypes.object,
  dispatch: PropTypes.func
};

ActivityController.defaultProps = {
  activity: {},
  dispatch: () => {}
};

export default ActivityController;
