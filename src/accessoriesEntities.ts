export function isFileExistsOnUrl(url: string): boolean {
  const xhr = new XMLHttpRequest()
  xhr.open('HEAD', url, false) // синхронный запрос
  try {
    xhr.send()
    return xhr.status >= 200 && xhr.status < 300
  } catch (e) {
    console.error('Error checking audio file existence:', e)
    return false
  }
}
