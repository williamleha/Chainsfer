import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'

import ReceivePassword from '../components/ReceivePasswordComponent'

let wrapper
const initialProps = {
  actionsPending: {
    verifyEscrowAccountPassword: false
  },
  escrowWallet: {
    crypto: {
      ethereum: [
        {
          address: '0x0'
        }
      ]
    }
  },
  transfer: { cryptoType: 'ethereum' },
  clearDecryptedWallet: () => {},
  verifyEscrowAccountPassword: () => {}
}

describe('ReceivePassword rendering', () => {
  wrapper = mount(<ReceivePassword {...initialProps} />)

  it('initial rendering', () => {
    expect(toJson(wrapper.render())).toMatchSnapshot()
  })

  it('Enter security answer text', () => {
    expect(
      wrapper
        .find(Typography)
        .first()
        .text()
    ).toEqual('Enter Security Answer')
  })

  it('password testField', () => {
    expect(wrapper.find(TextField).filter('#password')).toHaveLength(1)
    expect(
      wrapper
        .find(TextField)
        .filter('#password')
        .prop('helperText')
    ).toEqual('Please enter security answer set by the sender')
  })

  it('password testField error text', () => {
    wrapper.setProps({ error: 'error' })
    expect(
      wrapper
        .find(TextField)
        .filter('#password')
        .prop('helperText')
    ).toEqual('Incorrect security answer')
    expect(
      wrapper
        .find(TextField)
        .filter('#password')
        .prop('error')
    ).toEqual(true)
    wrapper.setProps(initialProps)
  })

  it('cancel btn', () => {
    expect(wrapper.find(Button).filter('#cancel')).toHaveLength(1)
  })

  it('continue btn', () => {
    expect(wrapper.find(Button).filter('#continue')).toHaveLength(1)
  })

  it('progress bar', () => {
    wrapper.setProps({
      actionsPending: {
        verifyEscrowAccountPassword: true
      }
    })
    expect(wrapper.find(LinearProgress)).toHaveLength(1)
    wrapper.setProps(initialProps)
  })
})

describe('Interaction', () => {
  beforeEach(() => {
    wrapper = mount(<ReceivePassword {...initialProps} />)
  })
  it('click continue', () => {
    const mockCallBack = jest.fn()
    wrapper.setProps({
      verifyEscrowAccountPassword: mockCallBack,
      transfer: { cryptoType: 'ethereum' }
    })
    wrapper
      .find(Button)
      .filter('#continue')
      .simulate('click')
    expect(mockCallBack.mock.calls.length).toEqual(1)
  })

  it('continue disable when verifyEscrowAccountPassword', () => {
    const mockCallBack = jest.fn()
    wrapper.setProps({
      actionsPending: {
        verifyEscrowAccountPassword: true
      },
      verifyEscrowAccountPassword: mockCallBack,
      transfer: {}
    })
    wrapper
      .find(Button)
      .filter('#continue')
      .simulate('click')
    expect(mockCallBack.mock.calls.length).toEqual(0)
  })

  it('click cancel btn', () => {
    const mockclearVerifyEscrowAccountPasswordError = jest.fn()
    const mockGoToStep = jest.fn()
    wrapper.setProps({
      clearVerifyEscrowAccountPasswordError: mockclearVerifyEscrowAccountPasswordError,
      error: 'deadly error',
      goToStep: mockGoToStep
    })
    wrapper
      .find(Button)
      .filter('#cancel')
      .simulate('click')
    expect(mockclearVerifyEscrowAccountPasswordError.mock.calls.length).toEqual(1)
    expect(mockGoToStep.mock.calls.length).toEqual(1)

    wrapper.setProps({
      error: null
    })
    wrapper
      .find(Button)
      .filter('#cancel')
      .simulate('click')
    expect(mockclearVerifyEscrowAccountPasswordError.mock.calls.length).toEqual(1)
    expect(mockGoToStep.mock.calls.length).toEqual(2)
  })

  it('clear password error while entering', () => {
    const mockCallBack = jest.fn()
    wrapper.setProps({
      error: 'error',
      clearVerifyEscrowAccountPasswordError: mockCallBack
    })
    wrapper
      .find(TextField)
      .filter('#password')
      .props()
      .onChange({ target: { value: 20 } })
    expect(mockCallBack.mock.calls.length).toEqual(1)
  })

  it('clear password on componentDidMount', () => {
    const mockCallBack = jest.fn()
    wrapper.setProps({
      clearDecryptedWallet: mockCallBack
    })
    wrapper.unmount()
    wrapper.mount()
    expect(mockCallBack.mock.calls.length).toEqual(1)
  })

  it('submit on enter', () => {
    const mockverifyEscrowAccountPassword = jest.fn()
    wrapper.setProps({
      verifyEscrowAccountPassword: mockverifyEscrowAccountPassword,
      transfer: { cryptoType: 'ethereum' }
    })
    wrapper
      .find(TextField)
      .filter('#password')
      .props()
      .onKeyPress({ key: 'other key' })
    expect(mockverifyEscrowAccountPassword.mock.calls.length).toEqual(0)

    wrapper
      .find(TextField)
      .filter('#password')
      .props()
      .onKeyPress({ key: 'Enter' })
    expect(mockverifyEscrowAccountPassword.mock.calls.length).toEqual(1)
  })
})
