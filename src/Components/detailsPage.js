import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import LinearProgress from '@material-ui/core/LinearProgress'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import TransactionTable from './datePicker'
import { getBalance } from '../services/apiService'

const DetailsPage = (props) => {
  const [account, setAccount] = useState(props.location.account)
  const [balance, setBalance] = useState(null)
  const { accountId } = account

  useEffect(() => {
    const setUpBalance = async () => {
      if (accountId) {
        setBalance(await getBalance(account.accountId))
      }
    }
    setUpBalance()
  }, accountId)
  return (
    <>
      {
        !account &&
          <LinearProgress />
      }
      <div style={{ padding: 10 }}>
        {
          account &&
            <Card>
              <CardContent>
                <Typography color='textSecondary' gutterBottom>
                  {account.productName}
                </Typography>
                <Typography variant='h5' component='h2'>
                  {account.holderName}
                </Typography>
                <Typography color='textSecondary'>
                  {account.account}
                </Typography>
                <Typography variant='body2' component='p'>
                  {account.alias}
                </Typography>
                <Typography variant='h5' component='h2'>
                  <span title='Balance'>{balance} €</span>
                </Typography>
              </CardContent>
            </Card>
        }
        <br />
        <TransactionTable accountId={accountId} />
      </div>
    </>
  )
}

export default DetailsPage
