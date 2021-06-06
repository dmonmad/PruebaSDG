export const sortString = (s1: string, s2: string, sortAsc: boolean) : number => {
  if (s1 === s2) {
    return 0
  }
  // nulls sort after anything else
  else if (s1 === null || s1 === '') {
    return 1
  } else if (s2 === null || s1 === '') {
    return -1
  }
  // otherwise, if we're ascending, lowest sorts first
  else if (sortAsc) {
    return s1.toLowerCase() < s2.toLowerCase() ? -1 : 1
  }
  // if descending, highest sorts first
  else {
    return s1.toLowerCase() < s2.toLowerCase() ? 1 : -1
  }
}
