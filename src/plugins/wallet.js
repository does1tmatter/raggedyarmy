import { ethers } from 'ethers'

class Wallet {
  constructor () {
    this.provider = null
    this.connection = null
    this.signer = null
  }

  connect (provider) {
    this.provider = provider
    this.connection = new ethers.providers.Web3Provider(provider)
    this.signer = this.connection.getSigner()
  }

  disconnect () {
    this.connection = null
    this.signer = null
  }

  signMessage = async (message) => await this.signer.signMessage(message)

  requestAccounts = async () => await this.connection.send('eth_requestAccounts', [])

  getCurrentUser = async () => await this.connection.send('eth_accounts', [])

  getBalance = async (address) => await this.connection.getBalance(address)
  
  lookupAddress = async (address) => await this.connection.lookupAddress(address)

  request = async (payload) => await this.provider.request(payload)

  switchNetwork = async () => await this.provider.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x1' }] })

  getChainId = async () => await this.provider.request({ method: 'eth_chainId'})
  
  getProvider = () => this.provider

  getSigner = () => this.signer
}

export default {
  install: (app) => {
    app.provide('wallet', new Wallet())
  }
}
