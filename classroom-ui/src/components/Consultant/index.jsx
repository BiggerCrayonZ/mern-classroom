import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  ListItem,
  ListItemText,
  Fade,
  Typography,
  Chip,
  Divider,
  ButtonBase,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Collapse,
  LinearProgress,
} from '@material-ui/core'
import './Consultant.scss'
import Swal from 'sweetalert2'
import Clock from '../Clock'
import SearchBar from '../SearchBar'
import GeneralList from '../GeneralList'
import { Close } from '@material-ui/icons'
import {
    getActivityAvailability,
    timeConvert,
    getActivityHourDisp,
} from '../../functions/Activity'
import { updateActivity } from '../../redux/actions/activity'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Fade ref={ref} {...props} />
})

const Consultant = ({ map, hMin, updateLoading, dispatch }) => {
  const [actSelected, setActSelected] = React.useState({
    open: false,
    change: false,
    available: [],
    rowPattern: [],
    startHour: 7,
  })

  const selectActivity = act => {
    if (!act.title) return null
    const available = getActivityAvailability(act, map).sort()
    const rowPattern = getActivityHourDisp(act, map)
    setActSelected({ ...act, open: true, change: false, available, rowPattern })
  }

  const unSelectActivity = () => {
    setActSelected({
      startHour: 7,
      open: false,
      change: false,
      available: [],
      rowPattern: [],
    })
  }

  const onInputChangeLoc = e => {
    const loc = e.target.value
    const locs = loc.split(' ')
    setActSelected({
      ...actSelected,
      primaryLocation: locs[0],
      secondaryLocation: locs[locs.length - 1],
      change: true
    })
  }

  const onInputChangeH = e => {
    const strTemp = e.target.value
    const startHour = Number(strTemp.split(':')[0])
    setActSelected({
      ...actSelected,
      startHour,
      change: true
    })
  }

  const submitChanges = () => {
    if (!actSelected.change) {
      Swal.fire({
        icon: 'warning',
        title: 'Sin cambios registrados, necesita editar algo para guardarlo'
      })
      return null
    }
    dispatch(updateActivity(actSelected, unSelectActivity))
  }

  return (
    <div className='consultant'>
      <Clock />
      <SearchBar />
      <GeneralList selectActivity={selectActivity} />
      <Dialog
        fullWidth='md'
        open={actSelected.open}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby='detailActivity'
      >
        <div className='modal_detail_container'>
          <div>
            <ListItem style={{ paddingLeft: '24px', paddingRight: '24px' }}>
              <ListItemText
                primary={
                  actSelected.title ? (
                    <Typography variant='h5'>{actSelected.title}</Typography>
                  ) : (
                    'Actividad sin seleccionar'
                  )
                }
                secondary={
                  actSelected.subTitle ? (
                    <Typography variant='subtitle2'>
                      {actSelected.subTitle}
                    </Typography>
                  ) : (
                    'Favor de seleccionar una actividad previamente.'
                  )
                }
              />
            </ListItem>
            <DialogContent>
              <div className='modal_detail_hour'>
                <div>
                  <span>Fecha</span>
                  <div>
                    <Chip color='secondary' label={actSelected.date} />
                  </div>
                </div>
                <div>
                  <span>Estado</span>
                  <div>
                    {actSelected.conflict ? (
                      <Button style={{ backgroundColor: '#FF5252' }}>
                        Conflicto
                      </Button>
                    ) : (
                      <Chip color='primary' label='Registrado' />
                    )}
                  </div>
                </div>
              </div>
              <Divider style={{ width: '100%' }} />
              <span>Descripción</span>
              <DialogContentText variant='body2' paragraph noWrap>
                {actSelected.desc
                  ? actSelected.desc
                  : 'Favor de seleccionar una actividad previamente.'}
              </DialogContentText>
            </DialogContent>
          </div>
          <div className='modal_detail_actions'>
            <div className='modal_detail_actions_header'>
              <ButtonBase onClick={() => unSelectActivity()}>
                <Close />
              </ButtonBase>
            </div>
            <Divider style={{ width: '100%' }} />
            <div className='modal_detail_actions_tools'>
              <FormControl>
                <InputLabel shrink id='selectLocation'>
                  Localizaciones disponibles
                </InputLabel>
                <Select
                  labelId='selectLocation'
                  id='demo-simple-select-placeholder-label'
                  value={`${actSelected.primaryLocation} - ${actSelected.secondaryLocation}`}
                  onChange={e => onInputChangeLoc(e)}
                  disabled={updateLoading}
                >
                  {actSelected.available.map(x => (
                    <MenuItem key={`key_${x}`} value={x}>{x}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {console.log({ actSelected, timeCon: timeConvert((actSelected.startHour) * 60 * 60) })}
              <FormControl>
                <InputLabel shrink id='selectInitHour'>
                  Hora que inicia
                </InputLabel>
                <Select
                  labelId='selectInitHour'
                  id='selectionInitHour'
                  value={timeConvert((actSelected.startHour) * 60 * 60)}
                  onChange={e => onInputChangeH(e)}
                  disabled={updateLoading}
                >
                  {actSelected.rowPattern.map((x) => (
                    <MenuItem
                      key={`key_${x}`}
                      value={timeConvert(x * 60 * 60) }
                      disabled={actSelected.durationPattern.includes(x)}
                    >
                      {timeConvert(x * 60 * 60)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl style={{ marginTop: 'auto' }}>
                <Collapse in={updateLoading} style={{ width: '100%' }}>
                  <LinearProgress />
                </Collapse>
                <Collapse in={!updateLoading} style={{ width: '100%' }}>
                  <Button
                    fullWidth
                    variant='contained'
                    color='primary'
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
    </div>
  )
}

Consultant.propTypes = {
  hMin: PropTypes.number,
  map: PropTypes.array,
  updateLoading: PropTypes.bool,
  dispatch: PropTypes.func
}

Consultant.defaultProps = {
  hMin: 0,
  map: [],
  updateLoading: false,
  dispatch: () => {}
}

const mapStateToProps = ({ activity, load }) => {
  const { map, hMin, hMax } = activity
  return {
    map,
    updateLoading: Boolean(load.activityUpdate),
    hMin,
  }
}

export default connect(mapStateToProps)(Consultant)
