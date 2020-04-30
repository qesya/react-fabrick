import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import { env } from '../environment'
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

const Alert = (props) => {
  return (
    <MuiAlert elevation={6} variant='filled' {...props} />
  )
}

const BankTransfer = (props) => {
  const [states, setStates] = useState({
    showMessage: false,
    isError: false,
    message: ''
  })
  const callTransfer = () => {
    axios.post(`${env.baseUrl}api/gbs/banking/v4.0/accounts/${props.accountId}/payments/money-transfers`, {
      creditor: {
        name: 'John Doe',
        account: {
          accountCode: 'IT23A0336844430152923804660',
          bicCode: 'SELBIT2BXXX'
        },
        address: {
          address: null,
          city: null,
          countryCode: null
        }
      },
      executionDate: '2020-03-03',
      uri: 'REMITTANCE_INFORMATION',
      description: 'Payment invoice 75/2020',
      amount: 1,
      currency: 'EUR',
      isUrgent: false,
      isInstant: false,
      feeType: 'SHA',
      feeAccountId: '45685475',
      taxRelief: {
        taxReliefId: 'L449',
        isCondoUpgrade: false,
        creditorFiscalCode: '56258745832',
        beneficiaryType: 'NATURAL_PERSON',
        naturalPersonBeneficiary: {
          fiscalCode1: 'MRLFNC81L04A859L',
          fiscalCode2: null,
          fiscalCode3: null,
          fiscalCode4: null,
          fiscalCode5: null
        },
        legalPersonBeneficiary: {
          fiscalCode: '12345678',
          legalRepresentativeFiscalCode: '6543212'
        }
      }

    }, {
      headers: {
        'Content-Type': 'application/json',
        'Auth-Schema': env.authSchema,
        apiKey: env.apiKey
      }
    }).then(response => {
      console.log(response)
      setStates({
        ...states,
        showMessage: true,
        isError: false,
        message: 'Success Bank Transfer'
      })
    })
      .catch(error => {
        setStates({
          ...states,
          showMessage: true,
          isError: true,
          message: ''
        })
        if (error.response) {
          console.log('Error-response-data', error.response.data)
        } else if (error.request) {
          console.log('Error-request', error.request)
        } else {
          console.log('Error', error.message)
          setStates({
            ...states,
            showMessage: true,
            isError: true,
            message: error.message
          })
        }
        setStates({
          ...states,
          showMessage: true,
          isError: true,
          message: 'Api Error'
        })
        console.log(error.config)
      })
  }
  const closeSnackbar = () => {
    setStates({
      ...states,
      showMessage: false,
      isError: false,
      message: ''
    })
  }

  return (
    <>
      <Button size='small' onClick={() => callTransfer()}>BANK TRANSFER</Button>
      <Snackbar open={states.showMessage} autoHideDuration={6000} onClose={() => { closeSnackbar() }}>
        <Alert onClose={() => { closeSnackbar() }} severity={states.isError ? 'error' : 'success'}>
          {states.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default BankTransfer
