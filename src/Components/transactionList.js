import React, { useEffect, useState } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios'
import { env } from '../environment'
import sub from 'date-fns/sub'
import { format } from 'date-fns'

const TransactionTable = (props) => {
  const [transactions, setTransactions] = useState([])
  const getDateString = (date) => {
    let DateObj = date
    if (format(new Date(date), 'yyyy-MM-dd') === format(new Date(date), 'yyyy-MM-dd')) {
      DateObj = sub(new Date(date), { days: 1 })
    }
    return format(new Date(DateObj), 'yyyy-MM-dd')
  }

  useEffect(() => {
    axios.get(`${env.baseUrl}api/gbs/banking/v4.0/accounts/${props.accountId}/transactions?fromAccountingDate=${getDateString(props.fromAccountingDate)}&toAccountingDate=${getDateString(props.toAccountingDate)}`, {
      headers: {
        'Content-Type': 'application/json',
        'Auth-Schema': env.authSchema,
        apiKey: env.apiKey
      }
    }).then(res => {
      if (res.data.status === 'OK') {
        setTransactions(res.data.payload.list)
      }
    }).catch(() => {
      // alert('error')
    })
  }, [props.fromAccountingDate, props.toAccountingDate])
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              transactions.map(transaction => (
                <TableRow key={transaction.transactionId}>
                  <TableCell>{transaction.transactionId}</TableCell>
                  <TableCell><span style={{ color: transaction.amount < 0 ? 'red' : 'green' }}>{transaction.amount}</span></TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.valueDate}</TableCell>
                </TableRow>
              ))
            }
            {
              transactions.length === 0 &&
                <TableRow>
                  <TableCell><CircularProgress /></TableCell>
                </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TransactionTable
