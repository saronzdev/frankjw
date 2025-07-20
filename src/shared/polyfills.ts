// ✅ Polyfill para globalThis
if (typeof globalThis === 'undefined') {
  // @ts-ignore
  ;(function () {
    if (typeof self !== 'undefined') {
      // @ts-ignore
      self.globalThis = self
    } else if (typeof window !== 'undefined') {
      // @ts-ignore
      window.globalThis = window
    } else if (typeof global !== 'undefined') {
      // @ts-ignore
      global.globalThis = global
    }
  })()
}

// ✅ Polyfill para Object.fromEntries
if (!Object.fromEntries) {
  Object.fromEntries = function (entries: [string, any][]) {
    if (!entries || !entries[Symbol.iterator]) {
      throw new Error('Object.fromEntries() requires a single iterable argument')
    }
    const obj: Record<string, any> = {}
    for (const [key, value] of entries) {
      obj[key] = value
    }
    return obj
  }
}

// ✅ Polyfill para Array.prototype.flat
if (!Array.prototype.flat) {
  Array.prototype.flat = function (depth: number = 1) {
    const flatten = (arr: any[], d: number): any[] => {
      if (d < 1) return arr.slice()
      return arr.reduce((acc: any[], val: any) => {
        if (Array.isArray(val)) {
          acc.push(...flatten(val, d - 1))
        } else {
          acc.push(val)
        }
        return acc
      }, [])
    }
    return flatten(this as any[], depth)
  }
}

// ✅ Polyfill para Promise.finally
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback: () => any) {
    return this.then(
      (value: any) => Promise.resolve(callback()).then(() => value),
      (reason: any) =>
        Promise.resolve(callback()).then(() => {
          throw reason
        })
    )
  }
}
