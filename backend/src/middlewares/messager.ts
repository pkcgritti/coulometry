import { Response } from 'express';
import responses from './responses'

class ApiResponse {
  pack: any
  constructor (obj, payload = undefined, info = undefined, total = undefined) {
    this.pack = null
    switch (typeof obj) {
      case 'string': {
        this.pack = Object.assign({}, responses.find(r => r.message === obj))
        break
      }
      case 'number': {
        this.pack = Object.assign({}, responses.find(r => r.status === obj))
        break
      }
      default: {
        if (obj instanceof Error) {
          this.pack = {
            status: 500,
            group: 'Server Error',
            message: 'Internal Error',
            err: { name: obj.name, message: obj.message }
          }
        }
      }
    }
    if (!this.pack.status) {
      this.pack = {}
      this.pack.status = 700
      this.pack.group = 'Developer Error'
      this.pack.message = 'The developer did not registered the apropriate response code'
    }
    if (payload) this.pack.payload = payload
    if (info) this.pack.info = info
    if (total) this.pack.total = total
  }

  send (res) {
    res.status(this.pack.status).json(this.pack)
  }
}

export default function sendMessage () {
  return function (_, res, next) {
    res.sendMessage = function messager (obj?, payload?, info?) {
      let r = new ApiResponse(obj, payload, info);
      r.send(res);
    }
    next();
  }
}
