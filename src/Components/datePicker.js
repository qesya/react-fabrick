import React from 'react'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import Grid from '@material-ui/core/Grid'
import TransactionList from './transactionList'

const DatePicker = (props) => {
  const [fromAccountingDate, setFromAccountingDate] = React.useState(new Date('2020-01-01T21:11:54'))
  const [toAccountingDate, setToAccountingDate] = React.useState(new Date())
  const handleFromAccountingDateChange = (date) => {
    setFromAccountingDate(date)
  }
  const handleToAccountingDateChange = (date) => {
    setToAccountingDate(date)
  }
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container>
          <KeyboardDatePicker
            disableToolbar
            variant='inline'
            format='MM/dd/yyyy'
            margin='normal'
            id='date-picker-inline'
            label='fromAccountingDate'
            value={fromAccountingDate}
            onChange={handleFromAccountingDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
          <span style={{ width: 15 }} />
          <KeyboardDatePicker
            disableToolbar
            variant='inline'
            format='MM/dd/yyyy'
            margin='normal'
            id='date-picker-inline'
            label='toAccountingDate'
            value={toAccountingDate}
            onChange={handleToAccountingDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <br />
      <TransactionList fromAccountingDate={fromAccountingDate} toAccountingDate={toAccountingDate} accountId={props.accountId} />
    </>
  )
}

export default DatePicker
