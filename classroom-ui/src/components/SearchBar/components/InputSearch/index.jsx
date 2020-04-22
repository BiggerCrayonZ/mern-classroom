import React from "react";
import PropTypes from "prop-types";
import {
  ButtonBase,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
} from "@material-ui/core";
import { Search, Refresh, Block } from "@material-ui/icons";

let timeout = null;

const InputSearch = ({ refresh, search, singleFilter, filterParam }) => {
  const inputRef = React.useRef();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "menu-popover" : undefined;
  const conflictFilterSelected = Boolean(filterParam === 'conflict');
  return (
    <div className="searchBar_input">
      <ButtonBase
        aria-describedby={id}
        onClick={e => setAnchorEl(e.currentTarget)}
      >
        <Search />
      </ButtonBase>
      <input
        type="text"
        id="searchAll"
        ref={inputRef}
        name="searchAll"
        placeholder="Busqueda Rápida"
        onFocus={(e) => {
          e.target.select();
        }}
        onKeyUp={(e) => {
          e.preventDefault();
          e.stopPropagation();
          clearTimeout(timeout);
          const { value } = e.target;
          timeout = setTimeout(() => {
            search(value);
          }, 750);
        }}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
      >
        <List dense>
          <ListItem
            button
            title="Refrescar lista de actividades"
            onClick={() => {
              setAnchorEl(null);
              if (inputRef) inputRef.current.value = '';
              refresh();
            }}
          > 
            <ListItemIcon>
              <Refresh />
            </ListItemIcon>
            <ListItemText primary="Refrescar lista" />
          </ListItem>
          <Divider />
          <ListItem
            button
            selected={conflictFilterSelected}
            title="Mostrar unicamente los conflictos"
            onClick={() => {
              setAnchorEl(null);
              if (inputRef) inputRef.current.value = '';
              if (conflictFilterSelected) refresh();
              else singleFilter('conflict', true);
            }}
          >
            <ListItemIcon>
              <Block style={{ color: conflictFilterSelected ? '#FF5252' : '' }} />
            </ListItemIcon>
            <ListItemText primary={`Filtrar conflictos ${conflictFilterSelected && 'seleccionado'}`} />
          </ListItem>
        </List>
      </Popover>
    </div>
  );
};

InputSearch.propTypes = {
  refresh: PropTypes.func,
  search: PropTypes.func,
  singleFilter: PropTypes.func,
  filterParam: PropTypes.string.isRequired,
};

InputSearch.defaultProps = {
  refresh: () => {},
  search: () => {},
  singleFilter: () => {},
};

export default InputSearch;
