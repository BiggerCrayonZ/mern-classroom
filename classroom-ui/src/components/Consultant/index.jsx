import React from 'react'
import { connect } from 'react-redux'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  ListItem,
  ListItemText,
  Slide,
  Typography,
  Chip,
  Divider,
  ButtonBase,
  Button
} from '@material-ui/core'
import './Consultant.scss'

import Clock from '../Clock'
import SearchBar from '../SearchBar'
import GeneralList from '../GeneralList'
import { Close } from '@material-ui/icons'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='right' ref={ref} {...props} />
})

const Consultant = () => {
  const [actSelected, setActSelected] = React.useState({ open: false })

  const selectActivity = act => {
    if (!act.title) return null
    setActSelected({ ...act, open: true })
  }

  const unSelectActivity = () => {
    setActSelected({ open: false });
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
                      <Button
                        style={{ backgroundColor: '#FF5252' }}
                      >
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
          <div className="modal_detail_actions">
            <div className="modal_detail_actions_header">
              <ButtonBase
                onClick={() => unSelectActivity()}
              >
                <Close />
              </ButtonBase>
            </div>
            <Divider style={{ width: '100%' }} />
          </div>
        </div>
      </Dialog>
    </div>
  )
}

const mapStateToProps = ({ auth }) => {
  const { user } = auth
  return { user }
}

export default connect(mapStateToProps)(Consultant)
