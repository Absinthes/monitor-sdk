export function nativeTryCatch(fn: () => void, errFn: (err: any) => void): void {
  try {
    fn()
  } catch (error) {
    console.error('err', error)
    if(errFn){
      errFn(error)
    }
  }
}