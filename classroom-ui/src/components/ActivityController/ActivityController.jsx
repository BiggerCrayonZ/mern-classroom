import React from 'react';
import PropTypes from 'prop-types';
import './ActivityController.scss';

import { Chip, Fab } from '@material-ui/core';
import { FormatListNumbered, Sync } from '@material-ui/icons';

const ActivityController = ({
    activity,
}) => {
    const inputFileRef = React.useRef(null);
    return (
        <div className="controller">
            {activity.count > 0 && (
              <Chip
                color="primary"
                label={`Registros: ${activity.count}`}
                icon={<FormatListNumbered />}
              />
            )}
            {activity.count === 0 && (
              <Chip
                color="primary"
                label="Sin registros"
              />
            )}
            <div className="controller_file">
              <input
                ref={inputFileRef}
                id="registerUpload"
                type="file"
                name="registerUpload"
                style={{ display: 'none' }}
              />
              <Fab
                color="primary"
                title="Sincronizar registros"
                onClick={() => {
                  if(inputFileRef) inputFileRef.current.click();
                }}
              >
                <Sync />
              </Fab>
            </div>
        </div>
    )
}

ActivityController.propTypes = {
  activity: PropTypes.object,
  dispatch: PropTypes.func,
};

ActivityController.defaultProps = {
  activity: {},
  dispatch: () => {},
};

export default ActivityController
