'use strict'

export let isObject = o => !Array.isArray( o ) && o !== null && typeof o === 'object' && Object.prototype.toString.call( o ) === '[object Object]'
