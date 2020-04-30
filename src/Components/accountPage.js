import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { NavLink } from 'react-router-dom'
import { env } from '../environment'
import axios from 'axios'
import BankTransfer from './bankTransfer'
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

const Alert = (props) => {
  return (
    <MuiAlert elevation={6} variant='filled' {...props} />
  )
}
const AccountPage = (props) => {
  const [accounts, setAccounts] = useState([])
  const [circularProgressVisible, setCircularProgressVisible] = useState(true)
  useEffect(() => {
    setCircularProgressVisible(true)
    axios.get(`${env.baseUrl}api/gbs/banking/v4.0/accounts`, {
      headers: {
        'Content-Type': 'application/json',
        'Auth-Schema': env.authSchema,
        apiKey: env.apiKey
      }
    }).then(res => {
      setCircularProgressVisible(false)
      if (res.status === 200) {
        setAccounts(res.data.payload.list)
      }
    }).catch(() => {
      setCircularProgressVisible(false)
      alert('error')
    })
  }, [])
  return (
    <div style={{ padding: 10 }}>
      <div style={{ width: 280 }}>
        {
          circularProgressVisible &&
            <CircularProgress />
        }
        {
          accounts.length === 0 && <div style={{ color: 'red' }}>Nessun account disponibile</div>
        }
        {
          accounts.map((accnt, index) => {
            const { productName, holderName, account, alias } = accnt
            return (
              <Card key={index}>
                <CardContent>
                  <Typography color='textSecondary' gutterBottom>
                    {productName}
                  </Typography>
                  <Typography variant='h5' component='h2'>
                    {holderName}
                  </Typography>
                  <Typography color='textSecondary'>
                    {account}
                  </Typography>
                  <Typography variant='body2' component='p'>
                    {alias}
                  </Typography>
                </CardContent>
                <CardActions>
                  <NavLink style={{ textDecoration: 'none' }} to={{ pathname: 'account/', account: accnt }}><Button size='small'>more details</Button></NavLink>
                  {accounts && accounts[0] && accounts[0].accountId && <BankTransfer accountId={accounts[0].accountId} />}
                </CardActions>
              </Card>
            )
          })
        }
      </div>
    </div>
  )
}

export default AccountPage
