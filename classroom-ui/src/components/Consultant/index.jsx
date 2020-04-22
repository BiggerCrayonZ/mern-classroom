import React from 'react'
import { connect } from 'react-redux'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  ListItem,
  ListItemText,
  Slide,
  Typography
} from '@material-ui/core'
import './Consultant.scss'

import Clock from '../Clock'
import SearchBar from '../SearchBar'
import GeneralList from '../GeneralList'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='right' ref={ref} {...props} />
})

const Consultant = () => {
  const [actSelected, setActSelected] = React.useState({ open: false })

  const selectActivity = act => {
    if (!act.title) return null
    setActSelected({ ...act, open: true })
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
                    <Typography variant='subtitle2'>{actSelected.subTitle}</Typography>
                  ) : (
                    'Favor de seleccionar una actividad previamente.'
                  )
                }
              />
            </ListItem>
            <DialogContent>
              <DialogContentText variant='body2'>
                {actSelected.desc
                  ? actSelected.desc
                  : 'Favor de seleccionar una actividad previamente.'}
              </DialogContentText>
            </DialogContent>
          </div>
          <div>Cierre</div>
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
