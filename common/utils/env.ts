import { ProxyAgent } from "undici"

export const isServer = typeof window === 'undefined';

export const isDev = process.env.NODE_ENV === 'development'

export function runInBrowser(cb: Function) {
  if (!isServer) {
    cb()
  }
}

const proxy = process.env.PROXY

interface Options extends RequestInit {
  dispatcher?: ProxyAgent
}

// 解决本地开发时，fetch 访问需要代理的接口
export function withProxy(options: Options = {}) {
  const opt = {
    ...options
  }
  if (isServer && isDev && proxy){
    opt.dispatcher= new ProxyAgent(proxy)
  }
  return opt
}
